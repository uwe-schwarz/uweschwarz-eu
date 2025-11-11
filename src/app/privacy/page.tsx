"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function PrivacyPage() {
  const { t } = useSettings();
  const { privacy } = siteContent;
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href="/">
                <ArrowLeft size={16} className="mr-2" />
                {t(siteContent.backToHome)}
              </Link>
            </Button>

            <h1 className="mb-2 text-3xl font-bold">{t(privacy.title)}</h1>
            <p className="mb-8 text-sm">{t(privacy.subtitle)}</p>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {privacy.sections.map((section, index) => (
                <section key={index} className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">{t(section.title)}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4">
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
                          en: string;
                          de: string;
                          description?: { en: string; de: string };
                        };
                        const text = t(localizedItem);
                        const descriptionText = localizedItem.description ? t(localizedItem.description) : null;

                        return (
                          <li key={i} className="flex flex-col">
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
