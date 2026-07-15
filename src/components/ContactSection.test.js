import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const contactSectionSource = readFileSync(new URL("./ContactSection.tsx", import.meta.url), "utf8");
const contentSource = readFileSync(new URL("../content/content.ts", import.meta.url), "utf8");
const brandIconsSource = readFileSync(new URL("./icons/brand-icons.tsx", import.meta.url), "utf8");

describe("ContactSection", () => {
  test("renders the contact form without lazy loading", () => {
    expect(contactSectionSource).toContain('import ContactFormCard from "@/components/ContactFormCard";');
    expect(contactSectionSource).not.toContain('from "next/dynamic"');
    expect(contactSectionSource).not.toContain("IntersectionObserver");
    expect(contactSectionSource).not.toContain("ContactFormCardFallback");
  });

  test("shares one social link class across all social anchors", () => {
    expect(contactSectionSource).toContain("const socialLinkClassName =");
    expect(contactSectionSource.match(/className=\{socialLinkClassName\}/g)).toHaveLength(5);
  });

  test("does not expose the retired Bluesky profile", () => {
    expect(contentSource).not.toMatch(/bluesky/i);
    expect(contactSectionSource).not.toMatch(/bluesky/i);
    expect(brandIconsSource).not.toMatch(/bluesky/i);
  });

  test("exports brand icons as named component declarations", () => {
    expect(brandIconsSource).not.toContain("createBrandIcon");
    expect(brandIconsSource.match(/^export function \w+Icon\(/gm)).toHaveLength(16);
  });
});
