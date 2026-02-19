import type { Metadata } from "next";
import CvPageClient from "./CvPageClient";

export const metadata: Metadata = {
  description: "Curriculum Vitae of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast",
  title: "Curriculum Vitae - Uwe Schwarz",
};

export default function CvPage() {
  return <CvPageClient />;
}
