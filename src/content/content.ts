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
}

export interface Experience {
  title: LocalizedString;
  company: string;
  period: LocalizedString;
  location: string;
  description: LocalizedString;
  tags: string[];
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
  downloadResume: LocalizedString;
}

export const siteContent: SiteContent = {
  siteMetadata: {
    title: "Uwe Schwarz Portfolio",
    description: {
      en: "Project Manager, IT Security Specialist & AI Enthusiast portfolio",
      de: "Projektmanagers, IT-Sicherheitsexperten und KI-Enthusiasten",
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
    titleElements: [
      {
        en: "Project Manager",
        de: "Projektmanager",
      },
      {
        en: "IT Security",
        de: "IT-Sicherheit",
      },
      {
        en: "AI Enthusiast",
        de: "KI-Enthusiast",
      },
    ],
    description: {
      en: "I build exceptional digital experiences with modern technologies and a passion for clean, maintainable code.",
      de: "Ich entwickle außergewöhnliche digitale Erlebnisse mit modernen Technologien und einer Leidenschaft für sauberen, wartbaren Code.",
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
        position: 90,
        distance: 130,
        code: "projects&nbsp;foo&nbsp;=&nbsp;📋",
      },
      {
        position: 20,
        distance: 100,
        code: '&lt;<span class="text-accent">code</span>/&gt;',
      },
      {
        position: 75,
        distance: 150,
        code: "const dev = 💻",
      },
      {
        position: 50,
        distance: 85,
        code: "🤖 AI",
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
        en: "With over 15 years of experience in software development, I've worked across the full stack to create innovative solutions for complex problems. I started my journey as a backend developer and gradually expanded my expertise to encompass frontend technologies, DevOps practices, and more recently, artificial intelligence.",
        de: "Mit über 15 Jahren Erfahrung in der Softwareentwicklung habe ich über den gesamten Stack hinweg innovative Lösungen für komplexe Probleme geschaffen. Ich begann meine Reise als Backend-Entwickler und erweiterte mein Fachwissen nach und nach auf Frontend-Technologien, DevOps-Praktiken und in jüngerer Zeit auf künstliche Intelligenz.",
      },
      {
        en: "I'm passionate about creating clean, maintainable code and leveraging modern tools to build efficient, scalable applications. When I'm not coding, I'm exploring the latest advancements in AI and machine learning, experimenting with new technologies, or contributing to open-source projects.",
        de: "Ich bin leidenschaftlich daran interessiert, sauberen, wartbaren Code zu schreiben und moderne Tools zu nutzen, um effiziente, skalierbare Anwendungen zu erstellen. Wenn ich nicht programmiere, erforsche ich die neuesten Entwicklungen in KI und maschinellem Lernen, experimentiere mit neuen Technologien oder trage zu Open-Source-Projekten bei.",
      },
      {
        en: "As an AI enthusiast, I'm particularly interested in how machine learning can be integrated into everyday applications to enhance user experiences and solve previously intractable problems.",
        de: "Als KI-Enthusiast interessiere ich mich besonders dafür, wie maschinelles Lernen in alltägliche Anwendungen integriert werden kann, um die Benutzererfahrung zu verbessern und bisher unlösbare Probleme zu lösen.",
      },
    ],
    imageAlt: {
      en: "Portrait photo of me at my workspace",
      de: "Porträtfoto von mir an meinem Arbeitsplatz",
    },
    labels: {
      experience: { en: "Years of Experience", de: "Jahre Erfahrung" },
      projects: { en: "Completed Projects", de: "Abgeschlossene Projekte" },
      technologies: { en: "Technologies", de: "Technologien" },
    },
  },
  experiences: [
    {
      title: {
        en: "Senior Full-Stack Developer",
        de: "Senior Full-Stack Entwickler",
      },
      company: "Tech Innovations GmbH",
      period: { en: "Jan 2018 - Present", de: "Jan 2018 - Heute" },
      location: "Berlin, Germany",
      description: {
        en: "Leading development of enterprise web applications using React, Node.js, and AWS. Implementing CI/CD pipelines and mentoring junior developers.",
        de: "Leitung der Entwicklung von Unternehmenswebanwendungen mit React, Node.js und AWS. Implementierung von CI/CD-Pipelines und Mentoring von Junior-Entwicklern.",
      },
      tags: ["React", "Node.js", "AWS", "TypeScript", "Docker"],
      logoUrl: "/placeholder.svg",
    },
    {
      title: { en: "Backend Developer", de: "Backend Entwickler" },
      company: "Digital Solutions AG",
      period: { en: "Mar 2015 - Dec 2017", de: "Mär 2015 - Dez 2017" },
      location: "Munich, Germany",
      description: {
        en: "Developed and maintained RESTful APIs using Java Spring. Optimized database queries and implemented microservices architecture.",
        de: "Entwicklung und Wartung von RESTful APIs mit Java Spring. Optimierung von Datenbankabfragen und Implementierung einer Microservices-Architektur.",
      },
      tags: ["Java", "Spring", "PostgreSQL", "Microservices", "REST API"],
    },
    {
      title: { en: "Software Engineer", de: "Software Ingenieur" },
      company: "WebTech Solutions",
      period: { en: "Jun 2012 - Feb 2015", de: "Jun 2012 - Feb 2015" },
      location: "Hamburg, Germany",
      description: {
        en: "Built web applications using PHP and JavaScript. Worked on e-commerce platforms and integrated payment systems.",
        de: "Entwicklung von Webanwendungen mit PHP und JavaScript. Arbeit an E-Commerce-Plattformen und Integration von Zahlungssystemen.",
      },
      tags: ["PHP", "JavaScript", "MySQL", "jQuery", "E-commerce"],
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
  downloadResume: { en: "Download Full Resume", de: "Vollständigen Lebenslauf herunterladen" },
};
