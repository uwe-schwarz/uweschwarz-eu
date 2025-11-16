import type { ComponentType } from "react";
import {
  AlertTriangle,
  BookCheck,
  Bot,
  Box,
  Bug,
  Database,
  FileCheck2,
  FileText,
  Flag,
  GitBranch,
  GitCompareArrows,
  Globe,
  Heart,
  Image,
  Landmark,
  ListChecks,
  Mail,
  MessageCircle,
  Network,
  Route,
  Scale,
  ScanSearch,
  SearchCode,
  Shield,
  ShieldCheck,
  Siren,
  Swords,
  Terminal,
  Users,
  Video,
  Grid2X2,
  ShieldPlus,
  ServerCrash,
  CodeXml,
  Cable,
} from "lucide-react";
import {
  SiAnthropic,
  SiApple,
  SiCaddy,
  SiCloudflare,
  SiDocker,
  SiFreebsd,
  SiGit,
  SiGooglegemini,
  SiLinux,
  SiNotion,
  SiOpenai,
  SiPuppet,
  SiPython,
  SiResend,
  SiSupabase,
  SiX,
} from "react-icons/si";

export interface LocalizedString {
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
  type: "text" | "achievement";
  text: LocalizedString;
}

export interface Experience {
  title: LocalizedString;
  company: string;
  period: LocalizedString;
  location: LocalizedString;
  description: ExperienceDescriptionItem[];
  tags: LocalizedString[];
  logoUrl?: string;
  projectScale?: "major" | "small";
}

export interface Project {
  title: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  imageAlt: LocalizedString;
  tags: LocalizedString[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: LocalizedString;
  icon: ComponentType<{ className?: string }>;
  category:
    | "languages"
    | "management"
    | "security"
    | "infrastructure"
    | "tools"
    | "ai";
  level: number;
}

export interface SkillsSection {
  title: LocalizedString;
  subtitle: LocalizedString;
  categories: {
    security: LocalizedString;
    infrastructure: LocalizedString;
    tools: LocalizedString;
    ai: LocalizedString;
    management: LocalizedString;
    languages: LocalizedString;
  };
}

export interface ContactSection {
  title: LocalizedString;
  subtitle: LocalizedString;
  emailLabel: LocalizedString;
  email: string;
  cvemail: string;
  phoneLabel: LocalizedString;
  phone: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    xing?: string;
    x?: string;
    bluesky?: string;
    freelancermap?: string;
  };
  birthday?: string;
  homepage?: string;
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
    validation: {
      name: {
        en: string;
        de: string;
      };
      email: {
        en: string;
        de: string;
      };
      message: {
        en: string;
        de: string;
      };
    };
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

export interface CV {
  title: LocalizedString;
}

export interface Footer {
  copyright: LocalizedString;
  links: NavItem[];
  builtWith?: LocalizedString;
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
  subtitle: LocalizedString;
  sections: Array<{
    title: LocalizedString;
    paragraphs: LocalizedString[];
    list?: Array<
      LocalizedString | {
        en: string;
        de: string;
        description?: LocalizedString;
      }
    >;
  }>;
}

export interface SitemapSection {
  title: LocalizedString;
  description: LocalizedString;
}

export interface LLMSSection {
  title: LocalizedString;
}

export interface SiteContent {
  siteMetadata: {
    title: string;
    description: LocalizedString;
    author: string;
  };
  projectsSectionTitle: LocalizedString;
  projectsSectionMore?: LocalizedString;
  navigation: NavItem[];
  hero: HeroSection;
  about: AboutSection;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  skillsSection: SkillsSection;
  contact: ContactSection;
  cv: CV;
  footer: Footer;
  imprint: ImprintSection;
  privacy: PrivacySection;
  sitemap?: SitemapSection;
  llms?: LLMSSection;
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
  backToHome: LocalizedString;
  experienceSectionTitle: LocalizedString;
  experienceBigProjectsTitle: LocalizedString;
  experienceBigProjectsSubtitle: LocalizedString;
  experienceBigProjectsNote: LocalizedString;
  experienceSmallProjectsTitle: LocalizedString;
  experienceSmallProjectsSubtitle: LocalizedString;
  experienceSmallProjectsNote: LocalizedString;
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
  projectsSectionTitle: { en: "Developed Solutions", de: "Entwickelte Lösungen" },
  /*  projectsSectionMore: { en: "View More Projects on GitHub", de: "Mehr Projekte auf GitHub ansehen" }, */
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
      en: "Portrait photo of Uwe Schwarz, Project Manager and IT Security Expert.",
      de: "Portraitfoto von Uwe Schwarz, Projektmanager und IT-Sicherheitsexperte.",
    },
    titleElements: [
      {
        en: "Project Manager",
        de: "Projektmanager",
      },
      {
        en: "IT Security Expert",
        de: "IT-Sicherheitsexperte",
      },
      {
        en: "AI Enthusiast",
        de: "KI-Enthusiast",
      },
      {
        en: "Consultant",
        de: "Berater",
      },
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
        position: 9,
        distance: 92,
        code: "🛡️&nbsp;GDPR",
      },
      {
        position: 35,
        distance: 72,
        code: "🤖&nbsp;AI",
      },
      {
        position: 52,
        distance: 85,
        code: "🤝&nbsp;Human&nbsp;API",
      },
      {
        position: 66,
        distance: 122,
        code: "📡&nbsp;networking",
      },
      {
        position: 84,
        distance: 134,
        code: "💡&nbsp;strategy",
      },
      {
        position: 95,
        distance: 110,
        code: "🔐&nbsp;security",
      },
    ],
  },
  about: {
    title: {
      en: "About Me",
      de: "Über Mich",
    },
    paragraphs: [
      {
        en: "With over two decades of hands-on experience in IT and project leadership, I specialize in building secure, scalable, and future-ready systems. From high-stakes data center migrations to evolving security strategies for regulated industries, I’ve led diverse teams and initiatives that drive tangible business outcomes.",
        de: "Mit über zwei Jahrzehnten praktischer Erfahrung in der IT und Projektleitung spezialisiere ich mich auf den Aufbau sicherer, skalierbarer und zukunftsfähiger Systeme. Von kritischen Rechenzentrumsumzügen bis hin zur Weiterentwicklung von Sicherheitsstrategien für regulierte Branchen habe ich vielfältige Teams und Projekte geleitet, die messbare Ergebnisse liefern.",
      },
      {
        en: "I act as the bridge between technical complexity and strategic clarity. Whether I’m aligning teams on a security roadmap, modernizing infrastructure, or translating compliance requirements into real-world action, I bring a clear head, calm hands, and a passion for connecting the dots between tech and people.",
        de: "Ich fungiere als Brücke zwischen technischer Komplexität und strategischer Klarheit. Ob es darum geht, Teams auf eine Sicherheits-Roadmap auszurichten, Infrastrukturen zu modernisieren oder Compliance-Anforderungen in greifbare Maßnahmen zu übersetzen – ich bringe einen kühlen Kopf, ruhige Hände und die Leidenschaft mit, Technik und Menschen zusammenzubringen.",
      },
      {
        en: "Outside the day-to-day, I stay curious. I’m particularly fascinated by AI and its potential to enhance everything from cybersecurity to user experience. I enjoy experimenting with new tools, self-hosted solutions, and smart workflows – always with an eye on what’s practical, elegant, and secure.",
        de: "Abseits des Tagesgeschäfts bleibe ich neugierig. Besonders faszinieren mich KI-Technologien und ihr Potenzial, von Cybersicherheit bis Benutzererlebnis neue Maßstäbe zu setzen. Ich experimentiere gerne mit neuen Tools, self-hosted Lösungen und smarten Workflows – immer mit Blick auf das, was praktikabel, elegant und sicher ist.",
      },
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
      { key: "experience", value: { en: "20+", de: "20+" } },
      { key: "projects", value: { en: "40+", de: "40+" } },
      { key: "technologies", value: { en: "20+", de: "20+" } },
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
      projectScale: "small",
      period: { en: "May 2018 - Present", de: "Mai 2018 - Heute" },
      location: {
        en: "Hockenheim, Germany",
        de: "Hockenheim, Deutschland",
      },
      description: [
        {
          type: "text",
          text: {
            en: "Information Security Officer and Data Protection and Privacy Officer.",
            de: "Informationssicherheitsbeauftragter sowie Datenschutz- und Privatsphärebeauftragter.",
          },
        },
        {
          type: "text",
          text: {
            en: "Access to experts from multiple fields.",
            de: "Zugang zu Experten aus verschiedenen Bereichen.",
          },
        },
        {
          type: "text",
          text: {
            en: "Competent and focused partner for all consulting needs.",
            de: "Kompetenter und fokussierter Partner für alle Beratungsanforderungen.",
          },
        },
        {
          type: "text",
          text: {
            en: "Building a secure and compliant IT infrastructure with a focus on modern technologies (IPv6, Zero Trust, Zero-Config VPN, etc.) and best practices.",
            de: "Aufbau einer sicheren und rechtskonformen IT-Infrastruktur mit Schwerpunkt auf modernen Technologien (IPv6, Zero Trust, Zero-Config VPN, etc.) und Best Practices.",
          },
        },
        {
          "type": "text",
          "text": {
            "en": "Responsible for corporate governance in IT security, privacy and compliance topics.",
            "de": "Verantwortlich für Governance in den Bereichen IT-Sicherheit, Datenschutz und Compliance."
          }
        },
      ],
      tags: [
        { "en": "Security", "de": "Sicherheit" },
        { "en": "Privacy", "de": "Datenschutz" },
        { "en": "Microsoft 365", "de": "Microsoft 365" },
        { "en": "Notion", "de": "Notion" },
        { "en": "Cloudflare", "de": "Cloudflare" },
        { "en": "Resend", "de": "Resend" },
        { "en": "Supabase", "de": "Supabase" },
        { "en": "IPv6", "de": "IPv6" },
        { "en": "Zero Trust", "de": "Zero Trust" },
        { "en": "Zero-Config VPN", "de": "Zero-Config VPN" },
        { "en": "Governance", "de": "Governance" },
        { "en": "Training", "de": "Training" },
        { "en": "Security Awareness", "de": "Sicherheitsbewusstsein" },
        { "en": "Risk Management", "de": "Risikomanagement" },
        { "en": "Compliance", "de": "Compliance" },
        { "en": "EU AI Act", "de": "EU AI Act" },
      ],
    },
    {
      "title": {
        "en": "Founding Member & Data Protection Officer",
        "de": "Gründungsmitglied & Datenschutzbeauftragter"
      },
      "company": "AKTion gegen Krebs gUG",
      "logoUrl": "/logos/aktion-gegen-krebs.png",
      "projectScale": "small",
      "period": { "en": "May 2025 - Present", "de": "Mai 2025 - Heute" },
      location: {
        en: "Seevetal, Germany",
        de: "Seevetal, Deutschland",
      },
      "description": [
        {
          "type": "text",
          "text": {
            "en": "Founding member responsible for data protection and GDPR compliance.",
            "de": "Gründungsmitglied mit Verantwortung für Datenschutz und DSGVO-Compliance."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Developed and maintain the organization's backend systems.",
            "de": "Entwicklung und Betreuung der Backend-Systeme."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Planning and implementing AI-supported workflows for case management.",
            "de": "Planung und Implementierung KI-gestützter Workflows für die Fallbearbeitung."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Responsible for IT security strategy and risk management.",
            "de": "Verantwortlich für IT-Sicherheitsstrategie und Risikomanagement."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Established GDPR-compliant data protection framework from the ground up.",
            "de": "Aufbau eines DSGVO-konformen Datenschutzrahmens von Grund auf."
          }
        }
      ],
      "tags": [
        { "en": "Data Protection", "de": "Datenschutz" },
        { "en": "IT Security", "de": "IT-Sicherheit" },
        { "en": "AI Workflows", "de": "KI-Workflows" },
        { "en": "Agentic AI", "de": "Agentische KI (Agentic AI)" },
        { "en": "Backend Systems", "de": "Backend-Systeme" },
        { "en": "Backup-Strategies", "de": "Backup-Strategien" },
        { "en": "IPv6", "de": "IPv6" },
        { "en": "Zero Trust", "de": "Zero Trust" },
        { "en": "Zero-Config VPN", "de": "Zero-Config VPN" },
        { "en": "Risk Management", "de": "Risikomanagement" },
        { "en": "Compliance", "de": "Compliance" },
        { "en": "Notion", "de": "Notion" },
        { "en": "Cloudflare", "de": "Cloudflare" },
        { "en": "Resend", "de": "Resend" },
        { "en": "Supabase", "de": "Supabase" },
      ]
    },
    {
      "title": {
        "en": "AI Training Platform & AI Tools Evaluation",
        "de": "KI-Trainingsplattform & Evaluierung von KI-Werkzeugen"
      },
      "company": "DEGIT AG",
      "logoUrl": "/logos/degit.png",
      "projectScale": "small",
      "period": { "en": "Aug 2025 – Oct 2025", "de": "Aug 2025 – Okt 2025" },
      location: {
        en: "Hockenheim, Germany",
        de: "Hockenheim, Deutschland",
      },
      "description": [
        {
          "type": "text",
          "text": {
            "en": "Design and implementation of an internal AI training platform for corporate use, focusing on compliance with the EU AI Act and practical enablement of teams.",
            "de": "Konzeption und Aufbau einer internen KI-Trainingsplattform für den Unternehmenseinsatz mit Fokus auf EU-AI-Act-Compliance und praxisnahe Befähigung der Teams."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Evaluation and decision paper comparing leading AI and automation platforms with regard to data protection, reliability, API integration and governance readiness.",
            "de": "Bewertung und Entscheidungsvorlage zum Vergleich führender KI- und Automatisierungsplattformen hinsichtlich Datenschutz, Zuverlässigkeit, API-Integration und Governance-Tauglichkeit."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Evaluation of emerging Agentic AI workflows for multi-step task orchestration and their integration into enterprise automation environments.",
            "de": "Evaluierung aufkommender Agentic-AI-Workflows zur mehrstufigen Aufgabenorchestrierung und deren Integration in Unternehmensautomatisierungsumgebungen."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Analyzed and benchmarked: OpenAI ChatGPT, OpenAI Open-Weight GPT-OSS, Microsoft Copilot, Perplexity, Anthropic Claude, Apple Foundation, z.AI GLM, n8n, make.com, Zapier.",
            "de": "Analysiert und bewertet: OpenAI ChatGPT, OpenAI Open-Weight GPT-OSS, Microsoft Copilot, Perplexity, Anthropic Claude, Apple Foundation, z.AI GLM, n8n, make.com und Zapier."
          }
        }
      ],
      "tags": [
        { "en": "AI Evaluation", "de": "KI-Evaluierung" },
        { "en": "AI Training", "de": "KI-Training" },
        { "en": "EU AI Act", "de": "EU AI Act" },
        { "en": "Supabase", "de": "Supabase" },
        { "en": "Cloudflare", "de": "Cloudflare" },
        { "en": "Automation", "de": "Automatisierung" },
        { "en": "n8n", "de": "n8n" },
        { "en": "make.com", "de": "make.com" },
        { "en": "Zapier", "de": "Zapier" },
        { "en": "OpenAI", "de": "OpenAI" },
        { "en": "Apple Foundation", "de": "Apple Foundation" },
        { "en": "Anthropic Claude", "de": "Anthropic Claude" },
        { "en": "Microsoft Copilot", "de": "Microsoft Copilot" },
        { "en": "Perplexity", "de": "Perplexity" },
        { "en": "z.AI GLM", "de": "z.AI GLM" },
        { "en": "Agentic AI", "de": "Agentische KI" },
        { "en": "Enterprise Automation", "de": "Unternehmensautomatisierung" },
        { "en": "Cursor", "de": "Cursor" },
        { "en": "Claude Code", "de": "Claude Code" },
        { "en": "OpenAI Codex", "de": "OpenAI Codex" },
      ]
    },
    {
      title: {
        en: "Subproject Lead Data Center Migration & Backup Modernization",
        de: "Teilprojektleiter RZ-Migration & Backup-Modernisierung",
      },
      company: "Joh. Berenberg, Gossler & Co. KG",
      logoUrl: "/logos/berenberg.svg",
      period: { en: "Jan 2024 - Sep 2025", de: "Jan 2024 - Sep 2025" },
      location: {
        en: "Hamburg, Germany",
        de: "Hamburg, Deutschland",
      },
      description: [
        {
          type: "text",
          "text": {
            "en": "Subproject lead within the data center migration project, focusing on Solaris, Linux, storage, and backup environments.",
            "de": "Teilprojektleitung im Rahmen des RZ-Migrationsprojekts mit Schwerpunkt auf Solaris-, Linux-, Storage- und Backup-Umgebungen."
          }
        },
        {
          type: "text",
          "text": {
            "en": "Responsible for the modernization and full implementation of the new enterprise backup platform based on Rubrik Security Cloud.",
            "de": "Verantwortlich für die Modernisierung und Einführung der neuen unternehmensweiten Backup-Plattform auf Basis der Rubrik Security Cloud."
          }
        },
        {
          type: "text",
          "text": {
            "en": "Supported the transition of Solaris infrastructure and legacy systems towards modern, cloud-ready architectures.",
            "de": "Mitverantwortung bei der Weiterentwicklung der Solaris-Infrastruktur und der schrittweisen Ablösung von Legacy-Systemen durch moderne, cloudfähige Architekturen."
          }
        },
        {
          type: "text",
          "text": {
            "en": "Contributed to the redesign and renewal of the legacy network into a modern, segmented structure with improved security focus.",
            "de": "Mitwirkung bei der Neugestaltung und Erneuerung der Legacy-Netzwerkinfrastruktur hin zu einer modernen, segmentierten Architektur mit verbesserter Security-Fokussierung."
          }
        },
        {
          type: "achievement",
          "text": {
            "en": "Successfully led the Rubrik Security Cloud modernization project, enhancing data protection, compliance, and recovery performance across all business units.",
            "de": "Erfolgreiche Leitung des Modernisierungsprojekts der Rubrik Security Cloud mit deutlichen Verbesserungen bei Datensicherheit, Compliance und Wiederherstellungszeiten in allen Fachbereichen."
          }
        },
        {
          type: "achievement",
          "text": {
            "en": "Contributed to the successful relocation of two data centers with minimized downtime and coordinated dependencies across multiple infrastructure domains.",
            "de": "Beitrag zur erfolgreichen Verlagerung von zwei Rechenzentren mit minimalen Ausfallzeiten und abgestimmten Abhängigkeiten über mehrere Infrastrukturbereiche hinweg."
          }
        }
      ],
      tags: [
        { en: "Project Management", de: "Projektmanagement" },
        { en: "Rubrik Security Cloud", de: "Rubrik Security Cloud" },
        { en: "Atlassian Jira", de: "Atlassian Jira" },
        { en: "Atlassian Confluence", de: "Atlassian Confluence" },
        { en: "Microsoft Project", de: "Microsoft Project" },
        { en: "ServiceNow", de: "ServiceNow" },
        { en: "LeanIX", de: "LeanIX" },
        { en: "Delinea", de: "Delinea" },
        { en: "IPv6", de: "IPv6" },
        { en: "Network", de: "Netzwerk" },
        { en: "Compliance", de: "Compliance" },
        { en: "Backup", de: "Backup" },
        { en: "Solaris", de: "Solaris" },
        { en: "Rubrik", de: "Rubrik" },
        { en: "DORA", de: "DORA" },
      ],
    },
    {
      title: {
        en: "Information Security Officer",
        de: "Informationssicherheitsbeauftragter",
      },
      company: "Threedium Ltd.",
      logoUrl: "/logos/threedium.svg",
      period: { en: "Oct 2023 - Jun 2024", de: "Okt 2023 - Jun 2024" },
      location: {
        en: "London, United Kingdom",
        de: "London, Vereinigtes Königreich",
      },
      description: [
        {
          type: "text",
          text: {
            en: "Consulting in all questions about and around IT security.",
            de: "Beratung in allen Fragen der IT-Sicherheit.",
          },
        },
        {
          type: "text",
          text: {
            en: "Support of the DevOps team.",
            de: "Unterstützung des DevOps-Teams.",
          },
        },
        {
          type: "text",
          text: {
            en: "Integration of services in SSO infrastructure.",
            de: "Integration von Diensten in SSO-Infrastruktur.",
          },
        },
        {
          type: "text",
          text: {
            en: "Certificate audit: SOC2 and ISO27001",
            de: "Zertifizierungsaudit: SOC2 und ISO27001.",
          },
        },
        {
          type: "text",
          text: {
            en: "Advice on all aspects of GDPR. Introduction of retention policies and data protection guidelines.",
            de: "Beratung zu allen Aspekten der DSGVO. Einführung von Aufbewahrungsfristen und Datenschutz-Richtlinien.",
          },
        },
        {
          type: "text",
          text: {
            en: "Introduction of security guidelines.",
            de: "Einführung von Sicherheitsrichtlinien.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Implemented IT security measures that passed a SOC2 audit with zero non-conformities, securing key client contracts.",
            de: "Implementierung von IT-Sicherheitsmaßnahmen, die bei einem SOC2-Audit ohne Beanstandungen bestanden.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Integrated SSO infrastructure across multiple platforms, improving security and user experience.",
            de: "Integration der SSO-Infrastruktur über mehrere Plattformen hinweg, Verbesserung der Sicherheit und Benutzererfahrung.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Led the team in passing ISO27001 certification within a tight six-month deadline, which opened new markets for the company.",
            de: "Führung des Teams zur erfolgreichen ISO27001-Zertifizierung innerhalb einer straffen sechsmonatigen Frist, wodurch neue Märkte für das Unternehmen erschlossen wurden.",
          },
        },
      ],
      tags: [
        { en: "Security", de: "Sicherheit" },
        { en: "Data Protection", de: "Datenschutz" },
        { en: "SSO", de: "SSO" },
        { en: "GDPR", de: "DSGVO" },
        { en: "ISO 27001", de: "ISO 27001" },
        { en: "SOC 2", de: "SOC 2" },
        { en: "Atlassian Jira", de: "Atlassian Jira" },
        { en: "Atlassian Confluence", de: "Atlassian Confluence" },
        { en: "Palo Alto Firewall", de: "Palo Alto Firewall" },
        { en: "Cisco", de: "Cisco" },
        { en: "VMware", de: "VMware" },
        { en: "Windows", de: "Windows" },
        { en: "Linux", de: "Linux" },
        { en: "Microsoft Azure", de: "Microsoft Azure" },
        { en: "Incident Response", de: "Incident Response" },
        { en: "Penetration Testing", de: "Penetration Testing" },
      ],
    },
    {
      "title": {
        "en": "Code Review & Security Advisory",
        "de": "Code-Review & Security-Beratung"
      },
      "company": "GEHR Datentechnik GmbH",
      "logoUrl": "/logos/gehr.png",
      "projectScale": "small",
      "period": { "en": "Oct 2023", "de": "Okt 2023" },
      "location": {
        "en": "Mannheim, Germany",
        "de": "Mannheim, Deutschland"
      },
      "description": [
        {
          "type": "text",
          "text": {
            "en": "Comprehensive code review of the existing PHP application with a structured assessment of critical, medium and low-severity issues.",
            "de": "Umfassendes Code-Review der bestehenden PHP-Anwendung mit mit mit strukturierter Bewertung von Findings hoher, mittlerer und niedriger Schwere."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Creation of a detailed review document including technical findings, recommended remediation steps, and prioritization for development teams.",
            "de": "Erstellung eines ausführlichen Review-Papiers mit technischen Befunden, empfohlenen Maßnahmen und Priorisierung für die Entwicklungsteams."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Consulting on application and infrastructure security with a focus on practical improvements, secure coding patterns and operational hardening.",
            "de": "Beratung zu Anwendungs- und Infrastruktursicherheit mit Fokus auf praxisnahe Verbesserungen, sichere Coding-Patterns und betriebliches Hardening."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Support during the implementation phase to fix identified issues and improve overall application resilience.",
            "de": "Unterstützung während der Umsetzung zur Behebung identifizierter Probleme und zur Verbesserung der Gesamtstabilität der Anwendung."
          }
        }
      ],
      "tags": [
        { "en": "Code Review", "de": "Code-Review" },
        { "en": "Security Advisory", "de": "Security-Beratung" },
        { "en": "Vulnerability Analysis", "de": "Schwachstellenanalyse" },
        { "en": "GDPR", "de": "DSGVO" },
        { "en": "OWASP", "de": "OWASP" },
        { "en": "Web Security", "de": "Web-Sicherheit" },
        { "en": "Data Protection", "de": "Datenschutz" },
        { "en": "Risk Assessment", "de": "Risikobewertung" },
        { "en": "Linux", "de": "Linux" },
        { "en": "PHP", "de": "PHP" },
        { "en": "MySQL", "de": "MySQL" },
      ]
    },    
    {
      title: { en: "IT Security Consultant", de: "IT-Sicherheitsexperte" },
      company: "Deutsche Vermögensberatung AG",
      logoUrl: "/logos/dvag.svg",
      period: { en: "Jan 2019 - Sep 2023", de: "Jan 2019 - Sep 2023" },
      location: {
        en: "Frankfurt am Main, Germany",
        de: "Frankfurt am Main, Deutschland",
      },
      description: [
        {
          type: "text",
          text: {
            en: "Consulting regarding any security topics, focus on server and networks.",
            de: "Beratung zu allen Sicherheitsthemen, Schwerpunkt auf Server und Netzwerke.",
          },
        },
        {
          type: "text",
          text: {
            en: "Support and strategy handling during a (large) security incident.",
            de: "Unterstützung und Strategieplanung während eines großen Sicherheitsvorfalls.",
          },
        },
        {
          type: "text",
          text: {
            en: "Writing (security) policies and technical concepts.",
            de: "Erstellung von (Sicherheits-)Richtlinien und technischen Konzepten.",
          },
        },
        {
          type: "text",
          text: {
            en: "Automation vulnerability and inicident management.",
            de: "Automatisierung des Schwachstellen- und Vorfallsmanagements.",
          },
        },
        {
          type: "text",
          text: {
            en: "Support for building IT architecture and strategy (including network architecture, cloud infrastructure, firewall concepts, etc.).",
            de: "Unterstützung beim Aufbau von IT-Architektur und Strategie (einschließlich Netzwerkarchitektur, Cloud-Infrastruktur, Firewall-Konzepte, etc.).",
          },
        },
        {
          type: "text",
          text: {
            en: "Preparation and accompanying of penetration tests (including network, cloud, applications, Active Directory, etc.).",
            de: "Vorbereitung und Begleitung von Penetrationstests (einschließlich Netzwerk, Cloud, Anwendungen, Active Directory, etc.).",
          },
        },
        {
          "type": "text",
          "text": {
            "en": "Led and managed the Security Operations Center (SOC) team, overseeing daily operations, incident response, and continuous improvement of security processes.",
            "de": "Leitung und Management des Security Operations Center (SOC)-Teams, einschließlich der täglichen Betriebsüberwachung, Incident Response und kontinuierlichen Verbesserung der Sicherheitsprozesse."
          },
        },
        {
          type: "text",
          text: {
            en: "Security audits.",
            de: "Sicherheits-Audits.",
          },
        },
        {
          type: "text",
          text: {
            en: "Specialization in the areas of Linux and networking.",
            de: "Spezialisierung in den Bereichen Linux und Netzwerke.",
          },
        },
        {
          type: "text",
          text: {
            en: "IT security consulting also on Windows, Cloud (primarily Azure) and application development.",
            de: "IT-Sicherheitsberatung auch für Windows, Cloud (vor allem Azure) und Anwendungsentwicklung.",
          },
        },
        {
          type: "text",
          text: {
            en: "Advice on data protection and certification issues (e.g. ISO27001, BSI Grundschutz, NIST framework, MITRE).",
            de: "Beratung zu Datenschutz- und Zertifizierungsfragen (z.B. ISO27001, BSI Grundschutz, NIST-Framework, MITRE).",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Managed the response to a major security incident, coordinating efforts that minimized data loss and restored operations.",
            de: "Leitung der Reaktion auf einen großen Sicherheitsvorfall, Koordination der Maßnahmen zur Minimierung von Datenverlusten und Wiederherstellung des Betriebs.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Developed and automated a vulnerability management system, reducing incident response time and increasing system uptime.",
            de: "Entwicklung und Automatisierung eines Schwachstellenmanagementsystems, Reduzierung der Reaktionszeiten bei Vorfällen und Erhöhung der Systemverfügbarkeit.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Implemented security policies that were later adopted as best practices company-wide.",
            de: "Implementierung von Sicherheitsrichtlinien, die später als Best Practices im gesamten Unternehmen übernommen wurden.",
          },
        },
      ],
      tags: [
        { en: "Security", de: "Sicherheit" },
        { en: "GDPR", de: "DSGVO" },
        { en: "ISO 27001", de: "ISO 27001" },
        { en: "BSI / NIS2 / NIST / MITRE", de: "BSI / NIS2 / NIST / MITRE" },
        { en: "ITIL", de: "ITIL" },
        { en: "Guidelines", de: "Richtlinien" },
        { en: "Atlassian Jira & Confluence", de: "Atlassian Jira & Confluence" },
        { en: "Palo Alto / Cisco", de: "Palo Alto / Cisco" },
        { en: "Microsoft Azure", de: "Microsoft Azure" },
        { en: "Microsoft Sentinel", de: "Microsoft Sentinel" },
        { en: "Microsoft Defender", de: "Microsoft Defender" },
        { en: "Microsoft 365", de: "Microsoft 365" },
      ],
    },
    {
      title: {
        en: "Team Coordinator / System Architect",
        de: "Teamkoordinator / Systemarchitekt",
      },
      company: "Deutsche Vermögensberatung AG",
      logoUrl: "/logos/dvag.svg",
      period: { en: "Jul 2015 - Dec 2018", de: "Jul 2015 - Dez 2018" },
      location: {
        en: "Frankfurt am Main, Germany",
        de: "Frankfurt am Main, Deutschland",
      },
      description: [
        {
          type: "text",
          text: {
            en: "Coordination and planning of resources of a small team.",
            de: "Koordination und Ressourcenplanung eines kleinen Teams.",
          },
        },
        {
          type: "text",
          text: {
            en: "Focus of the team: e-mail, cloud storage, load balancing, proxy and DNS (all linux based).",
            de: "Schwerpunkt des Teams: E-Mail, Cloud-Speicher, Lastverteilung, Proxy und DNS (alles Linux-basiert).",
          },
        },
        {
          type: "text",
          text: {
            en: "Debugging und solving of problems mainly in the area mail (but not solely).",
            de: "Fehlerbehebung und Problemlösung hauptsächlich im Bereich E-Mail (aber nicht ausschließlich).",
          },
        },
        {
          type: "text",
          text: {
            en: "Consulting and implementation of IPv6, security topics, high-availability systems and more topics.",
            de: "Beratung und Implementierung von IPv6, Sicherheitsthemen, Hochverfügbarkeitssystemen und weiteren Themen.",
          },
        },
        {
          type: "text",
          text: {
            en: "Project part time management: data centre relocation, reconstruction of all servers.",
            de: "Teilprojektleitung: Rechenzentrumsumzug, Neuaufbau aller Server.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Coordinated a successful data center relocation project.",
            de: "Koordination eines erfolgreichen Rechenzentrumsumzugsprojekts.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Led the implementation of IPv6 across the organization, future-proofing the network.",
            de: "Leitung der Implementierung von IPv6 im gesamten Unternehmen, Zukunftssicherung des Netzwerks.",
          },
        },
        {
          type: "achievement",
          text: {
            en: "Improved team efficiency through the introduction of automated processes and resource management tools.",
            de: "Verbesserung der Teameffizienz durch Einführung automatisierter Prozesse und Ressourcenmanagement-Tools.",
          },
        },
      ],
      tags: [
        { en: "Team Management", de: "Teamleitung" },
        {
          en: "Atlassian Jira & Confluence",
          de: "Atlassian Jira & Confluence",
        },
        { en: "dovecot & postfix", de: "dovecot & postfix" },
        { en: "Microsoft Azure", de: "Microsoft Azure" },
        { en: "IPv6", de: "IPv6" },
        { en: "High-Availability", de: "Hochverfügbarkeit" },
        { en: "Load Balancing", de: "Lastverteilung" },
        { en: "Email", de: "E-Mail" },
        { en: "Cloud Storage", de: "Cloud-Speicher" },
        { en: "Proxy", de: "Proxy" },
        { en: "DNS", de: "DNS" },
      ],
    },
    {
      title: {
        en: "Product Owner / System Architect",
        de: "Product Owner / Systemarchitekt",
      },
      company: "Deutsche Vermögensberatung AG",
      logoUrl: "/logos/dvag.svg",
      period: { en: "Jan 2013 - Jun 2015", de: "Jan 2013 - Jun 2015" },
      location: {
        en: "Frankfurt am Main, Germany",
        de: "Frankfurt am Main, Deutschland",
      },
      "description": [
        {
          "type": "text",
          "text": {
            "en": "Product Owner and system architect for the enterprise-wide email archiving platform, including requirements management, technical roadmap, and long-term evolution.",
            "de": "Product Owner und Systemarchitekt für die unternehmensweite E-Mail-Archivierungsplattform, einschließlich Anforderungsmanagement, technischer Roadmap und langfristiger Weiterentwicklung."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Led the design and implementation of a legally compliant archive for more than 50,000 users, ensuring immutable retention, auditability, and long-term maintainability.",
            "de": "Leitung der Design- und Implementierung eines rechtssicheren Archivs für über 50.000 Nutzer mit rechtssicherer Aufbewahrung, Prüfbarkeit und langfristiger Wartbarkeit."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Introduced scalable storage, redundancy concepts, monitoring, indexing and full-text search to enable efficient retrieval of historical correspondence.",
            "de": "Einführung skalierbarer Speicher- und Redundanzkonzepte sowie Monitoring, Indexierung und Volltextsuche zur effizienten Auffindbarkeit historischer Korrespondenz."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Close collaboration with legal, compliance, and auditing teams to meet regulatory requirements and ensure long-term evidentiary integrity.",
            "de": "Enge Zusammenarbeit mit Legal-, Compliance- und Audit-Teams zur Erfüllung regulatorischer Anforderungen und langfristigen Beweissicherheit."
          }
        },
        {
          "type": "text",
          "text": {
            "en": "Secondary responsibilities in the surrounding mail infrastructure (dovecot, postfix), Linux-based services, DNS, proxy, load balancing and cloud storage.",
            "de": "Nebenverantwortlichkeiten in der umliegenden Mail-Infrastruktur (dovecot, postfix), Linux-basierten Diensten, DNS, Proxy, Lastverteilung und Cloud-Speicher."
          }
        },
        {
          "type": "achievement",
          "text": {
            "en": "Delivered a stable, compliant archive used daily across the entire organization.",
            "de": "Bereitstellung eines stabilen, compliance-gerechten Archivsystems, das im gesamten Unternehmen täglich genutzt wurde."
          }
        },
        {
          "type": "achievement",
          "text": {
            "en": "Established future-proof data retention strategies aligned with strict regulatory expectations.",
            "de": "Etablierung zukunftssicherer Aufbewahrungsstrategien im Einklang mit strengen regulatorischen Vorgaben."
          }
        }
      ],
      tags: [
        { "en": "Email Archiving", "de": "E-Mail-Archivierung" },
        { "en": "Compliance", "de": "Compliance" },
        { "en": "Retention Policies", "de": "Aufbewahrungspflichten" },
        { "en": "dovecot", "de": "dovecot" },
        { "en": "postfix", "de": "postfix" },
        { "en": "Linux", "de": "Linux" },
        { "en": "High Availability", "de": "Hochverfügbarkeit" },
        { "en": "Monitoring", "de": "Monitoring" },
        { "en": "Full-Text Search", "de": "Volltextsuche" },
        { "en": "Indexing", "de": "Indexierung" },
        { "en": "Scalability", "de": "Skalierbarkeit" },
        { "en": "Auditability", "de": "Prüfbarkeit" },
        { "en": "IPv6", "de": "IPv6" }
      ],
    },
  ],
  projects: [
    {
      title: {
        en: "Secure Email Archive",
        de: "Rechtssicheres E-Mail-Archiv",
      },
      description: {
        en: "Led the coordination, architecture, and implementation of a legally compliant enterprise-wide email archiving solution for more than 50,000 users. The system ensures immutable storage of all communication for over 10 years, meeting strict regulatory and auditing requirements. Based on open-source technologies, the archive was designed with scalability, redundancy, and long-term maintainability in mind. Integrated monitoring, indexing, and full-text search enable efficient retrieval of historical correspondence.",
        de: "Leitung der Koordination, Architektur und Implementierung einer rechtssicheren E-Mail-Archivierungslösung für mehr als 50.000 Nutzer. Das System gewährleistet die unveränderbare Speicherung sämtlicher Kommunikation über mehr als 10 Jahre und erfüllt strenge regulatorische sowie prüfungsrelevante Anforderungen. Basierend auf Open-Source-Technologien wurde das Archiv mit Blick auf Skalierbarkeit, Redundanz und langfristige Wartbarkeit konzipiert. Integriertes Monitoring, Indexierung und Volltextsuche ermöglichen ein effizientes Auffinden historischer Korrespondenz."
      },
      imageUrl: "/projects/mailarchive.webp",
      imageAlt: {
        en: "Illustration of a legally compliant email archiving system: Includes an envelope icon, two database stacks, a filing cabinet, a clock, a calendar labeled “10+”, and a shield with a checkmark. Represents long-term, immutable email retention, security, and compliance for over 50,000 users.",
        de: "Symbolgrafik zum rechtssicheren E-Mail-Archiv: Zu sehen sind ein E-Mail-Symbol, zwei Datenbankstapel, ein Aktenschrank, eine Uhr, ein Kalender mit der Aufschrift „10+“ sowie ein Schutzschild mit Haken. Die Illustration steht für langfristige, unveränderbare E-Mail-Aufbewahrung, Sicherheit und Compliance für über 50.000 Nutzer.",
      },
      tags: [
        { en: "dovecot", de: "dovecot" },
        { en: "postfix", de: "postfix" },
        { en: "Linux", de: "Linux" },
        { en: "CentOS", de: "CentOS" },
        { en: "Compliance", de: "Compliance" },
        { en: "Archiving", de: "Archivierung" },
        { en: "Email Security", de: "E-Mail-Sicherheit" }
      ],
    },
    {
      "title": {
        "en": "AI-Supported Case Management",
        "de": "KI-unterstützte Fallbearbeitung"
      },
      "description": {
        "en": "Designed and implemented a system to support the processing of cancer-related cases using AI. The platform integrates secure data handling, structured workflows, and AI-based assistance to prioritize, analyze, and streamline case management. This ensures faster response times and improved quality in handling sensitive medical and legal information.",
        "de": "Konzeption und Implementierung eines Systems zur Unterstützung der Bearbeitung krebsbezogener Fälle mit KI. Die Plattform integriert sichere Datenverarbeitung, strukturierte Workflows und KI-basierte Assistenz, um Fälle zu priorisieren, zu analysieren und die Fallbearbeitung zu optimieren. Dadurch werden schnellere Reaktionszeiten und eine verbesserte Qualität im Umgang mit sensiblen medizinischen und juristischen Informationen gewährleistet."
      },
      "imageUrl": "/projects/ai_case_management.webp",
      "imageAlt": {
        "en": "Illustration showing AI-assisted workflows in case management: secure data vault, AI decision nodes, and case files moving through an optimized pipeline.",
        "de": "Illustration zu KI-gestützten Workflows in der Fallbearbeitung: sicherer Datenspeicher, KI-Entscheidungsknoten und Fallakten, die durch eine optimierte Prozesskette laufen."
      },
      "tags": [
        { "en": "Agentic AI Workflow", "de": "Agentischer KI-Workflow" },
        { "en": "Case Management", "de": "Fallbearbeitung" },
        { "en": "Data Protection", "de": "Datenschutz" },
        { "en": "Automation", "de": "Automatisierung" }
      ]
    },
    {
      title: {
        en: "SOC 2 & ISO 27001 Certification",
        de: "SOC 2 & ISO 27001 Zertifizierung",
      },
      description: {
        en: "Led the successful implementation of SOC 2 and ISO 27001 compliance frameworks, establishing robust information security policies and controls to meet industry standards and ensure data protection.",
        de: "Leitung der erfolgreichen Implementierung der SOC 2- und ISO 27001-Compliance-Frameworks, Aufbau robuster Informationssicherheitsrichtlinien und -kontrollen zur Einhaltung von Industriestandards und Gewährleistung des Datenschutzes.",
      },
      imageUrl: "/projects/soc2_cert.webp",
      imageAlt: {
        en: "Illustration representing SOC 2 and ISO 27001 certification: Shows a certification document with checkmarks for “SOC 2” and “ISO 27001”, a security shield, a padlock, and a secured database icon. The graphic symbolizes information security, compliance, and audit-proof data processing.",
        de: "Illustration zur Darstellung der SOC 2- und ISO 27001-Zertifizierung: Zu sehen sind ein Zertifizierungsdokument mit Häkchen bei „SOC 2“ und „ISO 27001“, ein Sicherheitsschild, ein Vorhängeschloss und ein gesichertes Datenbanksymbol. Die Grafik steht für Informationssicherheit, Compliance und revisionssichere Datenverarbeitung.",
      },
      tags: [
        { en: "SOC 2", de: "SOC 2" },
        { en: "ISO 27001", de: "ISO 27001" },
        { en: "Information Security", de: "Informationssicherheit" },
        { en: "Compliance", de: "Compliance" },
      ],
    },
    {
      "title": {
        "en": "EU AI Act Training Platform",
        "de": "Schulungsplattform zum EU AI Act"
      },
      "description": {
        "en": "Designed and developed a modular training platform covering the EU Artificial Intelligence Act (EU AI Act). The course provides a structured learning path with interactive slides, voice narration, and integrated quizzes to ensure a clear understanding of the regulation’s scope, risk-based framework, and compliance implications. The platform includes five sections — from fundamentals to governance, risk categories, and real-world applications — and was built with future expansion in mind to accommodate upcoming modules on data protection, ethical AI, and technical implementation guidelines.",
        "de": "Konzeption und Aufbau einer modularen Schulungsplattform zum EU-Gesetz über Künstliche Intelligenz (EU AI Act). Der Kurs vermittelt in klar strukturierten Lerneinheiten mit interaktiven Folien, Audiokommentaren und integrierten Quizfragen ein fundiertes Verständnis zu Geltungsbereich, risikobasiertem Ansatz und Compliance-Auswirkungen. Die Plattform umfasst fünf Sektionen – von den Grundlagen über Governance und Risikokategorien bis hin zu Praxisanwendungen – und wurde so entwickelt, dass sie zukünftig um weitere Module zu Datenschutz, ethischer KI und technischen Umsetzungsvorgaben erweitert werden kann."
      },
      "imageUrl": "/projects/ai_act_training.webp",
      "imageAlt": {
        "en": "Screenshot of the EU AI Act training platform showing completed modules, quizzes, and a structured overview of sections such as risk-based approach, governance, and compliance strategies.",
        "de": "Screenshot der Schulungsplattform zum EU AI Act mit abgeschlossenen Modulen, Quizfragen und einer strukturierten Übersicht über Themen wie risikobasierter Ansatz, Governance und Compliance-Strategien."
      },
      "tags": [
        { "en": "EU AI Act", "de": "EU AI Act" },
        { "en": "Compliance Training", "de": "Compliance-Schulung" },
        { "en": "AI Governance", "de": "KI-Governance" },
        { "en": "E-Learning", "de": "E-Learning" },
        { "en": "Education Platform", "de": "Schulungsplattform" },
        { "en": "Regulatory Framework", "de": "Regulatorischer Rahmen" }
      ]
    },
    {
      "title": {
        "en": "Zero-Config IPv6 VPN Network",
        "de": "Zero-Config IPv6 VPN Netzwerk"
      },
      "description": {
        "en": "Designed and implemented a secure, zero-configuration VPN network leveraging IPv6 as the foundation for global connectivity. The solution enables seamless peer-to-peer communication without manual setup, NAT traversal, or complex provisioning, while ensuring strong encryption and modern authentication mechanisms. By combining simple rules with advanced security controls, the network architecture provides resilient, scalable, and privacy-preserving access across distributed environments.",
        "de": "Konzeption und Aufbau eines sicheren Zero-Config-VPN-Netzes auf Basis von IPv6 als Fundament für weltweite Konnektivität. Die Lösung ermöglicht nahtlose Peer-to-Peer-Kommunikation ohne manuelle Einrichtung, NAT-Traversal oder komplexe Provisionierung, bei gleichzeitig starker Verschlüsselung und modernen Authentifizierungsmechanismen. Durch die Kombination von einfachen Regeln mit erweiterten Sicherheitskontrollen entsteht eine widerstandsfähige, skalierbare und datenschutzfreundliche Netzwerkarchitektur für verteilte Umgebungen."
      },
      "imageUrl": "/projects/zeroconfigvpn.webp",
      "imageAlt": {
        "en": "Illustration of a zero-configuration VPN: interconnected shielded devices connected by a global IPv6 network grid, lock icons indicating encryption, and auto-config symbols representing seamless setup without manual intervention.",
        "de": "Symbolgrafik für ein Zero-Config-VPN: Vernetzte, geschützte Geräte, die über ein globales IPv6-Netzwerk verbunden sind, mit Schloss-Symbolen für Verschlüsselung und Auto-Config-Elementen für die nahtlose Einrichtung ohne manuelles Eingreifen."
      },
      "tags": [
        { "en": "IPv6", "de": "IPv6" },
        { "en": "Zero-Config", "de": "Zero-Config" },
        { "en": "VPN", "de": "VPN" },
        { "en": "Encryption", "de": "Verschlüsselung" },
        { "en": "Authentication", "de": "Authentifizierung" },
        { "en": "Compliance", "de": "Compliance" },
        { "en": "Network Security", "de": "Netzwerksicherheit" }
      ]
    },
    {
      title: {
        en: "Backup Infrastructure Modernization with Rubrik",
        de: "Modernisierung der Backup-Infrastruktur mit Rubrik",
      },
      description: {
        en: "Modernized the existing backup infrastructure by implementing Rubrik's enterprise backup solution, enhancing data protection, reducing recovery times, and simplifying management across hybrid environments.",
        de: "Modernisierung der bestehenden Backup-Infrastruktur durch Implementierung von Rubriks Enterprise-Backup-Lösung, Verbesserung des Datenschutzes, Reduzierung der Wiederherstellungszeiten und Vereinfachung des Managements in hybriden Umgebungen.",
      },
      imageUrl: "/projects/backup_rubrik.webp",
      imageAlt: {
        en: "Illustration depicting backup modernization with Rubrik: Features icons of secure cloud storage, data stacks, a recovery arrow, a laptop with an integration symbol, and the Rubrik logo. Represents modern data protection, fast recovery, and seamless system integration.",
        de: "Illustration zur Backup-Modernisierung mit Rubrik: Zu sehen sind Symbole für Cloud-Speicherung mit Sicherheitsschild, Datenbanken, ein Wiederherstellungspfeil, ein Laptop mit Integrationssymbol sowie das Rubrik-Logo. Die Grafik steht für moderne Datensicherung, schnelle Wiederherstellung und nahtlose Systemintegration.",
      },
      tags: [
        { en: "Rubrik", de: "Rubrik" },
        { en: "Backup", de: "Backup" },
        { en: "Data Protection", de: "Datenschutz" },
        { en: "Hybrid Cloud", de: "Hybrid Cloud" },
      ],
    },
    {
      title: {
        en: "Automated Document Management with OCR and AI Categorization",
        de: "Automatisierte Dokumentenverwaltung mit OCR und KI-Kategorisierung",
      },
      description: {
        en: "Developed a private system to digitize all personal documents and letters using OCR technology. Integrated AI-based classification to automatically sort documents into predefined categories, enabling efficient search, retrieval, and archival. Additionally, implemented automated analysis to detect tax-relevant documents for income tax purposes and tag them accordingly.",
        de: "Entwicklung eines privaten Systems zur Digitalisierung aller persönlichen Dokumente und Briefe mittels OCR-Technologie. Integration einer KI-gestützten Klassifizierung zur automatischen Sortierung der Dokumente in vordefinierte Kategorien für effizientes Suchen, Auffinden und Archivieren. Zusätzlich wurde eine automatisierte Auswertung implementiert, um steuerrelevante Dokumente für die Einkommensteuer zu erkennen und entsprechend zu taggen.",
      },
      imageUrl: "/projects/ocr_ai_documents.webp",
      imageAlt: {
        en: "Illustration showing document scanning and AI classification: A scanner, digitized documents, AI nodes connecting to folder icons, and categorized labels like 'Finance', 'Health', and 'Insurance'. Represents automated document processing and intelligent organization.",
        de: "Illustration zur Dokumentenerfassung und KI-Kategorisierung: Ein Scanner, digitalisierte Dokumente, KI-Knoten, die mit Ordnersymbolen verbunden sind, sowie kategorisierte Labels wie 'Finanzen', 'Gesundheit' und 'Versicherung'. Die Grafik steht für automatisierte Dokumentenverarbeitung und intelligente Organisation.",
      },
      tags: [
        { en: "OCR", de: "OCR" },
        { en: "AI Categorization", de: "KI-Kategorisierung" },
        { en: "AI Agent", de: "KI-Agent" },
        { en: "Document Management", de: "Dokumentenverwaltung" },
        { en: "Automation", de: "Automatisierung" },
      ],
    },
  ],
  skills: [
    // Security & Compliance
    {
      name: { en: "ISO27001", de: "ISO27001" },
      icon: ShieldCheck,
      category: "security",
      level: 4,
    },
    {
      name: { en: "SOC2", de: "SOC2" },
      icon: ShieldPlus,
      category: "security",
      level: 4,
    },
    {
      name: { en: "GDPR", de: "DSGVO" },
      icon: Landmark,
      category: "security",
      level: 5,
    },
    {
      name: { en: "NIST Framework", de: "NIST Framework" },
      icon: BookCheck,
      category: "security",
      level: 4,
    },
    {
      name: { en: "MITRE ATT&CK", de: "MITRE ATT&CK" },
      icon: Swords,
      category: "security",
      level: 4,
    },
    {
      name: { en: "BSI IT Baseline Protection", de: "BSI IT-Grundschutz" },
      icon: BookCheck,
      category: "security",
      level: 5,
    },
    {
      name: { en: "Security Policies", de: "Sicherheitsrichtlinien" },
      icon: FileCheck2,
      category: "security",
      level: 5,
    },
    {
      name: { en: "Risk Management", de: "Risikomanagement" },
      icon: AlertTriangle,
      category: "security",
      level: 3,
    },
    {
      name: { en: "Vulnerability Mgmt.", de: "Vulnerabilitätsmanagement" },
      icon: ScanSearch,
      category: "security",
      level: 5,
    },
    {
      name: { en: "Incident Response", de: "Incident Response" },
      icon: Siren,
      category: "security",
      level: 5,
    },
    {
      name: {
        en: "Penetration Testing Mgmt.",
        de: "Penetration Testing Mgmt.",
      },
      icon: Bug,
      category: "security",
      level: 5,
    },
    {
      name: {
        en: "Proxy & Secure Web Gateways",
        de: "Proxy & Secure Web Gateways",
      },
      icon: Shield,
      category: "security",
      level: 4,
    },

    // Infrastructure & Operations
    {
      name: {
        en: "Linux: Debian, Ubuntu, RHEL",
        de: "Linux: Debian, Ubuntu, RHEL",
      },
      icon: SiLinux,
      category: "infrastructure",
      level: 5,
    },
    {
      name: {
        en: "Unix: FreeBSD, OpenBSD, Solaris",
        de: "Unix: FreeBSD, OpenBSD, Solaris",
      },
      icon: SiFreebsd,
      category: "infrastructure",
      level: 3,
    },
    {
      name: { en: "macOS", de: "macOS" },
      icon: SiApple,
      category: "infrastructure",
      level: 5,
    },
    {
      name: { en: "Windows Server", de: "Windows Server" },
      icon: Grid2X2,
      category: "infrastructure",
      level: 2,
    },
    {
      name: { en: "Cloudflare", de: "Cloudflare" },
      icon: SiCloudflare,
      category: "infrastructure",
      level: 4,
    },
    {
      name: { en: "Resend", de: "Resend" },
      icon: SiResend,
      category: "infrastructure",
      level: 5,
    },
    {
      name: { en: "Supabase", de: "Supabase" },
      icon: SiSupabase,
      category: "infrastructure",
      level: 4,
    },
    {
      name: {
        en: "High Availability Systems",
        de: "Hochverfügbarkeitssysteme",
      },
      icon: ServerCrash,
      category: "infrastructure",
      level: 5,
    },
    {
      name: { en: "Data Center Operations", de: "Rechenzentrumsbetrieb" },
      icon: Database,
      category: "infrastructure",
      level: 4,
    },
    {
      name: { en: "TCP/IP, DNS, DHCP", de: "TCP/IP, DNS, DHCP" },
      icon: Network,
      category: "infrastructure",
      level: 5,
    },
    {
      name: { en: "IPv6", de: "IPv6" },
      icon: Cable,
      category: "infrastructure",
      level: 5,
    },

    // Tools & Automation
    {
      name: { en: "Bash / Shell Scripting", de: "Bash / Shell Skripte" },
      icon: Terminal,
      category: "tools",
      level: 5,
    },
    {
      name: { en: "Notion", de: "Notion" },
      icon: SiNotion,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "Git", de: "Git" },
      icon: SiGit,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "Cursor", de: "Cursor" },
      icon: CodeXml,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "Python", de: "Python" },
      icon: SiPython,
      category: "tools",
      level: 3,
    },
    {
      name: { en: "Postfix / Dovecot", de: "Postfix / Dovecot" },
      icon: Mail,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "Bind / Unbound", de: "Bind / Unbound" },
      icon: Globe,
      category: "tools",
      level: 5,
    },
    {
      name: { en: "Squid Proxy", de: "Squid Proxy" },
      icon: Shield,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "HAProxy", de: "HAProxy" },
      icon: GitCompareArrows,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "Caddy", de: "Caddy" },
      icon: SiCaddy,
      category: "tools",
      level: 4,
    },
    {
      name: { en: "Puppet", de: "Puppet" },
      icon: SiPuppet,
      category: "tools",
      level: 3,
    },
    {
      name: { en: "Docker", de: "Docker" },
      icon: SiDocker,
      category: "tools",
      level: 4,
    },

    // Management & Strategy
    {
      name: { en: "Project Management", de: "Projektmanagement" },
      icon: ListChecks,
      category: "management",
      level: 5,
    },
    {
      name: { en: "Team Leadership", de: "Teamleitung" },
      icon: Users,
      category: "management",
      level: 5,
    },
    {
      name: {
        en: "Stakeholder Communication",
        de: "Stakeholder-Kommunikation",
      },
      icon: MessageCircle,
      category: "management",
      level: 5,
    },
    {
      name: { en: "IT Strategy", de: "IT-Strategie" },
      icon: Route,
      category: "management",
      level: 4,
    },
    {
      name: { en: "Technical Concepts", de: "Technische Konzepte" },
      icon: FileText,
      category: "management",
      level: 5,
    },

    // Artificial Intelligence
    {
      name: { en: "Agentic AI", de: "Agentische KI" },
      icon: Bot,
      category: "ai",
      level: 4
    },
    {
      name: { en: "Multimodal AI", de: "Multimodale KI" },
      icon: Image,
      category: "ai",
      level: 5
    },
    {
      name: { en: "Causal AI", de: "Kausale KI" },
      icon: GitBranch,
      category: "ai",
      level: 4
    },
    {
      name: { en: "Lovable", de: "Lovable" },
      icon: Heart,
      category: "ai",
      level: 5
    },
    {
      name: { en: "OpenAI / ChatGPT", de: "OpenAI / ChatGPT" },
      icon: SiOpenai,
      category: "ai",
      level: 5
    },
    {
      name: { en: "Anthropic / Claude", de: "Anthropic / Claude" },
      icon: SiAnthropic,
      category: "ai",
      level: 5
    },
    {
      name: { en: "Google / Gemini", de: "Google / Gemini" },
      icon: SiGooglegemini,
      category: "ai",
      level: 5
    },
    {
      name: { en: "xAI / Grok", de: "xAI / Grok" },
      icon: SiX,
      category: "ai",
      level: 5
    },
    {
      name: { en: "Generative Engine Optimization (GEO)", de: "Generative Engine Optimization (GEO)" },
      icon: SearchCode,
      category: "ai",
      level: 3
    },
    {
      name: { en: "AI Multimedia Generation", de: "KI-Multimediaerzeugung" },
      icon: Video,
      category: "ai",
      level: 3
    },
    {
      name: { en: "AI Ethics & Governance", de: "KI-Ethik & Governance" },
      icon: Scale,
      category: "ai",
      level: 5
    },

    // Languages
    {
      name: { en: "German (Native)", de: "Deutsch (Muttersprache)" },
      icon: Flag,
      category: "languages",
      level: 5,
    },
    {
      name: { en: "English (C2)", de: "Englisch (C2)" },
      icon: Flag,
      category: "languages",
      level: 5,
    },
  ],
  skillsSection: {
    title: {
      en: "Skills & Technologies",
      de: "Fähigkeiten & Technologien",
    },
    subtitle: {
      en: "The tools I rely on to build secure and scalable IT systems",
      de: "Die Werkzeuge, auf die ich für sichere und skalierbare IT-Systeme setze",
    },
    categories: {
      security: { en: "Security", de: "Sicherheit" },
      infrastructure: { en: "Infrastructure", de: "Infrastruktur" },
      tools: { en: "Tools & DevOps", de: "Tools & DevOps" },
      ai: { en: "AI", de: "KI" },
      management: { en: "Management", de: "Management" },
      languages: { en: "Languages", de: "Sprachen" },
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
    cvemail: "uwe.schwarz@degit.de",
    phoneLabel: {
      en: "Phone",
      de: "Telefon",
    },
    phone: "+49 151 64403667",
    socialLinks: {
      github: "https://github.com/uwe-schwarz",
      linkedin: "https://www.linkedin.com/in/uwe-schwarz-282531294",
      xing: "https://www.xing.com/profile/Uwe_Schwarz72",
      x: "https://x.com/e38383",
      freelancermap: "https://www.freelancermap.de/profil/uwe-schwarz",
    },
    birthday: "1978-02-19",
    homepage: "https://uweschwarz.eu",
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
      validation: {
        name: {
          en: "Name must be at least 2 characters long.",
          de: "Name muss mindestens 2 Zeichen lang sein.",
        },
        email: {
          en: "Please enter a valid email address.",
          de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        },
        message: {
          en: "Message must be at least 10 characters long.",
          de: "Nachricht muss mindestens 10 Zeichen lang sein.",
        },
      },
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
  cv: {
    title: { en: "Resume / CV", de: "Lebenslauf / CV" },
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
    /*    builtWith: {
      en: "Built with modern web technologies and a passion for clean code.",
      de: "Erstellt mit modernen Web-Technologien und einer Leidenschaft für sauberen Code.",
    },*/
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
      en: "The operators of linked websites are solely responsible for their content.",
      de: "Für externe Links sind ausschließlich deren Betreiber verantwortlich.",
    },
  },
  privacy: {
    title: {
      en: "Privacy Policy",
      de: "Datenschutzerklärung",
    },
    subtitle: {
      en: "Last updated: August 02, 2025",
      de: "Letzte Aktualisierung: 02. August 2025",
    },
    sections: [
      {
        title: {
          en: "Controller",
          de: "Verantwortliche Stelle",
        },
        paragraphs: [
          {
            en: "Responsible for the processing of personal data:",
            de: "Verantwortlich für die Verarbeitung personenbezogener Daten:",
          },
        ],
        list: [
          {
            en: "Uwe Schwarz",
            de: "Uwe Schwarz",
          },
          {
            en: "Uhlandstr. 20",
            de: "Uhlandstr. 20",
          },
          {
            en: "67069 Ludwigshafen",
            de: "67069 Ludwigshafen",
          },
          {
            en: "Germany",
            de: "Deutschland",
          },
          {
            en: "Email: mail@uweschwarz.eu",
            de: "E-Mail: mail@uweschwarz.eu",
          },
          {
            en: "Phone: +49 151 64403667",
            de: "Telefon: +49 151 64403667",
          },
        ],
      },
      {
        title: {
          en: "Data Protection Officer",
          de: "Datenschutzbeauftragter",
        },
        paragraphs: [
          {
            en: "No Data Protection Officer has been appointed, as this is not required under Art. 37 GDPR.",
            de: "Ein Datenschutzbeauftragter wurde nicht benannt, da dies gemäß Art. 37 DSGVO nicht erforderlich ist."
          }
        ]
      },
      {
        title: {
          en: "Contact Form",
          de: "Kontaktformular",
        },
        paragraphs: [
          {
            en: "This form processes data (name, e-mail, message) solely to reply to your request. Basis: consent / contract performance (Art. 6 GDPR lit. a & b).",
            de: "Die hier eingegebenen Daten (Name, E-Mail, Nachricht) verwenden wir ausschließlich zur Beantwortung deiner Anfrage. Rechtsgrundlage: Einwilligung und Vertragserfüllung (Art. 6 Abs. 1 lit. a & b DSGVO).",
          },
        ]
      },
      {
        title: {
          en: "Use of Third-Party Services",
          de: "Einsatz von Drittanbieter-Diensten",
        },
        paragraphs: [
          {
            en: "This site is hosted by Cloudflare; I do not have direct access to server logs or your IP address there. For the contact form, I use Resend to send emails. Only the data you enter into the form is forwarded – no other personal data is stored. Umami is used for analytics and stores only pseudonymous data.",
            de: "Diese Seite wird bei Cloudflare gehostet; ich habe dort keinen direkten Zugriff auf Server-Logs oder Deine IP-Adresse. Für das Kontaktformular nutze ich Resend, um E-Mails zu versenden. Es werden nur die von Dir im Formular eingegebenen Daten weitergeleitet – weitere personenbezogene Daten werden nicht gespeichert. Umami wird für Analysen verwendet und speichert nur pseudonymisierte Daten.",
          },
          {
            en: "Log retention: max. 30 days",
            de: "Log-Aufbewahrung: max. 30 Tage",
          },
        ],
        list: [
          {
            en: "Cloudflare: 101 Townsend St, San Francisco, CA 94107, USA<br />Cloudflare Germany GmbH: Rosental 7, c/o Mindspace, 80331 München, Germany",
            de: "Cloudflare: 101 Townsend St, San Francisco, CA 94107, USA<br />Cloudflare Germany GmbH: Rosental 7, c/o Mindspace, 80331 München, Germany",
            description: {
              en: "Legal basis: legitimate interests (Art. 6(1)(f) GDPR) to ensure website performance and security.<br />Cloudflare is certified under the EU-U.S. Data Privacy Framework and processes data under its principles. See: https://www.cloudflare.com/privacypolicy/.",
              de: "Rechtsgrundlage: berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Gewährleistung der Performance und Sicherheit der Website.<br />Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert und verarbeitet Daten gemäß dessen Grundsätzen. Details: https://www.cloudflare.com/privacypolicy/."
            }
          },
          {
            en: "Resend: 2261 Market Street #5039, San Francisco, CA 94114, USA",
            de: "Resend: 2261 Market Street #5039, San Francisco, CA 94114, USA",
            description: {
              en: "Legal basis: performance of a contract (Art. 6(1)(b) GDPR), as Resend sends emails on your behalf.<br />Resend’s DPA includes Standard Contractual Clauses (SCC) for transfers to the US. See: https://resend.com/legal/dpa.",
              de: "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO), da Resend E-Mails in deinem Auftrag versendet.<br />Resend nutzt Standardvertragsklauseln (SCC) in ihrem DPA, um den Datentransfer in die USA zu legitimieren. DPA: https://resend.com/legal/dpa."
            }
          },
          {
            en: "Umami Software, Inc.: 1362 42nd Ave., San Francisco, CA, 94122, USA",
            de: "Umami Software, Inc.: 1362 42nd Ave., San Francisco, CA, 94122, USA",
            description: {
              "en": "Legal basis: legitimate interests (Art. 6(1)(f) GDPR) to enable website-analytics in a privacy-respective way.<br />Umami is a privacy-aware web analytics tool that does not use cookies or collect personal identifiers in its standard configuration. See: https://umami.is/privacy.",
              "de": "Rechtsgrundlage: berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Durchführung der Website-Analyse in datenschutzfreundlicher Weise.<br />Umami ist ein datenschutzbewusstes Web-Analytics-Tool, das in seiner Standardkonfiguration keine Cookies verwendet und keine personenbezogenen Kennungen erhebt. Details: https://umami.is/privacy."
            }
          }
        ],
      },
      {
        title: {
          en: "Legal Basis & International Transfers",
          de: "Rechtsgrundlagen & Drittlandsübermittlung",
        },
        paragraphs: [
          {
            en: "Cloudflare processes data under legitimate interests (Art. 6(1)(f) GDPR) and is certified under the EU-US Data Privacy Framework (see https://www.cloudflare.com/privacypolicy).",
            de: "Cloudflare verarbeitet Daten auf Basis berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) und ist nach dem EU-US Data Privacy Framework zertifiziert (siehe https://www.cloudflare.com/privacypolicy)."
          },
          {
            en: "Resend acts on contract performance (Art. 6(1)(b) GDPR) and uses Standard Contractual Clauses for US transfers (see https://resend.com/legal/dpa).",
            de: "Resend handelt zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und nutzt Standardvertragsklauseln für Datenübermittlungen in die USA (siehe https://resend.com/legal/dpa)."
          }
        ]
      },
      {
        title: {
          en: "Cookies and Local Storage",
          de: "Cookies und Local Storage",
        },
        paragraphs: [
          {
            en: "I do not use cookies. Only your language choice and theme preference are stored locally in your browser’s localStorage. The storage of theme preferences and language selection in localStorage is based on legitimate interests (Art. 6(1)(f) GDPR) to enhance user experience. You can clear this at any time in your browser settings.",
            de: "Ich verwende keine Cookies. Lediglich Deine Sprachwahl und Theme-Einstellung werden lokal im localStorage Deines Browsers gespeichert. Die Speicherung von Theme-Einstellungen und Sprachwahl im localStorage beruht auf berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Verbesserung der Benutzererfahrung. Du kannst diese Daten jederzeit über deine Browser-Einstellungen löschen.",
          },
        ],
      },
      {
        title: {
          en: "External Links",
          de: "Externe Links",
        },
        paragraphs: [
          {
            en: "The site contains links to GitHub, LinkedIn, Xing, Freelancermap and X (formerly Twitter). Since I embed no external content, clicking these links may transfer you to the respective platforms, whose privacy policies then apply.",
            de: "Die Seite enthält Links zu GitHub, LinkedIn, Xing, Freelancermap und X (ehemals Twitter). Da keine externen Inhalte eingebunden sind, wirst Du beim Anklicken dieser Links auf die jeweiligen Plattformen weitergeleitet, deren Datenschutzerklärungen dann gelten.",
          },
        ],
      },
      {
        title: {
          en: "Data Security",
          de: "Datensicherheit",
        },
        paragraphs: [
          {
            en: "I take reasonable technical and organizational measures to protect your data against unauthorized access and loss. However, internet-based data transmission can never be 100% secure.",
            de: "Ich ergreife angemessene technische und organisatorische Maßnahmen, um Deine Daten vor unbefugtem Zugriff und Verlust zu schützen. Eine 100%ige Sicherheit bei der Datenübertragung im Internet kann ich jedoch nicht garantieren.",
          },
          {
            en: "Technical and Organisational Measures: this site uses TLS 1.3 (if supported by your browser), access controls with MFA, pseudonymisation/encryption at rest, and regular security audits.",
            de: "Technisch-organisatorische Maßnahmen: diese Seite nutzt TLS 1.3 (falls vom Browser unterstützt), Zugangskontrollen mit MFA, Pseudonymisierung/Verschlüsselung ruhender Daten und regelmäßige Sicherheitsaudits."
          }
        ],
      },
      {
        title: {
          en: "Data Subject Rights",
          de: "Betroffenenrechte",
        },
        paragraphs: [
          {
            en: "Data subjects have the right to access (Art. 15), rectify (Art. 16), erase (Art. 17), restrict processing (Art. 18), data portability (Art. 20), object (Art. 21), and withdraw consent at any time (Art. 7(3)). These rights can be exercised by contacting mail@uweschwarz.eu.",
            de: "Betroffene Personen haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) sowie Widerruf erteilter Einwilligungen (Art. 7 Abs. 3). Diese Rechte können unter mail@uweschwarz.eu geltend gemacht werden.",
          },
        ],
      },
      {
        title: {
          en: "Supervisory Authority",
          de: "Aufsichtsbehörde",
        },
        paragraphs: [
          {
            en: "You have the right to lodge a complaint with a supervisory authority, e.g.: Rhineland-Palatinate Commissioner for Data Protection, Hintere Bleiche 34, 55116 Mainz, Germany; Tel. +49 6131 8920-0; poststelle@datenschutz.rlp.de.",
            de: "Du kannst dich bei einer Aufsichtsbehörde beschweren, z. B.: Landesbeauftragte für Datenschutz RLP, Hintere Bleiche 34, 55116 Mainz; Tel. 06131 8920-0; poststelle@datenschutz.rlp.de."
          }
        ]
      },
      {
        title: {
          en: "Automated Decision-making",
          de: "Automatisierte Entscheidungsfindung",
        },
        paragraphs: [
          {
            en: "No automated decision-making or profiling takes place in these processing operations (Art. 22 GDPR).",
            de: "Es findet keine automatisierte Entscheidungsfindung oder Profiling statt (Art. 22 DSGVO)."
          }
        ]
      },
      {
        title: {
          en: "Changes to This Privacy Policy",
          de: "Änderungen dieser Datenschutzerklärung",
        },
        paragraphs: [
          {
            en: "I may update this Privacy Policy at any time. The current version is published here with the date of last revision.",
            de: "Ich kann diese Datenschutzerklärung jederzeit aktualisieren. Die jeweils aktuelle Version wird hier mit Datum der letzten Änderung veröffentlicht.",
          },
        ],
      }
    ],
  },
  sitemap: {
    title: {
      en: "Sitemap",
      de: "Seitenübersicht",
    },
    description: {
      en: "Here are all the pages on this website:",
      de: "Hier sind alle Seiten dieser Website:",
    },
  },
  llms: {
    title: {
      en: "Overview for AI Agents",
      de: "Übersicht für AI Agents",
    },
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
  backToHome: { en: "Back to Home", de: "Zurück zur Startseite" },
  experienceSectionTitle: { en: "Experience", de: "Berufserfahrung" },
  experienceBigProjectsTitle: {
    en: "Key Projects",
    de: "Schlüsselprojekte",
  },
  experienceBigProjectsSubtitle: {
    en: "Major technical and organizational engagements with high responsibility.",
    de: "Wesentliche technische und organisatorische Engagements mit hoher Verantwortung.",
  },
  experienceBigProjectsNote: {
    en: "A curated selection of multi-month and multi-year work; further details on request.",
    de: "Eine kuratierte Auswahl mehrmonatiger und mehrjähriger Arbeiten; weitere Details auf Anfrage.",
  },
  experienceSmallProjectsTitle: {
    en: "Additional & Focused Projects",
    de: "Zusatz- & Schwerpunktprojekte",
  },
  experienceSmallProjectsSubtitle: {
    en: "Complementary or specialized projects with flexible scope.",
    de: "Ergänzende oder spezialisierte Projekte mit flexiblem Umfang.",
  },
  experienceSmallProjectsNote: {
    en: "Specialized, flexible, or focused initiatives that complement the broader work.",
    de: "Spezialisierte, flexible oder fokussierte Initiativen, die die Gesamtarbeit ergänzen.",
  },
  experienceAchievementPrefix: { en: "Achievement:", de: "Erfolg:" },
  moreProjects: {
    en: "More previous projects or references available upon request.",
    de: "Weitere frühere Projekte oder Referenzen sind auf Anfrage verfügbar.",
  },
  downloadResume: { en: "Download CV", de: "Lebenslauf herunterladen" },
};
