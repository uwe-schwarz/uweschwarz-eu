import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

export function getBaselineUpdatedAt(pdfAssetPath: string) {
  const baselineDate = pdfAssetPath.match(/(\d{4}-\d{2}-\d{2})\.pdf$/)?.[1];

  if (!baselineDate) {
    throw new Error(`Could not extract baseline date from asset path: ${pdfAssetPath}`);
  }

  const [year, month, day] = baselineDate.split("-").map((value) => Number.parseInt(value, 10));
  return new Date(year, month - 1, day);
}

export async function renderPdfToPngPages(
  pdfPath: string,
  outputPrefix: string,
  runCommand: typeof execFileAsync = execFileAsync,
) {
  try {
    await runCommand("pdftoppm", ["-png", "-r", "144", pdfPath, outputPrefix], {
      encoding: "utf8",
    });
  } catch (error) {
    throw new Error(`Failed to rasterize PDF "${pdfPath}" to prefix "${outputPrefix}"`, {
      cause: error,
    });
  }
}

export async function listPagePngs(prefixDirPrefix: string) {
  const dir = path.dirname(prefixDirPrefix);
  const prefix = path.basename(prefixDirPrefix);
  const files = await fs.readdir(dir);

  return files
    .filter((file) => file.startsWith(`${prefix}-`) && file.endsWith(".png"))
    .sort((left, right) => {
      const leftPage = Number.parseInt(left.match(/-(\d+)\.png$/)?.[1] ?? "0", 10);
      const rightPage = Number.parseInt(right.match(/-(\d+)\.png$/)?.[1] ?? "0", 10);
      return leftPage - rightPage;
    })
    .map((file) => path.join(dir, file));
}
