"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Globe, Moon, Sun } from "lucide-react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { CV_ASSETS } from "@/generated/cv-assets";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { replacePathLanguage, withLanguagePrefix } from "@/lib/i18n";
import { getPersistedLanguage, getPersistedTheme } from "@/lib/persisted-preferences";
import { Button } from "@/components/ui/button";

const CvDownloadButtons = ({ language }: { language: "en" | "de" }) => {
  const pdfUrl = CV_ASSETS[language].pdf;
  const docxUrl = CV_ASSETS[language].docx;

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
      <Button asChild className="rounded-full shadow-lg hover-scale" variant="secondary">
        <a download href={pdfUrl}>
          <Download className="mr-2 h-4 w-4" />
          {language === "en" ? "Download PDF" : "PDF herunterladen"}
        </a>
      </Button>
      <Button asChild className="rounded-full shadow-lg hover-scale" variant="secondary">
        <a download href={docxUrl}>
          <Download className="mr-2 h-4 w-4" />
          {language === "en" ? "Download DOCX" : "DOCX herunterladen"}
        </a>
      </Button>
    </div>
  );
};

export default function CvPageClient() {
  const { language, setLanguage, setTheme, t, theme } = useSettings();
  const router = useRouter();
  useScrollToTop();

  const pdfUrl = CV_ASSETS[language].pdf;
  const homeHref = withLanguagePrefix(language, "/");
  const cvTitle = t({ de: "Lebenslauf", en: "Curriculum Vitae" });

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link
            className="flex items-center text-muted-foreground hover:text-primary/80 dark:text-primary"
            href={homeHref as Route}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t(siteContent.backToHome)}</span>
          </Link>

          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Button
                aria-label={t(
                  theme === "light"
                    ? siteContent.translations.themeSwitch.dark
                    : siteContent.translations.themeSwitch.light,
                )}
                className="rounded-full shadow-lg hover-scale"
                onClick={() => {
                  const current = getPersistedTheme() ?? theme;
                  setTheme(current === "light" ? "dark" : "light");
                }}
                size="sm"
                variant="secondary"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                className="rounded-full shadow-lg hover-scale"
                onClick={() => {
                  const current = getPersistedLanguage() ?? language;
                  const nextLanguage = current === "en" ? "de" : "en";
                  setLanguage(nextLanguage);

                  const query = typeof window !== "undefined" ? window.location.search.slice(1) : "";
                  const hash = typeof window !== "undefined" ? window.location.hash : "";
                  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
                  const nextPath = replacePathLanguage(pathname, nextLanguage);
                  router.push(`${nextPath}${query ? `?${query}` : ""}${hash}` as Route);
                }}
                size="sm"
                variant="secondary"
              >
                <Globe className="mr-2 h-4 w-4" />
                {language === "en" ? "Deutsch" : "English"}
              </Button>
            </div>

            <CvDownloadButtons language={language} />
          </div>
        </div>
      </div>

      <div className="relative flex grow flex-col overflow-hidden bg-muted/40 px-4 py-8 md:px-8">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-aurora opacity-70" />
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl">
            <span className="text-gradient">{cvTitle}</span>
          </h1>
        </div>

        <div className="grid grow grid-cols-1 gap-12 lg:grid-cols-8">
          <div className="flex min-h-[500px] flex-col lg:col-span-6 lg:col-start-2">
            <div className="glass-panel relative flex grow flex-col overflow-hidden p-3 sm:p-5">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-primary/60 to-accent/60"
              />
              <iframe
                className="mx-auto h-full min-h-[500px] w-full max-w-[796px] grow border-0 bg-white shadow-lg"
                key={language}
                src={`${pdfUrl}#zoom=100&view=FitH&pagemode=none&toolbar=0`}
                title={cvTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
