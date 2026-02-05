import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { detectPreferredLanguage } from "@/lib/detect-language";
import { DEFAULT_LANGUAGE, isSupportedLanguage, replacePathLanguage } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

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

  const firstSegment = pathname.split("/")[1];
  if (isSupportedLanguage(firstSegment)) {
    return NextResponse.next();
  }

  const cookieLanguage = request.cookies.get("language")?.value;
  const acceptLanguage = request.headers.get("accept-language");

  const language = isSupportedLanguage(cookieLanguage)
    ? cookieLanguage
    : (detectPreferredLanguage(acceptLanguage) ?? DEFAULT_LANGUAGE);

  const url = request.nextUrl.clone();
  url.pathname = replacePathLanguage(pathname, language);

  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: "language",
    value: language,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
