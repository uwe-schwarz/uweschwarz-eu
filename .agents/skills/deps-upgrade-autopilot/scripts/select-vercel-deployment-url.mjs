#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export function selectFailedVercelDeploymentUrl(payload) {
  const checks = payload?.statusCheckRollup;
  if (!Array.isArray(checks)) {
    throw new Error("statusCheckRollup must be an array");
  }

  const matches = checks.filter((check) => {
    const name = check?.__typename === "CheckRun" ? check.name : check?.context;
    const result = check?.__typename === "CheckRun" ? check.conclusion : check?.state;
    return name === "Vercel" && result === "FAILURE";
  });

  if (matches.length !== 1) {
    throw new Error(`expected exactly one failed Vercel check, found ${matches.length}`);
  }

  const [match] = matches;
  const value = match.__typename === "CheckRun" ? match.detailsUrl : match.targetUrl;
  const url = new URL(value);

  if (url.protocol !== "https:" || url.hostname !== "vercel.com") {
    throw new Error("failed Vercel check URL must use https://vercel.com");
  }

  return url.href;
}

async function readPayload() {
  const inputPath = process.argv[2];
  const chunks = [];
  if (!inputPath) {
    for await (const chunk of process.stdin) chunks.push(chunk);
  }
  const json = inputPath ? await readFile(inputPath, "utf8") : Buffer.concat(chunks).toString("utf8");
  return JSON.parse(json);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(selectFailedVercelDeploymentUrl(await readPayload()));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
