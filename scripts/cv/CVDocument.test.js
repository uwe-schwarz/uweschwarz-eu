import { describe, expect, test } from "bun:test";

import { formatFooterText } from "./CVDocument";

describe("formatFooterText", () => {
  test("uses the provided update date instead of the current render date", () => {
    const footer = formatFooterText("en", 1, 8, new Date("2026-03-13T10:07:02+01:00"));

    expect(footer).toBe("Page 1 of 8\nLast updated: March 2026");
  });

  test("formats the provided date in German", () => {
    const footer = formatFooterText("de", 2, 8, new Date("2026-03-13T10:07:02+01:00"));

    expect(footer).toBe("Seite 2 von 8\nLetztes Update: März 2026");
  });
});
