import ReactPDF from "@react-pdf/renderer";

const renderWithoutUnicodeDecomposition = async <T>(renderFn: () => Promise<T>) => {
  const originalNormalize = String.prototype.normalize;

  // @react-pdf/textkit@6.2.0 decomposes custom-font text to NFD during layout,
  // which breaks umlaut positioning in this CV. Keep the change scoped to render.
  String.prototype.normalize = function (form?: string) {
    if (form === "NFD") {
      return String(this);
    }

    return originalNormalize.call(this, form);
  };

  try {
    return await renderFn();
  } finally {
    String.prototype.normalize = originalNormalize;
  }
};

export const renderPdf = async (element: Parameters<typeof ReactPDF.render>[0], filePath: string) =>
  renderWithoutUnicodeDecomposition(() => ReactPDF.render(element, filePath));
