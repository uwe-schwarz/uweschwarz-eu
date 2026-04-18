import { describe, expect, test } from "bun:test";

import { siteContent } from "@/content/content";

const formalAddressPattern = /\b(Sie|Ihnen|Ihr|Ihre|Ihrem|Ihren|Ihrer|Kontaktieren Sie|geben Sie)\b/u;

function collectGermanStrings(value) {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectGermanStrings);
  }

  if (value && typeof value === "object") {
    if (typeof value.de === "string") {
      return [value.de];
    }

    return Object.values(value).flatMap(collectGermanStrings);
  }

  return [];
}

describe("site content", () => {
  test("uses informal German address throughout content copy", () => {
    const germanStrings = collectGermanStrings(siteContent);
    const formalStrings = germanStrings.filter((value) => formalAddressPattern.test(value));

    expect(formalStrings).toEqual([]);
  });
});
