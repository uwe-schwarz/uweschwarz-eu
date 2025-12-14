
"use client";

import Link from "next/link";
import type { Route } from "next";

import { CV_LAST_UPDATED } from "@/generated/cv-assets";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { withLanguagePrefix } from "@/lib/i18n";

const Footer = () => {
  const { language, t } = useSettings();
  const { footer } = siteContent;
  const sitemap = siteContent.sitemap;
  const year = new Date().getFullYear();
  const sitemapLabel = sitemap ? t(sitemap.title) : t({ en: "Sitemap", de: "Sitemap" });
  const homeHref = withLanguagePrefix(language, "/");

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0">
            <Link
              href={`${homeHref}#hero` as Route}
              className="text-xl font-display font-bold text-foreground mb-2 inline-block"
            >
              <span className="text-gradient">Uwe Schwarz</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t(footer.copyright).replace("year", year.toString())}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            {footer.links.map((link, index) => (
              <Link
                key={index}
                href={withLanguagePrefix(language, link.href) as Route}
                className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
              >
                {t(link.label)}
              </Link>
            ))}
            <Link
              href={withLanguagePrefix(language, "/sitemap") as Route}
              className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              {sitemapLabel}
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          {footer.builtWith && (
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              {t(footer.builtWith)}
            </p>
          )}

          <p className="ml-auto text-xs text-muted-foreground">
            {t(CV_LAST_UPDATED)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
