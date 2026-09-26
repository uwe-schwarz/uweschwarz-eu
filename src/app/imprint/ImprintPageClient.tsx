"use client";

import DocumentPage from "@/components/DocumentPage";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function ImprintPageClient() {
  const { t } = useSettings();
  const { imprint } = siteContent;
  useScrollToTop();

  return (
    <DocumentPage title={t(imprint.title)}>
      <section>
        <h2>{t(imprint.contactTitle)}</h2>
        <p>{t(imprint.companyName)}</p>
        {imprint.representative && <p>{t(imprint.representative)}</p>}
        <p>{t(imprint.address.street)}</p>
        <p>{t(imprint.address.city)}</p>
        <p>{t(imprint.address.country)}</p>
      </section>

      <section>
        <h2>{t(imprint.contactInfoTitle)}</h2>
        <p>
          {t(imprint.emailLabel)}: <a href={`mailto:${imprint.email}`}>{imprint.email}</a>
        </p>
        <p>
          {t(imprint.phoneLabel)}: <a href={`tel:${imprint.phone}`}>{imprint.phone}</a>
        </p>
      </section>

      {imprint.legalTitle && (
        <section>
          <h2>{t(imprint.legalTitle)}</h2>
          {imprint.vatId && <p>{t(imprint.vatId)}</p>}
          {imprint.registrationInfo && <p>{t(imprint.registrationInfo)}</p>}
        </section>
      )}

      <section>
        <h2>{t(imprint.disclaimerTitle)}</h2>
        <p>{t(imprint.disclaimer)}</p>
      </section>
    </DocumentPage>
  );
}
