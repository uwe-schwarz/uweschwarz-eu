import { DEFAULT_LANGUAGE, isSupportedLanguage } from "@/lib/i18n";
import {
  appendAgentDiscoveryHeaders,
  buildHomepageMarkdown,
  buildMarkdownResponseHeaders,
} from "@/lib/agent-readiness";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLanguage = searchParams.get("lang");
  const language = isSupportedLanguage(requestedLanguage) ? requestedLanguage : DEFAULT_LANGUAGE;

  try {
    const markdown = buildHomepageMarkdown(language);
    const headers = buildMarkdownResponseHeaders(markdown);

    headers.set("Content-Language", language);
    appendAgentDiscoveryHeaders(headers);

    return new Response(markdown, {
      headers,
      status: 200,
    });
  } catch {
    const headers = new Headers({
      "Content-Language": language,
      "Content-Type": "text/plain; charset=utf-8",
    });

    appendAgentDiscoveryHeaders(headers);

    return new Response("Unable to build markdown response", {
      headers,
      status: 500,
    });
  }
}
