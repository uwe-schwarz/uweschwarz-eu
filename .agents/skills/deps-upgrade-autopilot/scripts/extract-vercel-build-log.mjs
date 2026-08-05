#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const MAX_EVENTS = 5_000;
const MAX_TEXT_BYTES = 2 * 1024 * 1024;

export function extractVercelBuildLog(events) {
  if (!Array.isArray(events)) {
    throw new Error("Vercel deployment events must be an array");
  }
  if (events.length > MAX_EVENTS) {
    throw new Error(`Vercel deployment event count exceeds ${MAX_EVENTS}`);
  }

  const lines = [];
  let textBytes = 0;
  for (const event of events) {
    if (!event || (event.type !== "stdout" && event.type !== "stderr") || typeof event.text !== "string") {
      continue;
    }
    textBytes += Buffer.byteLength(event.text);
    if (textBytes > MAX_TEXT_BYTES) {
      throw new Error(`Vercel deployment log text exceeds ${MAX_TEXT_BYTES} bytes`);
    }
    lines.push(event.text);
  }

  if (lines.length === 0) {
    throw new Error("Vercel deployment events contained no build log text");
  }
  return `${lines.join("\n")}\n`;
}

async function extractFile(inputPath, outputPath) {
  if (!inputPath || !outputPath) {
    throw new Error("usage: extract-vercel-build-log.mjs <events.json> <build.log>");
  }
  const events = JSON.parse(await readFile(inputPath, "utf8"));
  await writeFile(outputPath, extractVercelBuildLog(events), { mode: 0o600 });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await extractFile(process.argv[2], process.argv[3]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
