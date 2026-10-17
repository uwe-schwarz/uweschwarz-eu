"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import type { Theme } from "@/contexts/settings-hook";

const loadMotionFeatures = () => import("@/lib/motion-features").then((features) => features.default);

export default function ProvidersClient({ children, initialTheme }: { children: ReactNode; initialTheme: Theme }) {
  return (
    <SettingsProvider initialTheme={initialTheme}>
      <LazyMotion features={loadMotionFeatures} strict>
        {/* Motion itself skips transform animations for reduced-motion users,
            including the first animation after hydration. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
      <Toaster />
    </SettingsProvider>
  );
}
