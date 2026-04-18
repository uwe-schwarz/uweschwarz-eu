import { afterEach, describe, expect, mock, test } from "bun:test";

afterEach(() => {
  mock.restore();
});

describe("agent markdown route", () => {
  test("returns a controlled 500 response when markdown generation fails", async () => {
    mock.module("@/lib/agent-readiness", () => ({
      appendAgentDiscoveryHeaders(headers) {
        headers.append("Link", '</llms.txt>; rel="describedby"; type="text/plain"');
      },
      buildHomepageMarkdown() {
        throw new Error("boom");
      },
      buildMarkdownResponseHeaders() {
        return new globalThis.Headers({
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": "0",
        });
      },
    }));

    const { GET } = await import("@/app/api/agent-markdown/route");
    const response = await GET(new globalThis.Request("https://uweschwarz.eu/api/agent-markdown?lang=en"));

    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Unable to build markdown response");
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(response.headers.get("content-language")).toBe("en");
    expect(response.headers.get("link")).toContain('rel="describedby"');
  });
});
