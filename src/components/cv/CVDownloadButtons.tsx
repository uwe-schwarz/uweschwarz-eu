import React, { useEffect, useState, useCallback } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/content/content";
import CVDocument from "@/components/cv/CVDocument";
import type { BlobProviderParams, PDFDownloadLinkProps } from "@react-pdf/renderer";

interface CvDownloadButtonsProps {
  language: "en" | "de";
  cvData: SiteContent;
}

const getFileName = (language: "en" | "de", extension: "pdf" | "docx") =>
  `uwe_schwarz_cv_${language}_${new Date().toISOString().split("T")[0]}.${extension}`;

const CvDownloadButtons: React.FC<CvDownloadButtonsProps> = ({ language, cvData }) => {
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [PdfComponents, setPdfComponents] = useState<
    Pick<typeof import("@react-pdf/renderer"), "PDFDownloadLink">
  >();

  useEffect(() => {
    let mounted = true;
    void import("@react-pdf/renderer").then(mod => {
      if (mounted) {
        setPdfComponents({ PDFDownloadLink: mod.PDFDownloadLink });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const createDocx = useCallback(async () => {
    setLoadingDocx(true);
    try {
      const { generateCvDocx } = await import("@/components/cv/CVDocumentDocx");
      const blob = await generateCvDocx({ language, data: cvData });
      if (docxUrl) URL.revokeObjectURL(docxUrl);
      const url = URL.createObjectURL(blob);
      setDocxUrl(url);
    } finally {
      setLoadingDocx(false);
    }
  }, [cvData, docxUrl, language]);

  useEffect(() => {
    if (!docxUrl) return;

    const link = document.createElement("a");
    link.href = docxUrl;
    link.download = getFileName(language, "docx");
    link.click();

    const cleanupTimer = window.setTimeout(() => {
      URL.revokeObjectURL(docxUrl);
      setDocxUrl(null);
    }, 1000);

    return () => {
      window.clearTimeout(cleanupTimer);
      URL.revokeObjectURL(docxUrl);
    };
  }, [docxUrl, language]);

  const { PDFDownloadLink } = PdfComponents ?? {};

  const renderPdfDownload = (props?: Partial<PDFDownloadLinkProps>) =>
    PDFDownloadLink ? (
      <PDFDownloadLink
        document={<CVDocument language={language} data={cvData} />}
        fileName={getFileName(language, "pdf")}
        className="no-underline"
        {...props}
      >
        {({ loading }: BlobProviderParams) => (
          <Button disabled={loading} className="rounded-full shadow-lg hover-scale" variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            {loading
              ? language === "en" ? "Loading …" : "Wird geladen …"
              : language === "en" ? "Download PDF" : "PDF herunterladen"}
          </Button>
        )}
      </PDFDownloadLink>
    ) : (
      <Button disabled className="rounded-full shadow-lg hover-scale" variant="secondary">
        <Download className="mr-2 h-4 w-4" />
        {language === "en" ? "Download PDF" : "PDF herunterladen"}
      </Button>
    );

  return (
    <>
      <div className="hidden md:flex space-x-4">
        {renderPdfDownload()}
        <Button
          onClick={createDocx}
          disabled={loadingDocx}
          className="rounded-full shadow-lg hover-scale"
          variant="secondary"
        >
          <Download className="mr-2 h-4 w-4" />
          {loadingDocx
            ? language === "en" ? "Loading …" : "Wird geladen …"
            : language === "en" ? "Download DOCX" : "DOCX herunterladen"}
        </Button>
      </div>
      <div className="md:hidden relative">
        <Button
          onClick={() => setOpenMenu(prev => !prev)}
          className="rounded-full shadow-lg hover-scale"
          variant="secondary"
        >
          <Download className="h-4 w-4" />
        </Button>
        {openMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
            {renderPdfDownload({
              className: "no-underline block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            })}
            <button
              onClick={() => {
                setOpenMenu(false);
                void createDocx();
              }}
              disabled={loadingDocx}
              className="w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              {loadingDocx
                ? language === "en" ? "Loading …" : "Wird geladen …"
                : language === "en" ? "Download DOCX" : "DOCX herunterladen"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

CvDownloadButtons.displayName = "CvDownloadButtons";

export default CvDownloadButtons;
