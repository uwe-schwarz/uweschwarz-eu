import ReactPDF from "@react-pdf/renderer";

export const renderPdf = async (element: Parameters<typeof ReactPDF.render>[0], filePath: string) => {
  try {
    await ReactPDF.render(element, filePath);
  } catch (error) {
    throw new Error(`Failed to render PDF at path: ${filePath}`, { cause: error });
  }
};
