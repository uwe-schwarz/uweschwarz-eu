"use client";

import Link from "next/link";
import type { Route } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { withLanguagePrefix } from "@/lib/i18n";

export default function ImprintPage() {
  const { language, t } = useSettings();
  const { imprint } = siteContent;
  useScrollToTop();
  const homeHref = withLanguagePrefix(language, "/");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href={homeHref as Route}>
                <ArrowLeft size={16} className="mr-2" />
                {t(siteContent.backToHome)}
              </Link>
            </Button>

            <h1 className="mb-8 text-3xl font-bold">{t(imprint.title)}</h1>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">{t(imprint.contactTitle)}</h2>
                <p>{t(imprint.companyName)}</p>
                {imprint.representative && <p>{t(imprint.representative)}</p>}
                <p>{t(imprint.address.street)}</p>
                <p>{t(imprint.address.city)}</p>
                <p>{t(imprint.address.country)}</p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">{t(imprint.contactInfoTitle)}</h2>
                <p>
                  {t(imprint.emailLabel)}: {" "}
                  <a href={`mailto:${imprint.email}`} className="text-primary">
                    {imprint.email}
                  </a>
                </p>
                <p>
                  {t(imprint.phoneLabel)}: {" "}
                  <a href={`tel:${imprint.phone}`} className="text-primary">
                    {imprint.phone}
                  </a>
                </p>
              </section>

              {imprint.legalTitle && (
                <section className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">{t(imprint.legalTitle)}</h2>
                  {imprint.vatId && <p>{t(imprint.vatId)}</p>}
                  {imprint.registrationInfo && <p>{t(imprint.registrationInfo)}</p>}
                </section>
              )}

              <section>
                <h2 className="mb-4 text-2xl font-semibold">{t(imprint.disclaimerTitle)}</h2>
                <p>{t(imprint.disclaimer)}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
