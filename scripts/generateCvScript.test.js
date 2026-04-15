import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

describe("generate:cv script", () => {
  test("also refreshes sitemap output", async () => {
    const packageJson = JSON.parse(await readFile(join(import.meta.dir, "..", "package.json"), "utf8"));

    expect(packageJson.scripts["generate:cv"]).toContain("generate-sitemap.ts");
  });
});
