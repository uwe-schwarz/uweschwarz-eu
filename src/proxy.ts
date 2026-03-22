import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { detectPreferredLanguage } from "@/lib/detect-language";
import { DEFAULT_LANGUAGE, isSupportedLanguage, replacePathLanguage } from "@/lib/i18n";
import { buildContentSecurityPolicy, createCspNonce, NONCE_HEADER, normalizeSecurityHeader } from "@/lib/security/csp";

const PUBLIC_FILE = /\.(.*)$/;

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
  const nonce = createCspNonce();
  const csp = normalizeSecurityHeader(buildContentSecurityPolicy(nonce));

  requestHeaders.set("Content-Security-Policy", csp);
  requestHeaders.set(NONCE_HEADER, nonce);

  const firstSegment = pathname.split("/")[1];
  if (isSupportedLanguage(firstSegment)) {
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    applySecurityHeaders(response, nonce);

    return response;
  }

  const cookieLanguage = request.cookies.get("language")?.value;
  const acceptLanguage = request.headers.get("accept-language");

  const language = isSupportedLanguage(cookieLanguage)
    ? cookieLanguage
    : (detectPreferredLanguage(acceptLanguage) ?? DEFAULT_LANGUAGE);

  const url = request.nextUrl.clone();
  url.pathname = replacePathLanguage(pathname, language);

  const response = NextResponse.redirect(url);

  applySecurityHeaders(response, nonce);

  response.cookies.set({
    maxAge: 60 * 60 * 24 * 365,
    name: "language",
    path: "/",
    sameSite: "lax",
    value: language,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
