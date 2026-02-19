"use client";

import { Fragment } from "react";
import type { Route } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { withLanguagePrefix } from "@/lib/i18n";

interface LocalizedPrivacyText {
  de: string;
  en: string;
}

interface LocalizedPrivacyListItem extends LocalizedPrivacyText {
  description?: LocalizedPrivacyText;
}

const getLocalizedTextKey = (value: LocalizedPrivacyText | string) =>
  typeof value === "string" ? value : `${value.en}-${value.de}`;

const splitLinesWithKeys = (value: string) => {
  const lines = value.replaceAll("&nbsp;", "\u00a0").split(/<br\s*\/?>/i);
  const seen = new Map<string, number>();

  return lines.map((line) => {
    const count = (seen.get(line) ?? 0) + 1;
    seen.set(line, count);
    return { key: `${line}-${count}`, line };
  });
};

const FormattedText = ({ value }: { value: string }) => {
  const entries = splitLinesWithKeys(value);
  const lastKey = entries.at(-1)?.key;

  return (
    <>
      {entries.map((entry) => (
        <Fragment key={entry.key}>
          {entry.line}
          {entry.key !== lastKey ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
};

export default function PrivacyPageClient() {
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
              {privacy.sections.map((section) => (
                <section className="mb-8" key={getLocalizedTextKey(section.title)}>
                  <h2 className="mb-4 text-2xl font-semibold">{t(section.title)}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p className="mb-4" key={getLocalizedTextKey(paragraph)}>
                      {t(paragraph)}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mb-4 list-disc pl-5">
                      {section.list.map((item) => {
                        if (typeof item === "string") {
                          return (
                            <li key={item}>
                              <span>{item}</span>
                            </li>
                          );
                        }

                        const localizedItem = item as LocalizedPrivacyListItem;
                        const text = t(localizedItem);
                        const descriptionText = localizedItem.description ? t(localizedItem.description) : null;
                        const itemKey = `${getLocalizedTextKey(localizedItem)}-${descriptionText ?? ""}`;

                        return (
                          <li className="flex flex-col" key={itemKey}>
                            <span>
                              <FormattedText value={text} />
                            </span>
                            {descriptionText && (
                              <span className="ml-4 mt-1 text-sm text-muted-foreground">
                                <span>
                                  <FormattedText value={descriptionText} />
                                </span>
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
