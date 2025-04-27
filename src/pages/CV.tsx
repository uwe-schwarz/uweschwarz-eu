import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Buffer shim for react-pdf (must be before pdf renderer import)
import { Buffer } from 'buffer';
// @ts-ignore
(globalThis as any).Buffer = Buffer;
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useSettings } from "@/contexts/SettingsContext";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Download, Globe, ArrowLeft, Save, Edit, Moon, Sun } from "lucide-react";
import CVDocument from "@/components/cv/CVDocument";
import { generateCvDocx } from "@/components/cv/CVDocumentDocx";
import CVEditor from "@/components/cv/CVEditor";
import { compressToUint8Array, decompressFromUint8Array } from "lz-string";

// Reusable Buttons für PDF und DOCX Download
const CvDownloadButtons: React.FC<{ language: 'en' | 'de'; cvData: any }> = ({ language, cvData }) => {
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const createDocx = async () => {
    setLoadingDocx(true);
    try {
      const blob = await generateCvDocx({ language, data: cvData });
      if (docxUrl) URL.revokeObjectURL(docxUrl);
      const url = URL.createObjectURL(blob);
      setDocxUrl(url);
    } finally {
      setLoadingDocx(false);
    }
  };

  // Trigger Download-Link wenn URL bereit
  useEffect(() => {
    if (docxUrl) {
      const link = document.createElement('a');
      link.href = docxUrl;
      link.download = `uwe_schwarz_cv_${language}_${new Date().toISOString().split('T')[0]}.docx`;
      link.click();
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(docxUrl);
        setDocxUrl(null);
      }, 1000);
    }
  }, [docxUrl, language]);

  return (
    <>
      {/* Desktop: separate buttons */}
      <div className="hidden md:flex space-x-4">
        <PDFDownloadLink
          document={<CVDocument language={language} data={cvData} />}
          fileName={`uwe_schwarz_cv_${language}_${new Date().toISOString().split('T')[0]}.pdf`}
          className="no-underline"
        >
          {({ loading }: any) => (
            <Button disabled={loading} className="rounded-full shadow-lg hover-scale" variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              {loading
                ? language === 'en' ? 'Loading …' : 'Wird geladen …'
                : language === 'en' ? 'Download PDF' : 'PDF herunterladen'}
            </Button>
          )}
        </PDFDownloadLink>
        <Button
          onClick={createDocx}
          disabled={loadingDocx}
          className="rounded-full shadow-lg hover-scale"
          variant="secondary"
        >
          <Download className="mr-2 h-4 w-4" />
          {loadingDocx
            ? language === 'en' ? 'Loading …' : 'Wird geladen …'
            : language === 'en' ? 'Download DOCX' : 'DOCX herunterladen'}
        </Button>
      </div>
      {/* Mobile: dropdown menu */}
      <div className="md:hidden relative">
        <Button
          onClick={() => setOpenMenu(!openMenu)}
          className="rounded-full shadow-lg hover-scale"
          variant="secondary"
        >
          <Download className="h-4 w-4" />
        </Button>
        {openMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
            <PDFDownloadLink
              document={<CVDocument language={language} data={cvData} />}
              fileName={`uwe_schwarz_cv_${language}_${new Date().toISOString().split('T')[0]}.pdf`}
              className="no-underline block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {({ loading }: any) => (
                <span className="flex items-center text-gray-900 dark:text-gray-100">
                  <Download className="mr-2 h-4 w-4" />
                  {loading
                    ? language === 'en' ? 'Loading …' : 'Wird geladen …'
                    : language === 'en' ? 'Download PDF' : 'PDF herunterladen'}
                </span>
              )}
            </PDFDownloadLink>
            <button
              onClick={() => { setOpenMenu(false); createDocx(); }}
              disabled={loadingDocx}
              className="w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              {loadingDocx
                ? language === 'en' ? 'Loading …' : 'Wird geladen …'
                : language === 'en' ? 'Download DOCX' : 'DOCX herunterladen'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const CV = () => {
  const { language, setLanguage, theme, setTheme, t } = useSettings();
  // Unicode-safe LZ compression + Base64 encoding/decoding using TextEncoder/TextDecoder
  const encodeData = (str: string): string => {
    const compressed = compressToUint8Array(str);
    let binary = '';
    for (let i = 0; i < compressed.length; i++) {
      binary += String.fromCharCode(compressed[i]);
    }
    return window.btoa(binary);
  };
  const decodeData = (b64: string): string => {
    const binary = window.atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return decompressFromUint8Array(bytes) || '';
  };

  const [clickCount, setClickCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cvData, setCvData] = useState(siteContent);
  useScrollToTop();

  // Check URL for saved data on component mount
  useEffect(() => {
    // Read from hash: #data=base64string
    const hash = window.location.hash;
    let savedData = null;
    if (hash.startsWith('#data=')) {
      savedData = hash.slice(6);
    }
    if (savedData) {
      try {
        const decodedJson = decodeData(savedData);
        const decodedData = JSON.parse(decodedJson);
        setCvData(decodedData);
      } catch (e) {
        console.error('Failed to parse saved data', e);
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
    // Save to URL hash (Unicode-safe Base64)
    const json = JSON.stringify(newData);
    const encodedData = encodeData(json);
    // Update URL hash without reloading
    window.location.hash = `data=${encodedData}`;
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
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="rounded-full shadow-lg hover-scale"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="rounded-full shadow-lg hover-scale"
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Deutsch' : 'English'}
            </Button>

            {/* Download-Buttons */}
            <CvDownloadButtons language={language} cvData={cvData} />
          </div>
        </div>
      </div>

      {/* CV */}
      <div className="bg-muted/80 px-8 py-4 flex-grow flex flex-col">
        {/* Title */}
        <div className="mb-6">
          <h1 
            className="text-4xl font-display font-bold mb-2"
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
                    <PDFViewer key={JSON.stringify(cvData)} showToolbar={false} className="max-w-[796px] w-full h-full">
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
