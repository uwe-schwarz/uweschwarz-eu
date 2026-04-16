import ReactPDF from "@react-pdf/renderer";

export const renderPdf = async (element: Parameters<typeof ReactPDF.render>[0], filePath: string) =>
  ReactPDF.render(element, filePath);
