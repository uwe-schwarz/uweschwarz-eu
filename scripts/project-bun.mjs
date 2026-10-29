import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import process from "node:process";
import { URL } from "node:url";

import { supportsMinimumReleaseAge } from "./check-bun-version.mjs";

const { packageManager } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const version = /^bun@(\d+\.\d+\.\d+)$/.exec(packageManager)?.[1];
if (!version || !supportsMinimumReleaseAge(version)) {
  throw new Error("packageManager must pin a stable Bun version supporting the release-age gate.");
}

// Vercel's bundled Bun can lag behind the project. Bootstrap the exact pin for
// both install and build without changing the project's dependency manifest.
const result = spawnSync("bunx", [packageManager, ...process.argv.slice(2)], { stdio: "inherit" });
if (result.error) {
  throw result.error;
}
process.exit(result.status ?? 1);
