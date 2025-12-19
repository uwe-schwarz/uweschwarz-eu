"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import type { Language, Theme } from "@/contexts/settings-hook";

export default function ProvidersClient({
  children,
  initialLanguage,
  initialTheme,
}: {
  children: ReactNode;
  initialLanguage: Language;
  initialTheme: Theme;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150}>
        <SettingsProvider initialLanguage={initialLanguage} initialTheme={initialTheme}>
          {children}
          <Toaster />
          <Sonner />
        </SettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
