import { describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";

import { proxy } from "@/proxy";

describe("proxy agent readiness behavior", () => {
  test("adds agent discovery link headers to homepage responses", () => {
    const request = new NextRequest("https://uweschwarz.eu/en");
    const response = proxy(request);

    expect(response.headers.get("link")).toContain('rel="describedby"');
    expect(response.headers.get("link")).toContain('rel="service-doc"');
  });

  test("rewrites homepage markdown requests to the internal markdown route", () => {
    const request = new NextRequest("https://uweschwarz.eu/de", {
      headers: {
        accept: "text/markdown, text/html;q=0.8",
      },
    });
    const response = proxy(request);

    expect(response.headers.get("x-middleware-rewrite")).toContain("/api/agent-markdown?lang=de");
    expect(response.headers.get("link")).toContain('rel="describedby"');
  });

  test("treats trailing-slash localized homepages like the homepage", () => {
    const request = new NextRequest("https://uweschwarz.eu/en/", {
      headers: {
        accept: "text/markdown, text/html;q=0.8",
      },
    });
    const response = proxy(request);
    const rewriteTarget = response.headers.get("x-middleware-rewrite");

    expect(rewriteTarget).toContain("/api/agent-markdown/");
    expect(rewriteTarget).toContain("lang=en");
    expect(response.headers.get("link")).toContain('rel="service-doc"');
  });
});
