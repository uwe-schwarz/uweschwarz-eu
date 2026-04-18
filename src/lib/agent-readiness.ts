import { siteContent } from "@/content/content";
import type { Language } from "@/contexts/settings-hook";
import { translateLocalizedString } from "@/lib/localization";

const HOMEPAGE_PATHS = new Set(["/", "/de", "/en"]);
const SECTION_TITLES = {
  about: { de: "Ueber mich", en: "About" },
  contact: { de: "Kontakt", en: "Contact" },
  experience: { de: "Erfahrung", en: "Experience" },
  projects: { de: "Projekte", en: "Projects" },
  resources: { de: "Ressourcen", en: "Resources" },
  skills: { de: "Faehigkeiten", en: "Skills" },
} as const;

export const AGENT_DISCOVERY_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</sitemap>; rel="service-doc"; type="text/html"',
];

function localize(value: { de: string; en: string }, language: Language) {
  return translateLocalizedString(value, language);
}

function formatAvailability(language: Language) {
  const { availability } = siteContent.hero;
  const currentLine = localize(availability.currentLine, language).replace(
    "{percent}",
    String(availability.currentPercentAvailable),
  );
  const fullLine = localize(availability.fullLine, language).replace("{date}", availability.fullyAvailableDate);

  return `${localize(availability.title, language)}: ${currentLine}, ${fullLine}`;
}

function estimateMarkdownTokens(markdown: string) {
  return markdown.trim().split(/\s+/).filter(Boolean).length;
}

export function appendAgentDiscoveryHeaders(headers: Headers) {
  for (const linkHeader of AGENT_DISCOVERY_LINKS) {
    headers.append("Link", linkHeader);
  }
}

export function buildHomepageMarkdown(language: Language) {
  const topSkills = siteContent.skills.slice(0, 12).map((skill) => localize(skill.name, language));
  const featuredExperiences = siteContent.experiences.slice(0, 3);
  const featuredProjects = siteContent.projects.slice(0, 4);
  const heroTitle = siteContent.hero.titleElements.map((title) => localize(title, language)).join(" | ");

  const lines = [
    `# ${siteContent.hero.name}`,
    "",
    heroTitle,
    "",
    localize(siteContent.siteMetadata.description, language),
    "",
    localize(siteContent.hero.description, language),
    "",
    formatAvailability(language),
    "",
    `## ${localize(SECTION_TITLES.about, language)}`,
    "",
    ...siteContent.about.paragraphs.map((paragraph) => localize(paragraph, language)),
    "",
    `## ${localize(SECTION_TITLES.skills, language)}`,
    "",
    topSkills.map((skill) => `- ${skill}`).join("\n"),
    "",
    `## ${localize(SECTION_TITLES.experience, language)}`,
    "",
    ...featuredExperiences.flatMap((experience) => {
      const firstDescription =
        experience.description.find((item) => item.type === "text")?.text ?? experience.description[0]?.text;

      return [
        `- **${localize(experience.title, language)}**, ${experience.company} (${localize(experience.period, language)})`,
        `  ${firstDescription ? localize(firstDescription, language) : ""}`,
      ];
    }),
    "",
    `## ${localize(SECTION_TITLES.projects, language)}`,
    "",
    ...featuredProjects.flatMap((project) => [
      `- **${localize(project.title, language)}**`,
      `  ${localize(project.description, language)}`,
    ]),
    "",
    `## ${localize(SECTION_TITLES.contact, language)}`,
    "",
    `- ${localize(siteContent.contact.emailLabel, language)} ${siteContent.contact.email}`,
    `- ${localize(siteContent.contact.phoneLabel, language)} ${siteContent.contact.phone}`,
    `- GitHub: ${siteContent.contact.socialLinks.github ?? ""}`,
    `- LinkedIn: ${siteContent.contact.socialLinks.linkedin ?? ""}`,
    "",
    `## ${localize(SECTION_TITLES.resources, language)}`,
    "",
    "- llms.txt: /llms.txt",
    "- Sitemap: /sitemap",
    "- Privacy: /privacy",
    "- Imprint: /imprint",
  ];

  return `${lines.filter(Boolean).join("\n")}\n`;
}

export function buildMarkdownResponseHeaders(markdown: string) {
  const headers = new Headers();

  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", "Accept");
  headers.set("x-markdown-tokens", String(estimateMarkdownTokens(markdown)));

  return headers;
}

export function hasMarkdownAcceptHeader(acceptHeader: string | null) {
  if (!acceptHeader) {
    return false;
  }

  return acceptHeader.split(",").some((part) => {
    const [typePart, ...parameterParts] = part.split(";").map((value) => value.trim().toLowerCase());

    if (typePart !== "text/markdown") {
      return false;
    }

    const qValue = parameterParts.find((parameter) => parameter.startsWith("q="));
    return qValue ? Number(qValue.slice(2)) > 0 : true;
  });
}

export function isHomepagePath(pathname: string) {
  return HOMEPAGE_PATHS.has(pathname);
}
