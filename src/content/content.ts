
interface LocalizedString {
  en: string;
  de: string;
}

export interface NavItem {
  label: LocalizedString;
  href: string;
}

export interface HeroSection {
  greeting: LocalizedString;
  name: string;
  title: LocalizedString;
  description: LocalizedString;
  ctaPrimary: LocalizedString;
  ctaSecondary: LocalizedString;
}

export interface AboutSection {
  title: LocalizedString;
  paragraphs: LocalizedString[];
  imageAlt: LocalizedString;
  labels: {
    experience: LocalizedString;
    projects: LocalizedString;
    technologies: LocalizedString;
  }
}

export interface Experience {
  title: LocalizedString;
  company: string;
  period: LocalizedString;
  location: string;
  description: LocalizedString;
  tags: string[];
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
  level: number; // 1-5
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
    twitter?: string;
  };
  formLabels: {
    name: LocalizedString;
    email: LocalizedString;
    message: LocalizedString;
    send: LocalizedString;
  };
}

export interface Footer {
  copyright: LocalizedString;
  links: NavItem[];
}

export interface SiteContent {
  siteMetadata: {
    title: string;
    description: LocalizedString;
    author: string;
  };
  navigation: NavItem[];
  hero: HeroSection;
  about: AboutSection;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  skillsSection: SkillsSection;
  contact: ContactSection;
  footer: Footer;
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
}

export const siteContent: SiteContent = {
  siteMetadata: {
    title: "Oldman Portfolio",
    description: {
      en: "Full-stack developer and AI enthusiast portfolio",
      de: "Portfolio eines Full-Stack-Entwicklers und KI-Enthusiasten"
    },
    author: "Oldman",
  },
  navigation: [
    { label: { en: "Home", de: "Start" }, href: "#hero" },
    { label: { en: "About", de: "Über mich" }, href: "#about" },
    { label: { en: "Experience", de: "Erfahrung" }, href: "#experience" },
    { label: { en: "Projects", de: "Projekte" }, href: "#projects" },
    { label: { en: "Skills", de: "Fähigkeiten" }, href: "#skills" },
    { label: { en: "Contact", de: "Kontakt" }, href: "#contact" }
  ],
  hero: {
    greeting: { 
      en: "Hi there! I'm", 
      de: "Hallo! Ich bin" 
    },
    name: "Oldman",
    title: { 
      en: "Full-Stack Developer & AI Enthusiast", 
      de: "Full-Stack Entwickler & KI-Enthusiast" 
    },
    description: { 
      en: "I build exceptional digital experiences with modern technologies and a passion for clean, maintainable code.", 
      de: "Ich entwickle außergewöhnliche digitale Erlebnisse mit modernen Technologien und einer Leidenschaft für sauberen, wartbaren Code." 
    },
    ctaPrimary: { 
      en: "See my work", 
      de: "Meine Arbeit ansehen" 
    },
    ctaSecondary: { 
      en: "Download CV", 
      de: "Lebenslauf herunterladen" 
    }
  },
  about: {
    title: { 
      en: "About Me", 
      de: "Über Mich" 
    },
    paragraphs: [
      { 
        en: "With over 15 years of experience in software development, I've worked across the full stack to create innovative solutions for complex problems. I started my journey as a backend developer and gradually expanded my expertise to encompass frontend technologies, DevOps practices, and more recently, artificial intelligence.",
        de: "Mit über 15 Jahren Erfahrung in der Softwareentwicklung habe ich über den gesamten Stack hinweg innovative Lösungen für komplexe Probleme geschaffen. Ich begann meine Reise als Backend-Entwickler und erweiterte mein Fachwissen nach und nach auf Frontend-Technologien, DevOps-Praktiken und in jüngerer Zeit auf künstliche Intelligenz."
      },
      { 
        en: "I'm passionate about creating clean, maintainable code and leveraging modern tools to build efficient, scalable applications. When I'm not coding, I'm exploring the latest advancements in AI and machine learning, experimenting with new technologies, or contributing to open-source projects.",
        de: "Ich bin leidenschaftlich daran interessiert, sauberen, wartbaren Code zu schreiben und moderne Tools zu nutzen, um effiziente, skalierbare Anwendungen zu erstellen. Wenn ich nicht programmiere, erforsche ich die neuesten Entwicklungen in KI und maschinellem Lernen, experimentiere mit neuen Technologien oder trage zu Open-Source-Projekten bei."
      },
      { 
        en: "As an AI enthusiast, I'm particularly interested in how machine learning can be integrated into everyday applications to enhance user experiences and solve previously intractable problems.",
        de: "Als KI-Enthusiast interessiere ich mich besonders dafür, wie maschinelles Lernen in alltägliche Anwendungen integriert werden kann, um die Benutzererfahrung zu verbessern und bisher unlösbare Probleme zu lösen."
      }
    ],
    imageAlt: {
      en: "Portrait photo of me at my workspace",
      de: "Porträtfoto von mir an meinem Arbeitsplatz"
    },
    labels: {
      experience: { en: "Years of Experience", de: "Jahre Erfahrung" },
      projects: { en: "Completed Projects", de: "Abgeschlossene Projekte" },
      technologies: { en: "Technologies", de: "Technologien" }
    }
  },
  experiences: [
    {
      title: { en: "Senior Full-Stack Developer", de: "Senior Full-Stack Entwickler" },
      company: "Tech Innovations GmbH",
      period: { en: "Jan 2018 - Present", de: "Jan 2018 - Heute" },
      location: "Berlin, Germany",
      description: { 
        en: "Leading development of enterprise web applications using React, Node.js, and AWS. Implementing CI/CD pipelines and mentoring junior developers.", 
        de: "Leitung der Entwicklung von Unternehmenswebanwendungen mit React, Node.js und AWS. Implementierung von CI/CD-Pipelines und Mentoring von Junior-Entwicklern." 
      },
      tags: ["React", "Node.js", "AWS", "TypeScript", "Docker"]
    },
    {
      title: { en: "Backend Developer", de: "Backend Entwickler" },
      company: "Digital Solutions AG",
      period: { en: "Mar 2015 - Dec 2017", de: "Mär 2015 - Dez 2017" },
      location: "Munich, Germany",
      description: { 
        en: "Developed and maintained RESTful APIs using Java Spring. Optimized database queries and implemented microservices architecture.", 
        de: "Entwicklung und Wartung von RESTful APIs mit Java Spring. Optimierung von Datenbankabfragen und Implementierung einer Microservices-Architektur." 
      },
      tags: ["Java", "Spring", "PostgreSQL", "Microservices", "REST API"]
    },
    {
      title: { en: "Software Engineer", de: "Software Ingenieur" },
      company: "WebTech Solutions",
      period: { en: "Jun 2012 - Feb 2015", de: "Jun 2012 - Feb 2015" },
      location: "Hamburg, Germany",
      description: { 
        en: "Built web applications using PHP and JavaScript. Worked on e-commerce platforms and integrated payment systems.", 
        de: "Entwicklung von Webanwendungen mit PHP und JavaScript. Arbeit an E-Commerce-Plattformen und Integration von Zahlungssystemen." 
      },
      tags: ["PHP", "JavaScript", "MySQL", "jQuery", "E-commerce"]
    }
  ],
  projects: [
    {
      title: { en: "AI-Powered Recommendation Engine", de: "KI-gestützte Empfehlungs-Engine" },
      description: { 
        en: "A machine learning system that analyzes user behavior and provides personalized content recommendations. Utilizes collaborative filtering and deep learning models.", 
        de: "Ein Machine-Learning-System, das das Nutzerverhalten analysiert und personalisierte Inhaltsempfehlungen liefert. Nutzt kollaboratives Filtern und Deep-Learning-Modelle." 
      },
      imageUrl: "/placeholder.svg",
      imageAlt: { en: "Recommendation Engine Dashboard", de: "Empfehlungs-Engine Dashboard" },
      tags: ["TensorFlow", "Python", "React", "AWS", "Machine Learning"],
      demoUrl: "#",
      repoUrl: "https://github.com"
    },
    {
      title: { en: "Enterprise Resource Planning System", de: "Enterprise Resource Planning System" },
      description: { 
        en: "A comprehensive ERP solution for manufacturing companies. Features include inventory management, production planning, and financial reporting.", 
        de: "Eine umfassende ERP-Lösung für Fertigungsunternehmen. Funktionen umfassen Bestandsverwaltung, Produktionsplanung und Finanzberichterstattung." 
      },
      imageUrl: "/placeholder.svg",
      imageAlt: { en: "ERP System Interface", de: "ERP-System-Schnittstelle" },
      tags: ["Angular", "Node.js", "MongoDB", "Docker", "Redis"],
      demoUrl: "#"
    },
    {
      title: { en: "Blockchain-based Supply Chain", de: "Blockchain-basierte Lieferkette" },
      description: { 
        en: "A supply chain tracking system built on blockchain technology. Ensures transparency and traceability of products from manufacturer to consumer.", 
        de: "Ein auf Blockchain-Technologie basierendes System zur Verfolgung von Lieferketten. Gewährleistet Transparenz und Rückverfolgbarkeit von Produkten vom Hersteller zum Verbraucher." 
      },
      imageUrl: "/placeholder.svg",
      imageAlt: { en: "Supply Chain Dashboard", de: "Lieferketten-Dashboard" },
      tags: ["Ethereum", "Solidity", "React", "Node.js", "Web3.js"],
      repoUrl: "https://github.com"
    }
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
    { name: "Prompt Engineering", icon: "edit", category: "ai", level: 5 }
  ],
  skillsSection: {
    title: { 
      en: "Skills & Technologies", 
      de: "Fähigkeiten & Technologien" 
    },
    subtitle: { 
      en: "The tools I use to bring ideas to life", 
      de: "Die Werkzeuge, mit denen ich Ideen zum Leben erwecke" 
    },
    categories: {
      frontend: { en: "Frontend", de: "Frontend" },
      backend: { en: "Backend", de: "Backend" },
      tools: { en: "Tools & DevOps", de: "Tools & DevOps" },
      ai: { en: "AI & ML", de: "KI & ML" }
    }
  },
  contact: {
    title: { 
      en: "Get In Touch", 
      de: "Kontakt aufnehmen" 
    },
    subtitle: { 
      en: "Interested in working together? Feel free to reach out!", 
      de: "Interesse an einer Zusammenarbeit? Kontaktieren Sie mich gerne!" 
    },
    emailLabel: { 
      en: "Email me at", 
      de: "E-Mail an" 
    },
    email: "contact@oldman.cloud",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    formLabels: {
      name: { en: "Name", de: "Name" },
      email: { en: "Email", de: "E-Mail" },
      message: { en: "Message", de: "Nachricht" },
      send: { en: "Send Message", de: "Nachricht senden" }
    }
  },
  footer: {
    copyright: { 
      en: "© 2025 Oldman. All rights reserved.", 
      de: "© 2025 Oldman. Alle Rechte vorbehalten." 
    },
    links: [
      { label: { en: "Privacy Policy", de: "Datenschutz" }, href: "#privacy" },
      { label: { en: "Terms of Service", de: "Nutzungsbedingungen" }, href: "#terms" },
      { label: { en: "Imprint", de: "Impressum" }, href: "#imprint" }
    ]
  },
  translations: {
    languageSwitch: {
      en: "DE",
      de: "EN"
    },
    themeSwitch: {
      light: { en: "Dark Mode", de: "Dunkelmodus" },
      dark: { en: "Light Mode", de: "Hellmodus" }
    }
  }
};
