import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://uweschwarz.eu";

export const metadata: Metadata = {
  alternates: {
    canonical: `${baseUrl}/imprint`,
  },
  description: "Imprint and legal information for Uwe Schwarz's website",
  title: "Imprint - Uwe Schwarz",
};

export default function ImprintLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
