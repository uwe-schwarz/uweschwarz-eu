
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link
} from "@react-pdf/renderer";
import { siteContent } from "@/content/content";

// Register fonts - adjust with actual fonts if needed
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ],
});

Font.register({
  family: "Space Grotesk",
  fonts: [
    { src: "https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2", fontWeight: 700 },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "white",
    fontFamily: "Inter",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottom: "1 solid #9b87f5",
    paddingBottom: 10,
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  name: {
    fontFamily: "Space Grotesk",
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
    color: "#1A1F2C",
  },
  title: {
    fontSize: 14,
    color: "#6E59A5",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Space Grotesk",
    fontSize: 16,
    marginBottom: 10,
    color: "#7E69AB",
    borderBottom: "1 solid #D6BCFA",
    paddingBottom: 3,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
    color: "#555",
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  companyName: {
    fontWeight: 700,
    fontSize: 12,
    color: "#1A1F2C",
  },
  jobTitle: {
    fontSize: 12,
    marginBottom: 2,
    color: "#1A1F2C",
  },
  period: {
    fontSize: 10,
    color: "#8E9196",
  },
  location: {
    fontSize: 10,
    color: "#8E9196",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
    color: "#555",
  },
  descriptionList: {
    marginLeft: 10,
  },
  descriptionItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.5,
  },
  achievementItem: {
    fontSize: 10,
    marginBottom: 3,
    fontWeight: 700,
    color: "#6E59A5",
    lineHeight: 1.5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tag: {
    fontSize: 8,
    backgroundColor: "#F1F0FB",
    color: "#6E59A5",
    padding: "3 6",
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 5,
    color: "#7E69AB",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#F1F0FB",
    color: "#1A1F2C",
    padding: "3 6",
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 9,
    color: "#8E9196",
    textAlign: "center",
    borderTop: "1 solid #D6BCFA",
    paddingTop: 10,
  },
  link: {
    color: "#6E59A5",
    textDecoration: "none",
  },
  twoColumns: {
    flexDirection: "row",
    marginBottom: 10,
  },
  columnLeft: {
    width: "60%",
    paddingRight: 10,
  },
  columnRight: {
    width: "40%",
  },
});

interface ResumeDocumentProps {
  language: "en" | "de";
}

const ResumeDocument: React.FC<ResumeDocumentProps> = ({ language }) => {
  const { about, experiences, skills, skillsSection, contact, footer } = siteContent;
  
  // Helper function to get text in the current language
  const t = (text: { en: string; de: string }) => text[language];

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Assuming the format is "Month Year - Present/Month Year"
    const aEndsWith = t(a.period).endsWith(language === 'en' ? 'Present' : 'Heute');
    const bEndsWith = t(b.period).endsWith(language === 'en' ? 'Present' : 'Heute');
    
    if (aEndsWith && !bEndsWith) return -1;
    if (!aEndsWith && bEndsWith) return 1;
    
    return 0;
  });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>Uwe Schwarz</Text>
            <Text style={styles.title}>
              {t(about.paragraphs[0]).split('.')[0]}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.contactInfo}>{contact.email}</Text>
            <Text style={styles.contactInfo}>{contact.phone}</Text>
            <Text style={styles.contactInfo}>
              {t(siteContent.imprint.address.street)}
            </Text>
            <Text style={styles.contactInfo}>
              {t(siteContent.imprint.address.city)}, {t(siteContent.imprint.address.country)}
            </Text>
          </View>
        </View>

        {/* Profile Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t({ en: "Profile", de: "Profil" })}</Text>
          <Text style={styles.description}>{t(about.paragraphs[0])}</Text>
          <Text style={styles.description}>{t(about.paragraphs[1])}</Text>
        </View>

        {/* Main Content - Two columns layout */}
        <View style={styles.twoColumns}>
          {/* Left Column - Experience */}
          <View style={styles.columnLeft}>
            <Text style={styles.sectionTitle}>{t(siteContent.experienceSectionTitle)}</Text>
            {sortedExperiences.slice(0, 3).map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{t(exp.title)}</Text>
                <View style={styles.experienceHeader}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.period}>{t(exp.period)}</Text>
                </View>
                <Text style={styles.location}>{exp.location}</Text>
                
                <View style={styles.descriptionList}>
                  {exp.description.map((item, idx) => (
                    item.type === 'text' ? (
                      <Text key={idx} style={styles.descriptionItem}>• {t(item.text)}</Text>
                    ) : (
                      <Text key={idx} style={styles.achievementItem}>
                        • {t(siteContent.experienceAchievementPrefix)} {t(item.text)}
                      </Text>
                    )
                  ))}
                </View>
                
                <View style={styles.tagContainer}>
                  {exp.tags.slice(0, 5).map((tag, tagIndex) => (
                    <Text key={tagIndex} style={styles.tag}>{t(tag)}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Right Column - Skills */}
          <View style={styles.columnRight}>
            <Text style={styles.sectionTitle}>{t(skillsSection.title)}</Text>
            
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <View key={category} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>
                  {t(skillsSection.categories[category as keyof typeof skillsSection.categories])}
                </Text>
                <View style={styles.skillContainer}>
                  {categorySkills
                    .filter(skill => skill.level >= 4) // Only include high-level skills
                    .slice(0, 10) // Limit number of skills per category
                    .map((skill, index) => (
                      <Text key={index} style={styles.skill}>{skill.name}</Text>
                    ))}
                </View>
              </View>
            ))}

            {/* Projects Section */}
            <Text style={styles.sectionTitle}>{t(siteContent.projectsSectionTitle)}</Text>
            {siteContent.projects.slice(0, 2).map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{t(project.title)}</Text>
                <Text style={styles.description}>{t(project.description)}</Text>
                <View style={styles.tagContainer}>
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Text key={tagIndex} style={styles.tag}>{t(tag)}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {t(footer.copyright).replace('year', new Date().getFullYear().toString())} | 
            {language === 'en' ? ' Last updated: ' : ' Letztes Update: '}
            {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
