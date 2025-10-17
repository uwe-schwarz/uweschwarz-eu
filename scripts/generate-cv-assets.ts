import fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from "node:buffer";
import { fileURLToPath } from "node:url";
import React from "react";
import ReactPDF from "@react-pdf/renderer";
import CVDocument from "./cv/CVDocument";
import { siteContent } from "../src/content/content";
import { generateCvDocx } from "./cv/CVDocumentDocx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.resolve(projectRoot, "public");

const languages: Array<"en" | "de"> = ["en", "de"];

const resolveOutputName = (language: "en" | "de", extension: "pdf" | "docx") =>
  `uwe-schwarz-cv-${language}.${extension}`;

async function ensureDirectory(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function getFileModTime(filePath: string): Promise<Date | null> {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime;
  } catch {
    return null;
  }
}

async function shouldRegenerate(): Promise<boolean> {
  const contentPath = path.resolve(projectRoot, "src/content/content.ts");
  const contentModTime = await getFileModTime(contentPath);

  if (!contentModTime) {
    console.log("Content file not found, regenerating...");
    return true;
  }

  for (const language of languages) {
    const pdfPath = path.join(publicDir, resolveOutputName(language, "pdf"));
    const docxPath = path.join(publicDir, resolveOutputName(language, "docx"));

    const pdfModTime = await getFileModTime(pdfPath);
    const docxModTime = await getFileModTime(docxPath);

    if (!pdfModTime || !docxModTime) {
      console.log(`CV files for ${language} not found, regenerating...`);
      return true;
    }

    if (contentModTime > pdfModTime || contentModTime > docxModTime) {
      console.log(`Content is newer than existing CV files for ${language}, regenerating...`);
      return true;
    }
  }

  console.log("CV files are up to date, skipping generation.");
  return false;
}

async function main() {
  if (!(await shouldRegenerate())) {
    return;
  }

  await ensureDirectory(publicDir);

  const profileImagePath = path.join(publicDir, "profile.jpg");
  const profileImage = await fs.readFile(profileImagePath);

  for (const language of languages) {
    const pdfElement = React.createElement(CVDocument, {
      language,
      data: siteContent,
      profileImageSrc: profileImage,
    });

    const pdfTarget = path.join(publicDir, resolveOutputName(language, "pdf"));
    await ReactPDF.render(pdfElement, pdfTarget);

    const docxData = await generateCvDocx({
      language,
      data: siteContent,
      profileImage,
    });
    const docxTarget = path.join(publicDir, resolveOutputName(language, "docx"));
    await fs.writeFile(docxTarget, Buffer.from(docxData));
  }

  console.log(
    `Generated CV assets: ${languages
      .map((lang) => `${resolveOutputName(lang, "pdf")}, ${resolveOutputName(lang, "docx")}`)
      .join("; ")}`
  );
}

main().catch((error) => {
  console.error("Failed to generate CV assets", error);
  process.exitCode = 1;
});
