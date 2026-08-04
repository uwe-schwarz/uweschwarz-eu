#!/usr/bin/env node

import { open } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const MAX_BYTES = 256 * 1024;
const MAX_LINES = 120;
const MAX_LINE_LENGTH = 500;
const diagnosticPattern =
  /(^|[^a-z])(bun|next(?:\.js)?|runtime|framework|package manager|install|build|error|failed)([^a-z]|$)/i;

export async function summarizeVercelBuildLog(path) {
  const file = await open(path, "r");
  try {
    const buffer = Buffer.alloc(MAX_BYTES);
    const { bytesRead } = await file.read(buffer, 0, buffer.length, 0);
    const lines = buffer
      .subarray(0, bytesRead)
      .toString("utf8")
      .split(/\r?\n/)
      .filter((line) => diagnosticPattern.test(line))
      .slice(0, MAX_LINES)
      .map((line) => line.slice(0, MAX_LINE_LENGTH));

    if (lines.length === 0) {
      lines.push("No allowlisted Vercel build diagnostics found in the bounded log prefix.");
    }
    if (bytesRead === MAX_BYTES) {
      lines.push(`Log inspection truncated after ${MAX_BYTES} bytes.`);
    }

    return lines.join("\n");
  } finally {
    await file.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(await summarizeVercelBuildLog(process.argv[2]));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
