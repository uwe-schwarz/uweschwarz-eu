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
    AlignmentType,
    HeadingLevel,
    BorderStyle,
  } from "docx";
  
  // Define your theme colors (hex without #)
  const theme = {
    background: "FFFFFF",
    sidebarBg: "2E2E2E",
    sidebarText: "FFFFFF",
    accent: "FF5722",
    primary: "1976D2",
    sectionTitle: "424242",
    sectionLine: "BDBDBD",
    tagBg: "E0E0E0",
    tagText: "424242",
    foreground: "212121",
  };
  
  /**
   * Hilfsfunktion, um ein Bild vom Server als ArrayBuffer zu holen
   * @param {string} url URL des Bildes
   * @returns {Promise<Uint8Array>}
   */
  async function fetchImageBuffer(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }
  
  /**
   * Generiert ein Word-Dokument im Browser (als Blob).
   * @param {{ language: 'en'|'de'; data?: any }} options
   * @returns {Promise<Blob>} erzeugtes .docx als Blob
   */
  export async function generateCvDocx({ language, data }) {
    const profileImage = await fetchImageBuffer('/profile.jpg');
  
    const content = data || window.siteContent; // content aus globalem Objekt oder prop
    const { about, experiences, skills, skillsSection, contact, footer, hero, imprint } = content;
  
    // Übersetzungs-Helper
    const t = (obj) => obj[language] || "";
  
    // Erfahrungen sortieren (Present/Heute zuerst)
    const sortedExperiences = [...experiences].sort((a, b) => {
      const aPresent = t(a.period).match(/(?:Present|Heute)$/);
      const bPresent = t(b.period).match(/(?:Present|Heute)$/);
      if (aPresent && !bPresent) return -1;
      if (!aPresent && bPresent) return 1;
      return 0;
    });
  
    // Skills gruppieren
    const skillsByCategory = {};
    skills.forEach((s) => {
      if (!skillsByCategory[s.category]) skillsByCategory[s.category] = [];
      skillsByCategory[s.category].push(s);
    });
  
    // 1) Make the document instance (provide an empty sections array so options is defined)
    const doc = new Document({ sections: [] });
  
    // 2) Attach the image via ImageRun
    const profileImg = new ImageRun({ data: profileImage, transformation: { width: 80, height: 80 } });
  
    // 3) Build your sections _afterwards_, using the `profileImg` you just created
    doc.addSection({
      properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: language === 'en' ? 'Page ' : 'Seite ', size: 16, color: theme.accent }),
                new TextRun({ children: ['{PAGE}'] }),
                new TextRun({ text: language === 'en' ? ' of ' : ' von ', size: 16, color: theme.accent }),
                new TextRun({ children: ['{NUMPAGES}'] }),
                new TextRun({ text: ' | ', size: 16, color: theme.accent }),
                new TextRun({ text: language === 'en' ? 'Last updated: ' : 'Letztes Update: ', size: 16, color: theme.accent }),
                new TextRun({ text: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'de-DE', { year: 'numeric', month: 'long' }), size: 16, color: theme.accent }),
              ],
            }),
          ],
        }),
      },
      children: [
        new Table({
          width: { size: 100, type: 'pct' },
          rows: [
            new TableRow({
              children: [
                // Sidebar-Spalte
                new TableCell({
                  width: { size: 1500, type: "dxa" },
                  shading: { fill: theme.sidebarBg },
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  children: [
                    // Foto
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [profileImg],
                    }),
                    // Kontakt-Überschrift
                    new Paragraph({
                      spacing: { after: 200 },
                      children: [new TextRun({ text: t({ en: 'Reach me at', de: 'Kontakt' }), bold: true, size: 18, font: 'Space Grotesk', color: theme.sidebarText })],
                    }),
                    // Kontaktzeilen
                    ...[
                      ['Email', contact.cvemail],
                      ['Phone', contact.phone],
                      ['LinkedIn', contact.socialLinks.linkedin],
                      ['Xing', contact.socialLinks.xing],
                      ['Birthday', contact.birthday],
                      ['Address', `${t(imprint.address.street)}, ${t(imprint.address.city)}`],
                    ].map(([label, value]) =>
                      new Paragraph({
                        spacing: { after: 100 },
                        children: [
                          new TextRun({ text: `${label}: `, size: 18, bold: true, color: theme.sidebarText }),
                          new TextRun({ text: value, size: 18, color: theme.sidebarText }),
                        ],
                      })
                    ),
                    // Skills im Sidebar
                    new Paragraph({ text: '' }),
                    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: t(skillsSection.title), bold: true, size: 18, font: 'Space Grotesk', color: theme.sidebarText })] }),
                    ...Object.entries(skillsByCategory).flatMap(([cat, catSkills]) => [
                      new Paragraph({ spacing: { before: 100, after: 50 }, children: [new TextRun({ text: t(skillsSection.categories[cat]), bold: true, size: 16, color: theme.sidebarText })] }),
                      new Paragraph({ children: catSkills.filter(s => s.level >= 4).slice(0, 10).flatMap((s, idx) => [
                        new TextRun({ text: s.name, size: 16, color: theme.sidebarText }),
                        idx < catSkills.length - 1 ? new TextRun({ text: ", ", size: 16, color: theme.sidebarText }) : null,
                      ]).filter(Boolean) }),
                    ]),
                  ],
                }),
  
                // Hauptbereich
                new TableCell({
                  width: { size: 8500, type: "dxa" },
                  children: [
                    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: hero.name, bold: true, size: 44, font: 'Space Grotesk', color: theme.foreground })] }),
                    new Paragraph({ text: t(hero.description), size: 18, color: theme.primary, spacing: { after: 200 } }),
  
                    // Profil
                    new Paragraph({ text: t({ en: 'Profile', de: 'Profil' }), heading: HeadingLevel.HEADING_2, thematicBreak: true }),
                    new Paragraph({ text: t(about.paragraphs[0]), size: 18, spacing: { after: 100 } }),
                    new Paragraph({ text: t(about.paragraphs[1]), size: 18, spacing: { after: 200 } }),
  
                    // Erfahrung
                    new Paragraph({ text: t(content.experienceSectionTitle), heading: HeadingLevel.HEADING_2, thematicBreak: true }),
                    ...sortedExperiences.map(exp => [
                      new Paragraph({ text: t(exp.title), bold: true, size: 20 }),
                      new Paragraph({ children: [
                        new TextRun({ text: exp.company, italic: true, size: 18, color: theme.primary }),
                        new TextRun({ text: ` — ${t(exp.period)}`, size: 18, color: theme.accent }),
                      ]}),
                      new Paragraph({ text: exp.location, size: 18, color: theme.accent, spacing: { after: 100 } }),
                      ...exp.description.map(item => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: t(item.text), size: 18, color: item.type === 'achievement' ? theme.primary : theme.foreground, bold: item.type === 'achievement' })] })),
                      new Paragraph({ text: '' }),
                    ]).flat(),
  
                    // Skills
                    new Paragraph({ text: t(skillsSection.title), heading: HeadingLevel.HEADING_2, thematicBreak: true }),
                    ...Object.entries(skillsByCategory).flatMap(([cat, catSkills]) => [
                      new Paragraph({ text: t(skillsSection.categories[cat]), bold: true, size: 20 }),
                      new Paragraph({ children: catSkills.filter(s => s.level >= 4).slice(0, 10).flatMap((s, idx) => [
                        new TextRun({ text: s.name, size: 18, color: theme.primary }),
                        idx < catSkills.length - 1 ? new TextRun({ text: ", ", size: 18, color: theme.primary }) : null,
                      ]).filter(Boolean) }),
                    ]),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  
    // Erzeuge Browser-Blob direkt mit Packer.toBlob
    return await Packer.toBlob(doc);
  }
  