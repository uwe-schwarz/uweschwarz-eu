import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { detectPreferredLanguage } from "@/lib/detect-language";
import { appendAgentDiscoveryHeaders, hasMarkdownAcceptHeader, isHomepagePath } from "@/lib/agent-readiness";
import { DEFAULT_LANGUAGE, isSupportedLanguage, replacePathLanguage } from "@/lib/i18n";
import { buildContentSecurityPolicy, createCspNonce, NONCE_HEADER, normalizeSecurityHeader } from "@/lib/security/csp";

const PUBLIC_FILE = /\.(.*)$/;
const isProduction = process.env.NODE_ENV === "production";

function applySecurityHeaders(response: NextResponse, nonce: string) {
  response.headers.set("Content-Security-Policy", normalizeSecurityHeader(buildContentSecurityPolicy(nonce)));
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals and public files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt"
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  const nonce = isProduction ? createCspNonce() : null;
  const csp = nonce ? normalizeSecurityHeader(buildContentSecurityPolicy(nonce)) : null;
  const wantsMarkdown = isHomepagePath(pathname) && hasMarkdownAcceptHeader(request.headers.get("accept"));

  if (nonce && csp) {
    requestHeaders.set("Content-Security-Policy", csp);
    requestHeaders.set(NONCE_HEADER, nonce);
  }

  const firstSegment = pathname.split("/")[1];
  if (isSupportedLanguage(firstSegment)) {
    if (wantsMarkdown) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/agent-markdown";
      url.searchParams.set("lang", firstSegment);

      const response = NextResponse.rewrite(url, {
        request: {
          headers: requestHeaders,
        },
      });

      if (nonce) {
        applySecurityHeaders(response, nonce);
      }

      appendAgentDiscoveryHeaders(response.headers);

      return response;
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    if (nonce) {
      applySecurityHeaders(response, nonce);
    }

    if (isHomepagePath(pathname)) {
      appendAgentDiscoveryHeaders(response.headers);
    }

    return response;
  }

  const cookieLanguage = request.cookies.get("language")?.value;
  const acceptLanguage = request.headers.get("accept-language");

  const language = isSupportedLanguage(cookieLanguage)
    ? cookieLanguage
    : (detectPreferredLanguage(acceptLanguage) ?? DEFAULT_LANGUAGE);

  const url = request.nextUrl.clone();
  url.pathname = replacePathLanguage(pathname, language);

  if (wantsMarkdown) {
    url.pathname = "/api/agent-markdown";
    url.searchParams.set("lang", language);

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });

    if (nonce) {
      applySecurityHeaders(response, nonce);
    }

    appendAgentDiscoveryHeaders(response.headers);
    response.cookies.set({
      maxAge: 60 * 60 * 24 * 365,
      name: "language",
      path: "/",
      sameSite: "lax",
      value: language,
    });

    return response;
  }

  const response = NextResponse.redirect(url);

  if (nonce) {
    applySecurityHeaders(response, nonce);
  }

  response.cookies.set({
    maxAge: 60 * 60 * 24 * 365,
    name: "language",
    path: "/",
    sameSite: "lax",
    value: language,
  });

  if (isHomepagePath(pathname)) {
    appendAgentDiscoveryHeaders(response.headers);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
