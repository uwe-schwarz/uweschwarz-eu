import React from "react";
import { Link } from "react-router-dom";
import { Download, Globe, ArrowLeft, Moon, Sun } from "lucide-react";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { CV_ASSETS } from "@/generated/cv-assets";

const CvDownloadButtons: React.FC<{ language: "en" | "de" }> = ({ language }) => {
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

const CV: React.FC = () => {
  const { language, setLanguage, theme, setTheme, t } = useSettings();
  useScrollToTop();

  const pdfUrl = CV_ASSETS[language].pdf;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to="/"
            className="flex items-center text-muted-foreground dark:text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t(siteContent.backToHome)}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="rounded-full shadow-lg hover-scale"
                aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "de" : "en")}
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

      <div className="bg-muted/80 px-4 md:px-8 py-4 flex-grow flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-display font-bold mb-2">
            {t({
              en: "Curriculum Vitae",
              de: "Lebenslauf",
            })}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 flex-grow">
          <div className="lg:col-span-6 lg:col-start-2 flex-grow flex flex-col relative z-0 transform -translate-y-2 min-h-[500px]">
            <div className="rounded-lg shadow-xl border-4 border-white dark:border-gray-800 flex-grow flex flex-col">
              <div className="bg-gradient-to-br from-primary/40 to-accent/40 flex-grow flex flex-col justify-center">
                <div className="m-6 flex flex-grow justify-center overflow-hidden">
                  <iframe
                    key={language}
                    src={pdfUrl}
                    title={language === "en" ? "Curriculum Vitae" : "Lebenslauf"}
                    className="max-w-[796px] w-full h-full rounded-lg border-0 bg-white shadow-inner min-h-[500px]"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg transform rotate-6 -z-10" />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-lg transform -rotate-6 -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
