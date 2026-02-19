import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  description: "Privacy policy for Uwe Schwarz's website",
  title: "Privacy Policy - Uwe Schwarz",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
