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

export default function PrivacyPage() {
  const { language, t } = useSettings();
  const { privacy } = siteContent;
  useScrollToTop();
  const homeHref = withLanguagePrefix(language, "/");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Button asChild className="mb-6" size="sm" variant="ghost">
              <Link href={homeHref as Route}>
                <ArrowLeft className="mr-2" size={16} />
                {t(siteContent.backToHome)}
              </Link>
            </Button>

            <h1 className="mb-2 text-3xl">{t(privacy.title)}</h1>
            <p className="mb-8 text-sm">{t(privacy.subtitle)}</p>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {privacy.sections.map((section, index) => (
                <section className="mb-8" key={index}>
                  <h2 className="mb-4 text-2xl font-semibold">{t(section.title)}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p className="mb-4" key={pIndex}>
                      {t(paragraph)}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mb-4 list-disc pl-5">
                      {section.list.map((item, i) => {
                        if (typeof item === "string") {
                          return (
                            <li key={i}>
                              <span>{item}</span>
                            </li>
                          );
                        }

                        const localizedItem = item as {
                          de: string;
                          description?: { de: string; en: string; };
                          en: string;
                        };
                        const text = t(localizedItem);
                        const descriptionText = localizedItem.description ? t(localizedItem.description) : null;

                        return (
                          <li className="flex flex-col" key={i}>
                            <span dangerouslySetInnerHTML={{ __html: text }} />
                            {descriptionText && (
                              <span className="ml-4 mt-1 text-sm text-muted-foreground">
                                <span dangerouslySetInnerHTML={{ __html: descriptionText }} />
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
