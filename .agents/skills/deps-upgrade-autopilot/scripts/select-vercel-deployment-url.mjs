#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export function validateVercelDeploymentInspectorUrl(value) {
  if (typeof value !== "string") {
    throw new Error("Vercel deployment URL must be a string");
  }

  const url = new URL(value);
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (
    url.protocol !== "https:" ||
    url.hostname !== "vercel.com" ||
    url.port ||
    url.username ||
    url.password ||
    pathSegments.length < 3
  ) {
    throw new Error("Vercel deployment URL must be an HTTPS vercel.com deployment-inspector URL");
  }

  return url.href;
}

export function selectFailedVercelDeploymentUrl(payload) {
  const checks = payload?.statusCheckRollup;
  if (!Array.isArray(checks)) {
    throw new Error("statusCheckRollup must be an array");
  }

  const matches = checks.filter((check) => {
    switch (check?.__typename) {
      case "CheckRun":
        return check.name === "Vercel" && check.conclusion === "FAILURE";
      case "StatusContext":
        return check.context === "Vercel" && check.state === "FAILURE";
      default:
        return false;
    }
  });

  if (matches.length !== 1) {
    throw new Error(`expected exactly one failed Vercel check, found ${matches.length}`);
  }

  const [match] = matches;
  const value = match.__typename === "CheckRun" ? match.detailsUrl : match.targetUrl;
  return validateVercelDeploymentInspectorUrl(value);
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
    const result =
      process.argv[2] === "--url"
        ? validateVercelDeploymentInspectorUrl(process.argv[3])
        : selectFailedVercelDeploymentUrl(await readPayload());
    console.log(result);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
