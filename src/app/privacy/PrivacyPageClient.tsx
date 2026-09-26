"use client";

import { Fragment } from "react";
import DocumentPage from "@/components/DocumentPage";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { getLocalizedTextKey, type LocalizedString } from "@/lib/localization";

interface LocalizedPrivacyListItem extends LocalizedString {
  description?: LocalizedString;
}

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
  const { t } = useSettings();
  const { privacy } = siteContent;
  useScrollToTop();

  return (
    <DocumentPage subtitle={t(privacy.subtitle)} title={t(privacy.title)}>
      {privacy.sections.map((section) => (
        <section key={getLocalizedTextKey(section.title)}>
          <h2>{t(section.title)}</h2>
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
                const itemKey = localizedItem.description
                  ? `${getLocalizedTextKey(localizedItem)}-${getLocalizedTextKey(localizedItem.description)}`
                  : getLocalizedTextKey(localizedItem);

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
    </DocumentPage>
  );
}
