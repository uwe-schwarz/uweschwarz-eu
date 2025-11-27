import type { ReactNode } from "react";
import ProvidersClient from "./providers.client";
import type { Language } from "@/contexts/settings-hook";

export default function Providers({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  return <ProvidersClient initialLanguage={initialLanguage}>{children}</ProvidersClient>;
}

