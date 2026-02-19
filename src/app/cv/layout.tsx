import type { Metadata } from "next";

import type { LayoutProps } from "@/app/layout-props";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/cv`,
  },
  description: "Curriculum Vitae of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast",
  title: "Curriculum Vitae - Uwe Schwarz",
};

export default function CvLayout({ children }: Readonly<LayoutProps>) {
  return children;
}

CvLayout.displayName = "CvLayout";
