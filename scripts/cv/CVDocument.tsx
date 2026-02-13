import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link,
  Svg,
  Path,
  Line,
  Rect,
  G,
} from "@react-pdf/renderer";
import { siteContent as defaultSiteContent, SiteContent } from "../../src/content/content";

const resolveFontSource = (relativePath: string) => {
  const url = new URL(relativePath, import.meta.url);
  if (typeof window === "undefined") {
    return decodeURIComponent(url.pathname);
  }
  return url.href;
};

const publicSansRegular = resolveFontSource("../fonts/PublicSans-Regular.ttf");
const publicSansBold = resolveFontSource("../fonts/PublicSans-Bold.ttf");
const spaceGroteskBold = resolveFontSource("../fonts/SpaceGrotesk-Bold.ttf");

// Register fonts - adjust with actual fonts if needed
Font.register({
  family: "Public Sans",
  fonts: [
    { fontWeight: 400, src: publicSansRegular },
    { fontWeight: 700, src: publicSansBold },
  ],
});

Font.register({
  family: "Space Grotesk",
  fonts: [{ fontWeight: 700, src: spaceGroteskBold }],
});

// Light theme color palette from index.css
const theme = {
  accent: "#3a2366", // hsl(262, 61%, 26%)
  background: "#e6e9f3", // hsl(225, 25%, 88%)
  foreground: "#07090b", // hsl(210, 40%, 2%)
  //  secondary: "#dbe3ef",  // hsl(217.2, 32.6%, 82.5%)
  //  muted: "#dbe3ef",
  //  border: "#dbe3ef",
  icon: "#fff",
  primary: "#1b6e5a", // hsl(153, 65%, 35%)
  sectionLine: "#dbe3ef",
  sectionTitle: "#3a2366",
  sidebarBg: "#1b6e5a",
  sidebarFooterText: "#aaaaaa",
  sidebarText: "#fff",
  tagBg: "#f1f0fb",
  tagText: "#3a2366",
};

// Icon components for PDF (simple SVGs)
const PhoneIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"
      fill={theme.icon}
    />
  </Svg>
);
const MailIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    <Path d="M4 4h16v16H4z" fill="none" />
    <Path
      d="M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2zm-2 0l-8 7-8-7"
      fill="none"
      stroke={theme.icon}
      strokeWidth={1.5}
    />
  </Svg>
);
const MapIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    <Path d="M21 10.5c0 7.5-9 12-9 12s-9-4.5-9-12a9 9 0 0 1 18 0z" fill="none" stroke={theme.icon} strokeWidth={1.5} />
    <Path d="M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="none" stroke={theme.icon} strokeWidth={1.5} />
  </Svg>
);
const CalendarIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    {/* Kalender-Icon */}
    <Rect fill="none" height={16} rx={2} stroke={theme.icon} strokeWidth={1.5} width={18} x={3} y={5} />
    <Line stroke={theme.icon} strokeWidth={1.5} x1={3} x2={21} y1={9} y2={9} />
    <Line stroke={theme.icon} strokeWidth={1.5} x1={7} x2={7} y1={3} y2={7} />
    <Line stroke={theme.icon} strokeWidth={1.5} x1={17} x2={17} y1={3} y2={7} />
    {/* Kleine Kästchen für Tage */}
    <Rect fill={theme.icon} height={2} width={2} x={6} y={12} />
    <Rect fill={theme.icon} height={2} width={2} x={10} y={12} />
    <Rect fill={theme.icon} height={2} width={2} x={14} y={12} />
    <Rect fill={theme.icon} height={2} width={2} x={6} y={16} />
    <Rect fill={theme.icon} height={2} width={2} x={10} y={16} />
    <Rect fill={theme.icon} height={2} width={2} x={14} y={16} />
  </Svg>
);
const LinkedInIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    {/* LinkedIn Icon */}
    <Path
      d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
      fill={theme.icon}
    ></Path>
  </Svg>
);
const XingIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    {/* Xing Icon */}
    <Path
      d="M 18.191406 0 C 17.671875 0 17.449219 0.328125 17.265625 0.660156 L 9.5625 14.316406 L 14.480469 23.339844 C 14.652344 23.648438 14.914062 24 15.445312 24 L 18.90625 24 C 19.113281 24 19.28125 23.921875 19.363281 23.773438 C 19.457031 23.625 19.453125 23.433594 19.355469 23.238281 L 14.476562 14.328125 C 14.472656 14.320312 14.472656 14.3125 14.476562 14.304688 L 22.140625 0.753906 C 22.238281 0.5625 22.238281 0.367188 22.148438 0.222656 C 22.058594 0.078125 21.894531 0 21.6875 0 Z M 18.191406 0"
      fill={theme.icon}
    />
    <Path
      d="M 3.648438 4.734375 C 3.4375 4.734375 3.273438 4.8125 3.1875 4.957031 C 3.09375 5.105469 3.097656 5.300781 3.195312 5.492188 L 5.550781 9.53125 L 1.863281 16.050781 C 1.765625 16.242188 1.765625 16.4375 1.855469 16.585938 C 1.945312 16.726562 2.109375 16.808594 2.316406 16.808594 L 5.785156 16.808594 C 6.304688 16.808594 6.539062 16.464844 6.714844 16.148438 L 10.464844 9.542969 C 10.449219 9.519531 8.074219 5.394531 8.074219 5.394531 C 7.902344 5.089844 7.640625 4.734375 7.109375 4.734375 Z M 3.648438 4.734375"
      fill={theme.icon}
    />
  </Svg>
);
const SpeechIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    {/* Speech Bubble Icon */}
    <G fill={theme.icon} stroke="none" transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)">
      <Path d="M31 184 c-34 -28 -42 -73 -16 -94 8 -6 13 -22 12 -33 -2 -17 2 -21 18 -18 35 7 129 5 154 -4 20 -7 22 -5 17 12 -4 12 -1 25 9 33 16 13 19 37 9 65 -8 21 -107 65 -144 65 -16 0 -42 -12 -59 -26z m104 -6 c47 -21 42 -79 -10 -98 -40 -15 -77 -21 -71 -12 3 5 -3 17 -14 27 -27 25 -25 50 6 74 30 24 52 26 89 9z m77 -25 c23 -20 23 -34 0 -76 -15 -29 -19 -31 -40 -21 l-22 11 21 19 c15 13 20 28 17 51 -5 38 -2 39 24 16z"></Path>
      <Path d="M83 143 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" fill={theme.icon}></Path>
      <Path d="M83 113 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" fill={theme.icon}></Path>
    </G>
  </Svg>
);
const WebIcon = () => (
  <Svg height={12} viewBox="0 0 24 24" width={12}>
    <Path
      d="M4 8h16m-7.5 12H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7M8 4v4m8 14l5-5m0 4.5V17h-4.5"
      fill="none"
      stroke={theme.icon}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </Svg>
);
const EmptyIcon = () => <Svg height={12} viewBox="0 0 24 24" width={12}></Svg>;

// Define styles
const styles = StyleSheet.create({
  achievementItem: {
    color: theme.primary,
    fontSize: 9,
    fontWeight: 700,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  companyName: {
    color: theme.primary,
    fontSize: 10,
    fontWeight: 700,
  },
  description: {
    color: theme.foreground,
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  descriptionItem: {
    color: theme.foreground,
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  descriptionList: {
    marginLeft: 8,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experienceItem: {
    marginBottom: 10,
  },
  footer: {
    bottom: 18,
    color: theme.sidebarFooterText,
    fontSize: 8,
    left: -75,
    paddingTop: 7,
    position: "absolute",
    textAlign: "center",
    width: 150,
  },
  groupNote: {
    color: theme.accent,
    fontSize: 8,
    marginBottom: 8,
  },
  groupSubtitle: {
    color: theme.primary,
    fontSize: 9,
    marginBottom: 4,
  },
  heroDescription: {
    color: theme.primary,
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  jobTitle: {
    color: theme.foreground,
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 1,
  },
  location: {
    color: theme.accent,
    fontSize: 9,
    marginBottom: 2,
  },
  main: {
    backgroundColor: theme.background,
    flex: 1,
    marginLeft: 160,
    minHeight: "100%",
    padding: "12 30 30 30",
  },
  name: {
    color: theme.foreground,
    fontFamily: "Space Grotesk",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  page: {
    backgroundColor: theme.background,
    flexDirection: "row",
    fontFamily: "Public Sans",
    minHeight: "100%",
    paddingBottom: 0,
    paddingTop: 24,
  },
  period: {
    color: theme.accent,
    fontSize: 9,
  },
  photo: {
    border: `2 solid ${theme.accent}`,
    borderRadius: 45,
    height: 80,
    marginBottom: 16,
    objectFit: "cover",
    width: 80,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    borderBottom: `1 solid ${theme.sectionLine}`,
    color: theme.sectionTitle,
    fontFamily: "Space Grotesk",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 4,
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  sidebar: {
    alignItems: "center",
    backgroundColor: theme.sidebarBg,
    bottom: 0,
    color: theme.sidebarText,
    height: "110%",
    left: 0,
    minHeight: "100%",
    padding: 10,
    position: "absolute",
    top: 0,
    width: 160,
  },
  sidebarContactRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 7,
  },
  sidebarContactText: {
    color: theme.sidebarText,
    fontSize: 9,
    marginLeft: 3,
    wordBreak: "break-all",
  },
  sidebarLocation: {
    color: theme.sidebarText,
    fontSize: 9,
    marginBottom: 2,
    marginLeft: 5,
  },
  sidebarSection: {
    alignItems: "flex-start",
    marginBottom: 18,
    width: "100%",
  },
  sidebarSkill: {
    backgroundColor: theme.sidebarBg,
    borderRadius: 3,
    color: theme.sidebarText,
    fontSize: 8.5,
    marginBottom: 3,
    marginRight: 4,
    padding: "2 6",
  },
  sidebarTitle: {
    color: theme.sidebarText,
    fontFamily: "Space Grotesk",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  skill: {
    backgroundColor: theme.tagBg,
    borderRadius: 3,
    color: theme.primary,
    fontSize: 8.5,
    marginBottom: 3,
    marginRight: 4,
    padding: "2 6",
  },
  skillCategory: {
    marginBottom: 7,
  },
  skillCategoryTitle: {
    color: theme.sectionTitle,
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 2,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: theme.tagBg,
    borderRadius: 3,
    color: theme.tagText,
    fontSize: 8,
    marginBottom: 3,
    marginRight: 4,
    padding: "2 6",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  title: {
    color: theme.primary,
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 12,
  },
});

interface CVDocumentProps {
  data?: SiteContent; // Allow custom data to be passed in
  language: "en" | "de";
  profileImageSrc?: string | Uint8Array | ArrayBuffer; // Override profile image source when available
}

const bytesToBase64 = (bytes: Uint8Array) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCodePoint(byte);
  }

  return btoa(binary);
};

const resolveProfileImageSource = (profileImageSrc?: string | Uint8Array | ArrayBuffer) => {
  const source = profileImageSrc ?? "/profile.jpg";

  if (typeof source === "string") {
    return source;
  }

  const bytes = ArrayBuffer.isView(source)
    ? new Uint8Array(source.buffer, source.byteOffset, source.byteLength)
    : new Uint8Array(source);

  if (bytes.byteLength === 0) {
    throw new TypeError("profileImageSrc binary data is empty.");
  }

  return `data:image/jpeg;base64,${bytesToBase64(bytes)}`;
};

const CVDocument: React.FC<CVDocumentProps> = ({ data, language, profileImageSrc }) => {
  // Use passed data or fallback to siteContent
  const content = data || defaultSiteContent;
  const { about, contact, experiences, footer, hero, imprint, skills, skillsSection } = content;
  const profileImage = resolveProfileImageSource(profileImageSrc);

  // Helper function to get text in the current language
  const t = (text: { de: string; en: string }) => text[language];

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Assuming the format is "Month Year - Present/Month Year"
    const aEndsWith = t(a.period).endsWith(language === "en" ? "Present" : "Heute");
    const bEndsWith = t(b.period).endsWith(language === "en" ? "Present" : "Heute");

    if (aEndsWith && !bEndsWith) {
      return -1;
    }
    if (!aEndsWith && bEndsWith) {
      return 1;
    }

    return 0;
  });

  const majorExperiences = sortedExperiences.filter((exp) => exp.projectScale !== "small");
  const smallExperiences = sortedExperiences.filter((exp) => exp.projectScale === "small");

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>,
  );

  const renderExperienceEntries = (items: SiteContent["experiences"]) =>
    items.map((exp, index) => (
      <View key={`${exp.company}-${index}`} style={styles.experienceItem} wrap={false}>
        <Text style={styles.jobTitle}>{t(exp.title)}</Text>
        <View style={styles.experienceHeader}>
          <Text style={styles.companyName}>{exp.company}</Text>
          <Text style={styles.period}>{t(exp.period)}</Text>
        </View>
        <Text style={styles.location}>{t(exp.location)}</Text>

        <View style={styles.descriptionList}>
          {exp.description.map((item, idx) =>
            item.type === "text" ? (
              <Text key={idx} style={styles.descriptionItem}>
                • {t(item.text)}
              </Text>
            ) : (
              <Text key={idx} style={styles.achievementItem}>
                • {t(content.experienceAchievementPrefix)} {t(item.text)}
              </Text>
            ),
          )}
        </View>

        <View style={styles.tagContainer}>
          {exp.tags.map((tag, tagIndex) => (
            <Text key={tagIndex} style={styles.tag}>
              {t(tag)}
            </Text>
          ))}
        </View>
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View fixed style={styles.sidebar} />
        <View style={styles.sidebar}>
          {/* Photo */}
          <Image src={profileImage} style={styles.photo} />
          {/* Contact Info */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{language === "en" ? "Reach me at" : "Kontakt"}</Text>
            <View style={styles.sidebarContactRow}>
              <MailIcon />
              <Link href={`mailto:${contact.cvemail}`} style={styles.sidebarContactText}>
                {contact.cvemail}
              </Link>
            </View>
            <View style={styles.sidebarContactRow}>
              <PhoneIcon />
              <Link href={`tel:${contact.phone}`} style={styles.sidebarContactText}>
                {contact.phone}
              </Link>
            </View>
            <View style={styles.sidebarContactRow}>
              <WebIcon />
              <Link href={contact.homepage ?? ""} style={styles.sidebarContactText}>
                {contact.homepage?.replace("https://", "")}
              </Link>
            </View>
            <View style={styles.sidebarContactRow}>
              <LinkedInIcon />
              <Link href={contact.socialLinks.linkedin} style={styles.sidebarContactText}>
                {contact.socialLinks.linkedin?.replace("https://www.linkedin.com/in", "")}
              </Link>
            </View>
            <View style={styles.sidebarContactRow}>
              <XingIcon />
              <Link href={contact.socialLinks.xing} style={styles.sidebarContactText}>
                {contact.socialLinks.xing?.replace("https://www.xing.com/profile", "")}
              </Link>
            </View>
            <View style={styles.sidebarContactRow}>
              <CalendarIcon />
              <Text style={styles.sidebarContactText}>{contact.birthday}</Text>
            </View>
            <View style={styles.sidebarContactRow}>
              <MapIcon />
              <Text style={styles.sidebarContactText}>{t(imprint.address.street)}</Text>
            </View>
            <View style={styles.sidebarContactRow}>
              <EmptyIcon />
              <Text style={styles.sidebarContactText}>{t(imprint.address.city)}</Text>
            </View>
          </View>

          {/* Languages */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{language === "en" ? "Languages" : "Sprachen"}</Text>
            {skillsByCategory.languages && (
              <View style={styles.skillContainer}>
                {skillsByCategory.languages.map((skill, index) => (
                  <View key={index} style={styles.skillContainer}>
                    <SpeechIcon />
                    <Text style={styles.sidebarSkill}>{t(skill.name)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Name & Title */}
          <Text style={styles.name}>{hero.name}</Text>
          <Text style={styles.heroDescription}>{t(hero.description)}</Text>
          {/* Profile Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t({ de: "Profil", en: "Profile" })}</Text>
            <Text style={styles.description}>{t(about.paragraphs[0])}</Text>
            <Text style={styles.description}>{t(about.paragraphs[1])}</Text>
          </View>
          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t(content.experienceSectionTitle)}</Text>
            {majorExperiences.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.skillCategoryTitle}>{t(content.experienceBigProjectsTitle)}</Text>
                <Text style={styles.groupSubtitle}>{t(content.experienceBigProjectsSubtitle)}</Text>
                <Text style={styles.groupNote}>{t(content.experienceBigProjectsNote)}</Text>
                {renderExperienceEntries(majorExperiences)}
              </View>
            )}
            {smallExperiences.length > 0 && (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.skillCategoryTitle}>{t(content.experienceSmallProjectsTitle)}</Text>
                <Text style={styles.groupSubtitle}>{t(content.experienceSmallProjectsSubtitle)}</Text>
                <Text style={styles.groupNote}>{t(content.experienceSmallProjectsNote)}</Text>
                {renderExperienceEntries(smallExperiences)}
              </View>
            )}
          </View>
          {/* Skills */}
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t(skillsSection.title)}</Text>
            {Object.entries(skillsByCategory)
              .filter(([category]) => category !== "languages")
              .map(([category, categorySkills]) => (
                <View key={category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    {t(skillsSection.categories[category as keyof typeof skillsSection.categories])}
                  </Text>
                  <View style={styles.skillContainer}>
                    {(categorySkills as typeof skills)
                      .filter((skill) => skill.level >= 4) // Only include high-level skills
                      .slice(0, 10) // Limit number of skills per category
                      .map((skill, index) => (
                        <Text key={index} style={styles.skill}>
                          {t(skill.name)}
                        </Text>
                      ))}
                  </View>
                </View>
              ))}
          </View>
          {/* Projects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t(content.projectsSectionTitle)}</Text>
            {content.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <Text style={styles.jobTitle}>{t(project.title)}</Text>
                <Text style={styles.description}>{t(project.description)}</Text>
                <View style={styles.tagContainer}>
                  {project.tags.slice(0, 5).map((tag, tagIndex) => (
                    <Text key={tagIndex} style={styles.tag}>
                      {t(tag)}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {/* Footer */}
          <View fixed style={styles.footer}>
            <Text
              render={({ pageNumber, totalPages }) => {
                const pageLabel = language === "en" ? "Page" : "Seite";
                const pageNumberLabel = language === "en" ? "of" : "von";
                const updateLabel = language === "en" ? "Last updated" : "Letztes Update";
                const locale = language === "en" ? "en-US" : "de-DE";
                const date = new Date().toLocaleDateString(locale, {
                  month: "long",
                  year: "numeric",
                });

                return `${pageLabel} ${pageNumber} ${pageNumberLabel} ${totalPages}\n${updateLabel}: ${date}`;
              }}
              style={styles.footer}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
