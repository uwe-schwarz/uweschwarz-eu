import type { Metadata } from "next";
import ImprintPageClient from "./ImprintPageClient";

export const metadata: Metadata = {
  description: "Imprint and legal information for Uwe Schwarz's website",
  title: "Imprint - Uwe Schwarz",
};

export default function ImprintPage() {
  return <ImprintPageClient />;
}
