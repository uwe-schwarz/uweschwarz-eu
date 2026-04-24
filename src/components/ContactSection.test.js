import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const contactSectionSource = readFileSync(new URL("./ContactSection.tsx", import.meta.url), "utf8");

describe("ContactSection", () => {
  test("renders the contact form without lazy loading", () => {
    expect(contactSectionSource).toContain('import ContactFormCard from "@/components/ContactFormCard";');
    expect(contactSectionSource).not.toContain('from "next/dynamic"');
    expect(contactSectionSource).not.toContain("IntersectionObserver");
    expect(contactSectionSource).not.toContain("ContactFormCardFallback");
  });
});
