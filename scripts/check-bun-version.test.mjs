import assert from "node:assert/strict";
import test from "node:test";

import { getBunVersionError, supportsMinimumReleaseAge } from "./check-bun-version.mjs";

test("accepts the exact configured stable Bun version", () => {
  assert.equal(getBunVersionError("bun@1.4.2", "1.4.2"), null);
  assert.equal(getBunVersionError("bun@1.4.3", "1.4.3"), null);
});

test("rejects a local Bun version that differs from packageManager", () => {
  assert.match(getBunVersionError("bun@1.4.2", "1.4.3"), /requires Bun 1\.4\.2.*exactly.*1\.4\.3/);
  assert.match(getBunVersionError("bun@1.4.3", "1.4.2"), /requires Bun 1\.4\.3.*exactly.*1\.4\.2/);
});

test("rejects invalid or unsupported packageManager declarations", () => {
  assert.match(getBunVersionError("bun@1.4.1", "1.4.1"), /does not enforce/);
  assert.match(getBunVersionError("bun@latest", "1.4.2"), /exact bun@x\.y\.z/);
  assert.match(getBunVersionError("pnpm@10.0.0", "1.4.2"), /exact bun@x\.y\.z/);
});

test("rejects invalid or prerelease detected versions", () => {
  assert.match(getBunVersionError("bun@1.4.2", "1.4.2-canary.1"), /stable Bun version/);
  assert.match(getBunVersionError("bun@1.4.2", "unknown"), /stable Bun version/);
  assert.equal(supportsMinimumReleaseAge("1.4.1"), false);
  assert.equal(supportsMinimumReleaseAge("1.4.2-canary.1"), false);
  assert.equal(supportsMinimumReleaseAge("1.4.2"), true);
  assert.equal(supportsMinimumReleaseAge("1.5.0"), true);
});
