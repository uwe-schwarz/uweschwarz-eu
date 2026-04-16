import ReactPDF from "@react-pdf/renderer";
import { afterEach, expect, mock, test } from "bun:test";

const originalRender = ReactPDF.render;

afterEach(() => {
  ReactPDF.render = originalRender;
  mock.restore();
});

test("renderPdf wraps renderer failures with the target path", async () => {
  const renderError = new Error("renderer boom");
  ReactPDF.render = mock(async () => {
    throw renderError;
  });

  const { renderPdf } = await import("./renderPdf.ts");

  await expect(renderPdf({ type: "mock-element" }, "/tmp/cv.pdf")).rejects.toThrow(
    "Failed to render PDF at path: /tmp/cv.pdf",
  );
});
