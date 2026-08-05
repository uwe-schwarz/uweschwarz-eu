"use client";

import type { ReactNode } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import type { Theme } from "@/contexts/settings-hook";

export default function ProvidersClient({ children, initialTheme }: { children: ReactNode; initialTheme: Theme }) {
  return (
    <SettingsProvider initialTheme={initialTheme}>
      {children}
      <Toaster />
    </SettingsProvider>
  );
}
