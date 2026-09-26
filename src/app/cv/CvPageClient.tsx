"use client";

import { ArrowLeft, Download, Globe, Moon, Sun } from "lucide-react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { CV_ASSETS } from "@/generated/cv-assets";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { getPathname, Link } from "@/i18n/navigation";
import { getPersistedTheme } from "@/lib/persisted-preferences";
import { applyThemeWithTransition } from "@/lib/theme-transition";
import { Button } from "@/components/ui/button";

const CvDownloadButtons = ({ language }: { language: "en" | "de" }) => {
  const pdfUrl = CV_ASSETS[language].pdf;
  const docxUrl = CV_ASSETS[language].docx;

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm">
        <a download href={pdfUrl}>
          <Download aria-hidden="true" />
          {language === "en" ? "Download PDF" : "PDF herunterladen"}
        </a>
      </Button>
      <Button asChild size="sm" variant="outline">
        <a download href={docxUrl}>
          <Download aria-hidden="true" />
          {language === "en" ? "Download DOCX" : "DOCX herunterladen"}
        </a>
      </Button>
    </div>
  );
};

export default function CvPageClient() {
  const { language, setTheme, t, theme } = useSettings();
  useScrollToTop();

  const pdfUrl = CV_ASSETS[language].pdf;
  const homeHref = "/";
  const cvTitle = t({ de: "Lebenslauf", en: "Curriculum Vitae" });

  return (
    <div className="relative isolate flex min-h-dvh flex-col">
      <div aria-hidden="true" className="blueprint-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="section-shell pt-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            href={homeHref}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span>{t(siteContent.backToHome)}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              aria-label={t(
                theme === "light"
                  ? siteContent.translations.themeSwitch.dark
                  : siteContent.translations.themeSwitch.light,
              )}
              onClick={(event) => {
                const current = getPersistedTheme() ?? theme;
                applyThemeWithTransition(current === "light" ? "dark" : "light", setTheme, event);
              }}
              size="icon"
              variant="ghost"
            >
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </Button>

            <Button
              onClick={() => {
                const nextLanguage = language === "en" ? "de" : "en";
                const localizedPathname = getPathname({ href: "/cv", locale: nextLanguage });

                window.location.assign(`${localizedPathname}${window.location.search}${window.location.hash}`);
              }}
              size="sm"
              variant="ghost"
            >
              <Globe aria-hidden="true" />
              {language === "en" ? "Deutsch" : "English"}
            </Button>

            <CvDownloadButtons language={language} />
          </div>
        </div>
      </div>

      <div className="section-shell flex grow flex-col pb-10 pt-12">
        <h1 className="text-5xl sm:text-6xl">{cvTitle}</h1>

        <div className="print mt-10 flex grow flex-col p-3 sm:p-5">
          <iframe
            className="mx-auto h-full min-h-[70vh] w-full max-w-[796px] grow rounded-md border-0 bg-white"
            key={language}
            src={`${pdfUrl}#zoom=100&view=FitH&pagemode=none&toolbar=0`}
            title={cvTitle}
          />
        </div>
      </div>
    </div>
  );
}
