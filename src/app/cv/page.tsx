import type { Metadata } from "next";
import CvPageClient from "./CvPageClient";

export const metadata: Metadata = {
  description: "Curriculum Vitae of Uwe Schwarz - Software Architect, Security Engineer & AI Enthusiast",
  title: "Curriculum Vitae - Uwe Schwarz",
};

export default function CvPage() {
  return <CvPageClient />;
}
