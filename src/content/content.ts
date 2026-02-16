import type { ComponentType } from "react";
import {
  AlertTriangle,
  BookCheck,
  Bot,
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
  de: string;
  en: string;
}

export interface NavItem {
  href: string;
  label: LocalizedString;
}

export interface HeroSection {
  availability: HeroAvailability;
  ctaPrimary: LocalizedString;
  ctaSecondary: LocalizedString;
  decorativeElements: Array<{
    code: string;
    distance: number;
    position: number;
  }>;
  description: LocalizedString;
  imageAlt: LocalizedString;
  name: string;
  scrollText: LocalizedString;
  titleElements: Array<LocalizedString>;
}

export interface HeroAvailability {
  badge: LocalizedString;
  currentLine: LocalizedString;
  currentPercentAvailable: number;
  fullLine: LocalizedString;
  fullyAvailableDate: string;
  title: LocalizedString;
}

export interface AboutSection {
  imageAlt: LocalizedString;
  labels: {
    experience: LocalizedString;
    projects: LocalizedString;
    technologies: LocalizedString;
  };
  paragraphs: Array<LocalizedString>;
  stats: Array<{ key: string; value: LocalizedString }>;
  title: LocalizedString;
}

export interface ExperienceDescriptionItem {
  text: LocalizedString;
  type: "text" | "achievement";
}

export interface Experience {
  company: string;
  description: Array<ExperienceDescriptionItem>;
  location: LocalizedString;
  logoUrl?: string;
  period: LocalizedString;
  projectScale?: "major" | "small";
  tags: Array<LocalizedString>;
  title: LocalizedString;
}

export interface Project {
  demoUrl?: string;
  description: LocalizedString;
  imageAlt: LocalizedString;
  imageUrl: string;
  repoUrl?: string;
  tags: Array<LocalizedString>;
  title: LocalizedString;
}

export interface Skill {
  category: "languages" | "management" | "security" | "infrastructure" | "tools" | "ai";
  icon: ComponentType<{ className?: string }>;
  level: number;
  name: LocalizedString;
}

export interface SkillsSection {
  categories: {
    ai: LocalizedString;
    infrastructure: LocalizedString;
    languages: LocalizedString;
    management: LocalizedString;
    security: LocalizedString;
    tools: LocalizedString;
  };
  subtitle: LocalizedString;
  title: LocalizedString;
}

export interface ContactSection {
  birthday?: string;
  cvemail: string;
  email: string;
  emailLabel: LocalizedString;
  findMeOn: LocalizedString;
  formLabels: {
    email: LocalizedString;
    message: LocalizedString;
    name: LocalizedString;
    send: LocalizedString;
  };
  formPlaceholders: {
    email: LocalizedString;
    message: LocalizedString;
    name: LocalizedString;
  };
  formStatus: {
    errorDescription: LocalizedString;
    errorTitle: LocalizedString;
    sending: LocalizedString;
    sentDescription: LocalizedString;
    sentTitle: LocalizedString;
    validation: {
      email: {
        de: string;
        en: string;
      };
      message: {
        de: string;
        en: string;
      };
      name: {
        de: string;
        en: string;
      };
    };
  };
  homepage?: string;
  infoText: LocalizedString;
  infoTitle: LocalizedString;
  phone: string;
  phoneLabel: LocalizedString;
  socialLinks: {
    bluesky?: string;
    freelancermap?: string;
    github?: string;
    linkedin?: string;
    x?: string;
    xing?: string;
  };
  subtitle: LocalizedString;
  title: LocalizedString;
}

export interface CV {
  title: LocalizedString;
}

export interface Footer {
  builtWith?: LocalizedString;
  copyright: LocalizedString;
  links: Array<NavItem>;
}

export interface ImprintSection {
  address: {
    city: LocalizedString;
    country: LocalizedString;
    street: LocalizedString;
  };
  companyName: LocalizedString;
  contactInfoTitle: LocalizedString;
  contactTitle: LocalizedString;
  disclaimer: LocalizedString;
  disclaimerTitle: LocalizedString;
  email: string;
  emailLabel: LocalizedString;
  legalTitle?: LocalizedString;
  phone: string;
  phoneLabel: LocalizedString;
  registrationInfo?: LocalizedString;
  representative?: LocalizedString;
  title: LocalizedString;
  vatId?: LocalizedString;
}

export interface PrivacySection {
  sections: Array<{
    list?: Array<
      | LocalizedString
      | {
          de: string;
          description?: LocalizedString;
          en: string;
        }
    >;
    paragraphs: Array<LocalizedString>;
    title: LocalizedString;
  }>;
  subtitle: LocalizedString;
  title: LocalizedString;
}

export interface SitemapSection {
  description: LocalizedString;
  title: LocalizedString;
}

export interface LLMSSection {
  title: LocalizedString;
}

export interface SiteContent {
  about: AboutSection;
  backToHome: LocalizedString;
  contact: ContactSection;
  cv: CV;
  downloadResume: LocalizedString;
  experienceAchievementPrefix: LocalizedString;
  experienceBigProjectsNote: LocalizedString;
  experienceBigProjectsSubtitle: LocalizedString;
  experienceBigProjectsTitle: LocalizedString;
  experiences: Array<Experience>;
  experienceSectionTitle: LocalizedString;
  experienceSmallProjectsNote: LocalizedString;
  experienceSmallProjectsSubtitle: LocalizedString;
  experienceSmallProjectsTitle: LocalizedString;
  footer: Footer;
  hero: HeroSection;
  imprint: ImprintSection;
  llms?: LLMSSection;
  moreProjects: LocalizedString;
  navigation: Array<NavItem>;
  privacy: PrivacySection;
  projects: Array<Project>;
  projectsSectionMore?: LocalizedString;
  projectsSectionTitle: LocalizedString;
  sitemap?: SitemapSection;
  siteMetadata: {
    author: string;
    description: LocalizedString;
    title: string;
  };
  skills: Array<Skill>;
  skillsSection: SkillsSection;
  translations: {
    languageSwitch: {
      de: string;
      en: string;
    };
    themeSwitch: {
      dark: LocalizedString;
      light: LocalizedString;
    };
  };
}

export const siteContent: SiteContent = {
  /*  projectsSectionMore: { en: "View More Projects on GitHub", de: "Mehr Projekte auf GitHub ansehen" }, */
  about: {
    imageAlt: {
      de: "Illustration von Uwe in drei Rollen: oben arbeitet er am Computer mit grünem Code auf dem Bildschirm, symbolisch unterstützt von einer KI. Unten links erklärt er ein Netzwerk-Diagramm auf einem Flipchart, und unten rechts hält er eine Präsentation mit einem Fortschrittsdiagramm. Die Szenen sind durch geschwungene Linien verbunden, was den fließenden Übergang zwischen Technik, Planung und Kommunikation darstellt.",
      en: "Illustration of Uwe in three roles: at the top, he is working on a computer with green code on the screen, symbolically supported by an AI. At the bottom left, he explains a network diagram on a flipchart, and at the bottom right, he gives a presentation with a progress chart. The scenes are connected by flowing lines, representing the seamless transition between technology, planning, and communication.",
    },
    labels: {
      experience: { de: "Jahre Erfahrung", en: "Years of Experience" },
      projects: { de: "Abgeschlossene Projekte", en: "Completed Projects" },
      technologies: { de: "Technologien", en: "Technologies" },
    },
    paragraphs: [
      {
        de: "Mit über zwei Jahrzehnten praktischer Erfahrung in der IT und Projektleitung spezialisiere ich mich auf den Aufbau sicherer, skalierbarer und zukunftsfähiger Systeme. Von kritischen Rechenzentrumsumzügen bis hin zur Weiterentwicklung von Sicherheitsstrategien für regulierte Branchen habe ich vielfältige Teams und Projekte geleitet, die messbare Ergebnisse liefern.",
        en: "With over two decades of hands-on experience in IT and project leadership, I specialize in building secure, scalable, and future-ready systems. From high-stakes data center migrations to evolving security strategies for regulated industries, I’ve led diverse teams and initiatives that drive tangible business outcomes.",
      },
      {
        de: "Ich fungiere als Brücke zwischen technischer Komplexität und strategischer Klarheit. Ob es darum geht, Teams auf eine Sicherheits-Roadmap auszurichten, Infrastrukturen zu modernisieren oder Compliance-Anforderungen in greifbare Maßnahmen zu übersetzen – ich bringe einen kühlen Kopf, ruhige Hände und die Leidenschaft mit, Technik und Menschen zusammenzubringen.",
        en: "I act as the bridge between technical complexity and strategic clarity. Whether I’m aligning teams on a security roadmap, modernizing infrastructure, or translating compliance requirements into real-world action, I bring a clear head, calm hands, and a passion for connecting the dots between tech and people.",
      },
      {
        de: "Abseits des Tagesgeschäfts bleibe ich neugierig. Besonders faszinieren mich KI-Technologien und ihr Potenzial, von Cybersicherheit bis Benutzererlebnis neue Maßstäbe zu setzen. Ich experimentiere gerne mit neuen Tools, self-hosted Lösungen und smarten Workflows – immer mit Blick auf das, was praktikabel, elegant und sicher ist.",
        en: "Outside the day-to-day, I stay curious. I’m particularly fascinated by AI and its potential to enhance everything from cybersecurity to user experience. I enjoy experimenting with new tools, self-hosted solutions, and smart workflows – always with an eye on what’s practical, elegant, and secure.",
      },
    ],
    stats: [
      { key: "experience", value: { de: "20+", en: "20+" } },
      { key: "projects", value: { de: "30+", en: "30+" } },
      { key: "technologies", value: { de: "50+", en: "50+" } },
    ],
    title: {
      de: "Über Mich",
      en: "About Me",
    },
  },
  backToHome: { de: "Zurück zur Startseite", en: "Back to Home" },
  contact: {
    birthday: "1978-02-19",
    cvemail: "uwe.schwarz@degit.de",
    email: "mail@uweschwarz.eu",
    emailLabel: {
      de: "E-Mail an",
      en: "Email me at",
    },
    findMeOn: { de: "Finde mich auf", en: "Find me on" },
    formLabels: {
      email: { de: "E-Mail", en: "Email" },
      message: { de: "Nachricht", en: "Message" },
      name: { de: "Name", en: "Name" },
      send: { de: "Nachricht senden", en: "Send Message" },
    },
    formPlaceholders: {
      email: { de: "Deine E-Mail", en: "Your email" },
      message: { de: "Deine Nachricht", en: "Your message" },
      name: { de: "Dein Name", en: "Your name" },
    },
    formStatus: {
      errorDescription: {
        de: "Nachricht konnte nicht gesendet werden. Bitte versuche es später noch einmal.",
        en: "Failed to send message. Please try again later.",
      },
      errorTitle: { de: "Fehler", en: "Error" },
      sending: { de: "Senden...", en: "Sending..." },
      sentDescription: {
        de: "Danke für deine Nachricht. Ich werde mich bald bei dir melden.",
        en: "Thanks for reaching out. I'll get back to you soon.",
      },
      sentTitle: { de: "Nachricht gesendet!", en: "Message sent!" },
      validation: {
        email: {
          de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          en: "Please enter a valid email address.",
        },
        message: {
          de: "Nachricht muss mindestens 10 Zeichen lang sein.",
          en: "Message must be at least 10 characters long.",
        },
        name: {
          de: "Name muss mindestens 2 Zeichen lang sein.",
          en: "Name must be at least 2 characters long.",
        },
      },
    },
    homepage: "https://uweschwarz.eu",
    infoText: {
      de: "Kontaktiere mich gerne für Zusammenarbeiten oder einfach nur für ein freundliches Hallo.",
      en: "Feel free to reach out for collaborations or just a friendly hello.",
    },
    infoTitle: { de: "Lass uns in Kontakt treten", en: "Let's Connect" },
    phone: "+49 151 64403667",
    phoneLabel: {
      de: "Telefon",
      en: "Phone",
    },
    socialLinks: {
      freelancermap: "https://www.freelancermap.de/profil/uwe-schwarz",
      github: "https://github.com/uwe-schwarz",
      linkedin: "https://www.linkedin.com/in/uwe-schwarz-282531294",
      x: "https://x.com/e38383",
      xing: "https://www.xing.com/profile/Uwe_Schwarz72",
    },
    subtitle: {
      de: "Interesse an einer Zusammenarbeit? Kontaktieren Sie mich gerne!",
      en: "Interested in working together? Feel free to reach out!",
    },
    title: {
      de: "Kontakt aufnehmen",
      en: "Get In Touch",
    },
  },
  cv: {
    title: { de: "Lebenslauf / CV", en: "Resume / CV" },
  },
  downloadResume: { de: "Lebenslauf herunterladen", en: "Download CV" },
  experienceAchievementPrefix: { de: "Erfolg:", en: "Achievement:" },
  experienceBigProjectsNote: {
    de: "Eine kuratierte Auswahl mehrmonatiger und mehrjähriger Arbeiten; weitere Details auf Anfrage.",
    en: "A curated selection of multi-month and multi-year work; further details on request.",
  },
  experienceBigProjectsSubtitle: {
    de: "Wesentliche technische und organisatorische Engagements mit hoher Verantwortung.",
    en: "Major technical and organizational engagements with high responsibility.",
  },
  experienceBigProjectsTitle: {
    de: "Schlüsselprojekte",
    en: "Key Projects",
  },
  experiences: [
    {
      company: "DEGIT AG",
      description: [
        {
          text: {
            de: "Informationssicherheitsbeauftragter sowie Datenschutz- und Privatsphärebeauftragter.",
            en: "Information Security Officer and Data Protection and Privacy Officer.",
          },
          type: "text",
        },
        {
          text: {
            de: "Zugang zu Experten aus verschiedenen Bereichen.",
            en: "Access to experts from multiple fields.",
          },
          type: "text",
        },
        {
          text: {
            de: "Kompetenter und fokussierter Partner für alle Beratungsanforderungen.",
            en: "Competent and focused partner for all consulting needs.",
          },
          type: "text",
        },
        {
          text: {
            de: "Aufbau einer sicheren und rechtskonformen IT-Infrastruktur mit Schwerpunkt auf modernen Technologien (IPv6, Zero Trust, Zero-Config VPN, etc.) und Best Practices.",
            en: "Building a secure and compliant IT infrastructure with a focus on modern technologies (IPv6, Zero Trust, Zero-Config VPN, etc.) and best practices.",
          },
          type: "text",
        },
        {
          text: {
            de: "Verantwortlich für Governance in den Bereichen IT-Sicherheit, Datenschutz und Compliance.",
            en: "Responsible for corporate governance in IT security, privacy and compliance topics.",
          },
          type: "text",
        },
      ],
      location: { de: "Hockenheim, Deutschland", en: "Hockenheim, Germany" },
      logoUrl: "/logos/degit.png",
      period: { de: "Mai 2018 - Heute", en: "May 2018 - Present" },
      projectScale: "small",
      tags: [
        { de: "Sicherheit", en: "Security" },
        { de: "Datenschutz", en: "Privacy" },
        { de: "Microsoft 365", en: "Microsoft 365" },
        { de: "Notion", en: "Notion" },
        { de: "Cloudflare", en: "Cloudflare" },
        { de: "Resend", en: "Resend" },
        { de: "Supabase", en: "Supabase" },
        { de: "IPv6", en: "IPv6" },
        { de: "Zero Trust", en: "Zero Trust" },
        { de: "Zero-Config VPN", en: "Zero-Config VPN" },
        { de: "Governance", en: "Governance" },
        { de: "Training", en: "Training" },
        { de: "Sicherheitsbewusstsein", en: "Security Awareness" },
        { de: "Risikomanagement", en: "Risk Management" },
        { de: "Compliance", en: "Compliance" },
        { de: "EU AI Act", en: "EU AI Act" },
      ],
      title: {
        de: "Vorstandsmitglied",
        en: "Member of the Board",
      },
    },
    {
      company: "Deutsche Rentenversicherung (RP, BW)",
      description: [
        {
          text: {
            de: "Leitung der IPv6-Migration für DRV RP und DRV BW inklusive Governance, Planungsrhythmus und Umsetzungssteuerung.",
            en: "Leading the IPv6 migration for DRV RP, and DRV BW, including governance, planning cadence, and execution tracking.",
          },
          type: "text",
        },
        {
          text: {
            de: "Aufbau und operative Einführung eines Projektsteuerungsmodells mit Dashboard, Action Board, KPI-Portfolio, Risikoregister und Entscheidungsindex.",
            en: "Built and operationalized a project control model with dashboard, action board, KPI portfolio, risk register, and decision index.",
          },
          type: "text",
        },
        {
          text: {
            de: "Koordination der Architektur-, Sicherheits- und Rollout-Vorbereitung über Adressierung, Segmentierung, Dual-Stack-Übergang, Testlabor-Planung und teamübergreifende Abhängigkeiten hinweg.",
            en: "Coordinating architecture, security, and rollout preparation across addressing, segmentation, dual-stack transition, test-lab planning, and cross-team dependencies.",
          },
          type: "text",
        },
        {
          text: {
            de: "Steuerung der compliance-relevanten Abstimmung zu BSI-, NIS2- und KRITIS-Anforderungen, Evidence-Pflicht und transparentem Reporting an Management und Stakeholder beim Träger.",
            en: "Driving compliance-relevant alignment for BSI, NIS2, and critical infrastructure requirements, evidence obligations, and transparent reporting to management and stakeholder groups within the institution.",
          },
          type: "text",
        },
        {
          text: {
            de: "Etablierung eines wiederverwendbaren Intake-to-Governance-Workflows, um nachvollziehbare Actions, Risiken, offene Fragen und Nachweisanfragen zu erstellen.",
            en: "Established a reusable intake-to-governance workflow to create traceable actions, risks, questions, and evidence requests.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Schaffung der operativen Baseline für die Programmausführung mit messbaren KPIs, klaren Verantwortlichkeiten und Entscheidungstransparenz.",
            en: "Created the operational baseline for program execution with measurable KPIs, ownership clarity, and decision transparency.",
          },
          type: "achievement",
        },
      ],
      location: {
        de: "Karlsruhe & Speyer, Deutschland",
        en: "Karlsruhe & Speyer, Germany",
      },
      logoUrl: "/logos/drv.svg",
      period: { de: "Jan 2026 - Heute", en: "Jan 2026 - Today" },
      tags: [
        { de: "Programmmanagement", en: "Program Management" },
        { de: "Projektgovernance", en: "Project Governance" },
        { de: "IPv6", en: "IPv6" },
        { de: "Netzwerkarchitektur", en: "Network Architecture" },
        { de: "Dual Stack", en: "Dual Stack" },
        { de: "Adressmanagement", en: "Address Management" },
        { de: "BSI", en: "BSI" },
        { de: "KRITIS", en: "CI" },
        { de: "NIS2", en: "NIS2" },
        { de: "Compliance", en: "Compliance" },
        { de: "Risikomanagement", en: "Risk Management" },
        { de: "KPI-Management", en: "KPI Management" },
        { de: "Nachweismanagement", en: "Evidence Management" },
        { de: "Atlassian Jira", en: "Atlassian Jira" },
        { de: "Confluence", en: "Confluence" },
        { de: "Microsoft PowerPoint", en: "Microsoft PowerPoint" },
        { de: "Infoblox (IPAM)", en: "Infoblox (IPAM)" },
      ],
      title: {
        de: "Programmleitung IPv6-Migration",
        en: "Program Lead IPv6 Migration",
      },
    },
    {
      company: "xtensible UG (haftungsbeschränkt) & Co. KG",
      description: [
        {
          text: {
            de: "Konzeption und Umsetzung einer modernen, responsiven Trainingsplattform f\u00fcr Compliance- und KI-Themen mit Mandantentrennung und RBAC.",
            en: "Designed and built a modern, responsive training platform for compliance and AI topics with tenant isolation and role-based access.",
          },
          type: "text",
        },
        {
          text: {
            de: "Umsetzung von Security-by-Design mit Postgres Row-Level Security, Audit-Logs, Rate Limiting sowie geh\u00e4rteten Auth-Flows (Passkey/Magic Link/2FA/SSO).",
            en: "Implemented security-by-design with Postgres Row-Level Security, audit logging, rate limiting, and hardened authentication flows (Passkey/Magic Link/2FA/SSO).",
          },
          type: "text",
        },
        {
          text: {
            de: "Aufbau der Kursplattform inkl. Fortschritts-Tracking, Quiz, Zuweisungen sowie Admin-Dashboards f\u00fcr Tenant-/User-Management.",
            en: "Built course delivery with progress tracking, quizzes, enrollments, and admin dashboards for tenant/user management.",
          },
          type: "text",
        },
        {
          text: {
            de: "Implementierung manipulationssicherer PDF-Zertifikate mit QR-Verifikation und kryptografischem Hashing inkl. Bulk-Export f\u00fcr Audits.",
            en: "Delivered tamper-evident PDF certificates with QR verification and cryptographic hashing; enabled bulk export for audits.",
          },
          type: "text",
        },
        {
          text: {
            de: "Integration von Stripe-Abrechnung (Subscriptions, Portal, Webhooks) inkl. Lizenzmodellen und Soft-Lock-Mechanismen f\u00fcr Tenant-Limits.",
            en: "Integrated Stripe billing (subscriptions, portal, webhooks) with license models and soft-lock mechanisms for tenant limits.",
          },
          type: "text",
        },
        {
          text: {
            de: "Tech: Next.js (App Router), TypeScript, Bun, Tailwind, next-intl (DE/EN), Neon Postgres, Stripe, Resend, Vitest/Playwright.",
            en: "Tech: Next.js (App Router), TypeScript, Bun, Tailwind, next-intl (DE/EN), Neon Postgres, Stripe, Resend, Vitest/Playwright.",
          },
          type: "text",
        },
      ],
      location: { de: "Hockenheim, Deutschland", en: "Hockenheim, Germany" },
      logoUrl: "/logos/schlaufabrik.png",
      period: { de: "Dezember 2025 - Heute", en: "December 2025 - Present" },
      projectScale: "small",
      tags: [
        { de: "Multi-Tenant", en: "Multi-tenant" },
        { de: "Compliance", en: "Compliance" },
        { de: "KI-Training", en: "AI Training" },
        { de: "RBAC", en: "RBAC" },
        { de: "Postgres RLS", en: "Postgres RLS" },
        { de: "Stripe", en: "Stripe" },
        { de: "Next.js", en: "Next.js" },
        { de: "TypeScript", en: "TypeScript" },
        { de: "Tailwind", en: "Tailwind" },
        { de: "Neon Postgres", en: "Neon Postgres" },
        { de: "Vitest", en: "Vitest" },
        { de: "Playwright", en: "Playwright" },
      ],
      title: {
        de: "SchlauFabrik \u2013 Multi-Tenant Compliance- & KI-Trainingsplattform",
        en: "SchlauFabrik \u2013 Multi-tenant Compliance & AI Training Platform",
      },
    },
    {
      company: "AKTion gegen Krebs gUG",
      description: [
        {
          text: {
            de: "Gründungsmitglied mit Verantwortung für Datenschutz und DSGVO-Compliance.",
            en: "Founding member responsible for data protection and GDPR compliance.",
          },
          type: "text",
        },
        {
          text: {
            de: "Entwicklung und Betreuung der Backend-Systeme.",
            en: "Developed and maintain the organization's backend systems.",
          },
          type: "text",
        },
        {
          text: {
            de: "Planung und Implementierung KI-gestützter Workflows für die Fallbearbeitung.",
            en: "Planning and implementing AI-supported workflows for case management.",
          },
          type: "text",
        },
        {
          text: {
            de: "Verantwortlich für IT-Sicherheitsstrategie und Risikomanagement.",
            en: "Responsible for IT security strategy and risk management.",
          },
          type: "text",
        },
        {
          text: {
            de: "Aufbau eines DSGVO-konformen Datenschutzrahmens von Grund auf.",
            en: "Established GDPR-compliant data protection framework from the ground up.",
          },
          type: "text",
        },
      ],
      location: { de: "Seevetal, Deutschland", en: "Seevetal, Germany" },
      logoUrl: "/logos/aktion-gegen-krebs.png",
      period: { de: "Mai 2025 - Heute", en: "May 2025 - Present" },
      projectScale: "small",
      tags: [
        { de: "Datenschutz", en: "Data Protection" },
        { de: "IT-Sicherheit", en: "IT Security" },
        { de: "KI-Workflows", en: "AI Workflows" },
        { de: "Agentische KI (Agentic AI)", en: "Agentic AI" },
        { de: "Backend-Systeme", en: "Backend Systems" },
        { de: "Backup-Strategien", en: "Backup-Strategies" },
        { de: "IPv6", en: "IPv6" },
        { de: "Zero Trust", en: "Zero Trust" },
        { de: "Zero-Config VPN", en: "Zero-Config VPN" },
        { de: "Risikomanagement", en: "Risk Management" },
        { de: "Compliance", en: "Compliance" },
        { de: "Notion", en: "Notion" },
        { de: "Cloudflare", en: "Cloudflare" },
        { de: "Resend", en: "Resend" },
        { de: "Supabase", en: "Supabase" },
      ],
      title: {
        de: "Gründungsmitglied & Datenschutzbeauftragter",
        en: "Founding Member & Data Protection Officer",
      },
    },
    {
      company: "DEGIT AG",
      description: [
        {
          text: {
            de: "Konzeption und Aufbau einer internen KI-Trainingsplattform für den Unternehmenseinsatz mit Fokus auf EU-AI-Act-Compliance und praxisnahe Befähigung der Teams.",
            en: "Design and implementation of an internal AI training platform for corporate use, focusing on compliance with the EU AI Act and practical enablement of teams.",
          },
          type: "text",
        },
        {
          text: {
            de: "Bewertung und Entscheidungsvorlage zum Vergleich führender KI- und Automatisierungsplattformen hinsichtlich Datenschutz, Zuverlässigkeit, API-Integration und Governance-Tauglichkeit.",
            en: "Evaluation and decision paper comparing leading AI and automation platforms with regard to data protection, reliability, API integration and governance readiness.",
          },
          type: "text",
        },
        {
          text: {
            de: "Evaluierung aufkommender Agentic-AI-Workflows zur mehrstufigen Aufgabenorchestrierung und deren Integration in Unternehmensautomatisierungsumgebungen.",
            en: "Evaluation of emerging Agentic AI workflows for multi-step task orchestration and their integration into enterprise automation environments.",
          },
          type: "text",
        },
        {
          text: {
            de: "Analysiert und bewertet: OpenAI ChatGPT, OpenAI Open-Weight GPT-OSS, Microsoft Copilot, Perplexity, Anthropic Claude, Apple Foundation, z.AI GLM, n8n, make.com und Zapier.",
            en: "Analyzed and benchmarked: OpenAI ChatGPT, OpenAI Open-Weight GPT-OSS, Microsoft Copilot, Perplexity, Anthropic Claude, Apple Foundation, z.AI GLM, n8n, make.com, Zapier.",
          },
          type: "text",
        },
      ],
      location: { de: "Hockenheim, Deutschland", en: "Hockenheim, Germany" },
      logoUrl: "/logos/degit.png",
      period: { de: "Aug 2025 – Okt 2025", en: "Aug 2025 – Oct 2025" },
      projectScale: "small",
      tags: [
        { de: "KI-Evaluierung", en: "AI Evaluation" },
        { de: "KI-Training", en: "AI Training" },
        { de: "EU AI Act", en: "EU AI Act" },
        { de: "Supabase", en: "Supabase" },
        { de: "Cloudflare", en: "Cloudflare" },
        { de: "Automatisierung", en: "Automation" },
        { de: "n8n", en: "n8n" },
        { de: "make.com", en: "make.com" },
        { de: "Zapier", en: "Zapier" },
        { de: "OpenAI", en: "OpenAI" },
        { de: "Apple Foundation", en: "Apple Foundation" },
        { de: "Anthropic Claude", en: "Anthropic Claude" },
        { de: "Microsoft Copilot", en: "Microsoft Copilot" },
        { de: "Perplexity", en: "Perplexity" },
        { de: "z.AI GLM", en: "z.AI GLM" },
        { de: "Agentische KI", en: "Agentic AI" },
        { de: "Unternehmensautomatisierung", en: "Enterprise Automation" },
        { de: "Cursor", en: "Cursor" },
        { de: "Claude Code", en: "Claude Code" },
        { de: "OpenAI Codex", en: "OpenAI Codex" },
      ],
      title: {
        de: "KI-Trainingsplattform & Evaluierung von KI-Werkzeugen",
        en: "AI Training Platform & AI Tools Evaluation",
      },
    },
    {
      company: "Joh. Berenberg, Gossler & Co. KG",
      description: [
        {
          text: {
            de: "Teilprojektleitung im Rahmen des RZ-Migrationsprojekts mit Schwerpunkt auf Solaris-, Linux-, Storage- und Backup-Umgebungen.",
            en: "Subproject lead within the data center migration project, focusing on Solaris, Linux, storage, and backup environments.",
          },
          type: "text",
        },
        {
          text: {
            de: "Verantwortlich für die Modernisierung und Einführung der neuen unternehmensweiten Backup-Plattform auf Basis der Rubrik Security Cloud.",
            en: "Responsible for the modernization and full implementation of the new enterprise backup platform based on Rubrik Security Cloud.",
          },
          type: "text",
        },
        {
          text: {
            de: "Mitverantwortung bei der Weiterentwicklung der Solaris-Infrastruktur und der schrittweisen Ablösung von Legacy-Systemen durch moderne, cloudfähige Architekturen.",
            en: "Supported the transition of Solaris infrastructure and legacy systems towards modern, cloud-ready architectures.",
          },
          type: "text",
        },
        {
          text: {
            de: "Mitwirkung bei der Neugestaltung und Erneuerung der Legacy-Netzwerkinfrastruktur hin zu einer modernen, segmentierten Architektur mit verbesserter Security-Fokussierung.",
            en: "Contributed to the redesign and renewal of the legacy network into a modern, segmented structure with improved security focus.",
          },
          type: "text",
        },
        {
          text: {
            de: "Erfolgreiche Leitung des Modernisierungsprojekts der Rubrik Security Cloud mit deutlichen Verbesserungen bei Datensicherheit, Compliance und Wiederherstellungszeiten in allen Fachbereichen.",
            en: "Successfully led the Rubrik Security Cloud modernization project, enhancing data protection, compliance, and recovery performance across all business units.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Beitrag zur erfolgreichen Verlagerung von zwei Rechenzentren mit minimalen Ausfallzeiten und abgestimmten Abhängigkeiten über mehrere Infrastrukturbereiche hinweg.",
            en: "Contributed to the successful relocation of two data centers with minimized downtime and coordinated dependencies across multiple infrastructure domains.",
          },
          type: "achievement",
        },
      ],
      location: { de: "Hamburg, Deutschland", en: "Hamburg, Germany" },
      logoUrl: "/logos/berenberg.svg",
      period: { de: "Jan 2024 - Sep 2025", en: "Jan 2024 - Sep 2025" },
      tags: [
        { de: "Projektmanagement", en: "Project Management" },
        { de: "Rubrik Security Cloud", en: "Rubrik Security Cloud" },
        { de: "Atlassian Jira", en: "Atlassian Jira" },
        { de: "Atlassian Confluence", en: "Atlassian Confluence" },
        { de: "Microsoft Project", en: "Microsoft Project" },
        { de: "ServiceNow", en: "ServiceNow" },
        { de: "LeanIX", en: "LeanIX" },
        { de: "Delinea", en: "Delinea" },
        { de: "IPv6", en: "IPv6" },
        { de: "Netzwerk", en: "Network" },
        { de: "Compliance", en: "Compliance" },
        { de: "Backup", en: "Backup" },
        { de: "Solaris", en: "Solaris" },
        { de: "Rubrik", en: "Rubrik" },
        { de: "DORA", en: "DORA" },
      ],
      title: {
        de: "Teilprojektleiter RZ-Migration & Backup-Modernisierung",
        en: "Subproject Lead Data Center Migration & Backup Modernization",
      },
    },
    {
      company: "Threedium Ltd.",
      description: [
        {
          text: {
            de: "Beratung in allen Fragen der IT-Sicherheit.",
            en: "Consulting in all questions about and around IT security.",
          },
          type: "text",
        },
        {
          text: {
            de: "Unterstützung des DevOps-Teams.",
            en: "Support of the DevOps team.",
          },
          type: "text",
        },
        {
          text: {
            de: "Integration von Diensten in SSO-Infrastruktur.",
            en: "Integration of services in SSO infrastructure.",
          },
          type: "text",
        },
        {
          text: {
            de: "Zertifizierungsaudit: SOC2 und ISO27001.",
            en: "Certificate audit: SOC2 and ISO27001",
          },
          type: "text",
        },
        {
          text: {
            de: "Beratung zu allen Aspekten der DSGVO. Einführung von Aufbewahrungsfristen und Datenschutz-Richtlinien.",
            en: "Advice on all aspects of GDPR. Introduction of retention policies and data protection guidelines.",
          },
          type: "text",
        },
        {
          text: {
            de: "Einführung von Sicherheitsrichtlinien.",
            en: "Introduction of security guidelines.",
          },
          type: "text",
        },
        {
          text: {
            de: "Implementierung von IT-Sicherheitsmaßnahmen, die bei einem SOC2-Audit ohne Beanstandungen bestanden.",
            en: "Implemented IT security measures that passed a SOC2 audit with zero non-conformities, securing key client contracts.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Integration der SSO-Infrastruktur über mehrere Plattformen hinweg, Verbesserung der Sicherheit und Benutzererfahrung.",
            en: "Integrated SSO infrastructure across multiple platforms, improving security and user experience.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Führung des Teams zur erfolgreichen ISO27001-Zertifizierung innerhalb einer straffen sechsmonatigen Frist, wodurch neue Märkte für das Unternehmen erschlossen wurden.",
            en: "Led the team in passing ISO27001 certification within a tight six-month deadline, which opened new markets for the company.",
          },
          type: "achievement",
        },
      ],
      location: {
        de: "London, Vereinigtes Königreich",
        en: "London, United Kingdom",
      },
      logoUrl: "/logos/threedium.svg",
      period: { de: "Okt 2023 - Jun 2024", en: "Oct 2023 - Jun 2024" },
      tags: [
        { de: "Sicherheit", en: "Security" },
        { de: "Datenschutz", en: "Data Protection" },
        { de: "SSO", en: "SSO" },
        { de: "DSGVO", en: "GDPR" },
        { de: "ISO 27001", en: "ISO 27001" },
        { de: "SOC 2", en: "SOC 2" },
        { de: "Atlassian Jira", en: "Atlassian Jira" },
        { de: "Atlassian Confluence", en: "Atlassian Confluence" },
        { de: "Palo Alto Firewall", en: "Palo Alto Firewall" },
        { de: "Cisco", en: "Cisco" },
        { de: "VMware", en: "VMware" },
        { de: "Windows", en: "Windows" },
        { de: "Linux", en: "Linux" },
        { de: "Microsoft Azure", en: "Microsoft Azure" },
        { de: "Incident Response", en: "Incident Response" },
        { de: "Penetration Testing", en: "Penetration Testing" },
      ],
      title: {
        de: "Informationssicherheitsbeauftragter",
        en: "Information Security Officer",
      },
    },
    {
      company: "GEHR Datentechnik GmbH",
      description: [
        {
          text: {
            de: "Umfassendes Code-Review der bestehenden PHP-Anwendung mit strukturierter Bewertung von Findings hoher, mittlerer und niedriger Schwere.",
            en: "Comprehensive code review of the existing PHP application with a structured assessment of critical, medium and low-severity issues.",
          },
          type: "text",
        },
        {
          text: {
            de: "Erstellung eines ausführlichen Review-Papiers mit technischen Befunden, empfohlenen Maßnahmen und Priorisierung für die Entwicklungsteams.",
            en: "Creation of a detailed review document including technical findings, recommended remediation steps, and prioritization for development teams.",
          },
          type: "text",
        },
        {
          text: {
            de: "Beratung zu Anwendungs- und Infrastruktursicherheit mit Fokus auf praxisnahe Verbesserungen, sichere Coding-Patterns und betriebliches Hardening.",
            en: "Consulting on application and infrastructure security with a focus on practical improvements, secure coding patterns and operational hardening.",
          },
          type: "text",
        },
        {
          text: {
            de: "Unterstützung während der Umsetzung zur Behebung identifizierter Probleme und zur Verbesserung der Gesamtstabilität der Anwendung.",
            en: "Support during the implementation phase to fix identified issues and improve overall application resilience.",
          },
          type: "text",
        },
      ],
      location: { de: "Mannheim, Deutschland", en: "Mannheim, Germany" },
      logoUrl: "/logos/gehr.png",
      period: { de: "Okt 2023", en: "Oct 2023" },
      projectScale: "small",
      tags: [
        { de: "Code-Review", en: "Code Review" },
        { de: "Security-Beratung", en: "Security Advisory" },
        { de: "Schwachstellenanalyse", en: "Vulnerability Analysis" },
        { de: "DSGVO", en: "GDPR" },
        { de: "OWASP", en: "OWASP" },
        { de: "Web-Sicherheit", en: "Web Security" },
        { de: "Datenschutz", en: "Data Protection" },
        { de: "Risikobewertung", en: "Risk Assessment" },
        { de: "Linux", en: "Linux" },
        { de: "PHP", en: "PHP" },
        { de: "MySQL", en: "MySQL" },
      ],
      title: {
        de: "Code-Review & Security-Beratung",
        en: "Code Review & Security Advisory",
      },
    },
    {
      company: "Deutsche Vermögensberatung AG",
      description: [
        {
          text: {
            de: "Beratung zu allen Sicherheitsthemen, Schwerpunkt auf Server und Netzwerke.",
            en: "Consulting regarding any security topics, focus on server and networks.",
          },
          type: "text",
        },
        {
          text: {
            de: "Unterstützung und Strategieplanung während eines großen Sicherheitsvorfalls.",
            en: "Support and strategy handling during a (large) security incident.",
          },
          type: "text",
        },
        {
          text: {
            de: "Erstellung von (Sicherheits-)Richtlinien und technischen Konzepten.",
            en: "Writing (security) policies and technical concepts.",
          },
          type: "text",
        },
        {
          text: {
            de: "Automatisierung des Schwachstellen- und Vorfallsmanagements.",
            en: "Automation of vulnerability and incident management.",
          },
          type: "text",
        },
        {
          text: {
            de: "Unterstützung beim Aufbau von IT-Architektur und Strategie (einschließlich Netzwerkarchitektur, Cloud-Infrastruktur, Firewall-Konzepte, etc.).",
            en: "Support for building IT architecture and strategy (including network architecture, cloud infrastructure, firewall concepts, etc.).",
          },
          type: "text",
        },
        {
          text: {
            de: "Vorbereitung und Begleitung von Penetrationstests (einschließlich Netzwerk, Cloud, Anwendungen, Active Directory, etc.).",
            en: "Preparation and accompanying of penetration tests (including network, cloud, applications, Active Directory, etc.).",
          },
          type: "text",
        },
        {
          text: {
            de: "Leitung und Management des Security Operations Center (SOC)-Teams, einschließlich der täglichen Betriebsüberwachung, Incident Response und kontinuierlichen Verbesserung der Sicherheitsprozesse.",
            en: "Led and managed the Security Operations Center (SOC) team, overseeing daily operations, incident response, and continuous improvement of security processes.",
          },
          type: "text",
        },
        {
          text: {
            de: "Sicherheits-Audits sowie sicherheitstechnische Begleitung von Applikations- und Netzwerk-Migrationen.",
            en: "Security audits and security oversight for application and network migrations.",
          },
          type: "text",
        },
        {
          text: {
            de: "Spezialisierung in den Bereichen Linux und Netzwerke.",
            en: "Specialization in the areas of Linux and networking.",
          },
          type: "text",
        },
        {
          text: {
            de: "IT-Sicherheitsberatung auch für Windows, Cloud (vor allem Azure) und Anwendungsentwicklung.",
            en: "IT security consulting also on Windows, Cloud (primarily Azure) and application development.",
          },
          type: "text",
        },
        {
          text: {
            de: "Beratung zu Datenschutz- und Zertifizierungsfragen (z.B. ISO27001, BSI Grundschutz, NIST-Framework, MITRE).",
            en: "Advice on data protection and certification issues (e.g. ISO27001, BSI Grundschutz, NIST framework, MITRE).",
          },
          type: "text",
        },
        {
          text: {
            de: "Leitung der Reaktion auf einen großen Sicherheitsvorfall, Koordination der Maßnahmen zur Minimierung von Datenverlusten und Wiederherstellung des Betriebs.",
            en: "Managed the response to a major security incident, coordinating efforts that minimized data loss and restored operations.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Entwicklung und Automatisierung eines Schwachstellenmanagementsystems, Reduzierung der Reaktionszeiten bei Vorfällen und Erhöhung der Systemverfügbarkeit.",
            en: "Developed and automated a vulnerability management system, reducing incident response time and increasing system uptime.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Implementierung von Sicherheitsrichtlinien, die später als Best Practices im gesamten Unternehmen übernommen wurden.",
            en: "Implemented security policies that were later adopted as best practices company-wide.",
          },
          type: "achievement",
        },
      ],
      location: {
        de: "Frankfurt am Main, Deutschland",
        en: "Frankfurt am Main, Germany",
      },
      logoUrl: "/logos/dvag.svg",
      period: { de: "Jan 2019 - Sep 2023", en: "Jan 2019 - Sep 2023" },
      tags: [
        { de: "Sicherheit", en: "Security" },
        { de: "DSGVO", en: "GDPR" },
        { de: "ISO 27001", en: "ISO 27001" },
        { de: "BSI / NIS2 / NIST / MITRE", en: "BSI / NIS2 / NIST / MITRE" },
        { de: "ITIL", en: "ITIL" },
        { de: "Richtlinien", en: "Guidelines" },
        {
          de: "Atlassian Jira & Confluence",
          en: "Atlassian Jira & Confluence",
        },
        { de: "Palo Alto / Cisco", en: "Palo Alto / Cisco" },
        { de: "Microsoft Azure", en: "Microsoft Azure" },
        { de: "Microsoft Sentinel", en: "Microsoft Sentinel" },
        { de: "Microsoft Defender", en: "Microsoft Defender" },
        { de: "Microsoft 365", en: "Microsoft 365" },
      ],
      title: { de: "IT-Sicherheitsexperte", en: "IT Security Consultant" },
    },
    {
      company: "Deutsche Vermögensberatung AG",
      description: [
        {
          text: {
            de: "Koordination und Ressourcenplanung eines kleinen Teams.",
            en: "Coordination and planning of resources of a small team.",
          },
          type: "text",
        },
        {
          text: {
            de: "Schwerpunkt des Teams: E-Mail, Cloud-Speicher, Lastverteilung, Proxy und DNS (alles Linux-basiert).",
            en: "Focus of the team: e-mail, cloud storage, load balancing, proxy and DNS (all linux based).",
          },
          type: "text",
        },
        {
          text: {
            de: "Analyse, Fehlerbehebung und nachhaltige Problemlösung im Bereich E-Mail-Infrastrukturen.",
            en: "Analysis, troubleshooting and sustainable remediation in email infrastructures.",
          },
          type: "text",
        },
        {
          text: {
            de: "Beratung und Implementierung von IPv6, Sicherheitsthemen, Hochverfügbarkeitssystemen und weiteren Themen.",
            en: "Consulting and implementation of IPv6, security topics, high-availability systems and more topics.",
          },
          type: "text",
        },
        {
          text: {
            de: "Teilprojektleitung: Rechenzentrumsumzug sowie Migration und Neuaufbau von Applikationen und Serverinfrastrukturen in redundante, hochverfügbare Umgebungen.",
            en: "Sub-project lead: data centre relocation including migration and rebuild of applications and server infrastructures into redundant, highly available environments.",
          },
          type: "text",
        },
        {
          text: {
            de: "Koordination eines erfolgreichen Rechenzentrumsumzugsprojekts.",
            en: "Coordinated a successful data center relocation project.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Leitung der Implementierung von IPv6 im gesamten Unternehmen, Zukunftssicherung des Netzwerks.",
            en: "Led the implementation of IPv6 across the organization, future-proofing the network.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Verbesserung der Teameffizienz durch Einführung automatisierter Prozesse und Ressourcenmanagement-Tools.",
            en: "Improved team efficiency through the introduction of automated processes and resource management tools.",
          },
          type: "achievement",
        },
      ],
      location: {
        de: "Frankfurt am Main, Deutschland",
        en: "Frankfurt am Main, Germany",
      },
      logoUrl: "/logos/dvag.svg",
      period: { de: "Jul 2015 - Dez 2018", en: "Jul 2015 - Dec 2018" },
      tags: [
        { de: "Teamleitung", en: "Team Management" },
        {
          de: "Atlassian Jira & Confluence",
          en: "Atlassian Jira & Confluence",
        },
        { de: "dovecot & postfix", en: "dovecot & postfix" },
        { de: "Microsoft Azure", en: "Microsoft Azure" },
        { de: "IPv6", en: "IPv6" },
        { de: "Hochverfügbarkeit", en: "High-Availability" },
        { de: "Lastverteilung", en: "Load Balancing" },
        { de: "E-Mail", en: "Email" },
        { de: "Cloud-Speicher", en: "Cloud Storage" },
        { de: "Proxy", en: "Proxy" },
        { de: "DNS", en: "DNS" },
      ],
      title: {
        de: "Teamkoordinator / Systemarchitekt",
        en: "Team Coordinator / System Architect",
      },
    },
    {
      company: "Deutsche Vermögensberatung AG",
      description: [
        {
          text: {
            de: "Product Owner und Systemarchitekt für die unternehmensweite E-Mail-Archivierungsplattform, einschließlich Anforderungsmanagement, technischer Roadmap und langfristiger Weiterentwicklung.",
            en: "Product Owner and system architect for the enterprise-wide email archiving platform, including requirements management, technical roadmap, and long-term evolution.",
          },
          type: "text",
        },
        {
          text: {
            de: "Leitung der Design- und Implementierung eines rechtssicheren Archivs für über 50.000 Nutzer mit rechtssicherer Aufbewahrung, Prüfbarkeit und langfristiger Wartbarkeit.",
            en: "Led the design and implementation of a legally compliant archive for more than 50,000 users, ensuring immutable retention, auditability, and long-term maintainability.",
          },
          type: "text",
        },
        {
          text: {
            de: "Einführung skalierbarer Speicher- und Redundanzkonzepte sowie Monitoring, Indexierung und Volltextsuche zur effizienten Auffindbarkeit historischer Korrespondenz.",
            en: "Introduced scalable storage, redundancy concepts, monitoring, indexing and full-text search to enable efficient retrieval of historical correspondence.",
          },
          type: "text",
        },
        {
          text: {
            de: "Enge Zusammenarbeit mit Legal-, Compliance- und Audit-Teams zur Erfüllung regulatorischer Anforderungen und langfristigen Beweissicherheit.",
            en: "Close collaboration with legal, compliance, and auditing teams to meet regulatory requirements and ensure long-term evidentiary integrity.",
          },
          type: "text",
        },
        {
          text: {
            de: "Nebenverantwortlichkeiten in der umliegenden Mail-Infrastruktur (dovecot, postfix), Linux-basierten Diensten, DNS, Proxy, Lastverteilung und Cloud-Speicher.",
            en: "Secondary responsibilities in the surrounding mail infrastructure (dovecot, postfix), Linux-based services, DNS, proxy, load balancing and cloud storage.",
          },
          type: "text",
        },
        {
          text: {
            de: "Bereitstellung eines stabilen, compliance-gerechten Archivsystems, das im gesamten Unternehmen täglich genutzt wurde.",
            en: "Delivered a stable, compliant archive used daily across the entire organization.",
          },
          type: "achievement",
        },
        {
          text: {
            de: "Etablierung zukunftssicherer Aufbewahrungsstrategien im Einklang mit strengen regulatorischen Vorgaben.",
            en: "Established future-proof data retention strategies aligned with strict regulatory expectations.",
          },
          type: "achievement",
        },
      ],
      location: {
        de: "Frankfurt am Main, Deutschland",
        en: "Frankfurt am Main, Germany",
      },
      logoUrl: "/logos/dvag.svg",
      period: { de: "Jan 2013 - Jun 2015", en: "Jan 2013 - Jun 2015" },
      tags: [
        { de: "E-Mail-Archivierung", en: "Email Archiving" },
        { de: "Compliance", en: "Compliance" },
        { de: "Aufbewahrungspflichten", en: "Retention Policies" },
        { de: "dovecot", en: "dovecot" },
        { de: "postfix", en: "postfix" },
        { de: "Linux", en: "Linux" },
        { de: "Hochverfügbarkeit", en: "High Availability" },
        { de: "Monitoring", en: "Monitoring" },
        { de: "Volltextsuche", en: "Full-Text Search" },
        { de: "Indexierung", en: "Indexing" },
        { de: "Skalierbarkeit", en: "Scalability" },
        { de: "Prüfbarkeit", en: "Auditability" },
        { de: "IPv6", en: "IPv6" },
      ],
      title: {
        de: "Product Owner / Systemarchitekt",
        en: "Product Owner / System Architect",
      },
    },
  ],
  experienceSectionTitle: { de: "Berufserfahrung", en: "Experience" },
  experienceSmallProjectsNote: {
    de: "Spezialisierte, flexible oder fokussierte Initiativen, die die Gesamtarbeit ergänzen.",
    en: "Specialized, flexible, or focused initiatives that complement the broader work.",
  },
  experienceSmallProjectsSubtitle: {
    de: "Ergänzende oder spezialisierte Projekte mit flexiblem Umfang.",
    en: "Complementary or specialized projects with flexible scope.",
  },
  experienceSmallProjectsTitle: {
    de: "Zusatz- & Schwerpunktprojekte",
    en: "Additional & Focused Projects",
  },
  footer: {
    copyright: {
      de: "© year Uwe Schwarz. Alle Rechte vorbehalten.",
      en: "© year Uwe Schwarz. All rights reserved.",
    },
    links: [
      { href: "/privacy", label: { de: "Datenschutz", en: "Privacy Policy" } },
      { href: "/imprint", label: { de: "Impressum", en: "Imprint" } },
    ],
    /*    builtWith: {
      en: "Built with modern web technologies and a passion for clean code.",
      de: "Erstellt mit modernen Web-Technologien und einer Leidenschaft für sauberen Code.",
    },*/
  },
  hero: {
    availability: {
      badge: {
        de: "{percent}% verfügbar",
        en: "{percent}% available",
      },
      currentLine: {
        de: "{percent}% verfügbar",
        en: "{percent}% available",
      },
      currentPercentAvailable: 75,
      fullLine: {
        de: "100% ab {date}",
        en: "100% from {date}",
      },
      fullyAvailableDate: "2027-01-01",
      title: {
        de: "Verfügbarkeit",
        en: "Availability",
      },
    },
    ctaPrimary: {
      de: "Meine Arbeit ansehen",
      en: "See my work",
    },
    ctaSecondary: {
      de: "Lebenslauf herunterladen",
      en: "Download CV",
    },
    decorativeElements: [
      {
        code: "🛡️&nbsp;GDPR",
        distance: 92,
        position: 9,
      },
      {
        code: "🤖&nbsp;AI",
        distance: 72,
        position: 35,
      },
      {
        code: "🤝&nbsp;Human&nbsp;API",
        distance: 85,
        position: 52,
      },
      {
        code: "📡&nbsp;networking",
        distance: 122,
        position: 66,
      },
      {
        code: "💡&nbsp;strategy",
        distance: 134,
        position: 84,
      },
      {
        code: "🔐&nbsp;security",
        distance: 110,
        position: 95,
      },
    ],
    description: {
      de: "Ich bringe Technik, Menschen und Geschäftsziele zusammen – als Brücke zwischen Teams, Stakeholdern und Systemen. Ob IT-Security, Netzwerke, hochverfügbare Systeme oder E-Mail-Infrastruktur: Ich übernehme Verantwortung, leite komplexe Projekte und stelle sicher, dass Lösungen nicht nur funktionieren, sondern auch strategisch passen und langfristig tragen.",
      en: "I connect technology, people, and business goals – acting as the bridge between teams, stakeholders, and systems. Whether it's IT security, networking, high-availability infrastructure, or email solutions, I take ownership, lead complex projects, and ensure the results are not just technically sound, but strategically aligned and built to last.",
    },
    imageAlt: {
      de: "Portraitfoto von Uwe Schwarz, Projektmanager und IT-Sicherheitsexperte.",
      en: "Portrait photo of Uwe Schwarz, Project Manager and IT Security Expert.",
    },
    name: "Uwe Schwarz",
    scrollText: {
      de: "Nach unten",
      en: "Scroll",
    },
    titleElements: [
      {
        de: "Projektmanager",
        en: "Project Manager",
      },
      {
        de: "IT-Sicherheitsexperte",
        en: "IT Security Expert",
      },
      {
        de: "KI-Enthusiast",
        en: "AI Enthusiast",
      },
      {
        de: "Berater",
        en: "Consultant",
      },
    ],
  },
  imprint: {
    /*    representative: {
      en: "Represented by: John Oldman",
      de: "Vertreten durch: John Oldman",
    },*/
    address: {
      city: {
        de: "67069 Ludwigshafen",
        en: "67069 Ludwigshafen",
      },
      country: {
        de: "Deutschland",
        en: "Germany",
      },
      street: {
        de: "Uhlandstr. 20",
        en: "Uhlandstr. 20",
      },
    },
    companyName: {
      de: "Uwe Schwarz",
      en: "Uwe Schwarz",
    },
    contactInfoTitle: {
      de: "Kontakt",
      en: "Contact",
    },
    contactTitle: {
      de: "Kontaktinformationen",
      en: "Contact Information",
    },
    disclaimer: {
      de: "Für externe Links sind ausschließlich deren Betreiber verantwortlich.",
      en: "The operators of linked websites are solely responsible for their content.",
    },
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
      de: "Haftungsausschluss",
      en: "Disclaimer",
    },
    email: "mail@uweschwarz.eu",
    emailLabel: {
      de: "E-Mail",
      en: "Email",
    },
    phone: "+49 151 64403667",
    phoneLabel: {
      de: "Telefon",
      en: "Phone",
    },
    title: {
      de: "Impressum",
      en: "Imprint",
    },
  },
  llms: {
    title: {
      de: "Übersicht für AI Agents",
      en: "Overview for AI Agents",
    },
  },
  moreProjects: {
    de: "Weitere frühere Projekte oder Referenzen sind auf Anfrage verfügbar.",
    en: "More previous projects or references available upon request.",
  },
  navigation: [
    { href: "#hero", label: { de: "Start", en: "Home" } },
    { href: "#about", label: { de: "Über mich", en: "About" } },
    { href: "#experience", label: { de: "Erfahrung", en: "Experience" } },
    { href: "#projects", label: { de: "Projekte", en: "Projects" } },
    { href: "#skills", label: { de: "Fähigkeiten", en: "Skills" } },
    { href: "#contact", label: { de: "Kontakt", en: "Contact" } },
  ],
  privacy: {
    sections: [
      {
        list: [
          {
            de: "Uwe Schwarz",
            en: "Uwe Schwarz",
          },
          {
            de: "Uhlandstr. 20",
            en: "Uhlandstr. 20",
          },
          {
            de: "67069 Ludwigshafen",
            en: "67069 Ludwigshafen",
          },
          {
            de: "Deutschland",
            en: "Germany",
          },
          {
            de: "E-Mail: mail@uweschwarz.eu",
            en: "Email: mail@uweschwarz.eu",
          },
          {
            de: "Telefon: +49 151 64403667",
            en: "Phone: +49 151 64403667",
          },
        ],
        paragraphs: [
          {
            de: "Verantwortlich für die Verarbeitung personenbezogener Daten:",
            en: "Responsible for the processing of personal data:",
          },
        ],
        title: {
          de: "Verantwortliche Stelle",
          en: "Controller",
        },
      },
      {
        paragraphs: [
          {
            de: "Ein Datenschutzbeauftragter wurde nicht benannt, da dies gemäß Art. 37 DSGVO nicht erforderlich ist.",
            en: "No Data Protection Officer has been appointed, as this is not required under Art. 37 GDPR.",
          },
        ],
        title: {
          de: "Datenschutzbeauftragter",
          en: "Data Protection Officer",
        },
      },
      {
        paragraphs: [
          {
            de: "Die hier eingegebenen Daten (Name, E-Mail, Nachricht) verwenden wir ausschließlich zur Beantwortung deiner Anfrage. Rechtsgrundlage: Einwilligung und Vertragserfüllung (Art. 6 Abs. 1 lit. a & b DSGVO).",
            en: "This form processes data (name, e-mail, message) solely to reply to your request. Basis: consent / contract performance (Art. 6 GDPR lit. a & b).",
          },
        ],
        title: {
          de: "Kontaktformular",
          en: "Contact Form",
        },
      },
      {
        list: [
          {
            de: "Cloudflare: 101 Townsend St, San Francisco, CA 94107, USA<br />Cloudflare Germany GmbH: Rosental 7, c/o Mindspace, 80331 München, Germany",
            description: {
              de: "Rechtsgrundlage: berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Gewährleistung der Performance und Sicherheit der Website.<br />Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert und verarbeitet Daten gemäß dessen Grundsätzen. Details: https://www.cloudflare.com/privacypolicy/.",
              en: "Legal basis: legitimate interests (Art. 6(1)(f) GDPR) to ensure website performance and security.<br />Cloudflare is certified under the EU-U.S. Data Privacy Framework and processes data under its principles. See: https://www.cloudflare.com/privacypolicy/.",
            },
            en: "Cloudflare: 101 Townsend St, San Francisco, CA 94107, USA<br />Cloudflare Germany GmbH: Rosental 7, c/o Mindspace, 80331 München, Germany",
          },
          {
            de: "Resend: 2261 Market Street #5039, San Francisco, CA 94114, USA",
            description: {
              de: "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO), da Resend E-Mails in deinem Auftrag versendet.<br />Resend nutzt Standardvertragsklauseln (SCC) in ihrem DPA, um den Datentransfer in die USA zu legitimieren. DPA: https://resend.com/legal/dpa.",
              en: "Legal basis: performance of a contract (Art. 6(1)(b) GDPR), as Resend sends emails on your behalf.<br />Resend’s DPA includes Standard Contractual Clauses (SCC) for transfers to the US. See: https://resend.com/legal/dpa.",
            },
            en: "Resend: 2261 Market Street #5039, San Francisco, CA 94114, USA",
          },
          {
            de: "Umami Software, Inc.: 1362 42nd Ave., San Francisco, CA, 94122, USA",
            description: {
              de: "Rechtsgrundlage: berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Durchführung der Website-Analyse in datenschutzfreundlicher Weise.<br />Umami ist ein datenschutzbewusstes Web-Analytics-Tool, das in seiner Standardkonfiguration keine Cookies verwendet und keine personenbezogenen Kennungen erhebt. Details: https://umami.is/privacy.",
              en: "Legal basis: legitimate interests (Art. 6(1)(f) GDPR) to enable website-analytics in a privacy-respective way.<br />Umami is a privacy-aware web analytics tool that does not use cookies or collect personal identifiers in its standard configuration. See: https://umami.is/privacy.",
            },
            en: "Umami Software, Inc.: 1362 42nd Ave., San Francisco, CA, 94122, USA",
          },
        ],
        paragraphs: [
          {
            de: "Diese Seite wird bei Cloudflare gehostet; ich habe dort keinen direkten Zugriff auf Server-Logs oder Deine IP-Adresse. Für das Kontaktformular nutze ich Resend, um E-Mails zu versenden. Es werden nur die von Dir im Formular eingegebenen Daten weitergeleitet – weitere personenbezogene Daten werden nicht gespeichert. Umami wird für Analysen verwendet und speichert nur pseudonymisierte Daten.",
            en: "This site is hosted by Cloudflare; I do not have direct access to server logs or your IP address there. For the contact form, I use Resend to send emails. Only the data you enter into the form is forwarded – no other personal data is stored. Umami is used for analytics and stores only pseudonymous data.",
          },
          {
            de: "Log-Aufbewahrung: max. 30 Tage",
            en: "Log retention: max. 30 days",
          },
        ],
        title: {
          de: "Einsatz von Drittanbieter-Diensten",
          en: "Use of Third-Party Services",
        },
      },
      {
        paragraphs: [
          {
            de: "Cloudflare verarbeitet Daten auf Basis berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) und ist nach dem EU-US Data Privacy Framework zertifiziert (siehe https://www.cloudflare.com/privacypolicy).",
            en: "Cloudflare processes data under legitimate interests (Art. 6(1)(f) GDPR) and is certified under the EU-US Data Privacy Framework (see https://www.cloudflare.com/privacypolicy).",
          },
          {
            de: "Resend handelt zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und nutzt Standardvertragsklauseln für Datenübermittlungen in die USA (siehe https://resend.com/legal/dpa).",
            en: "Resend acts on contract performance (Art. 6(1)(b) GDPR) and uses Standard Contractual Clauses for US transfers (see https://resend.com/legal/dpa).",
          },
        ],
        title: {
          de: "Rechtsgrundlagen & Drittlandsübermittlung",
          en: "Legal Basis & International Transfers",
        },
      },
      {
        paragraphs: [
          {
            de: "Ich verwende keine Cookies. Lediglich Deine Sprachwahl und Theme-Einstellung werden lokal im localStorage Deines Browsers gespeichert. Die Speicherung von Theme-Einstellungen und Sprachwahl im localStorage beruht auf berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Verbesserung der Benutzererfahrung. Du kannst diese Daten jederzeit über deine Browser-Einstellungen löschen.",
            en: "I do not use cookies. Only your language choice and theme preference are stored locally in your browser’s localStorage. The storage of theme preferences and language selection in localStorage is based on legitimate interests (Art. 6(1)(f) GDPR) to enhance user experience. You can clear this at any time in your browser settings.",
          },
        ],
        title: {
          de: "Cookies und Local Storage",
          en: "Cookies and Local Storage",
        },
      },
      {
        paragraphs: [
          {
            de: "Die Seite enthält Links zu GitHub, LinkedIn, Xing, Freelancermap und X (ehemals Twitter). Da keine externen Inhalte eingebunden sind, wirst Du beim Anklicken dieser Links auf die jeweiligen Plattformen weitergeleitet, deren Datenschutzerklärungen dann gelten.",
            en: "The site contains links to GitHub, LinkedIn, Xing, Freelancermap and X (formerly Twitter). Since I embed no external content, clicking these links may transfer you to the respective platforms, whose privacy policies then apply.",
          },
        ],
        title: {
          de: "Externe Links",
          en: "External Links",
        },
      },
      {
        paragraphs: [
          {
            de: "Ich ergreife angemessene technische und organisatorische Maßnahmen, um Deine Daten vor unbefugtem Zugriff und Verlust zu schützen. Eine 100%ige Sicherheit bei der Datenübertragung im Internet kann ich jedoch nicht garantieren.",
            en: "I take reasonable technical and organizational measures to protect your data against unauthorized access and loss. However, internet-based data transmission can never be 100% secure.",
          },
          {
            de: "Technisch-organisatorische Maßnahmen: diese Seite nutzt TLS 1.3 (falls vom Browser unterstützt), Zugangskontrollen mit MFA, Pseudonymisierung/Verschlüsselung ruhender Daten und regelmäßige Sicherheitsaudits.",
            en: "Technical and Organisational Measures: this site uses TLS 1.3 (if supported by your browser), access controls with MFA, pseudonymisation/encryption at rest, and regular security audits.",
          },
        ],
        title: {
          de: "Datensicherheit",
          en: "Data Security",
        },
      },
      {
        paragraphs: [
          {
            de: "Betroffene Personen haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) sowie Widerruf erteilter Einwilligungen (Art. 7 Abs. 3). Diese Rechte können unter mail@uweschwarz.eu geltend gemacht werden.",
            en: "Data subjects have the right to access (Art. 15), rectify (Art. 16), erase (Art. 17), restrict processing (Art. 18), data portability (Art. 20), object (Art. 21), and withdraw consent at any time (Art. 7(3)). These rights can be exercised by contacting mail@uweschwarz.eu.",
          },
        ],
        title: {
          de: "Betroffenenrechte",
          en: "Data Subject Rights",
        },
      },
      {
        paragraphs: [
          {
            de: "Du kannst dich bei einer Aufsichtsbehörde beschweren, z. B.: Landesbeauftragte für Datenschutz RLP, Hintere Bleiche 34, 55116 Mainz; Tel. 06131 8920-0; poststelle@datenschutz.rlp.de.",
            en: "You have the right to lodge a complaint with a supervisory authority, e.g.: Rhineland-Palatinate Commissioner for Data Protection, Hintere Bleiche 34, 55116 Mainz, Germany; Tel. +49 6131 8920-0; poststelle@datenschutz.rlp.de.",
          },
        ],
        title: {
          de: "Aufsichtsbehörde",
          en: "Supervisory Authority",
        },
      },
      {
        paragraphs: [
          {
            de: "Es findet keine automatisierte Entscheidungsfindung oder Profiling statt (Art. 22 DSGVO).",
            en: "No automated decision-making or profiling takes place in these processing operations (Art. 22 GDPR).",
          },
        ],
        title: {
          de: "Automatisierte Entscheidungsfindung",
          en: "Automated Decision-making",
        },
      },
      {
        paragraphs: [
          {
            de: "Ich kann diese Datenschutzerklärung jederzeit aktualisieren. Die jeweils aktuelle Version wird hier mit Datum der letzten Änderung veröffentlicht.",
            en: "I may update this Privacy Policy at any time. The current version is published here with the date of last revision.",
          },
        ],
        title: {
          de: "Änderungen dieser Datenschutzerklärung",
          en: "Changes to This Privacy Policy",
        },
      },
    ],
    subtitle: {
      de: "Letzte Aktualisierung: 02. August 2025",
      en: "Last updated: August 02, 2025",
    },
    title: {
      de: "Datenschutzerklärung",
      en: "Privacy Policy",
    },
  },
  projects: [
    {
      description: {
        de: "Leitung der Koordination, Architektur und Implementierung einer rechtssicheren E-Mail-Archivierungslösung für mehr als 50.000 Nutzer. Das System gewährleistet die unveränderbare Speicherung sämtlicher Kommunikation über mehr als 10 Jahre und erfüllt strenge regulatorische sowie prüfungsrelevante Anforderungen. Basierend auf Open-Source-Technologien wurde das Archiv mit Blick auf Skalierbarkeit, Redundanz und langfristige Wartbarkeit konzipiert. Integriertes Monitoring, Indexierung und Volltextsuche ermöglichen ein effizientes Auffinden historischer Korrespondenz.",
        en: "Led the coordination, architecture, and implementation of a legally compliant enterprise-wide email archiving solution for more than 50,000 users. The system ensures immutable storage of all communication for over 10 years, meeting strict regulatory and auditing requirements. Based on open-source technologies, the archive was designed with scalability, redundancy, and long-term maintainability in mind. Integrated monitoring, indexing, and full-text search enable efficient retrieval of historical correspondence.",
      },
      imageAlt: {
        de: "Symbolgrafik zum rechtssicheren E-Mail-Archiv: Zu sehen sind ein E-Mail-Symbol, zwei Datenbankstapel, ein Aktenschrank, eine Uhr, ein Kalender mit der Aufschrift „10+“ sowie ein Schutzschild mit Haken. Die Illustration steht für langfristige, unveränderbare E-Mail-Aufbewahrung, Sicherheit und Compliance für über 50.000 Nutzer.",
        en: "Illustration of a legally compliant email archiving system: Includes an envelope icon, two database stacks, a filing cabinet, a clock, a calendar labeled “10+”, and a shield with a checkmark. Represents long-term, immutable email retention, security, and compliance for over 50,000 users.",
      },
      imageUrl: "/projects/mailarchive.webp",
      tags: [
        { de: "dovecot", en: "dovecot" },
        { de: "postfix", en: "postfix" },
        { de: "Linux", en: "Linux" },
        { de: "CentOS", en: "CentOS" },
        { de: "Compliance", en: "Compliance" },
        { de: "Archivierung", en: "Archiving" },
        { de: "E-Mail-Sicherheit", en: "Email Security" },
      ],
      title: {
        de: "Rechtssicheres E-Mail-Archiv",
        en: "Secure Email Archive",
      },
    },
    {
      description: {
        de: "Konzeption und Implementierung eines Systems zur Unterstützung der Bearbeitung krebsbezogener Fälle mit KI. Die Plattform integriert sichere Datenverarbeitung, strukturierte Workflows und KI-basierte Assistenz, um Fälle zu priorisieren, zu analysieren und die Fallbearbeitung zu optimieren. Dadurch werden schnellere Reaktionszeiten und eine verbesserte Qualität im Umgang mit sensiblen medizinischen und juristischen Informationen gewährleistet.",
        en: "Designed and implemented a system to support the processing of cancer-related cases using AI. The platform integrates secure data handling, structured workflows, and AI-based assistance to prioritize, analyze, and streamline case management. This ensures faster response times and improved quality in handling sensitive medical and legal information.",
      },
      imageAlt: {
        de: "Illustration zu KI-gestützten Workflows in der Fallbearbeitung: sicherer Datenspeicher, KI-Entscheidungsknoten und Fallakten, die durch eine optimierte Prozesskette laufen.",
        en: "Illustration showing AI-assisted workflows in case management: secure data vault, AI decision nodes, and case files moving through an optimized pipeline.",
      },
      imageUrl: "/projects/ai_case_management.webp",
      tags: [
        { de: "Agentischer KI-Workflow", en: "Agentic AI Workflow" },
        { de: "Fallbearbeitung", en: "Case Management" },
        { de: "Datenschutz", en: "Data Protection" },
        { de: "Automatisierung", en: "Automation" },
      ],
      title: {
        de: "KI-unterstützte Fallbearbeitung",
        en: "AI-Supported Case Management",
      },
    },
    {
      description: {
        de: "Leitung der erfolgreichen Implementierung der SOC 2- und ISO 27001-Compliance-Frameworks, Aufbau robuster Informationssicherheitsrichtlinien und -kontrollen zur Einhaltung von Industriestandards und Gewährleistung des Datenschutzes.",
        en: "Led the successful implementation of SOC 2 and ISO 27001 compliance frameworks, establishing robust information security policies and controls to meet industry standards and ensure data protection.",
      },
      imageAlt: {
        de: "Illustration zur Darstellung der SOC 2- und ISO 27001-Zertifizierung: Zu sehen sind ein Zertifizierungsdokument mit Häkchen bei „SOC 2“ und „ISO 27001“, ein Sicherheitsschild, ein Vorhängeschloss und ein gesichertes Datenbanksymbol. Die Grafik steht für Informationssicherheit, Compliance und revisionssichere Datenverarbeitung.",
        en: "Illustration representing SOC 2 and ISO 27001 certification: Shows a certification document with checkmarks for “SOC 2” and “ISO 27001”, a security shield, a padlock, and a secured database icon. The graphic symbolizes information security, compliance, and audit-proof data processing.",
      },
      imageUrl: "/projects/soc2_cert.webp",
      tags: [
        { de: "SOC 2", en: "SOC 2" },
        { de: "ISO 27001", en: "ISO 27001" },
        { de: "Informationssicherheit", en: "Information Security" },
        { de: "Compliance", en: "Compliance" },
      ],
      title: {
        de: "SOC 2 & ISO 27001 Zertifizierung",
        en: "SOC 2 & ISO 27001 Certification",
      },
    },
    {
      description: {
        de: "Konzeption und Aufbau einer modularen Schulungsplattform zum EU-Gesetz über Künstliche Intelligenz (EU AI Act). Der Kurs vermittelt in klar strukturierten Lerneinheiten mit interaktiven Folien, Audiokommentaren und integrierten Quizfragen ein fundiertes Verständnis zu Geltungsbereich, risikobasiertem Ansatz und Compliance-Auswirkungen. Die Plattform umfasst fünf Sektionen – von den Grundlagen über Governance und Risikokategorien bis hin zu Praxisanwendungen – und wurde so entwickelt, dass sie zukünftig um weitere Module zu Datenschutz, ethischer KI und technischen Umsetzungsvorgaben erweitert werden kann.",
        en: "Designed and developed a modular training platform covering the EU Artificial Intelligence Act (EU AI Act). The course provides a structured learning path with interactive slides, voice narration, and integrated quizzes to ensure a clear understanding of the regulation’s scope, risk-based framework, and compliance implications. The platform includes five sections — from fundamentals to governance, risk categories, and real-world applications — and was built with future expansion in mind to accommodate upcoming modules on data protection, ethical AI, and technical implementation guidelines.",
      },
      imageAlt: {
        de: "Screenshot der Schulungsplattform zum EU AI Act mit abgeschlossenen Modulen, Quizfragen und einer strukturierten Übersicht über Themen wie risikobasierter Ansatz, Governance und Compliance-Strategien.",
        en: "Screenshot of the EU AI Act training platform showing completed modules, quizzes, and a structured overview of sections such as risk-based approach, governance, and compliance strategies.",
      },
      imageUrl: "/projects/ai_act_training.webp",
      tags: [
        { de: "EU AI Act", en: "EU AI Act" },
        { de: "Compliance-Schulung", en: "Compliance Training" },
        { de: "KI-Governance", en: "AI Governance" },
        { de: "E-Learning", en: "E-Learning" },
        { de: "Schulungsplattform", en: "Education Platform" },
        { de: "Regulatorischer Rahmen", en: "Regulatory Framework" },
      ],
      title: {
        de: "Schulungsplattform zum EU AI Act",
        en: "EU AI Act Training Platform",
      },
    },
    {
      description: {
        de: "Konzeption und Aufbau eines sicheren Zero-Config-VPN-Netzes auf Basis von IPv6 als Fundament für weltweite Konnektivität. Die Lösung ermöglicht nahtlose Peer-to-Peer-Kommunikation ohne manuelle Einrichtung, NAT-Traversal oder komplexe Provisionierung, bei gleichzeitig starker Verschlüsselung und modernen Authentifizierungsmechanismen. Durch die Kombination von einfachen Regeln mit erweiterten Sicherheitskontrollen entsteht eine widerstandsfähige, skalierbare und datenschutzfreundliche Netzwerkarchitektur für verteilte Umgebungen.",
        en: "Designed and implemented a secure, zero-configuration VPN network leveraging IPv6 as the foundation for global connectivity. The solution enables seamless peer-to-peer communication without manual setup, NAT traversal, or complex provisioning, while ensuring strong encryption and modern authentication mechanisms. By combining simple rules with advanced security controls, the network architecture provides resilient, scalable, and privacy-preserving access across distributed environments.",
      },
      imageAlt: {
        de: "Symbolgrafik für ein Zero-Config-VPN: Vernetzte, geschützte Geräte, die über ein globales IPv6-Netzwerk verbunden sind, mit Schloss-Symbolen für Verschlüsselung und Auto-Config-Elementen für die nahtlose Einrichtung ohne manuelles Eingreifen.",
        en: "Illustration of a zero-configuration VPN: interconnected shielded devices connected by a global IPv6 network grid, lock icons indicating encryption, and auto-config symbols representing seamless setup without manual intervention.",
      },
      imageUrl: "/projects/zeroconfigvpn.webp",
      tags: [
        { de: "IPv6", en: "IPv6" },
        { de: "Zero-Config", en: "Zero-Config" },
        { de: "VPN", en: "VPN" },
        { de: "Verschlüsselung", en: "Encryption" },
        { de: "Authentifizierung", en: "Authentication" },
        { de: "Compliance", en: "Compliance" },
        { de: "Netzwerksicherheit", en: "Network Security" },
      ],
      title: {
        de: "Zero-Config IPv6 VPN Netzwerk",
        en: "Zero-Config IPv6 VPN Network",
      },
    },
    {
      description: {
        de: "Modernisierung der bestehenden Backup-Infrastruktur durch Implementierung von Rubriks Enterprise-Backup-Lösung, Verbesserung des Datenschutzes, Reduzierung der Wiederherstellungszeiten und Vereinfachung des Managements in hybriden Umgebungen.",
        en: "Modernized the existing backup infrastructure by implementing Rubrik's enterprise backup solution, enhancing data protection, reducing recovery times, and simplifying management across hybrid environments.",
      },
      imageAlt: {
        de: "Illustration zur Backup-Modernisierung mit Rubrik: Zu sehen sind Symbole für Cloud-Speicherung mit Sicherheitsschild, Datenbanken, ein Wiederherstellungspfeil, ein Laptop mit Integrationssymbol sowie das Rubrik-Logo. Die Grafik steht für moderne Datensicherung, schnelle Wiederherstellung und nahtlose Systemintegration.",
        en: "Illustration depicting backup modernization with Rubrik: Features icons of secure cloud storage, data stacks, a recovery arrow, a laptop with an integration symbol, and the Rubrik logo. Represents modern data protection, fast recovery, and seamless system integration.",
      },
      imageUrl: "/projects/backup_rubrik.webp",
      tags: [
        { de: "Rubrik", en: "Rubrik" },
        { de: "Backup", en: "Backup" },
        { de: "Datenschutz", en: "Data Protection" },
        { de: "Hybrid Cloud", en: "Hybrid Cloud" },
      ],
      title: {
        de: "Modernisierung der Backup-Infrastruktur mit Rubrik",
        en: "Backup Infrastructure Modernization with Rubrik",
      },
    },
    {
      description: {
        de: "Entwicklung eines privaten Systems zur Digitalisierung aller persönlichen Dokumente und Briefe mittels OCR-Technologie. Integration einer KI-gestützten Klassifizierung zur automatischen Sortierung der Dokumente in vordefinierte Kategorien für effizientes Suchen, Auffinden und Archivieren. Zusätzlich wurde eine automatisierte Auswertung implementiert, um steuerrelevante Dokumente für die Einkommensteuer zu erkennen und entsprechend zu taggen.",
        en: "Developed a private system to digitize all personal documents and letters using OCR technology. Integrated AI-based classification to automatically sort documents into predefined categories, enabling efficient search, retrieval, and archival. Additionally, implemented automated analysis to detect tax-relevant documents for income tax purposes and tag them accordingly.",
      },
      imageAlt: {
        de: "Illustration zur Dokumentenerfassung und KI-Kategorisierung: Ein Scanner, digitalisierte Dokumente, KI-Knoten, die mit Ordnersymbolen verbunden sind, sowie kategorisierte Labels wie 'Finanzen', 'Gesundheit' und 'Versicherung'. Die Grafik steht für automatisierte Dokumentenverarbeitung und intelligente Organisation.",
        en: "Illustration showing document scanning and AI classification: A scanner, digitized documents, AI nodes connecting to folder icons, and categorized labels like 'Finance', 'Health', and 'Insurance'. Represents automated document processing and intelligent organization.",
      },
      imageUrl: "/projects/ocr_ai_documents.webp",
      tags: [
        { de: "OCR", en: "OCR" },
        { de: "KI-Kategorisierung", en: "AI Categorization" },
        { de: "KI-Agent", en: "AI Agent" },
        { de: "Dokumentenverwaltung", en: "Document Management" },
        { de: "Automatisierung", en: "Automation" },
      ],
      title: {
        de: "Automatisierte Dokumentenverwaltung mit OCR und KI-Kategorisierung",
        en: "Automated Document Management with OCR and AI Categorization",
      },
    },
  ],
  projectsSectionTitle: {
    de: "Entwickelte Lösungen",
    en: "Developed Solutions",
  },
  sitemap: {
    description: {
      de: "Hier sind alle Seiten dieser Website:",
      en: "Here are all the pages on this website:",
    },
    title: {
      de: "Seitenübersicht",
      en: "Sitemap",
    },
  },
  siteMetadata: {
    author: "Uwe Schwarz",
    description: {
      de: "Portfolio von Uwe Schwarz: Projektmanager, IT-Sicherheitsexperte und KI-Enthusiast",
      en: "Portfolio of Uwe Schwarz: Project Manager, IT Security Expert & AI Enthusiast",
    },
    title: "Uwe Schwarz Portfolio",
  },
  skills: [
    // Security & Compliance
    {
      category: "security",
      icon: ShieldCheck,
      level: 4,
      name: { de: "ISO27001", en: "ISO27001" },
    },
    {
      category: "security",
      icon: ShieldPlus,
      level: 4,
      name: { de: "SOC2", en: "SOC2" },
    },
    {
      category: "security",
      icon: Landmark,
      level: 5,
      name: { de: "DSGVO", en: "GDPR" },
    },
    {
      category: "security",
      icon: BookCheck,
      level: 4,
      name: { de: "NIST Framework", en: "NIST Framework" },
    },
    {
      category: "security",
      icon: Swords,
      level: 4,
      name: { de: "MITRE ATT&CK", en: "MITRE ATT&CK" },
    },
    {
      category: "security",
      icon: BookCheck,
      level: 5,
      name: { de: "BSI IT-Grundschutz", en: "BSI IT Baseline Protection" },
    },
    {
      category: "security",
      icon: FileCheck2,
      level: 5,
      name: { de: "Sicherheitsrichtlinien", en: "Security Policies" },
    },
    {
      category: "security",
      icon: AlertTriangle,
      level: 3,
      name: { de: "Risikomanagement", en: "Risk Management" },
    },
    {
      category: "security",
      icon: ScanSearch,
      level: 5,
      name: { de: "Vulnerabilitätsmanagement", en: "Vulnerability Mgmt." },
    },
    {
      category: "security",
      icon: Siren,
      level: 5,
      name: { de: "Incident Response", en: "Incident Response" },
    },
    {
      category: "security",
      icon: Bug,
      level: 5,
      name: {
        de: "Penetration Testing Mgmt.",
        en: "Penetration Testing Mgmt.",
      },
    },
    {
      category: "security",
      icon: Shield,
      level: 4,
      name: {
        de: "Proxy & Secure Web Gateways",
        en: "Proxy & Secure Web Gateways",
      },
    },

    // Infrastructure & Operations
    {
      category: "infrastructure",
      icon: SiLinux,
      level: 5,
      name: {
        de: "Linux: Debian, Ubuntu, RHEL",
        en: "Linux: Debian, Ubuntu, RHEL",
      },
    },
    {
      category: "infrastructure",
      icon: SiFreebsd,
      level: 3,
      name: {
        de: "Unix: FreeBSD, OpenBSD, Solaris",
        en: "Unix: FreeBSD, OpenBSD, Solaris",
      },
    },
    {
      category: "infrastructure",
      icon: SiApple,
      level: 5,
      name: { de: "macOS", en: "macOS" },
    },
    {
      category: "infrastructure",
      icon: Grid2X2,
      level: 2,
      name: { de: "Windows Server", en: "Windows Server" },
    },
    {
      category: "infrastructure",
      icon: SiCloudflare,
      level: 4,
      name: { de: "Cloudflare", en: "Cloudflare" },
    },
    {
      category: "infrastructure",
      icon: SiResend,
      level: 5,
      name: { de: "Resend", en: "Resend" },
    },
    {
      category: "infrastructure",
      icon: SiSupabase,
      level: 4,
      name: { de: "Supabase", en: "Supabase" },
    },
    {
      category: "infrastructure",
      icon: ServerCrash,
      level: 5,
      name: {
        de: "Hochverfügbarkeitssysteme",
        en: "High Availability Systems",
      },
    },
    {
      category: "infrastructure",
      icon: Database,
      level: 4,
      name: { de: "Rechenzentrumsbetrieb", en: "Data Center Operations" },
    },
    {
      category: "infrastructure",
      icon: Network,
      level: 5,
      name: { de: "TCP/IP, DNS, DHCP", en: "TCP/IP, DNS, DHCP" },
    },
    {
      category: "infrastructure",
      icon: Cable,
      level: 5,
      name: { de: "IPv6", en: "IPv6" },
    },

    // Tools & Automation
    {
      category: "tools",
      icon: Terminal,
      level: 5,
      name: { de: "Bash / Shell Skripte", en: "Bash / Shell Scripting" },
    },
    {
      category: "tools",
      icon: SiNotion,
      level: 4,
      name: { de: "Notion", en: "Notion" },
    },
    {
      category: "tools",
      icon: SiGit,
      level: 4,
      name: { de: "Git", en: "Git" },
    },
    {
      category: "tools",
      icon: CodeXml,
      level: 4,
      name: { de: "Cursor", en: "Cursor" },
    },
    {
      category: "tools",
      icon: SiPython,
      level: 3,
      name: { de: "Python", en: "Python" },
    },
    {
      category: "tools",
      icon: Mail,
      level: 4,
      name: { de: "Postfix / Dovecot", en: "Postfix / Dovecot" },
    },
    {
      category: "tools",
      icon: Globe,
      level: 5,
      name: { de: "Bind / Unbound", en: "Bind / Unbound" },
    },
    {
      category: "tools",
      icon: Shield,
      level: 4,
      name: { de: "Squid Proxy", en: "Squid Proxy" },
    },
    {
      category: "tools",
      icon: GitCompareArrows,
      level: 4,
      name: { de: "HAProxy", en: "HAProxy" },
    },
    {
      category: "tools",
      icon: SiCaddy,
      level: 4,
      name: { de: "Caddy", en: "Caddy" },
    },
    {
      category: "tools",
      icon: SiPuppet,
      level: 3,
      name: { de: "Puppet", en: "Puppet" },
    },
    {
      category: "tools",
      icon: SiDocker,
      level: 4,
      name: { de: "Docker", en: "Docker" },
    },

    // Management & Strategy
    {
      category: "management",
      icon: ListChecks,
      level: 5,
      name: { de: "Projektmanagement", en: "Project Management" },
    },
    {
      category: "management",
      icon: Users,
      level: 5,
      name: { de: "Teamleitung", en: "Team Leadership" },
    },
    {
      category: "management",
      icon: MessageCircle,
      level: 5,
      name: {
        de: "Stakeholder-Kommunikation",
        en: "Stakeholder Communication",
      },
    },
    {
      category: "management",
      icon: Route,
      level: 4,
      name: { de: "IT-Strategie", en: "IT Strategy" },
    },
    {
      category: "management",
      icon: FileText,
      level: 5,
      name: { de: "Technische Konzepte", en: "Technical Concepts" },
    },

    // Artificial Intelligence
    {
      category: "ai",
      icon: Bot,
      level: 4,
      name: { de: "Agentische KI", en: "Agentic AI" },
    },
    {
      category: "ai",
      icon: Image,
      level: 5,
      name: { de: "Multimodale KI", en: "Multimodal AI" },
    },
    {
      category: "ai",
      icon: GitBranch,
      level: 4,
      name: { de: "Kausale KI", en: "Causal AI" },
    },
    {
      category: "ai",
      icon: Heart,
      level: 5,
      name: { de: "Lovable", en: "Lovable" },
    },
    {
      category: "ai",
      icon: SiOpenai,
      level: 5,
      name: { de: "OpenAI / ChatGPT", en: "OpenAI / ChatGPT" },
    },
    {
      category: "ai",
      icon: SiAnthropic,
      level: 5,
      name: { de: "Anthropic / Claude", en: "Anthropic / Claude" },
    },
    {
      category: "ai",
      icon: SiGooglegemini,
      level: 5,
      name: { de: "Google / Gemini", en: "Google / Gemini" },
    },
    {
      category: "ai",
      icon: SiX,
      level: 5,
      name: { de: "xAI / Grok", en: "xAI / Grok" },
    },
    {
      category: "ai",
      icon: SearchCode,
      level: 3,
      name: {
        de: "Generative Engine Optimization (GEO)",
        en: "Generative Engine Optimization (GEO)",
      },
    },
    {
      category: "ai",
      icon: Video,
      level: 3,
      name: { de: "KI-Multimediaerzeugung", en: "AI Multimedia Generation" },
    },
    {
      category: "ai",
      icon: Scale,
      level: 5,
      name: { de: "KI-Ethik & Governance", en: "AI Ethics & Governance" },
    },

    // Languages
    {
      category: "languages",
      icon: Flag,
      level: 5,
      name: { de: "Deutsch (Muttersprache)", en: "German (Native)" },
    },
    {
      category: "languages",
      icon: Flag,
      level: 5,
      name: { de: "Englisch (C2)", en: "English (C2)" },
    },
  ],
  skillsSection: {
    categories: {
      ai: { de: "KI", en: "AI" },
      infrastructure: { de: "Infrastruktur", en: "Infrastructure" },
      languages: { de: "Sprachen", en: "Languages" },
      management: { de: "Management", en: "Management" },
      security: { de: "Sicherheit", en: "Security" },
      tools: { de: "Tools & DevOps", en: "Tools & DevOps" },
    },
    subtitle: {
      de: "Die Werkzeuge, auf die ich für sichere und skalierbare IT-Systeme setze",
      en: "The tools I rely on to build secure and scalable IT systems",
    },
    title: {
      de: "Fähigkeiten & Technologien",
      en: "Skills & Technologies",
    },
  },
  translations: {
    languageSwitch: {
      de: "Zu Deutsch wechseln",
      en: "Switch to English",
    },
    themeSwitch: {
      dark: {
        de: "Zum dunklen Design wechseln",
        en: "Switch to dark theme",
      },
      light: {
        de: "Zum hellen Design wechseln",
        en: "Switch to light theme",
      },
    },
  },
};
