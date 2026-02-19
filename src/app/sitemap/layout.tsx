import type { Metadata } from "next";

import type { LayoutProps } from "@/app/layout-props";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
  description: "Overview of all pages on Uwe Schwarz's website",
  title: "Sitemap - Uwe Schwarz",
};

export default function SitemapLayout({ children }: Readonly<LayoutProps>) {
  return children;
}

SitemapLayout.displayName = "SitemapLayout";
