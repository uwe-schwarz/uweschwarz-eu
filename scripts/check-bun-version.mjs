import process from "node:process";

export const MINIMUM_BUN_VERSION = "1.4.2";

export function supportsMinimumReleaseAge(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version ?? "");
  if (!match) {
    return false;
  }

  const current = match.slice(1).map(Number);
  const minimum = MINIMUM_BUN_VERSION.split(".").map(Number);

  for (let index = 0; index < minimum.length; index += 1) {
    if (current[index] !== minimum[index]) {
      return current[index] > minimum[index];
    }
  }

  return true;
}

if (import.meta.main) {
  const version = globalThis.Bun?.version;

  if (!supportsMinimumReleaseAge(version)) {
    process.stderr.write(
      `This project requires Bun >= ${MINIMUM_BUN_VERSION} to enforce its one-day package release-age gate (detected ${version ?? "no Bun runtime"}).\n`,
    );
    process.exitCode = 1;
  }
}
