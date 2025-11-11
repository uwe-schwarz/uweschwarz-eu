import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteContent } from "@/content/content";
import { cn } from "@/lib/utils";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: siteContent.siteMetadata.title,
  description: siteContent.siteMetadata.description.en,
  authors: [{ name: siteContent.siteMetadata.author }],
  metadataBase: new URL("https://uweschwarz.eu"),
  alternates: {
    canonical: "https://uweschwarz.eu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}> 
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
