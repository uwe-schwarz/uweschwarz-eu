import type { Metadata } from "next";
import SitemapPageClient from "./SitemapPageClient";

export const metadata: Metadata = {
  description: "Overview of all pages on Uwe Schwarz's website",
  title: "Sitemap - Uwe Schwarz",
};

export default function SitemapPage() {
  return <SitemapPageClient />;
}
