"use client";

import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Link } from "@/i18n/navigation";

export default function SitemapPageClient() {
  const { t } = useSettings();
  const sitemap = siteContent.sitemap;
  useScrollToTop();

  if (!sitemap) {
    return null;
  }

  const navigationLinks = siteContent.navigation?.map((item) => t(item.label)).join(" / ");
  const homeHref = "/";

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="grow pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Button asChild className="mb-6" size="sm" variant="ghost">
              <Link href={homeHref}>
                <ArrowLeft className="mr-2" size={16} />
                {t(siteContent.backToHome)}
              </Link>
            </Button>
            <h1 className="mb-8 text-3xl">{t(sitemap.title)}</h1>
            <div className="mb-8">
              <p className="mb-4">{t(sitemap.description)}</p>
              <ul className="list-disc space-y-2 pl-5">
                <li className="text-primary">{navigationLinks}</li>
                <li>
                  <Link className="text-primary hover:underline" href="/cv">
                    {t(siteContent.cv.title)}
                  </Link>
                </li>
                <li>
                  <Link className="text-primary hover:underline" href="/imprint">
                    {t(siteContent.imprint.title)}
                  </Link>
                </li>
                <li>
                  <Link className="text-primary hover:underline" href="/privacy">
                    {t(siteContent.privacy.title)}
                  </Link>
                </li>
                <li>
                  <Link className="text-primary hover:underline" href="/sitemap.xml">
                    {t(sitemap.title)} (XML)
                  </Link>
                </li>
                <li>
                  <Link className="text-primary hover:underline" href="/llms.txt">
                    {t(siteContent.llms?.title ?? sitemap.title)} (Markdown)
                  </Link>
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
