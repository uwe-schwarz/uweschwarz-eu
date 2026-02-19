import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://uweschwarz.eu";

export const metadata: Metadata = {
  alternates: {
    canonical: `${baseUrl}/sitemap`,
  },
  description: "Overview of all pages on Uwe Schwarz's website",
  title: "Sitemap - Uwe Schwarz",
};

export default function SitemapLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
