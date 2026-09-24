import assert from "node:assert/strict";
import test from "node:test";

import { supportsMinimumReleaseAge } from "./check-bun-version.mjs";

test("accepts the minimum and newer stable Bun versions", () => {
  assert.equal(supportsMinimumReleaseAge("1.4.2"), true);
  assert.equal(supportsMinimumReleaseAge("1.4.3"), true);
  assert.equal(supportsMinimumReleaseAge("1.5.0"), true);
});

test("rejects older, prerelease, and invalid Bun versions", () => {
  assert.equal(supportsMinimumReleaseAge("1.4.1"), false);
  assert.equal(supportsMinimumReleaseAge("1.2.14"), false);
  assert.equal(supportsMinimumReleaseAge("1.4.2-canary.1"), false);
  assert.equal(supportsMinimumReleaseAge("unknown"), false);
});
