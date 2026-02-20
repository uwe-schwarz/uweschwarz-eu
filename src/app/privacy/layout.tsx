import type { Metadata } from "next";

import type { LayoutProps } from "@/app/layout-props";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  description: "Privacy policy for Uwe Schwarz's website",
  title: "Privacy Policy - Uwe Schwarz",
};

export default function PrivacyLayout({ children }: Readonly<LayoutProps>) {
  return children;
}

PrivacyLayout.displayName = "PrivacyLayout";
