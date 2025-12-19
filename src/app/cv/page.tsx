"use client";

import Link from "next/link";
import type { Route } from "next";
import { Download, Globe, ArrowLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { CV_ASSETS } from "@/generated/cv-assets";
import { replacePathLanguage, withLanguagePrefix } from "@/lib/i18n";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CvDownloadButtons = ({ language }: { language: "en" | "de" }) => {
  const pdfUrl = CV_ASSETS[language].pdf;
  const docxUrl = CV_ASSETS[language].docx;

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
      <Button asChild className="rounded-full shadow-lg hover-scale" variant="secondary">
        <a href={pdfUrl} download>
          <Download className="mr-2 h-4 w-4" />
          {language === "en" ? "Download PDF" : "PDF herunterladen"}
        </a>
      </Button>
      <Button asChild className="rounded-full shadow-lg hover-scale" variant="secondary">
        <a href={docxUrl} download>
          <Download className="mr-2 h-4 w-4" />
          {language === "en" ? "Download DOCX" : "DOCX herunterladen"}
        </a>
      </Button>
    </div>
  );
};

export default function CvPage() {
  const { language, setLanguage, theme, setTheme, t } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useScrollToTop();

  const pdfUrl = CV_ASSETS[language].pdf;
  const getPersistedLanguage = (): "en" | "de" | null => {
    try {
      const saved = localStorage.getItem("language");
      return saved === "en" || saved === "de" ? saved : null;
    } catch {
      return null;
    }
  };

  const getPersistedTheme = (): "light" | "dark" | null => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "light" || saved === "dark" ? saved : null;
    } catch {
      return null;
    }
  };

  const homeHref = withLanguagePrefix(language, "/");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href={homeHref as Route}
            className="flex items-center text-muted-foreground hover:text-primary/80 dark:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t(siteContent.backToHome)}</span>
          </Link>

          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const current = getPersistedTheme() ?? theme;
                  setTheme(current === "light" ? "dark" : "light");
                }}
                className="rounded-full shadow-lg hover-scale"
                aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const current = getPersistedLanguage() ?? language;
                  const nextLanguage = current === "en" ? "de" : "en";
                  setLanguage(nextLanguage);

                  const query = searchParams?.toString();
                  const hash = typeof window !== "undefined" ? window.location.hash : "";
                  const nextPath = replacePathLanguage(pathname, nextLanguage);
                  router.push(`${nextPath}${query ? `?${query}` : ""}${hash}` as Route);
                }}
                className="rounded-full shadow-lg hover-scale"
              >
                <Globe className="mr-2 h-4 w-4" />
                {language === "en" ? "Deutsch" : "English"}
              </Button>
            </div>

            <CvDownloadButtons language={language} />
          </div>
        </div>
      </div>

      <div className="flex grow flex-col bg-muted/80 px-4 py-4 md:px-8">
        <div className="mb-6">
          <h1 className="mb-2 font-display text-4xl font-bold">
            {t({
              en: "Curriculum Vitae",
              de: "Lebenslauf",
            })}
          </h1>
        </div>

        <div className="grid grow grid-cols-1 gap-12 lg:grid-cols-8">
          <div className="relative z-0 flex min-h-[500px] flex-col lg:col-span-6 lg:col-start-2">
            <div className="flex grow flex-col rounded-lg border-4 border-white shadow-xl dark:border-gray-800">
              <div className="flex grow flex-col justify-center bg-linear-to-br from-primary/40 to-accent/40">
                <div className="m-6 flex grow justify-center overflow-hidden">
                  <iframe
                    key={language}
                    src={`${pdfUrl}#zoom=100&view=FitH&pagemode=none&toolbar=0`}
                    title={language === "en" ? "Curriculum Vitae" : "Lebenslauf"}
                    className="min-h-[500px] h-full w-full max-w-[796px] rounded-lg border-0 bg-white shadow-inner"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 -rotate-6 rounded-lg bg-primary" />
            <div className="absolute -top-4 -right-4 -z-10 h-20 w-20 rotate-6 rounded-lg bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
