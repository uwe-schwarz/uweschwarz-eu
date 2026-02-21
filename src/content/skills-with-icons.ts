import type { ComponentType } from "react";
import {
  AlertTriangle,
  BookCheck,
  Bot,
  Bug,
  Cable,
  CodeXml,
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
  ShieldPlus,
  Siren,
  Swords,
  Terminal,
  Users,
  Video,
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
  SiNotion,
  SiOpenai,
  SiPuppet,
  SiPython,
  SiResend,
  SiSupabase,
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
  [getSkillIdentityKey({ category: "security", name: { de: "NIST Framework", en: "NIST Framework" } }), BookCheck],
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
      name: { de: "Penetration Testing Mgmt.", en: "Penetration Testing Mgmt." },
    }),
    Bug,
  ],
  [
    getSkillIdentityKey({
      category: "security",
      name: { de: "Proxy & Secure Web Gateways", en: "Proxy & Secure Web Gateways" },
    }),
    Shield,
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
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "Resend", en: "Resend" } }), SiResend],
  [getSkillIdentityKey({ category: "infrastructure", name: { de: "Supabase", en: "Supabase" } }), SiSupabase],
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
      name: { de: "Rechenzentrumsbetrieb", en: "Data Center Operations" },
    }),
    Database,
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
  [getSkillIdentityKey({ category: "tools", name: { de: "Notion", en: "Notion" } }), SiNotion],
  [getSkillIdentityKey({ category: "tools", name: { de: "Git", en: "Git" } }), SiGit],
  [getSkillIdentityKey({ category: "tools", name: { de: "Cursor", en: "Cursor" } }), CodeXml],
  [getSkillIdentityKey({ category: "tools", name: { de: "Python", en: "Python" } }), SiPython],
  [getSkillIdentityKey({ category: "tools", name: { de: "Postfix / Dovecot", en: "Postfix / Dovecot" } }), Mail],
  [getSkillIdentityKey({ category: "tools", name: { de: "Bind / Unbound", en: "Bind / Unbound" } }), Globe],
  [getSkillIdentityKey({ category: "tools", name: { de: "Squid Proxy", en: "Squid Proxy" } }), Shield],
  [getSkillIdentityKey({ category: "tools", name: { de: "HAProxy", en: "HAProxy" } }), GitCompareArrows],
  [getSkillIdentityKey({ category: "tools", name: { de: "Caddy", en: "Caddy" } }), SiCaddy],
  [getSkillIdentityKey({ category: "tools", name: { de: "Puppet", en: "Puppet" } }), SiPuppet],
  [getSkillIdentityKey({ category: "tools", name: { de: "Docker", en: "Docker" } }), SiDocker],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Projektmanagement", en: "Project Management" },
    }),
    ListChecks,
  ],
  [getSkillIdentityKey({ category: "management", name: { de: "Teamleitung", en: "Team Leadership" } }), Users],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Stakeholder-Kommunikation", en: "Stakeholder Communication" },
    }),
    MessageCircle,
  ],
  [getSkillIdentityKey({ category: "management", name: { de: "IT-Strategie", en: "IT Strategy" } }), Route],
  [
    getSkillIdentityKey({
      category: "management",
      name: { de: "Technische Konzepte", en: "Technical Concepts" },
    }),
    FileText,
  ],
  [getSkillIdentityKey({ category: "ai", name: { de: "Agentische KI", en: "Agentic AI" } }), Bot],
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
      name: { de: "KI-Multimediaerzeugung", en: "AI Multimedia Generation" },
    }),
    Video,
  ],
  [getSkillIdentityKey({ category: "ai", name: { de: "KI-Ethik & Governance", en: "AI Ethics & Governance" } }), Scale],
  [
    getSkillIdentityKey({ category: "languages", name: { de: "Deutsch (Muttersprache)", en: "German (Native)" } }),
    Flag,
  ],
  [getSkillIdentityKey({ category: "languages", name: { de: "Englisch (C2)", en: "English (C2)" } }), Flag],
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
