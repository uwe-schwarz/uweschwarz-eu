"use client";

import { CV_LAST_UPDATED } from "@/generated/cv-assets";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/site-config";

const cellClassName = "flex flex-col gap-1.5 p-5";
const cellLabelClassName = "text-xs font-medium text-muted-foreground";

const currentYear = new Date().getUTCFullYear();

const Footer = () => {
  const { t } = useSettings();
  const { footer, hero } = siteContent;
  const sitemap = siteContent.sitemap;
  const sitemapLabel = sitemap ? t(sitemap.title) : t({ de: "Sitemap", en: "Sitemap" });
  const homeHref = "/";
  const roles = hero.titleElements.slice(0, 3).map((role) => t(role));
  const siteHost = new URL(SITE_URL).host;

  return (
    <footer className="relative pb-10 pt-6">
      <div className="section-shell">
        {/* Drawing title block */}
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm md:grid-cols-12">
          <div className={`${cellClassName} border-b border-border md:col-span-5 md:border-b-0 md:border-r`}>
            <Link className="flex items-center gap-2.5 self-start" href={`${homeHref}#hero`}>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[0.8rem] font-bold text-primary-foreground"
              >
                US
              </span>
              <span className="type-heading text-lg">Uwe Schwarz</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{roles.join(", ")}</p>
          </div>

          <div className="grid grid-cols-2 md:col-span-7 md:grid-cols-3">
            <div className={`${cellClassName} border-b border-r border-border`}>
              <span className={cellLabelClassName}>{t(footer.drawnBy)}</span>
              <span className="text-sm font-semibold">Uwe Schwarz</span>
            </div>
            <div className={`${cellClassName} border-b border-border md:border-r`}>
              <span className={cellLabelClassName}>{t(footer.sheet)}</span>
              <span className="text-sm font-semibold">{siteHost}</span>
            </div>
            <div className={`${cellClassName} col-span-2 border-b border-border md:col-span-1`}>
              <span className={cellLabelClassName}>Rev.</span>
              <span className="text-sm font-semibold">{t(CV_LAST_UPDATED)}</span>
            </div>

            <nav className={`${cellClassName} col-span-2 flex-row flex-wrap items-center gap-x-5 md:col-span-3`}>
              {footer.links.map((link) => (
                <Link
                  className="text-sm text-muted-foreground transition-colors link-quiet hover:text-foreground"
                  href={link.href}
                  key={link.href}
                >
                  {t(link.label)}
                </Link>
              ))}
              <Link
                className="text-sm text-muted-foreground transition-colors link-quiet hover:text-foreground"
                href="/sitemap"
              >
                {sitemapLabel}
              </Link>
              <p className="text-sm text-muted-foreground sm:ml-auto">
                {t(footer.copyright).replace("year", currentYear.toString())}
              </p>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
