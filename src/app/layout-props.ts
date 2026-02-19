import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface RootLayoutProps extends LayoutProps {
  params: Promise<{ lang?: string }>;
}

export interface LangLayoutProps extends LayoutProps {
  params: Promise<{ lang: string }>;
}
