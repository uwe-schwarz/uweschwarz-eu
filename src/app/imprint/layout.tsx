import type { Metadata } from "next";

import type { LayoutProps } from "@/app/layout-props";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/imprint`,
  },
  description: "Imprint and legal information for Uwe Schwarz's website",
  title: "Imprint - Uwe Schwarz",
};

export default function ImprintLayout({ children }: Readonly<LayoutProps>) {
  return children;
}

ImprintLayout.displayName = "ImprintLayout";
