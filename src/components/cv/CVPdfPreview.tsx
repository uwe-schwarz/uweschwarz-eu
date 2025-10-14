import React, { useMemo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import type { SiteContent } from "@/content/content";
import CVDocument from "@/components/cv/CVDocument";

interface CVPdfPreviewProps {
  language: "en" | "de";
  data: SiteContent;
}

const CVPdfPreview: React.FC<CVPdfPreviewProps> = ({ language, data }) => {
  const viewerKey = useMemo(
    () => JSON.stringify({ language, data }),
    [language, data]
  );

  return (
    <PDFViewer key={viewerKey} showToolbar={false} className="max-w-[796px] w-full h-full">
      <CVDocument language={language} data={data} />
    </PDFViewer>
  );
};

CVPdfPreview.displayName = "CVPdfPreview";

export default React.memo(CVPdfPreview);
