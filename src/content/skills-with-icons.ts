import type { ComponentType } from "react";
import {
  AlertTriangle,
  BookCheck,
  BookText,
  Bot,
  Bug,
  Cable,
  ClipboardList,
  CodeXml,
  Database,
  FileCheck2,
  FileText,
  GitBranch,
  GitCompareArrows,
  Globe,
  GlobeLock,
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
  ScrollText,
  SearchCode,
  ShieldCheck,
  ShieldPlus,
  Siren,
  Swords,
  Settings2,
  Terminal,
  Users,
  Video,
  Waypoints,
  Grid2X2,
  ServerCrash,
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
  SiOpenai,
  SiPython,
  SiSupabase,
  SiVercel,
  SiX,
} from "react-icons/si";
import { siteContent, type Skill } from "@/content/content";

type SkillIcon = ComponentType<{ className?: string }>;
type SkillIdentity = Pick<Skill, "category" | "name">;

export interface SkillWithIcon extends Skill {
  icon: SkillIcon;
  id: string;
}

const getSkillIdentityKey = ({ category, name }: SkillIdentity): string => `${category}:${name.en}:${name.de}`;

const skillIconMap = new Map<string, SkillIcon>([
  [getSkillIdentityKey({ category: "security", name: { de: "ISO27001", en: "ISO27001" } }), ShieldCheck],
  [getSkillIdentityKey({ category: "security", name: { de: "SOC2", en: "SOC2" } }), ShieldPlus],
  [getSkillIdentityKey({ category: "security", name: { de: "DSGVO", en: "GDPR" } }), Landmark],
  [getSkillIdentityKey({ category: "security", name: { de: "NIST Framework", en: "NIST Framework" } }), ClipboardList],
  [getSkillIdentityKey({ category: "security", name: { de: "MITRE ATT&CK", en: "MITRE ATT&CK" } }), Swords],
  [
    getSkillIdentityKey({
      category: "security",
      name: { de: "BSI IT-Grundschutz", en: "BSI IT Baseline Protection" },
    }),
    BookCheck,
  ],
  [
    getSkillIdentityKey({
      category: "security",
      name: { de: "Sicherheitsrichtlinien", en: "Security Policies" },
    }),
    FileCheck2,
  ],
  [
    getSkillIdentityKey({ category: "security", name: { de: "Risikomanagement", en: "Risk Management" } }),
    AlertTriangle,
  ],
  [
    getSkillIdentityKey({
      category: "security",
      name: { de: "Vulnerabilitätsmanagement", en: "Vulnerability Mgmt." },
    }),
    ScanSearch,
  ],
  [getSkillIdentityKey({ category: "security", name: { de: "Incident Response", en: "Incident Response" } }), Siren],
  [
    getSkillIdentityKey({
      category: "security",
      name: { de: "Penetrationstest-Koordination", en: "Penetration Test Coordination" },
    }),
    Bug,
  ],
  [
    getSkillIdentityKey({
      category: "security",
      name: { de: "Proxy & Secure Web Gateways", en: "Proxy & Secure Web Gateways" },
    }),
    GlobeLock,
  ],
  [
    getSkillIdentityKey({
      category: "infrastructure",
      name: { de: "Linux: Debian, Ubuntu, RHEL", en: "Linux: Debian, Ubuntu, RHEL" },
    }),
    SiLinux,
  ],
  [
    getSkillIdentityKey({
      category: "infrastructure",
      name: { de: "Unix: FreeBSD, OpenBSD, Solaris", en: "Unix: FreeBSD, OpenBSD, Solaris" },
    }),
    SiFreebsd,
  ],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "macOS", en: "macOS" } }), SiApple],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "Windows Server", en: "Windows Server" } }), Grid2X2],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "Cloudflare", en: "Cloudflare" } }), SiCloudflare],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "E-Mail", en: "Mail" } }), Mail],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "Vercel", en: "Vercel" } }), SiVercel],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "Supabase", en: "Supabase" } }), SiSupabase],
  [
    getSkillIdentityKey({
      category: "infrastructure",
      name: { de: "Neon PostgreSQL", en: "Neon PostgreSQL" },
    }),
    Database,
  ],
  [
    getSkillIdentityKey({
      category: "infrastructure",
      name: { de: "Hochverfügbarkeitssysteme", en: "High Availability Systems" },
    }),
    ServerCrash,
  ],
  [
    getSkillIdentityKey({
      category: "infrastructure",
      name: { de: "TCP/IP, DNS, DHCP", en: "TCP/IP, DNS, DHCP" },
    }),
    Network,
  ],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "IPv6", en: "IPv6" } }), Cable],
  [
    getSkillIdentityKey({
      category: "tools",
      name: { de: "Bash / Shell Skripte", en: "Bash / Shell Scripting" },
    }),
    Terminal,
  ],
  [getSkillIdentityKey({ category: "tools", name: { de: "Git", en: "Git" } }), SiGit],
  [getSkillIdentityKey({ category: "tools", name: { de: "Codex", en: "Codex" } }), CodeXml],
  [getSkillIdentityKey({ category: "tools", name: { de: "Claude Code", en: "Claude Code" } }), Terminal],
  [getSkillIdentityKey({ category: "tools", name: { de: "Python", en: "Python" } }), SiPython],
  [getSkillIdentityKey({ category: "tools", name: { de: "Postfix / Dovecot", en: "Postfix / Dovecot" } }), Mail],
  [getSkillIdentityKey({ category: "tools", name: { de: "Bind / Unbound", en: "Bind / Unbound" } }), Globe],
  [getSkillIdentityKey({ category: "tools", name: { de: "Squid Proxy", en: "Squid Proxy" } }), Route],
  [getSkillIdentityKey({ category: "tools", name: { de: "HAProxy", en: "HAProxy" } }), GitCompareArrows],
  [getSkillIdentityKey({ category: "tools", name: { de: "Caddy", en: "Caddy" } }), SiCaddy],
  [getSkillIdentityKey({ category: "tools", name: { de: "Puppet", en: "Puppet" } }), Settings2],
  [getSkillIdentityKey({ category: "tools", name: { de: "Docker", en: "Docker" } }), SiDocker],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Software-Architektur", en: "Software Architecture" },
    }),
    ListChecks,
  ],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Plattformarchitektur", en: "Platform Architecture" },
    }),
    Grid2X2,
  ],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Infrastrukturarchitektur", en: "Infrastructure Architecture" },
    }),
    Network,
  ],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Technische Führung", en: "Technical Leadership" },
    }),
    Waypoints,
  ],
  [getSkillIdentityKey({ category: "management", name: { de: "Teamleitung", en: "Team Leadership" } }), Users],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Stakeholder-Kommunikation", en: "Stakeholder Communication" },
    }),
    MessageCircle,
  ],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Technische Konzepte", en: "Technical Concepts" },
    }),
    FileText,
  ],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Delivery-Struktur", en: "Delivery Structure" },
    }),
    Route,
  ],
  [getSkillIdentityKey({ category: "ai", name: { de: "KI-Workflows", en: "AI Workflows" } }), GitBranch],
  [getSkillIdentityKey({ category: "ai", name: { de: "Agentische KI", en: "Agentic AI" } }), Bot],
  [
    getSkillIdentityKey({
      category: "ai",
      name: { de: "Evaluierung von KI-Werkzeugen", en: "AI Tool Evaluation" },
    }),
    ScanSearch,
  ],
  [
    getSkillIdentityKey({
      category: "ai",
      name: { de: "KI-Trainingsplattformen", en: "AI Training Platforms" },
    }),
    BookCheck,
  ],
  [
    getSkillIdentityKey({ category: "ai", name: { de: "Prompt Engineering", en: "Prompt Engineering" } }),
    MessageCircle,
  ],
  [getSkillIdentityKey({ category: "ai", name: { de: "Multimodale KI", en: "Multimodal AI" } }), Image],
  [getSkillIdentityKey({ category: "ai", name: { de: "Kausale KI", en: "Causal AI" } }), GitBranch],
  [getSkillIdentityKey({ category: "ai", name: { de: "Lovable", en: "Lovable" } }), Heart],
  [getSkillIdentityKey({ category: "ai", name: { de: "OpenAI / ChatGPT", en: "OpenAI / ChatGPT" } }), SiOpenai],
  [
    getSkillIdentityKey({
      category: "ai",
      name: { de: "Anthropic / Claude", en: "Anthropic / Claude" },
    }),
    SiAnthropic,
  ],
  [getSkillIdentityKey({ category: "ai", name: { de: "Google / Gemini", en: "Google / Gemini" } }), SiGooglegemini],
  [getSkillIdentityKey({ category: "ai", name: { de: "xAI / Grok", en: "xAI / Grok" } }), SiX],
  [
    getSkillIdentityKey({
      category: "ai",
      name: {
        de: "Generative Engine Optimization (GEO)",
        en: "Generative Engine Optimization (GEO)",
      },
    }),
    SearchCode,
  ],
  [
    getSkillIdentityKey({
      category: "ai",
      name: { de: "KI-Medienerzeugung", en: "AI Media Generation" },
    }),
    Video,
  ],
  [getSkillIdentityKey({ category: "ai", name: { de: "KI-Ethik & Governance", en: "AI Ethics & Governance" } }), Scale],
  [
    getSkillIdentityKey({ category: "languages", name: { de: "Deutsch (Muttersprache)", en: "German (Native)" } }),
    ScrollText,
  ],
  [getSkillIdentityKey({ category: "languages", name: { de: "Englisch (C2)", en: "English (C2)" } }), BookText],
]);

export const skillsWithIcons: Array<SkillWithIcon> = siteContent.skills.map((skill) => {
  const id = getSkillIdentityKey(skill);
  const icon = skillIconMap.get(id);

  if (!icon) {
    throw new Error(`Missing icon mapping for skill: ${id}`);
  }

  return {
    ...skill,
    icon,
    id,
  };
});
