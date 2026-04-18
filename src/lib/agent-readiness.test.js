import { describe, expect, test } from "bun:test";

import {
  AGENT_DISCOVERY_LINKS,
  appendAgentDiscoveryHeaders,
  buildHomepageMarkdown,
  buildMarkdownResponseHeaders,
  hasMarkdownAcceptHeader,
  isHomepagePath,
} from "@/lib/agent-readiness";

describe("agent readiness helpers", () => {
  test("marks only homepage routes as eligible for agent negotiation", () => {
    expect(isHomepagePath("/")).toBe(true);
    expect(isHomepagePath("/en")).toBe(true);
    expect(isHomepagePath("/de")).toBe(true);
    expect(isHomepagePath("/en/")).toBe(true);
    expect(isHomepagePath("/de///")).toBe(true);

    expect(isHomepagePath("/en/cv")).toBe(false);
    expect(isHomepagePath("/privacy")).toBe(false);
  });

  test("recognizes markdown accept negotiation only when markdown is not lower priority", () => {
    expect(hasMarkdownAcceptHeader("text/markdown")).toBe(true);
    expect(hasMarkdownAcceptHeader("text/html, text/markdown;q=0.8")).toBe(false);
    expect(hasMarkdownAcceptHeader("text/html;q=0.5, text/markdown;q=0.8")).toBe(true);
    expect(hasMarkdownAcceptHeader("text/html;q=0.8, text/markdown;q=0.8")).toBe(true);
    expect(hasMarkdownAcceptHeader("text/html;q=1, text/markdown;q=0.1")).toBe(false);
    expect(hasMarkdownAcceptHeader("*/*;q=1, text/markdown;q=0.8")).toBe(false);
    expect(hasMarkdownAcceptHeader("text/markdown;q=0")).toBe(false);
    expect(hasMarkdownAcceptHeader("text/html")).toBe(false);
    expect(hasMarkdownAcceptHeader(null)).toBe(false);
  });

  test("advertises agent-useful homepage links with registered relation types", () => {
    expect(AGENT_DISCOVERY_LINKS).toEqual(
      expect.arrayContaining([
        expect.stringContaining('rel="describedby"'),
        expect.stringContaining('rel="service-doc"'),
      ]),
    );
    expect(AGENT_DISCOVERY_LINKS.join(",")).toContain("</llms.txt>");
    expect(AGENT_DISCOVERY_LINKS.join(",")).toContain("</sitemap>");

    const headers = new globalThis.Headers();
    appendAgentDiscoveryHeaders(headers);

    expect(headers.get("link")).toContain('rel="describedby"');
    expect(headers.get("link")).toContain('rel="service-doc"');
  });

  test("renders homepage markdown with markdown-specific response headers", () => {
    const markdown = buildHomepageMarkdown("en");
    const headers = buildMarkdownResponseHeaders(markdown);

    expect(markdown).toContain("# Uwe Schwarz");
    expect(markdown).toContain("## About");
    expect(markdown).toContain("## Skills");
    expect(markdown).toContain("## Contact");
    expect(headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(Number(headers.get("x-markdown-tokens"))).toBeGreaterThan(100);
  });
});
