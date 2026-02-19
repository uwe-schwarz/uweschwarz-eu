import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://uweschwarz.eu";

export const metadata: Metadata = {
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
  description: "Privacy policy for Uwe Schwarz's website",
  title: "Privacy Policy - Uwe Schwarz",
};

export default function PrivacyLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
