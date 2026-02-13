"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { isSupportedLanguage, withLanguagePrefix } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1];
  const homeHref = isSupportedLanguage(firstSegment) ? withLanguagePrefix(firstSegment, "/") : "/";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="text-center">
        <h1 className="mb-4 text-4xl">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link className="text-primary underline underline-offset-4" href={homeHref as Route}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
