import fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from "node:buffer";
import { fileURLToPath } from "node:url";
import React from "react";
import ReactPDF from "@react-pdf/renderer";
import CVDocument from "@/components/cv/CVDocument";
import { siteContent } from "@/content/content";
import { generateCvDocx } from "@/components/cv/CVDocumentDocx";

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

async function main() {
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
