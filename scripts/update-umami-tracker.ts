import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

import { UMAMI_UPSTREAM_SCRIPT_URL } from "@/lib/security/csp";

const scriptFile = new URL("../src/app/api/umami/script/umami.js.txt", import.meta.url);
const hashFile = new URL("../src/app/api/umami/script/umami.sha256", import.meta.url);

function getSha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function readTextFile(file: URL) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return "";
  }
}

const response = await fetch(UMAMI_UPSTREAM_SCRIPT_URL, {
  headers: {
    "User-Agent": "uweschwarz-eu-umami-updater",
  },
});

if (!response.ok) {
  throw new Error(`Failed to fetch Umami tracker: ${response.status} ${response.statusText}`);
}

const upstreamScript = await response.text();
const upstreamHash = getSha256(upstreamScript);
const [currentScript, currentHash] = await Promise.all([readTextFile(scriptFile), readTextFile(hashFile)]);

if (currentScript === upstreamScript && currentHash.trim() === upstreamHash) {
  console.log(`Umami tracker is current: ${upstreamHash}`);
  process.exit(0);
}

await Promise.all([writeFile(scriptFile, upstreamScript), writeFile(hashFile, `${upstreamHash}\n`)]);

console.log(`Updated vendored Umami tracker to sha256 ${upstreamHash}`);
