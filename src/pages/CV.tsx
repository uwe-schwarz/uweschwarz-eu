
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useSettings } from "@/contexts/SettingsContext";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Download, Globe, ArrowLeft, Save, Edit } from "lucide-react";
import CVDocument from "@/components/cv/CVDocument";
import CVEditor from "@/components/cv/CVEditor";

const CV = () => {
  const { language, setLanguage, t } = useSettings();
  const [clickCount, setClickCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cvData, setCvData] = useState(siteContent);
  useScrollToTop();

  // Check URL for saved data on component mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const savedData = url.searchParams.get('data');
    if (savedData) {
      try {
        const decodedData = JSON.parse(atob(savedData));
        setCvData(decodedData);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 7) {
        setEditMode(true);
        return 0;
      }
      return newCount;
    });
  };

  const handleDataChange = (newData) => {
    setCvData(newData);
    
    // Save to URL
    const encodedData = btoa(JSON.stringify(newData));
    const url = new URL(window.location.href);
    url.searchParams.set('data', encodedData);
    window.history.pushState({}, '', url.toString());
  };

  const handleExitEditMode = () => {
    setEditMode(false);
    setClickCount(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-muted-foreground dark:text-primary hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t(siteContent.backToHome)}</span>
          </Link>

          <div className="flex items-center space-x-4">
            {editMode && (
              <Button
                onClick={handleExitEditMode}
                variant="destructive"
                size="sm"
                className="rounded-full shadow-lg hover-scale"
              >
                <Edit className="mr-2 h-4 w-4" />
                {t({
                  en: 'Exit Edit Mode',
                  de: 'Bearbeitungsmodus verlassen'
                })}
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="rounded-full shadow-lg hover-scale"
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Deutsch' : 'English'}
            </Button>

            <PDFDownloadLink 
              document={<CVDocument language={language} data={cvData} />} 
              fileName={`uwe_schwarz_cv_${language}_${new Date().toISOString().split('T')[0]}.pdf`}
              className="no-underline"
            >
              {({ loading }) => (
                <Button disabled={loading} className="rounded-full shadow-lg hover-scale" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  {loading ? t({en: 'Loading...', de: 'Wird geladen...'}) : t({
                    en: 'Download PDF',
                    de: 'PDF herunterladen'
                  })}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      {/* CV */}
      <div className="bg-muted/80 px-8 py-4 flex-grow flex flex-col">
        {/* Title */}
        <div className="mb-6">
          <h1 
            className="text-4xl font-display font-bold mb-2 cursor-pointer"
            onClick={handleTitleClick}
          >
            {t({
              en: 'Curriculum Vitae',
              de: 'Lebenslauf'
            })}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 flex-grow">
          {editMode ? (
            <div className="lg:col-span-6 lg:col-start-2">
              <CVEditor 
                data={cvData} 
                onChange={handleDataChange}
                language={language}
              />
            </div>
          ) : (
            <div className="lg:col-span-6 lg:col-start-2 flex-grow flex flex-col relative z-0 transform -translate-y-2 min-h-[500px]">
              <div className="rounded-lg shadow-xl border-4 border-white dark:border-gray-800 flex-grow flex flex-col">
                <div className="bg-gradient-to-br from-primary/40 to-accent/40 justify-center flex-grow flex flex-col">
                  <div className="m-6 flex flex-grow justify-center">
                    <PDFViewer showToolbar={false} className="max-w-[796px] w-full h-full">
                      <CVDocument language={language} data={cvData} />
                    </PDFViewer>
                  </div>
                </div>
              </div>
            
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg transform rotate-6 -z-10"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-lg transform -rotate-6 -z-10"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CV;
