#!/usr/bin/env node

import { open } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const MAX_BYTES = 256 * 1024;
const MAX_VALUES_PER_CATEGORY = 8;
const versionPattern = "([0-9]{1,4}\\.[0-9]{1,4}\\.[0-9]{1,4})";
const bunVersionPattern = new RegExp(`\\bbun install v${versionPattern}\\b`, "i");
const nextVersionPattern = new RegExp(`\\bDetected Next\\.js version:\\s*${versionPattern}\\b`, "i");

function addUnique(values, value) {
  if (value && values.length < MAX_VALUES_PER_CATEGORY && !values.includes(value)) {
    values.push(value);
  }
}

export async function summarizeVercelBuildLog(path) {
  const file = await open(path, "r");
  try {
    const buffer = Buffer.alloc(MAX_BYTES);
    const { bytesRead } = await file.read(buffer, 0, buffer.length, 0);
    const packageManagerVersions = [];
    const frameworkVersions = [];
    const phases = [];
    const outcomes = [];
    const errorSignatures = [];

    for (const line of buffer.subarray(0, bytesRead).toString("utf8").split(/\r?\n/)) {
      addUnique(packageManagerVersions, line.match(bunVersionPattern)?.[1]);
      addUnique(frameworkVersions, line.match(nextVersionPattern)?.[1]);

      if (bunVersionPattern.test(line)) addUnique(phases, "dependency_install");
      if (line.includes('Running "vercel build"')) addUnique(phases, "vercel_build");
      if (line.includes('Running "bun run build"')) addUnique(phases, "next_build");
      if (line.includes("Creating an optimized production build")) addUnique(phases, "production_compile");
      if (line.includes("Collecting page data")) addUnique(phases, "page_data");
      if (line.includes("Generating static pages")) addUnique(phases, "static_generation");

      if (
        /Build Completed in \/vercel\/output \[(?:\d+m(?: \d+(?:\.\d+)?s)?|\d+(?:\.\d+)?(?:ms|s))\]/.test(
          line,
        )
      ) {
        addUnique(outcomes, "build_completed");
      }
      if (/Error: Command "[^"]+" exited with \d+/.test(line)) addUnique(outcomes, "command_failed");

      if (line.includes("Expected CommonJS module to have a function wrapper")) {
        addUnique(errorSignatures, "commonjs_function_wrapper");
      }
    }

    return JSON.stringify(
      {
        error_signatures: errorSignatures,
        frameworks: frameworkVersions.map((version) => ({ name: "next.js", version })),
        outcomes,
        package_managers: packageManagerVersions.map((version) => ({ name: "bun", version })),
        phases,
        schema_version: "vercel-build-diagnostics/v1",
        truncated: bytesRead === MAX_BYTES,
      },
      null,
      2,
    );
  } finally {
    await file.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(await summarizeVercelBuildLog(process.argv[2]));
  } catch {
    console.error("Unable to summarize the Vercel build log.");
    process.exitCode = 1;
  }
}
