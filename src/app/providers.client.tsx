"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import type { Theme } from "@/contexts/settings-hook";

const loadMotionFeatures = () => import("@/lib/motion-features").then((features) => features.default);

export default function ProvidersClient({ children, initialTheme }: { children: ReactNode; initialTheme: Theme }) {
  return (
    <SettingsProvider initialTheme={initialTheme}>
      <LazyMotion features={loadMotionFeatures} strict>
        {children}
      </LazyMotion>
      <Toaster />
    </SettingsProvider>
  );
}
