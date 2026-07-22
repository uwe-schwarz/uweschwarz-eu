import type { Metadata } from "next";

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import TrainingsSection from "@/components/TrainingsSection";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const canonicalUrl = `${SITE_URL}/${lang}`;

  const title =
    lang === "de"
      ? "Uwe Schwarz - Software-Architekt, Security-Engineer & AI-Enthusiast"
      : "Uwe Schwarz - Software Architect, Security Engineer & AI Enthusiast";

  const description =
    lang === "de"
      ? "Portfolio von Uwe Schwarz - Software-Architekt, Security-Engineer & AI-Enthusiast"
      : "Portfolio of Uwe Schwarz - Software Architect, Security Engineer & AI Enthusiast";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <AboutSection />
        <TrainingsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
