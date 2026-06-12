import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const sourcePath = fileURLToPath(new URL("./CvPageClient.tsx", import.meta.url));

describe("CvPageClient PDF embed", () => {
  test("does not sandbox the native browser PDF viewer", () => {
    const source = readFileSync(sourcePath, "utf8");

    expect(source).not.toContain("sandbox=");
  });
});
