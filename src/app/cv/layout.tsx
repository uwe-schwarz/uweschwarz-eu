import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://uweschwarz.eu";

export const metadata: Metadata = {
  alternates: {
    canonical: `${baseUrl}/cv`,
  },
  description: "Curriculum Vitae of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast",
  title: "Curriculum Vitae - Uwe Schwarz",
};

export default function CvLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
