
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useSettings } from "@/contexts/SettingsContext";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Download, FileText, Globe, ArrowLeft } from "lucide-react";
import ResumeDocument from "@/components/cv/ResumeDocument";

const CV = () => {
  const { language, setLanguage, t } = useSettings();
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center text-primary hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t(siteContent.backToHome)}</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="flex items-center"
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Deutsch' : 'English'}
            </Button>

            <PDFDownloadLink 
              document={<ResumeDocument language={language} />} 
              fileName={`uwe_schwarz_cv_${language}.pdf`}
              className="inline-block"
            >
              {({ blob, url, loading, error }) => (
                <Button disabled={loading} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  {loading ? 'Loading...' : t({
                    en: 'Download PDF',
                    de: 'PDF herunterladen'
                  })}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-4xl font-display font-bold mb-2">{t({
            en: 'Resume',
            de: 'Lebenslauf'
          })}</h1>
          <p className="text-muted-foreground">{t({
            en: 'Preview your resume in the current language. You can download it or switch languages using the buttons above.',
            de: 'Vorschau deines Lebenslaufs in der aktuellen Sprache. Du kannst ihn herunterladen oder die Sprache mit den Schaltflächen oben wechseln.'
          })}</p>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-lg h-[800px] bg-white">
          <PDFViewer
            showToolbar={false}
            className="w-full h-full"
          >
            <ResumeDocument language={language} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default CV;
