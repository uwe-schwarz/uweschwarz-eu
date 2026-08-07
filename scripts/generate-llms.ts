import fs from "node:fs/promises";
import path from "node:path";

import { siteContent } from "@/content/content";
import { SITE_URL } from "@/lib/site-config";

interface BunRuntime {
  write: (path: string, data: string) => Promise<unknown>;
}

const bunRuntime = (globalThis as typeof globalThis & { Bun?: BunRuntime }).Bun;

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

function markdownLink(title: string, url: string, description: string) {
  return `- [${title}](${url}): ${description}`;
}

function requiredUrl(label: string, url: string | undefined) {
  if (!url) {
    throw new Error(`${label} URL must be defined to generate llms.txt`);
  }

  return url;
}

export function buildLlmsTxt(generatedOn: string) {
  const { socialLinks } = siteContent.contact;
  const availability = siteContent.hero.availability;

  return [
    `# ${siteContent.siteMetadata.title}`,
    "",
    `> ${siteContent.siteMetadata.description.en}. This bilingual site presents Uwe Schwarz's professional experience, projects, trainings, skills, and contact details.`,
    "",
    "Use the Markdown portfolio links below for the most complete, agent-friendly representation of the homepage. The same Markdown is available from the public homepage through HTTP content negotiation with `Accept: text/markdown`.",
    "",
    `Languages: English and German. Availability: ${availability.currentPercentAvailable}% now and 100% from ${availability.fullyAvailableDate}. Last generated: ${generatedOn}.`,
    "",
    "## Portfolio",
    "",
    markdownLink(
      "English portfolio",
      absoluteUrl("/api/agent-markdown?lang=en"),
      "Markdown overview of experience, projects, trainings, skills, and contact details.",
    ),
    markdownLink(
      "German portfolio",
      absoluteUrl("/api/agent-markdown?lang=de"),
      "German Markdown overview of experience, projects, trainings, skills, and contact details.",
    ),
    "",
    "## Main pages",
    "",
    markdownLink("Homepage", absoluteUrl("/"), "Interactive bilingual portfolio."),
    markdownLink("CV", absoluteUrl("/cv"), "Interactive CV with PDF and DOCX downloads."),
    markdownLink("Trainings", absoluteUrl("/#trainings"), "Current professional training offerings."),
    markdownLink("Projects", absoluteUrl("/#projects"), "Selected software, security, and infrastructure projects."),
    markdownLink("Contact", absoluteUrl("/#contact"), "Contact form and direct contact details."),
    "",
    "## Professional profiles",
    "",
    markdownLink("GitHub", requiredUrl("GitHub", socialLinks.github), "Public software projects and contributions."),
    markdownLink("LinkedIn", requiredUrl("LinkedIn", socialLinks.linkedin), "Professional profile and work history."),
    markdownLink(
      "Freelancermap",
      requiredUrl("Freelancermap", socialLinks.freelancermap),
      "Freelance consultant profile.",
    ),
    "",
    "## Optional",
    "",
    markdownLink("Human-readable sitemap", absoluteUrl("/sitemap"), "Overview of public website pages."),
    markdownLink("XML sitemap", absoluteUrl("/sitemap.xml"), "Machine-readable index of public URLs."),
    markdownLink("Privacy policy", absoluteUrl("/privacy"), "Information about personal data processing."),
    markdownLink("Imprint", absoluteUrl("/imprint"), "Legal provider information."),
    "",
  ].join("\n");
}

async function generateLlmsTxt() {
  try {
    const generatedOn = new Date().toISOString().split("T")[0];
    const outputPath = path.resolve(process.cwd(), "public", "llms.txt");
    const llmsTxtContent = buildLlmsTxt(generatedOn);

    if (bunRuntime) {
      await bunRuntime.write(outputPath, llmsTxtContent);
    } else {
      await fs.writeFile(outputPath, llmsTxtContent);
    }
    console.log("Successfully generated llms.txt to public/llms.txt");
  } catch (error) {
    console.error("Error generating llms.txt:", error);
    process.exitCode = 1;
  }
}

if (import.meta.main) {
  await generateLlmsTxt();
}
