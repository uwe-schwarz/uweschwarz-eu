import type { ReactNode } from "react";

// Next.js layout props are server component contracts, not DOM element props.
export interface LayoutProps {
  children: ReactNode;
}

export interface RootLayoutProps extends LayoutProps {
  params: Promise<{ lang?: string }>;
}

export interface LangLayoutProps extends LayoutProps {
  params: Promise<{ lang: string }>;
}
