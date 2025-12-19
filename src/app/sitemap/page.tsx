"use client";

import Link from "next/link";
import type { Route } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { withLanguagePrefix } from "@/lib/i18n";

export default function SitemapPage() {
  const { language, t } = useSettings();
  const sitemap = siteContent.sitemap;

  if (!sitemap) {
    return null;
  }

  const navigationLinks = siteContent.navigation?.map((item) => t(item.label)).join(" / ");
  const homeHref = withLanguagePrefix(language, "/");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href={homeHref as Route}>
                <ArrowLeft size={16} className="mr-2" />
                {t(siteContent.backToHome)}
              </Link>
            </Button>
            <h1 className="mb-8 text-3xl font-bold">{t(sitemap.title)}</h1>
            <div className="mb-8">
              <p className="mb-4">{t(sitemap.description)}</p>
              <ul className="list-disc space-y-2 pl-5">
                <li className="text-primary">{navigationLinks}</li>
                <li>
                  <Link href={withLanguagePrefix(language, "/cv") as Route} className="text-primary hover:underline">
                    {t(siteContent.cv.title)}
                  </Link>
                </li>
                <li>
                  <Link
                    href={withLanguagePrefix(language, "/imprint") as Route}
                    className="text-primary hover:underline"
                  >
                    {t(siteContent.imprint.title)}
                  </Link>
                </li>
                <li>
                  <Link
                    href={withLanguagePrefix(language, "/privacy") as Route}
                    className="text-primary hover:underline"
                  >
                    {t(siteContent.privacy.title)}
                  </Link>
                </li>
                <li>
                  <a href="/sitemap.xml" className="text-primary hover:underline">
                    {t(sitemap.title)} (XML)
                  </a>
                </li>
                <li>
                  <a href="/llms.txt" className="text-primary hover:underline">
                    {t(siteContent.llms?.title ?? sitemap.title)} (Markdown)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
