import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import process from "node:process";
import { URL, pathToFileURL } from "node:url";

export const MINIMUM_BUN_VERSION = "1.4.2";

function parseStableVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version ?? "");
  return match ? match.slice(1).map(Number) : null;
}

export function supportsMinimumReleaseAge(version) {
  const current = parseStableVersion(version);
  const minimum = parseStableVersion(MINIMUM_BUN_VERSION);

  if (!current || !minimum) {
    return false;
  }

  for (let index = 0; index < minimum.length; index += 1) {
    if (current[index] !== minimum[index]) {
      return current[index] > minimum[index];
    }
  }

  return true;
}

export function getBunVersionError(packageManager, detectedVersion) {
  const expectedMatch = /^bun@(\d+\.\d+\.\d+)$/.exec(packageManager ?? "");
  if (!expectedMatch) {
    return "package.json must declare packageManager as an exact bun@x.y.z version.";
  }

  const expectedVersion = expectedMatch[1];
  if (!supportsMinimumReleaseAge(expectedVersion)) {
    return `packageManager pins Bun ${expectedVersion}, which does not enforce this repository's one-day package release-age gate (requires Bun >= ${MINIMUM_BUN_VERSION}).`;
  }

  if (!parseStableVersion(detectedVersion)) {
    return `Could not detect a stable Bun version (detected ${detectedVersion || "no Bun runtime"}).`;
  }

  if (detectedVersion !== expectedVersion) {
    return `This workflow requires Bun ${expectedVersion} to match package.json#packageManager exactly (detected ${detectedVersion}).`;
  }

  return null;
}

function runPreflight() {
  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  let detectedVersion;

  try {
    detectedVersion = execFileSync("bun", ["--version"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    process.stderr.write("Could not run `bun --version`; install Bun before continuing.\n");
    process.exitCode = 1;
    return;
  }

  const error = getBunVersionError(packageJson.packageManager, detectedVersion);
  if (error) {
    process.stderr.write(`${error}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    `Bun ${detectedVersion} matches package.json#packageManager and enforces the one-day release-age gate.\n`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runPreflight();
}
