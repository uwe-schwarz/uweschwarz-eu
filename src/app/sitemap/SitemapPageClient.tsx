"use client";

import NextLink from "next/link";
import DocumentPage from "@/components/DocumentPage";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Link as LocalizedLink } from "@/i18n/navigation";

export default function SitemapPageClient() {
  const { t } = useSettings();
  const sitemap = siteContent.sitemap;
  useScrollToTop();

  if (!sitemap) {
    return null;
  }

  const navigationLinks = siteContent.navigation?.map((item) => t(item.label)).join(" / ");

  return (
    <DocumentPage subtitle={t(sitemap.description)} title={t(sitemap.title)}>
      <ul className="list-disc space-y-2 pl-5">
        <li className="text-primary">{navigationLinks}</li>
        <li>
          <LocalizedLink className="text-primary hover:underline" href="/cv">
            {t(siteContent.cv.title)}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink className="text-primary hover:underline" href="/imprint">
            {t(siteContent.imprint.title)}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink className="text-primary hover:underline" href="/privacy">
            {t(siteContent.privacy.title)}
          </LocalizedLink>
        </li>
        <li>
          <NextLink className="text-primary hover:underline" href="/sitemap.xml">
            {t(sitemap.title)} (XML)
          </NextLink>
        </li>
        <li>
          <NextLink className="text-primary hover:underline" href="/llms.txt">
            {t(siteContent.llms?.title ?? sitemap.title)} (Markdown)
          </NextLink>
        </li>
      </ul>
    </DocumentPage>
  );
}
