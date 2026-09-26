"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";

interface DocumentPageProps {
  children: ReactNode;
  subtitle?: string;
  title: string;
}

// Shared frame for the legal and utility pages: same plan, calmer content.
const DocumentPage = ({ children, subtitle, title }: DocumentPageProps) => {
  const { t } = useSettings();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="relative isolate grow pb-20 pt-28 sm:pt-36">
        <div aria-hidden="true" className="blueprint-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="section-shell">
          <div className="mx-auto max-w-3xl">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              href="/"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {t(siteContent.backToHome)}
            </Link>

            <h1 className="mt-8 text-5xl sm:text-6xl">{title}</h1>
            {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}

            <div className="sheet mt-12 p-6 leading-relaxed sm:p-10 [&_a]:font-medium [&_a]:text-primary [&_h2]:mb-4 [&_h2]:text-2xl [&_section+section]:mt-10">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

DocumentPage.displayName = "DocumentPage";

export default DocumentPage;
