import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Buffer shim for react-pdf (must be before pdf renderer import)
import { Buffer } from 'buffer';
// @ts-expect-error TODO: Buffer is a polyfill for react-pdf, this might not be needed with future library versions
(globalThis as typeof globalThis & { Buffer?: unknown }).Buffer = Buffer;
import { useSettings } from "@/contexts/settings-hook";
import { siteContent, SiteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Globe, ArrowLeft, Edit, Moon, Sun } from "lucide-react";
import { compressToUint8Array, decompressFromUint8Array } from "lz-string";
import { Skeleton } from "@/components/ui/skeleton";

const CVDownloadButtons = React.lazy(() => import("@/components/cv/CVDownloadButtons"));
const CVEditor = React.lazy(() => import("@/components/cv/CVEditor"));
const CVPdfPreview = React.lazy(() => import("@/components/cv/CVPdfPreview"));


const DownloadButtonsFallback = () => (
  <>
    <div className="hidden md:flex space-x-4">
      <Skeleton className="h-10 w-40 rounded-full" />
      <Skeleton className="h-10 w-48 rounded-full" />
    </div>
    <div className="md:hidden relative">
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  </>
);

DownloadButtonsFallback.displayName = "DownloadButtonsFallback";

const EditorFallback = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-10">
    <Skeleton className="h-8 w-48 mb-4" />
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

EditorFallback.displayName = "EditorFallback";

const PdfPreviewFallback = () => (
  <div className="flex w-full items-center justify-center">
    <Skeleton className="h-[842px] w-[595px] max-w-full rounded-lg" />
  </div>
);

PdfPreviewFallback.displayName = "PdfPreviewFallback";

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

  const handleDataChange = (newData: SiteContent) => {
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
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
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
            <Suspense fallback={<DownloadButtonsFallback />}>
              <CVDownloadButtons language={language} cvData={cvData} />
            </Suspense>
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
              <Suspense fallback={<EditorFallback />}>
                <CVEditor
                  data={cvData}
                  onChange={handleDataChange}
                  language={language}
                />
              </Suspense>
            </div>
          ) : (
            <div className="lg:col-span-6 lg:col-start-2 flex-grow flex flex-col relative z-0 transform -translate-y-2 min-h-[500px]">
              <div className="rounded-lg shadow-xl border-4 border-white dark:border-gray-800 flex-grow flex flex-col">
                <div className="bg-gradient-to-br from-primary/40 to-accent/40 justify-center flex-grow flex flex-col">
                  <div className="m-6 flex flex-grow justify-center">
                    <Suspense fallback={<PdfPreviewFallback />}>
                      <CVPdfPreview language={language} data={cvData} />
                    </Suspense>
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
