import { describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { getBaselineUpdatedAt, listPagePngs, renderPdfToPngPages } from "./pdfVisual";

const failingRasterizeCommand = async () => {
  throw new Error("pdftoppm boom");
};

describe("pdfVisual helpers", () => {
  test("derives a deterministic baseline date in local time from the committed asset path", () => {
    const baselineDate = getBaselineUpdatedAt("/uwe-schwarz-cv-de-2026-04-15.pdf");

    expect(baselineDate.getFullYear()).toBe(2026);
    expect(baselineDate.getMonth()).toBe(3);
    expect(baselineDate.getDate()).toBe(15);
    expect(baselineDate.getHours()).toBe(0);
    expect(baselineDate.getMinutes()).toBe(0);
    expect(baselineDate.getSeconds()).toBe(0);
    expect(baselineDate.getMilliseconds()).toBe(0);
  });

  test("throws when the baseline asset path does not contain a date", () => {
    expect(() => getBaselineUpdatedAt("/uwe-schwarz-cv-de-latest.pdf")).toThrow(
      "Could not extract baseline date from asset path: /uwe-schwarz-cv-de-latest.pdf",
    );
  });

  test("lists rasterized PDF pages in numeric order", async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-visual-pages-"));

    try {
      await Promise.all([
        fs.writeFile(path.join(tempDir, "actual-10.png"), ""),
        fs.writeFile(path.join(tempDir, "actual-2.png"), ""),
        fs.writeFile(path.join(tempDir, "actual-1.png"), ""),
      ]);

      expect(await listPagePngs(path.join(tempDir, "actual"))).toEqual([
        path.join(tempDir, "actual-1.png"),
        path.join(tempDir, "actual-2.png"),
        path.join(tempDir, "actual-10.png"),
      ]);
    } finally {
      await fs.rm(tempDir, { force: true, recursive: true });
    }
  });

  test("wraps pdftoppm failures with input context", async () => {
    await expect(renderPdfToPngPages("/tmp/input.pdf", "/tmp/output", failingRasterizeCommand)).rejects.toThrow(
      'Failed to rasterize PDF "/tmp/input.pdf" to prefix "/tmp/output"',
    );
  });
});
