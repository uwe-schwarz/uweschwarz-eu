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
import type { Experience, LocalizedString, SiteContent, Skill } from "@/content/content";

// Define your theme colors (hex without #)
const theme = {
  accent: "3A2366",
  background: "E6E9F3",
  foreground: "07090B",
  primary: "1B6E5A",
  sectionLine: "DBE3EF",
  sectionTitle: "3A2366",
  sidebarBg: "1B6E5A",
  sidebarText: "FFFFFF",
  tagBg: "F1F0FB",
  tagText: "3A2366",
};

/**
 * Generiert ein Word-Dokument als Buffer für Node- und Browser-Umgebungen.
 */
export async function generateCvDocx({
  data,
  language,
  profileImage,
}: {
  data: SiteContent;
  language: "en" | "de";
  profileImage: Uint8Array | ArrayBuffer;
}): Promise<Uint8Array> {
  const profileImageBytes = ArrayBuffer.isView(profileImage)
    ? new Uint8Array(profileImage.buffer, profileImage.byteOffset, profileImage.byteLength)
    : new Uint8Array(profileImage);
  const content: SiteContent = data;
  const { about, contact, experiences, footer, hero, imprint, skills, skillsSection } = content;

  // Übersetzungs-Helper
  const t = (obj: LocalizedString): string => obj[language] || "";

  // Erfahrungen sortieren (Present/Heute zuerst)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aPresent = t(a.period).match(/(?:Present|Heute)$/);
    const bPresent = t(b.period).match(/(?:Present|Heute)$/);
    if (aPresent && !bPresent) {
      return -1;
    }
    if (!aPresent && bPresent) {
      return 1;
    }
    return 0;
  });

  // Skills gruppieren
  const skillsByCategory: Record<Skill["category"], Array<Skill>> = {} as Record<Skill["category"], Array<Skill>>;
  skills.forEach((s) => {
    if (!skillsByCategory[s.category]) {
      skillsByCategory[s.category] = [];
    }
    skillsByCategory[s.category].push(s);
  });

  const majorExperiences = sortedExperiences.filter((exp) => exp.projectScale !== "small");
  const smallExperiences = sortedExperiences.filter((exp) => exp.projectScale === "small");

  const createExperienceParagraphs = (exp: Experience): Array<Paragraph> => [
    new Paragraph({ children: [new TextRun({ bold: true, size: 20, text: t(exp.title) })] }),
    new Paragraph({
      children: [
        new TextRun({ color: theme.primary, size: 18, text: exp.company }),
        new TextRun({ color: theme.accent, size: 18, text: ` — ${t(exp.period)}` }),
      ],
    }),
    new Paragraph({
      children: [new TextRun({ color: theme.accent, size: 18, text: t(exp.location) })],
      spacing: { after: 100 },
    }),
    ...exp.description.map(
      (item) =>
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({
              bold: item.type === "achievement",
              color: item.type === "achievement" ? theme.primary : theme.foreground,
              size: 18,
              text: item.type === "text" ? t(item.text) : `${t(content.experienceAchievementPrefix)} ${t(item.text)}`,
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
    entries: Array<Experience>,
  ): Array<Paragraph> => {
    if (!entries.length) {
      return [];
    }
    return [
      new Paragraph({
        children: [new TextRun({ bold: true, size: 20, text: t(title) })],
        spacing: { after: 50, before: 150 },
      }),
      new Paragraph({
        children: [new TextRun({ color: theme.primary, size: 18, text: t(subtitle) })],
        spacing: { after: 50 },
      }),
      new Paragraph({
        children: [new TextRun({ color: theme.accent, size: 16, text: t(note) })],
        spacing: { after: 80 },
      }),
      ...entries.flatMap(createExperienceParagraphs),
    ];
  };

  const experienceSectionParagraphs: Array<Paragraph> = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      keepLines: true,
      spacing: { after: 100 },
      text: t(content.experienceSectionTitle),
      thematicBreak: true,
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
    data: profileImageBytes,
    transformation: { height: 80, width: 80 },
    type: "jpg",
  });

  // Build the languages paragraph children
  const languagesChildren: Array<TextRun> = [];
  const languageSkills = skillsByCategory.languages || [];
  languageSkills.forEach((s, idx) => {
    languagesChildren.push(new TextRun({ color: theme.sidebarText, size: 16, text: t(s.name) }));
    if (idx < languageSkills.length - 1) {
      languagesChildren.push(new TextRun({ color: theme.sidebarText, size: 16, text: ", " }));
    }
  });

  // Create the document with sections in constructor
  const doc = new Document({
    creator: t(imprint.companyName),
    description: (language === "en" ? "CV of " : "CV von ") + t(imprint.companyName),
    sections: [
      {
        children: [
          new Table({
            rows: [
              new TableRow({
                children: [
                  // Sidebar-Spalte
                  new TableCell({
                    borders: {
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                      top: { style: BorderStyle.NONE },
                    },
                    children: [
                      // Foto
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [profileImg],
                      }),
                      // Kontakt-Überschrift
                      new Paragraph({
                        children: [
                          new TextRun({
                            bold: true,
                            color: theme.sidebarText,
                            font: "Space Grotesk",
                            size: 18,
                            text: t({ de: "Kontakt", en: "Reach me at" }),
                          }),
                        ],
                        spacing: { after: 200 },
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
                            children: [
                              new TextRun({
                                bold: true,
                                color: theme.sidebarText,
                                size: 18,
                                text: `${label}: `,
                              }),
                              new TextRun({ color: theme.sidebarText, size: 18, text: value }),
                            ],
                            spacing: { after: 100 },
                          }),
                      ),
                      // Languages im Sidebar
                      new Paragraph({ text: "" }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            bold: true,
                            color: theme.sidebarText,
                            font: "Space Grotesk",
                            size: 18,
                            text: t({ de: "Sprachen", en: "Languages" }),
                          }),
                        ],
                        spacing: { after: 100 },
                      }),
                      new Paragraph({
                        children: languagesChildren,
                      }),
                    ],
                    shading: { fill: theme.sidebarBg },
                    width: { size: 1600, type: "dxa" },
                  }),

                  // Hauptbereich
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            bold: true,
                            color: theme.foreground,
                            font: "Space Grotesk",
                            size: 44,
                            text: hero.name,
                          }),
                        ],
                        spacing: { after: 100 },
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            color: theme.primary,
                            size: 18,
                            text: t(hero.description),
                          }),
                        ],
                        spacing: { after: 200 },
                      }),

                      // Profil
                      new Paragraph({
                        heading: HeadingLevel.HEADING_2,
                        text: t({ de: "Profil", en: "Profile" }),
                        thematicBreak: true,
                      }),
                      new Paragraph({
                        children: [new TextRun({ size: 18, text: t(about.paragraphs[0]) })],
                        spacing: { after: 100 },
                      }),
                      new Paragraph({
                        children: [new TextRun({ size: 18, text: t(about.paragraphs[1]) })],
                        spacing: { after: 200 },
                      }),

                      // Erfahrung
                      ...experienceSectionParagraphs,

                      // Skills
                      new Paragraph({
                        heading: HeadingLevel.HEADING_2,
                        text: t(skillsSection.title),
                        thematicBreak: true,
                      }),
                      ...Object.entries(skillsByCategory)
                        .filter(([cat]) => cat !== "languages")
                        .flatMap(([cat, catSkills]) => [
                          new Paragraph({
                            children: [
                              new TextRun({
                                bold: true,
                                size: 20,
                                text: t(skillsSection.categories[cat as keyof typeof skillsSection.categories]),
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: catSkills
                              .filter((s) => s.level >= 4)
                              .slice(0, 10)
                              .flatMap((s, idx) => {
                                const runs: Array<TextRun> = [
                                  new TextRun({ color: theme.primary, size: 18, text: t(s.name) }),
                                ];
                                if (idx < catSkills.filter((s) => s.level >= 4).slice(0, 10).length - 1) {
                                  runs.push(new TextRun({ color: theme.primary, size: 18, text: ", " }));
                                }
                                return runs;
                              }),
                          }),
                        ]),

                      // Featured Projects
                      new Paragraph({
                        heading: HeadingLevel.HEADING_2,
                        text: t(content.projectsSectionTitle),
                        thematicBreak: true,
                      }),
                      ...content.projects.flatMap((project) => [
                        new Paragraph({
                          children: [new TextRun({ bold: true, size: 20, text: t(project.title) })],
                        }),
                        new Paragraph({
                          children: [new TextRun({ size: 18, text: t(project.description) })],
                          spacing: { after: 100 },
                        }),
                        new Paragraph({ text: "" }),
                      ]),
                    ],
                    width: { size: 8400, type: "dxa" },
                  }),
                ],
              }),
            ],
            width: { size: 100, type: "pct" },
          }),
        ],
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    color: theme.accent,
                    size: 16,
                    text: language === "en" ? "Page " : "Seite ",
                  }),
                  new TextRun({ children: [PageNumber.CURRENT] }),
                  new TextRun({
                    color: theme.accent,
                    size: 16,
                    text: language === "en" ? " of " : " von ",
                  }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES] }),
                  new TextRun({ color: theme.accent, size: 16, text: " | " }),
                  new TextRun({
                    color: theme.accent,
                    size: 16,
                    text: language === "en" ? "Last updated: " : "Letztes Update: ",
                  }),
                  new TextRun({
                    color: theme.accent,
                    size: 16,
                    text: new Date().toLocaleDateString(language === "en" ? "en-US" : "de-DE", {
                      month: "long",
                      year: "numeric",
                    }),
                  }),
                ],
              }),
            ],
          }),
        },
        properties: { page: { margin: { bottom: 720, left: 720, right: 720, top: 720 } } },
      },
    ],
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: { font: "Public Sans" },
        },
      ],
    },
    title: "CV " + t(imprint.companyName),
  });

  // Erzeuge Browser-Blob direkt mit Packer.toBlob
  const buffer = await Packer.toBuffer(doc);
  return ArrayBuffer.isView(buffer)
    ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    : new Uint8Array(buffer);
}
