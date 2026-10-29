import type { Language } from "../src/contexts/settings-hook";
import { siteContent } from "../src/content/content";

export const pages = {
  "404": { load: () => import("../src/app/NotFoundPage"), pathname: "/404" },
  cv: { load: () => import("../src/app/cv/CvPageClient"), pathname: "/cv" },
  home: { load: () => import("../src/app/HomePage"), pathname: "/" },
  imprint: { load: () => import("../src/app/imprint/ImprintPageClient"), pathname: "/imprint" },
  privacy: { load: () => import("../src/app/privacy/PrivacyPageClient"), pathname: "/privacy" },
  sitemap: { load: () => import("../src/app/sitemap/SitemapPageClient"), pathname: "/sitemap" },
};

export function pageMetadata(page: keyof typeof pages, language: Language) {
  const titles = {
    "404": { de: "404 - Seite nicht gefunden", en: "404 - Page not found" },
    cv: { de: "Lebenslauf - Uwe Schwarz", en: "Curriculum Vitae - Uwe Schwarz" },
    home: {
      de: "Uwe Schwarz - Software-Architekt, Security-Engineer & AI-Enthusiast",
      en: "Uwe Schwarz - Software Architect, Security Engineer & AI Enthusiast",
    },
    imprint: { de: "Impressum - Uwe Schwarz", en: "Imprint - Uwe Schwarz" },
    privacy: { de: "Datenschutz - Uwe Schwarz", en: "Privacy Policy - Uwe Schwarz" },
    sitemap: { de: "Seitenübersicht - Uwe Schwarz", en: "Sitemap - Uwe Schwarz" },
  };
  const descriptions = {
    "404": { de: "Die angeforderte Seite existiert nicht.", en: "The requested page does not exist." },
    cv: {
      de: "Lebenslauf von Uwe Schwarz - Software-Architekt, Security-Engineer & AI-Enthusiast",
      en: "Curriculum Vitae of Uwe Schwarz - Software Architect, Security Engineer & AI Enthusiast",
    },
    home: siteContent.siteMetadata.description,
    imprint: {
      de: "Impressum und rechtliche Informationen für die Website von Uwe Schwarz",
      en: "Imprint and legal information for Uwe Schwarz's website",
    },
    privacy: {
      de: "Datenschutzerklärung für die Website von Uwe Schwarz",
      en: "Privacy policy for Uwe Schwarz's website",
    },
    sitemap: {
      de: "Übersicht aller Seiten auf der Website von Uwe Schwarz",
      en: "Overview of all pages on Uwe Schwarz's website",
    },
  };
  return { description: descriptions[page][language], title: titles[page][language] };
}
