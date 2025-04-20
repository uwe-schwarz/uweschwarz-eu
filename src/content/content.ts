interface LocalizedString {
  en: string;
  de: string;
}

export interface NavItem {
  label: LocalizedString;
  href: string;
}

export interface HeroSection {
  name: string;
  imageAlt: LocalizedString;
  titleElements: LocalizedString[];
  description: LocalizedString;
  ctaPrimary: LocalizedString;
  ctaSecondary: LocalizedString;
  decorativeElements: {
    position: number;
    distance: number;
    code: string;
  }[];
}

export interface AboutSection {
  title: LocalizedString;
  paragraphs: LocalizedString[];
  imageAlt: LocalizedString;
  labels: {
    experience: LocalizedString;
    projects: LocalizedString;
    technologies: LocalizedString;
  };
  stats: { key: string; value: LocalizedString }[];
}

export interface ExperienceDescriptionItem {
  type: 'text' | 'achievement';
  text: LocalizedString;
}

export interface Experience {
  title: LocalizedString;
  company: string;
  period: LocalizedString;
  location: string;
  description: ExperienceDescriptionItem[];
  tags: LocalizedString[];
  logoUrl?: string;
}

export interface Project {
  title: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  imageAlt: LocalizedString;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tools" | "ai";
  level: number;
}

export interface SkillsSection {
  title: LocalizedString;
  subtitle: LocalizedString;
  categories: {
    frontend: LocalizedString;
    backend: LocalizedString;
    tools: LocalizedString;
    ai: LocalizedString;
  };
}

export interface ContactSection {
  title: LocalizedString;
  subtitle: LocalizedString;
  emailLabel: LocalizedString;
  email: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    xing?: string;
    x?: string;
  };
  formLabels: {
    name: LocalizedString;
    email: LocalizedString;
    message: LocalizedString;
    send: LocalizedString;
  };
  formStatus: {
    sentTitle: LocalizedString;
    sentDescription: LocalizedString;
    errorTitle: LocalizedString;
    errorDescription: LocalizedString;
    sending: LocalizedString;
  };
  formPlaceholders: {
    name: LocalizedString;
    email: LocalizedString;
    message: LocalizedString;
  };
  infoTitle: LocalizedString;
  findMeOn: LocalizedString;
  infoText: LocalizedString;
}

export interface Footer {
  copyright: LocalizedString;
  links: NavItem[];
  builtWith: LocalizedString;
  lastUpdated: LocalizedString;
}

export interface ImprintSection {
  title: LocalizedString;
  contactTitle: LocalizedString;
  companyName: LocalizedString;
  representative?: LocalizedString;
  address: {
    street: LocalizedString;
    city: LocalizedString;
    country: LocalizedString;
  };
  contactInfoTitle: LocalizedString;
  emailLabel: LocalizedString;
  email: string;
  phoneLabel: LocalizedString;
  phone: string;
  legalTitle?: LocalizedString;
  vatId?: LocalizedString;
  registrationInfo?: LocalizedString;
  disclaimerTitle: LocalizedString;
  disclaimer: LocalizedString;
}

export interface PrivacySection {
  title: LocalizedString;
  sections: Array<{
    title: LocalizedString;
    paragraphs: LocalizedString[];
  }>;
}

export interface SiteContent {
  siteMetadata: {
    title: string;
    description: LocalizedString;
    author: string;
  };
  projectsSectionTitle: { en: string; de: string };
  projectsSectionMore: { en: string; de: string };
  navigation: NavItem[];
  hero: HeroSection;
  about: AboutSection;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  skillsSection: SkillsSection;
  contact: ContactSection;
  footer: Footer;
  imprint: ImprintSection;
  privacy: PrivacySection;
  translations: {
    languageSwitch: {
      en: string;
      de: string;
    };
    themeSwitch: {
      light: LocalizedString;
      dark: LocalizedString;
    };
  };
  projectsLabels: {
    demo: LocalizedString;
    code: LocalizedString;
  };
  backToHome: LocalizedString;
  experienceSectionTitle: LocalizedString;
  experienceAchievementPrefix: LocalizedString;
  moreProjects: LocalizedString;
  downloadResume: LocalizedString;
}

export const siteContent: SiteContent = {
  siteMetadata: {
    title: "Uwe Schwarz Portfolio",
    description: {
      en: "Portfolio of Uwe Schwarz: Project Manager, IT Security Expert & AI Enthusiast",
      de: "Portfolio von Uwe Schwarz: Projektmanager, IT-Sicherheitsexperte und KI-Enthusiast",
    },
    author: "Uwe Schwarz",
  },
  projectsSectionTitle: { en: "Featured Projects", de: "Ausgewählte Projekte" },
  projectsSectionMore: { en: "View More Projects on GitHub", de: "Mehr Projekte auf GitHub ansehen" },
  navigation: [
    { label: { en: "Home", de: "Start" }, href: "#hero" },
    { label: { en: "About", de: "Über mich" }, href: "#about" },
    { label: { en: "Experience", de: "Erfahrung" }, href: "#experience" },
    { label: { en: "Projects", de: "Projekte" }, href: "#projects" },
    { label: { en: "Skills", de: "Fähigkeiten" }, href: "#skills" },
    { label: { en: "Contact", de: "Kontakt" }, href: "#contact" },
  ],
  hero: {
    name: "Uwe Schwarz",
    imageAlt: {
      en: "Portrait photo of Uwe",
      de: "Portraitfoto von Uwe",
    },
    titleElements: [
      {
        en: "Project Manager",
        de: "Projektmanager",
      },
      {
        en: "IT Security Expert",
        de: "IT-Sicherheitsexpert",
      },
      {
        en: "AI Enthusiast",
        de: "KI-Enthusiast",
      },
      {
        en: "Consultant",
        de: "Berater",
      }
    ],
    description: {
      en: "I connect technology, people, and business goals – acting as the bridge between teams, stakeholders, and systems. Whether it's IT security, networking, high-availability infrastructure, or email solutions, I take ownership, lead complex projects, and ensure the results are not just technically sound, but strategically aligned and built to last.",
      de: "Ich bringe Technik, Menschen und Geschäftsziele zusammen – als Brücke zwischen Teams, Stakeholdern und Systemen. Ob IT-Security, Netzwerke, hochverfügbare Systeme oder E-Mail-Infrastruktur: Ich übernehme Verantwortung, leite komplexe Projekte und stelle sicher, dass Lösungen nicht nur funktionieren, sondern auch strategisch passen und langfristig tragen.",
    },
    ctaPrimary: {
      en: "See my work",
      de: "Meine Arbeit ansehen",
    },
    ctaSecondary: {
      en: "Download CV",
      de: "Lebenslauf herunterladen",
    },
    decorativeElements: [
      {
        position: 83,
        distance: 130,
        code: "💡&nbsp;strategy",
      },
      {
        position: 1,
        distance: 110,
        code: '🔐&nbsp;security',
      },
      {
        position: 72,
        distance: 130,
        code: "📡&nbsp;networking",
      },
      {
        position: 52,
        distance: 85,
        code: "🤖 AI",
      },
      {
        position: 33,
        distance: 70,
        code: "🤝&nbsp;Human&nbsp;API",
      },
      {
        position: 15,
        distance: 85,
        code: "🛡️&nbsp;GDPR",
      },
    ],
  },
  about: {
    title: {
      en: "About Me",
      de: "Über Mich",
    },
    "paragraphs": [
      {
        "en": "With over two decades of hands-on experience in IT and project leadership, I specialize in building secure, scalable, and future-ready systems. From high-stakes data center migrations to evolving security strategies for regulated industries, I’ve led diverse teams and initiatives that drive tangible business outcomes.",
        "de": "Mit über zwei Jahrzehnten praktischer Erfahrung in der IT und Projektleitung spezialisiere ich mich auf den Aufbau sicherer, skalierbarer und zukunftsfähiger Systeme. Von kritischen Rechenzentrumsumzügen bis hin zur Weiterentwicklung von Sicherheitsstrategien für regulierte Branchen habe ich vielfältige Teams und Projekte geleitet, die messbare Ergebnisse liefern."
      },
      {
        "en": "I act as the bridge between technical complexity and strategic clarity. Whether I’m aligning teams on a security roadmap, modernizing infrastructure, or translating compliance requirements into real-world action, I bring a clear head, calm hands, and a passion for connecting the dots between tech and people.",
        "de": "Ich fungiere als Brücke zwischen technischer Komplexität und strategischer Klarheit. Ob es darum geht, Teams auf eine Sicherheits-Roadmap auszurichten, Infrastrukturen zu modernisieren oder Compliance-Anforderungen in greifbare Maßnahmen zu übersetzen – ich bringe einen kühlen Kopf, ruhige Hände und die Leidenschaft mit, Technik und Menschen zusammenzubringen."
      },
      {
        "en": "Outside the day-to-day, I stay curious. I’m particularly fascinated by AI and its potential to enhance everything from cybersecurity to user experience. I enjoy experimenting with new tools, self-hosted solutions, and smart workflows – always with an eye on what’s practical, elegant, and secure.",
        "de": "Abseits des Tagesgeschäfts bleibe ich neugierig. Besonders faszinieren mich KI-Technologien und ihr Potenzial, von Cybersicherheit bis Benutzererlebnis neue Maßstäbe zu setzen. Ich experimentiere gerne mit neuen Tools, self-hosted Lösungen und smarten Workflows – immer mit Blick auf das, was praktikabel, elegant und sicher ist."
      }
    ],
    imageAlt: {
      en: "Illustration of Uwe in three roles: at the top, he is working on a computer with green code on the screen, symbolically supported by an AI. At the bottom left, he explains a network diagram on a flipchart, and at the bottom right, he gives a presentation with a progress chart. The scenes are connected by flowing lines, representing the seamless transition between technology, planning, and communication.",
      de: "Illustration von Uwe in drei Rollen: oben arbeitet er am Computer mit grünem Code auf dem Bildschirm, symbolisch unterstützt von einer KI. Unten links erklärt er ein Netzwerk-Diagramm auf einem Flipchart, und unten rechts hält er eine Präsentation mit einem Fortschrittsdiagramm. Die Szenen sind durch geschwungene Linien verbunden, was den fließenden Übergang zwischen Technik, Planung und Kommunikation darstellt.",
    },
    labels: {
      experience: { en: "Years of Experience", de: "Jahre Erfahrung" },
      projects: { en: "Completed Projects", de: "Abgeschlossene Projekte" },
      technologies: { en: "Technologies", de: "Technologien" },
    },
    stats: [
      { key: 'experience', value: { en: '20+', de: '20+' } },
      { key: 'projects', value: { en: '10+', de: '10+' } },
      { key: 'technologies', value: { en: '20+', de: '20+' } },
    ],
  },
  experiences: [
    {
      title: {
        en: "Member of the Board",
        de: "Vorstandsmitglied",
      },
      company: "DEGIT AG",
      logoUrl: "/logos/degit.png",
      period: { en: "May 2018 - Present", de: "Mai 2018 - Heute" },
      location: "Hockenheim, Germany",
      description: [
        { type: 'text', text: {
          en: 'Information Security Officer and Data Protection and Privacy Officer.',
          de: 'Informationssicherheitsbeauftragter sowie Datenschutz- und Privatsphärebeauftragter.' } },
        { type: 'text', text: {
          en: 'Access to experts from multiple fields.',
          de: 'Zugang zu Experten aus verschiedenen Bereichen.' } },
        { type: 'text', text: {
          en: 'Competent and focused partner for all consulting needs.',
          de: 'Kompetenter und fokussierter Partner für alle Beratungsanforderungen.' } },
      ],
      tags: [
        {en: "Security", de: "Sicherheit"},
        {en: "Privacy", de: "Datenschutz"},
        {en: "Microsoft 365", de: "Microsoft 365"}
      ],
    },
    {
      title: { en: "Project Manager Data Center Migration & Backup Modernization", de: "Projektmanager RZ-Umzug & Backup-Modernisierung" },
      company: "Private Bank",
      period: { en: "Jan 2024 - Present", de: "Jan 2024 - Heute" },
      location: "Hamburg, Germany",
      description: [
        { type: 'text', text: {
          en: 'Project management data center relocation.',
          de: 'Projektmanagement für die Verlagerung der Rechenzentren.' } },
        { type: 'text', text: {
          en: 'Backup modernization and optimization, including migration to cloud-based solutions.',
          de: 'Modernisierung und Optimierung des Backups, einschließlich Migration zu cloudbasierten Lösungen.' } },
        { type: 'text', text: {
          en: 'Modernizing Solaris infrastructure.',
          de: 'Modernisierung der Solaris-Infrastruktur.' } },
        { type: 'achievement', text: {
          en: 'Successfully managed the relocation of two data centers, resulting in a reduction in downtime.',
          de: 'Erfolgreiche Leitung der Verlagerung von zwei Rechenzentren, wodurch die Ausfallzeiten reduziert wurden.' } },
        { type: 'achievement', text: {
          en: 'Modernized the bank’s backup infrastructure, reducing recovery time objectives (RTO) and minimizing the risk of data loss.',
          de: 'Modernisierung der Backup-Infrastruktur der Bank, was zu einer Reduzierung der Wiederherstellungszeiten (RTO) führte.' } },
        { type: 'achievement', text: {
          en: 'Migrated outdated Solaris infrastructure across the organization, improving system performance and cutting maintenance costs.',
          de: 'Migration der veralteten Solaris-Infrastruktur im gesamten Unternehmen.' } },
      ],
      tags: [
        {en: "Project Management", de: "Projektmanagement"},
        {en: "Atlassian Jira", de: "Atlassian Jira"},
        {en: "Atlassian Confluence", de: "Atlassian Confluence"},
        {en: "Microsoft Project", de: "Microsoft Project"},
        {en: "ServiceNow", de: "ServiceNow"},
      ],
    },
    {
      title: { en: "Information Security Officer", de: "Informationssicherheitsbeauftragter" },
      company: "Threedium Ltd.",
      logoUrl: "/logos/threedium.svg",
      period: { en: "Oct 2023 - Jun 2024", de: "Okt 2023 - Jun 2024" },
      location: "London, United Kingdom",
      description: [
        { type: 'text', text: {
          en: 'Consulting in all questions about and around IT security.',
          de: 'Beratung in allen Fragen der IT-Sicherheit.' } },
        { type: 'text', text: {
          en: 'Support of the DevOps team.',
          de: 'Unterstützung des DevOps-Teams.' } },
        { type: 'text', text: {
          en: 'Integration of services in SSO infrastructure.',
          de: 'Integration von Diensten in SSO-Infrastruktur.' } },
        { type: 'text', text: {
          en: 'Support of certificate audits (SOC2, ISO27001)',
          de: 'Unterstützung bei Zertifizierungsaudits (SOC2, ISO27001).' } },
        { type: 'text', text: {
          en: 'Advice on all aspects of GDPR.',
          de: 'Beratung zu allen Aspekten der DSGVO.' } },
        { type: 'text', text: {
          en: 'Introduction of security guidelines.',
          de: 'Einführung von Sicherheitsrichtlinien.' } },
        { type: 'achievement', text: {
          en: 'Implemented IT security measures that passed a SOC2 audit with zero non-conformities, securing key client contracts.',
          de: 'Implementierung von IT-Sicherheitsmaßnahmen, die bei einem SOC2-Audit ohne Beanstandungen bestanden.' } },
        { type: 'achievement', text: {
          en: 'Integrated SSO infrastructure across multiple platforms, improving security and user experience.',
          de: 'Integration der SSO-Infrastruktur über mehrere Plattformen hinweg, Verbesserung der Sicherheit und Benutzererfahrung.' } },
        { type: 'achievement', text: {
          en: 'Led the team in passing ISO27001 certification within a tight six-month deadline, which opened new markets for the company.',
          de: 'Führung des Teams zur erfolgreichen ISO27001-Zertifizierung innerhalb einer straffen sechsmonatigen Frist, wodurch neue Märkte für das Unternehmen erschlossen wurden.' } },
      ],
      tags: [
        {en: "Security", de: "Sicherheit"},
        {en: "SSO", de: "SSO"},
        {en: "GDPR", de: "DSGVO"},
        {en: "ISO 27001", de: "ISO 27001"},
        {en: "SOC 2", de: "SOC 2"},
        {en: "Atlassian Jira", de: "Atlassian Jira"},
        {en: "Atlassian Confluence", de: "Atlassian Confluence"},
      ],
    },
    {
      title: { en: "IT Security Consultant", de: "IT-Sicherheitsexperte" },
      company: "Deutsche Vermögensberatung AG",
      logoUrl: "/logos/dvag.svg",
      period: { en: "Jan 2019 - Sep 2023", de: "Jan 2019 - Sep 2023" },
      location: "Frankfurt am Main, Germany",
      description: [
        { type: 'text', text: {
          en: 'Consulting regarding any security topics, focus on server and networks.',
          de: 'Beratung zu allen Sicherheitsthemen, Schwerpunkt auf Server und Netzwerke.' } },
        { type: 'text', text: {
          en: 'Support and strategy handling during a (large) security incident.',
          de: 'Unterstützung und Strategieplanung während eines großen Sicherheitsvorfalls.' } },
        { type: 'text', text: {
          en: 'Writing (security) policies and technical concepts.',
          de: 'Erstellung von (Sicherheits-)Richtlinien und technischen Konzepten.' } },
        { type: 'text', text: {
          en: 'Automation vulnerability and inicident management.',
          de: 'Automatisierung des Schwachstellen- und Vorfallsmanagements.' } },
        { type: 'text', text: {
          en: 'Support for building IT architecture and strategy.',
          de: 'Unterstützung beim Aufbau von IT-Architektur und Strategie.' } },
        { type: 'text', text: {
          en: 'Preparation and accompanying of penetration tests.',
          de: 'Vorbereitung und Begleitung von Penetrationstests.' } },
        { type: 'text', text: {
          en: 'Security audits.',
          de: 'Sicherheits-Audits.' } },
        { type: 'text', text: {
          en: 'Specialization in the areas of Linux and networking.',
          de: 'Spezialisierung in den Bereichen Linux und Netzwerke.' } },
        { type: 'text', text: {
          en: 'IT security consulting also on Windows, Cloud (primarily Azure) and application development.',
          de: 'IT-Sicherheitsberatung auch für Windows, Cloud (vor allem Azure) und Anwendungsentwicklung.' } },
        { type: 'text', text: {
          en: 'Advice on data protection and certification issues (e.g. ISO27001, BSI Grundschutz, NIST framework, MITRE).',
          de: 'Beratung zu Datenschutz- und Zertifizierungsfragen (z.B. ISO27001, BSI Grundschutz, NIST-Framework, MITRE).' } },
        { type: 'achievement', text: {
          en: 'Managed the response to a major security incident, coordinating efforts that minimized data loss and restored operations.',
          de: 'Leitung der Reaktion auf einen großen Sicherheitsvorfall, Koordination der Maßnahmen zur Minimierung von Datenverlusten und Wiederherstellung des Betriebs.' } },
        { type: 'achievement', text: {
          en: 'Developed and automated a vulnerability management system, reducing incident response time and increasing system uptime.',
          de: 'Entwicklung und Automatisierung eines Schwachstellenmanagementsystems, Reduzierung der Reaktionszeiten bei Vorfällen und Erhöhung der Systemverfügbarkeit.' } },
        { type: 'achievement', text: {
          en: 'Implemented security policies that were later adopted as best practices company-wide.',
          de: 'Implementierung von Sicherheitsrichtlinien, die später als Best Practices im gesamten Unternehmen übernommen wurden.' } },
      ],
      tags: [
        {en: "Security", de: "Sicherheit"},
        {en: "GDPR", de: "DSGVO"},
        {en: "ISO 27001", de: "ISO 27001"},
        {en: "Guidelines", de: "Richtlinien"},
        {en: "Atlassian Jira", de: "Atlassian Jira"},
        {en: "Atlassian Confluence", de: "Atlassian Confluence"},
        {en: "Palo Alto", de: "Palo Alto"},
        {en: "Cisco", de: "Cisco"},
        {en: "Microsoft Azure", de: "Microsoft Azure"},
        {en: "Microsoft Sentinel", de: "Microsoft Sentinel"},
        {en: "Microsoft Defender", de: "Microsoft Defender"},
        {en: "Microsoft 365", de: "Microsoft 365"},
      ],
    },
    {
      title: { en: "Team Coordinator / System Engineer", de: "Teamkoordinator / Systemingenieur" },
      company: "Deutsche Vermögensberatung AG",
      logoUrl: "/logos/dvag.svg",
      period: { en: "Jul 2018 - Dec 2018", de: "Jul 2018 - Dez 2018" },
      location: "Frankfurt am Main, Germany",
      description: [
        { type: 'text', text: {
          en: 'Coordination (about 50%) and planning of resources of a (8 person) team.',
          de: 'Koordination (ca. 50%) und Ressourcenplanung eines (8-köpfigen) Teams.' } },
        { type: 'text', text: {
          en: 'Focus of the team: e-mail, cloud storage, load balancing, proxy and DNS (all linux based).',
          de: 'Schwerpunkt des Teams: E-Mail, Cloud-Speicher, Lastverteilung, Proxy und DNS (alles Linux-basiert).' } },
        { type: 'text', text: {
          en: 'Debugging und solving of problems mainly in the area mail (but not solely).',
          de: 'Fehlerbehebung und Problemlösung hauptsächlich im Bereich E-Mail (aber nicht ausschließlich).' } },
        { type: 'text', text: {
          en: 'Consulting and implementation of IPv6, security topics, high-availability systems and more topics.',
          de: 'Beratung und Implementierung von IPv6, Sicherheitsthemen, Hochverfügbarkeitssystemen und weiteren Themen.' } },
        { type: 'text', text: {
          en: 'Project part time management: data centre relocation, reconstruction of all servers.',
          de: 'Teilprojektleitung: Rechenzentrumsumzug, Neuaufbau aller Server.' } },
        { type: 'achievement', text: {
          en: 'Coordinated a successful data center relocation project.',
          de: 'Koordination eines erfolgreichen Rechenzentrumsumzugsprojekts.' } },
        { type: 'achievement', text: {
          en: 'Led the implementation of IPv6 across the organization, future-proofing the network.',
          de: 'Leitung der Implementierung von IPv6 im gesamten Unternehmen, Zukunftssicherung des Netzwerks.' } },
        { type: 'achievement', text: {
          en: 'Improved team efficiency through the introduction of automated processes and resource management tools.',
          de: 'Verbesserung der Teameffizienz durch Einführung automatisierter Prozesse und Ressourcenmanagement-Tools.' } },
      ],
      tags: [
        {en: "Team Management", de: "Teamleitung"},
        {en: "Atlassian Jira", de: "Atlassian Jira"},
        {en: "Atlassian Confluence", de: "Atlassian Confluence"},
        {en: "Microsoft Azure", de: "Microsoft Azure"},
        {en: "Microsoft 365", de: "Microsoft 365"},
        {en: "IPv6", de: "IPv6"},
        {en: "High-Availability", de: "Hochverfügbarkeit"},
        {en: "Load Balancing", de: "Lastverteilung"},
        {en: "Email", de: "E-Mail"},
        {en: "Cloud Storage", de: "Cloud-Speicher"},
        {en: "Proxy", de: "Proxy"},
        {en: "DNS", de: "DNS"},
      ],
    },
  ],
  projects: [
    {
      title: {
        en: "AI-Powered Recommendation Engine",
        de: "KI-gestützte Empfehlungs-Engine",
      },
      description: {
        en: "A machine learning system that analyzes user behavior and provides personalized content recommendations. Utilizes collaborative filtering and deep learning models.",
        de: "Ein Machine-Learning-System, das das Nutzerverhalten analysiert und personalisierte Inhaltsempfehlungen liefert. Nutzt kollaboratives Filtern und Deep-Learning-Modelle.",
      },
      imageUrl: "/placeholder.svg",
      imageAlt: {
        en: "Recommendation Engine Dashboard",
        de: "Empfehlungs-Engine Dashboard",
      },
      tags: ["TensorFlow", "Python", "React", "AWS", "Machine Learning"],
      demoUrl: "#",
      repoUrl: "https://github.com",
    },
    {
      title: {
        en: "Enterprise Resource Planning System",
        de: "Enterprise Resource Planning System",
      },
      description: {
        en: "A comprehensive ERP solution for manufacturing companies. Features include inventory management, production planning, and financial reporting.",
        de: "Eine umfassende ERP-Lösung für Fertigungsunternehmen. Funktionen umfassen Bestandsverwaltung, Produktionsplanung und Finanzberichterstattung.",
      },
      imageUrl: "/placeholder.svg",
      imageAlt: { en: "ERP System Interface", de: "ERP-System-Schnittstelle" },
      tags: ["Angular", "Node.js", "MongoDB", "Docker", "Redis"],
      demoUrl: "#",
    },
    {
      title: {
        en: "Blockchain-based Supply Chain",
        de: "Blockchain-basierte Lieferkette",
      },
      description: {
        en: "A supply chain tracking system built on blockchain technology. Ensures transparency and traceability of products from manufacturer to consumer.",
        de: "Ein auf Blockchain-Technologie basierendes System zur Verfolgung von Lieferketten. Gewährleistet Transparenz und Rückverfolgbarkeit von Produkten vom Hersteller zum Verbraucher.",
      },
      imageUrl: "/placeholder.svg",
      imageAlt: { en: "Supply Chain Dashboard", de: "Lieferketten-Dashboard" },
      tags: ["Ethereum", "Solidity", "React", "Node.js", "Web3.js"],
      repoUrl: "https://github.com",
    },
  ],
  skills: [
    // Frontend
    { name: "React", icon: "code", category: "frontend", level: 5 },
    { name: "TypeScript", icon: "braces", category: "frontend", level: 5 },
    { name: "Angular", icon: "code", category: "frontend", level: 4 },
    { name: "Vue.js", icon: "code", category: "frontend", level: 3 },
    { name: "HTML/CSS", icon: "file-code", category: "frontend", level: 5 },
    { name: "Tailwind CSS", icon: "palette", category: "frontend", level: 5 },

    // Backend
    { name: "Node.js", icon: "server", category: "backend", level: 5 },
    { name: "Python", icon: "terminal", category: "backend", level: 4 },
    { name: "Java", icon: "coffee", category: "backend", level: 4 },
    { name: "PostgreSQL", icon: "database", category: "backend", level: 4 },
    { name: "MongoDB", icon: "database", category: "backend", level: 5 },
    { name: "GraphQL", icon: "git-branch", category: "backend", level: 4 },

    // Tools
    { name: "Git", icon: "git-branch", category: "tools", level: 5 },
    { name: "Docker", icon: "box", category: "tools", level: 4 },
    { name: "Kubernetes", icon: "layers", category: "tools", level: 3 },
    { name: "AWS", icon: "cloud", category: "tools", level: 4 },
    { name: "CI/CD", icon: "refresh-cw", category: "tools", level: 4 },

    // AI
    { name: "TensorFlow", icon: "brain", category: "ai", level: 3 },
    { name: "PyTorch", icon: "zap", category: "ai", level: 3 },
    { name: "LangChain", icon: "link", category: "ai", level: 4 },
    { name: "LLM Fine-tuning", icon: "settings", category: "ai", level: 3 },
    { name: "Prompt Engineering", icon: "edit", category: "ai", level: 5 },
  ],
  skillsSection: {
    title: {
      en: "Skills & Technologies",
      de: "Fähigkeiten & Technologien",
    },
    subtitle: {
      en: "The tools I use to bring ideas to life",
      de: "Die Werkzeuge, mit denen ich Ideen zum Leben erwecke",
    },
    categories: {
      frontend: { en: "Frontend", de: "Frontend" },
      backend: { en: "Backend", de: "Backend" },
      tools: { en: "Tools & DevOps", de: "Tools & DevOps" },
      ai: { en: "AI & ML", de: "KI & ML" },
    },
  },
  contact: {
    title: {
      en: "Get In Touch",
      de: "Kontakt aufnehmen",
    },
    subtitle: {
      en: "Interested in working together? Feel free to reach out!",
      de: "Interesse an einer Zusammenarbeit? Kontaktieren Sie mich gerne!",
    },
    emailLabel: {
      en: "Email me at",
      de: "E-Mail an",
    },
    email: "mail@uweschwarz.eu",
    socialLinks: {
      github: "https://github.com/uwe-schwarz",
      linkedin: "https://www.linkedin.com/in/uwe-schwarz-282531294/",
      xing: "https://www.xing.com/profile/Uwe_Schwarz72/",
      x: "https://x.com/e38383",
    },
    formLabels: {
      name: { en: "Name", de: "Name" },
      email: { en: "Email", de: "E-Mail" },
      message: { en: "Message", de: "Nachricht" },
      send: { en: "Send Message", de: "Nachricht senden" },
    },
    formStatus: {
      sentTitle: { en: "Message sent!", de: "Nachricht gesendet!" },
      sentDescription: {
        en: "Thanks for reaching out. I'll get back to you soon.",
        de: "Danke für deine Nachricht. Ich werde mich bald bei dir melden.",
      },
      errorTitle: { en: "Error", de: "Fehler" },
      errorDescription: {
        en: "Failed to send message. Please try again later.",
        de: "Nachricht konnte nicht gesendet werden. Bitte versuche es später noch einmal.",
      },
      sending: { en: "Sending...", de: "Senden..." },
    },
    formPlaceholders: {
      name: { en: "Your name", de: "Dein Name" },
      email: { en: "Your email", de: "Deine E-Mail" },
      message: { en: "Your message", de: "Deine Nachricht" },
    },
    infoTitle: { en: "Let's Connect", de: "Lass uns in Kontakt treten" },
    findMeOn: { en: "Find me on", de: "Finde mich auf" },
    infoText: {
      en: "Feel free to reach out for collaborations or just a friendly hello.",
      de: "Kontaktiere mich gerne für Zusammenarbeiten oder einfach nur für ein freundliches Hallo.",
    },
  },
  footer: {
    copyright: {
      en: "© year Uwe Schwarz. All rights reserved.",
      de: "© year Uwe Schwarz. Alle Rechte vorbehalten.",
    },
    links: [
      { label: { en: "Privacy Policy", de: "Datenschutz" }, href: "/privacy" },
      { label: { en: "Imprint", de: "Impressum" }, href: "/imprint" },
    ],
    builtWith: {
      en: "Built with modern web technologies and a passion for clean code.",
      de: "Erstellt mit modernen Web-Technologien und einer Leidenschaft für sauberen Code.",
    },
    lastUpdated: {
      en: "Last updated: April 2025",
      de: "Letzte Aktualisierung: April 2025",
    },
  },
  imprint: {
    title: {
      en: "Imprint",
      de: "Impressum",
    },
    contactTitle: {
      en: "Contact Information",
      de: "Kontaktinformationen",
    },
    companyName: {
      en: "Uwe Schwarz",
      de: "Uwe Schwarz",
    },
/*    representative: {
      en: "Represented by: John Oldman",
      de: "Vertreten durch: John Oldman",
    },*/
    address: {
      street: {
        en: "Uhlandstr. 20",
        de: "Uhlandstr. 20",
      },
      city: {
        en: "67069 Ludwigshafen",
        de: "67069 Ludwigshafen",
      },
      country: {
        en: "Germany",
        de: "Deutschland",
      },
    },
    contactInfoTitle: {
      en: "Contact",
      de: "Kontakt",
    },
    emailLabel: {
      en: "Email",
      de: "E-Mail",
    },
    email: "mail@uweschwarz.eu",
    phoneLabel: {
      en: "Phone",
      de: "Telefon",
    },
    phone: "+49 151 64403667",
/*    legalTitle: {
      en: "Legal Information",
      de: "Rechtliche Informationen",
    },
    vatId: {
      en: "VAT ID: DE123456789",
      de: "USt-IdNr.: DE123456789",
    },
    registrationInfo: {
      en: "Registered in the Commercial Register of the Local Court of Berlin, HRB 123456",
      de: "Eingetragen im Handelsregister des Amtsgerichts Berlin, HRB 123456",
    }, */
    disclaimerTitle: {
      en: "Disclaimer",
      de: "Haftungsausschluss",
    },
    disclaimer: {
      en: "The content of this website has been prepared with the utmost care; however, I cannot guarantee its accuracy, completeness or timeliness. \
          Under §§ 7, 8–10 of the German Telemedia Act (TMG), I am responsible for my own content on these pages in accordance with general laws, \
          but I am not required to monitor third-party information transmitted or stored on my site, nor to investigate circumstances indicating illegal activity. \
          Any obligations to remove or block the use of information under general laws shall remain unaffected.",
      de: "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehme ich jedoch \
          keine Gewähr. Gemäß §§ 7, 8–10 des Telemediengesetzes (TMG) bin ich als Diensteanbieter zwar für eigene Inhalte auf diesen Seiten nach den allgemeinen \
          Gesetzen verantwortlich, jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, \
          die auf eine rechtswidrige Tätigkeit hinweisen. Die Verpflichtung zur Entfernung oder Sperrung der Nutzung von Informationen gemäß den allgemeinen \
          Gesetzen bleibt unberührt."
    },
  },
  privacy: {
    title: {
      en: "Privacy Policy",
      de: "Datenschutzerklärung",
    },
    sections: [
      {
        title: {
          en: "1. General Information",
          de: "1. Allgemeine Informationen",
        },
        paragraphs: [
          {
            en: "The protection of your personal data is important to me. This Privacy Policy explains how I collect, use, process, and share your information, including personal data, in connection with your access to and use of my website.",
            de: "Der Schutz Ihrer persönlichen Daten ist mir wichtig. Diese Datenschutzerklärung erläutert, wie ich Ihre Informationen, einschließlich personenbezogener Daten, im Zusammenhang mit Ihrem Zugriff auf und der Nutzung meiner Website sammle, verwende, verarbeite und weitergebe.",
          },
          {
            en: "By using the website, you consent to the collection and use of information in accordance with this policy.",
            de: "Durch die Nutzung der Website stimmen Sie der Erfassung und Verwendung von Informationen gemäß dieser Richtlinie zu.",
          },
        ],
      },
      {
        title: {
          en: "2. Collection of Personal Data",
          de: "2. Erhebung personenbezogener Daten",
        },
        paragraphs: [
          {
            en: "When you interact with my website, I may collect certain information about you, such as:",
            de: "Wenn Sie mit meiner Website interagieren, kann ich bestimmte Informationen über Sie sammeln, wie zum Beispiel:",
          },
          {
            en: "- Contact information (such as name, email address) that you voluntarily provide when using the contact form;\n- Technical information about your device and internet connection, including your IP address, browser type, and operating system;\n- Information about your use of the website, including the pages you visit and the time and date of your visits.",
            de: "- Kontaktinformationen (wie Name, E-Mail-Adresse), die Sie freiwillig angeben, wenn Sie das Kontaktformular nutzen;\n- Technische Informationen über Ihr Gerät und Ihre Internetverbindung, einschließlich Ihrer IP-Adresse, Browser-Typ und Betriebssystem;\n- Informationen über Ihre Nutzung der Website, einschließlich der von Ihnen besuchten Seiten und des Zeitpunkts Ihrer Besuche.",
          },
        ],
      },
      {
        title: {
          en: "3. Use of Personal Data",
          de: "3. Verwendung personenbezogener Daten",
        },
        paragraphs: [
          {
            en: "I use the collected data for the following purposes:",
            de: "Ich verwende die erhobenen Daten für folgende Zwecke:",
          },
          {
            en: "- To provide and maintain the website;\n- To respond to your inquiries and fulfill your requests;\n- To improve the website and user experience;\n- To analyze usage patterns and administer the website.",
            de: "- Um die Website bereitzustellen und zu pflegen;\n- Um auf Ihre Anfragen zu antworten und Ihre Wünsche zu erfüllen;\n- Um die Website und die Benutzererfahrung zu verbessern;\n- Um Nutzungsmuster zu analysieren und die Website zu verwalten.",
          },
        ],
      },
      {
        title: {
          en: "4. Cookies",
          de: "4. Cookies",
        },
        paragraphs: [
          {
            en: "This website uses cookies to enhance your browsing experience. Cookies are small text files that are stored on your device when you visit a website. They help me analyze web traffic and customize content to your preferences.",
            de: "Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen mir, den Webverkehr zu analysieren und Inhalte an Ihre Präferenzen anzupassen.",
          },
          {
            en: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit the website and some services and functionalities may not work.",
            de: "Sie können Cookies nach Belieben kontrollieren und/oder löschen. Sie können alle Cookies löschen, die sich bereits auf Ihrem Gerät befinden, und Sie können die meisten Browser so einstellen, dass sie nicht platziert werden. Wenn Sie dies jedoch tun, müssen Sie möglicherweise einige Einstellungen bei jedem Besuch der Website manuell anpassen, und einige Dienste und Funktionalitäten funktionieren möglicherweise nicht.",
          },
        ],
      },
      {
        title: {
          en: "5. Data Security",
          de: "5. Datensicherheit",
        },
        paragraphs: [
          {
            en: "I take reasonable precautions to protect your personal data from loss, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.",
            de: "Ich ergreife angemessene Vorkehrungen, um Ihre personenbezogenen Daten vor Verlust, Missbrauch, unbefugtem Zugriff, Offenlegung, Veränderung und Vernichtung zu schützen. Keine Methode der Übertragung über das Internet oder der elektronischen Speicherung ist jedoch 100% sicher.",
          },
        ],
      },
      {
        title: {
          en: "6. Your Rights",
          de: "6. Ihre Rechte",
        },
        paragraphs: [
          {
            en: "Under applicable data protection laws, you have the following rights:",
            de: "Nach den geltenden Datenschutzgesetzen haben Sie folgende Rechte:",
          },
          {
            en: "- Right to access your personal data;\n- Right to rectification of inaccurate personal data;\n- Right to erasure of your personal data;\n- Right to restriction of processing of your personal data;\n- Right to data portability;\n- Right to object to the processing of your personal data.",
            de: "- Recht auf Zugang zu Ihren personenbezogenen Daten;\n- Recht auf Berichtigung unrichtiger personenbezogener Daten;\n- Recht auf Löschung Ihrer personenbezogenen Daten;\n- Recht auf Einschränkung der Verarbeitung Ihrer personenbezogenen Daten;\n- Recht auf Datenübertragbarkeit;\n- Recht auf Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten.",
          },
          {
            en: "To exercise these rights, please contact me using the information provided in the Imprint section.",
            de: "Um diese Rechte auszuüben, kontaktieren Sie mich bitte unter den im Impressum angegebenen Informationen.",
          },
        ],
      },
      {
        title: {
          en: "7. Changes to This Privacy Policy",
          de: "7. Änderungen dieser Datenschutzerklärung",
        },
        paragraphs: [
          {
            en: "I may update this Privacy Policy from time to time. I will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date at the top of this Privacy Policy.",
            de: "Ich kann diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Ich werde Sie über Änderungen informieren, indem ich die neue Datenschutzerklärung auf dieser Seite veröffentliche und das Datum des Inkrafttretens am Anfang dieser Datenschutzerklärung aktualisiere.",
          },
          {
            en: "You are advised to review this Privacy Policy periodically for any changes.",
            de: "Es wird empfohlen, diese Datenschutzerklärung regelmäßig auf Änderungen zu überprüfen.",
          },
        ],
      },
    ],
  },
  translations: {
    languageSwitch: {
      en: "Switch to English",
      de: "Zu Deutsch wechseln",
    },
    themeSwitch: {
      light: {
        en: "Switch to light theme",
        de: "Zum hellen Design wechseln",
      },
      dark: {
        en: "Switch to dark theme",
        de: "Zum dunklen Design wechseln",
      },
    },
  },
  projectsLabels: {
    demo: { en: "Live Demo", de: "Live Demo" },
    code: { en: "Code", de: "Code" },
  },
  backToHome: { en: "Back to Home", de: "Zurück zur Startseite" },
  experienceSectionTitle: { en: "Experience", de: "Berufserfahrung" },
  experienceAchievementPrefix: { en: "Achievement:", de: "Erfolg:" },
  moreProjects: { en: "Previous projects or references are available upon request.", de: "Frühere Projekte oder Referenzen sind auf Anfrage verfügbar." },
  downloadResume: { en: "Download Full Resume", de: "Vollständigen Lebenslauf herunterladen" },
};
