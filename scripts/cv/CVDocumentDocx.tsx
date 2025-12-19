import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  Footer,
  PageNumber,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} from "docx";
import type { SiteContent, Skill, Experience } from "@/content/content";

type LocalizedString = { en: string; de: string };

// Define your theme colors (hex without #)
const theme = {
  background: "E6E9F3",
  sidebarBg: "1B6E5A",
  sidebarText: "FFFFFF",
  accent: "3A2366",
  primary: "1B6E5A",
  sectionTitle: "3A2366",
  sectionLine: "DBE3EF",
  tagBg: "F1F0FB",
  tagText: "3A2366",
  foreground: "07090B",
};

/**
 * Generiert ein Word-Dokument als Buffer für Node- und Browser-Umgebungen.
 */
export async function generateCvDocx({
  language,
  data,
  profileImage,
}: {
  language: "en" | "de";
  data: SiteContent;
  profileImage: Uint8Array | ArrayBuffer;
}): Promise<Uint8Array> {
  const profileImageBytes = profileImage instanceof Uint8Array ? profileImage : new Uint8Array(profileImage);
  const content: SiteContent = data;
  const { about, experiences, skills, skillsSection, contact, footer, hero, imprint } = content;

  // Übersetzungs-Helper
  const t = (obj: LocalizedString): string => obj[language] || "";

  // Erfahrungen sortieren (Present/Heute zuerst)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aPresent = t(a.period).match(/(?:Present|Heute)$/);
    const bPresent = t(b.period).match(/(?:Present|Heute)$/);
    if (aPresent && !bPresent) return -1;
    if (!aPresent && bPresent) return 1;
    return 0;
  });

  // Skills gruppieren
  const skillsByCategory: Record<Skill["category"], Skill[]> = {} as Record<Skill["category"], Skill[]>;
  skills.forEach((s) => {
    if (!skillsByCategory[s.category]) skillsByCategory[s.category] = [];
    skillsByCategory[s.category].push(s);
  });

  const majorExperiences = sortedExperiences.filter((exp) => exp.projectScale !== "small");
  const smallExperiences = sortedExperiences.filter((exp) => exp.projectScale === "small");

  const createExperienceParagraphs = (exp: Experience): Paragraph[] => [
    new Paragraph({ children: [new TextRun({ text: t(exp.title), bold: true, size: 20 })] }),
    new Paragraph({
      children: [
        new TextRun({ text: exp.company, size: 18, color: theme.primary }),
        new TextRun({ text: ` — ${t(exp.period)}`, size: 18, color: theme.accent }),
      ],
    }),
    new Paragraph({
      children: [new TextRun({ text: t(exp.location), size: 18, color: theme.accent })],
      spacing: { after: 100 },
    }),
    ...exp.description.map(
      (item) =>
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({
              text: item.type === "text" ? t(item.text) : `${t(content.experienceAchievementPrefix)} ${t(item.text)}`,
              size: 18,
              color: item.type === "achievement" ? theme.primary : theme.foreground,
              bold: item.type === "achievement",
            }),
          ],
        }),
    ),
    new Paragraph({ text: "" }),
  ];

  const createExperienceGroup = (
    title: LocalizedString,
    subtitle: LocalizedString,
    note: LocalizedString,
    entries: Experience[],
  ): Paragraph[] => {
    if (!entries.length) {
      return [];
    }
    return [
      new Paragraph({
        spacing: { before: 150, after: 50 },
        children: [new TextRun({ text: t(title), bold: true, size: 20 })],
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: t(subtitle), size: 18, color: theme.primary })],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: t(note), size: 16, color: theme.accent })],
      }),
      ...entries.flatMap(createExperienceParagraphs),
    ];
  };

  const experienceSectionParagraphs: Paragraph[] = [
    new Paragraph({
      text: t(content.experienceSectionTitle),
      heading: HeadingLevel.HEADING_2,
      thematicBreak: true,
      keepLines: true,
      spacing: { after: 100 },
    }),
    ...createExperienceGroup(
      content.experienceBigProjectsTitle,
      content.experienceBigProjectsSubtitle,
      content.experienceBigProjectsNote,
      majorExperiences,
    ),
    ...createExperienceGroup(
      content.experienceSmallProjectsTitle,
      content.experienceSmallProjectsSubtitle,
      content.experienceSmallProjectsNote,
      smallExperiences,
    ),
  ];

  // Attach the image via ImageRun
  const profileImg = new ImageRun({
    type: "jpg",
    data: profileImageBytes,
    transformation: { width: 80, height: 80 },
  });

  // Build the languages paragraph children
  const languagesChildren: TextRun[] = [];
  const languageSkills = skillsByCategory.languages || [];
  languageSkills.forEach((s, idx) => {
    languagesChildren.push(new TextRun({ text: t(s.name), size: 16, color: theme.sidebarText }));
    if (idx < languageSkills.length - 1) {
      languagesChildren.push(new TextRun({ text: ", ", size: 16, color: theme.sidebarText }));
    }
  });

  // Create the document with sections in constructor
  const doc = new Document({
    creator: t(imprint.companyName),
    description: (language === "en" ? "CV of " : "CV von ") + t(imprint.companyName),
    title: "CV " + t(imprint.companyName),
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: { font: "Public Sans" },
        },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: language === "en" ? "Page " : "Seite ",
                    size: 16,
                    color: theme.accent,
                  }),
                  new TextRun({ children: [PageNumber.CURRENT] }),
                  new TextRun({
                    text: language === "en" ? " of " : " von ",
                    size: 16,
                    color: theme.accent,
                  }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES] }),
                  new TextRun({ text: " | ", size: 16, color: theme.accent }),
                  new TextRun({
                    text: language === "en" ? "Last updated: " : "Letztes Update: ",
                    size: 16,
                    color: theme.accent,
                  }),
                  new TextRun({
                    text: new Date().toLocaleDateString(language === "en" ? "en-US" : "de-DE", {
                      year: "numeric",
                      month: "long",
                    }),
                    size: 16,
                    color: theme.accent,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Table({
            width: { size: 100, type: "pct" },
            rows: [
              new TableRow({
                children: [
                  // Sidebar-Spalte
                  new TableCell({
                    width: { size: 1600, type: "dxa" },
                    shading: { fill: theme.sidebarBg },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [
                      // Foto
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [profileImg],
                      }),
                      // Kontakt-Überschrift
                      new Paragraph({
                        spacing: { after: 200 },
                        children: [
                          new TextRun({
                            text: t({ en: "Reach me at", de: "Kontakt" }),
                            bold: true,
                            size: 18,
                            font: "Space Grotesk",
                            color: theme.sidebarText,
                          }),
                        ],
                      }),
                      // Kontaktzeilen
                      ...[
                        ["Email", contact.cvemail],
                        ["Phone", contact.phone],
                        ["Homepage", contact.homepage],
                        ["LinkedIn", contact.socialLinks.linkedin],
                        ["Xing", contact.socialLinks.xing],
                        ["Birthday", contact.birthday],
                        ["Address", `${t(imprint.address.street)}, ${t(imprint.address.city)}`],
                      ].map(
                        ([label, value]) =>
                          new Paragraph({
                            spacing: { after: 100 },
                            children: [
                              new TextRun({
                                text: `${label}: `,
                                size: 18,
                                bold: true,
                                color: theme.sidebarText,
                              }),
                              new TextRun({ text: value, size: 18, color: theme.sidebarText }),
                            ],
                          }),
                      ),
                      // Languages im Sidebar
                      new Paragraph({ text: "" }),
                      new Paragraph({
                        spacing: { after: 100 },
                        children: [
                          new TextRun({
                            text: t({ en: "Languages", de: "Sprachen" }),
                            bold: true,
                            size: 18,
                            font: "Space Grotesk",
                            color: theme.sidebarText,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: languagesChildren,
                      }),
                    ],
                  }),

                  // Hauptbereich
                  new TableCell({
                    width: { size: 8400, type: "dxa" },
                    children: [
                      new Paragraph({
                        spacing: { after: 100 },
                        children: [
                          new TextRun({
                            text: hero.name,
                            bold: true,
                            size: 44,
                            font: "Space Grotesk",
                            color: theme.foreground,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: t(hero.description),
                            size: 18,
                            color: theme.primary,
                          }),
                        ],
                        spacing: { after: 200 },
                      }),

                      // Profil
                      new Paragraph({
                        text: t({ en: "Profile", de: "Profil" }),
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: t(about.paragraphs[0]), size: 18 })],
                        spacing: { after: 100 },
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: t(about.paragraphs[1]), size: 18 })],
                        spacing: { after: 200 },
                      }),

                      // Erfahrung
                      ...experienceSectionParagraphs,

                      // Skills
                      new Paragraph({
                        text: t(skillsSection.title),
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                      }),
                      ...Object.entries(skillsByCategory)
                        .filter(([cat]) => cat !== "languages")
                        .flatMap(([cat, catSkills]) => [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: t(skillsSection.categories[cat as keyof typeof skillsSection.categories]),
                                bold: true,
                                size: 20,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: catSkills
                              .filter((s) => s.level >= 4)
                              .slice(0, 10)
                              .flatMap((s, idx) => {
                                const runs: TextRun[] = [
                                  new TextRun({ text: t(s.name), size: 18, color: theme.primary }),
                                ];
                                if (idx < catSkills.filter((s) => s.level >= 4).slice(0, 10).length - 1) {
                                  runs.push(new TextRun({ text: ", ", size: 18, color: theme.primary }));
                                }
                                return runs;
                              }),
                          }),
                        ]),

                      // Featured Projects
                      new Paragraph({
                        text: t(content.projectsSectionTitle),
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                      }),
                      ...content.projects
                        .map((project) => [
                          new Paragraph({
                            children: [new TextRun({ text: t(project.title), bold: true, size: 20 })],
                          }),
                          new Paragraph({
                            children: [new TextRun({ text: t(project.description), size: 18 })],
                            spacing: { after: 100 },
                          }),
                          new Paragraph({ text: "" }),
                        ])
                        .flat(),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Erzeuge Browser-Blob direkt mit Packer.toBlob
  const buffer = await Packer.toBuffer(doc);
  return buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
}
