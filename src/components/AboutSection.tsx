"use client";

import Image from "next/image";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";

const DimensionLine = ({ value }: { value: string }) => (
  <div aria-hidden="true" className="flex items-center gap-3 text-primary">
    <span className="h-5 w-px bg-current" />
    <span className="h-px flex-1 bg-current opacity-50" />
    <span className="type-display text-5xl text-foreground sm:text-6xl">{value}</span>
    <span className="h-px flex-1 bg-current opacity-50" />
    <span className="h-5 w-px bg-current" />
  </div>
);

const AboutSection = () => {
  const { t } = useSettings();
  const { about } = siteContent;

  return (
    <section className="section-space relative" id="about">
      <div className="section-shell">
        {/* Two columns only from xl: at lg the 5/12 column is too narrow for the heading */}
        <div className="grid gap-x-16 gap-y-14 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <h2 className="section-title">{t(about.title)}</h2>

            <figure className="relative mx-auto mt-14 max-w-[19rem] sm:max-w-sm xl:mx-0 xl:max-w-none">
              <div className="print rotate-2 p-3 transition-transform duration-500 hover:rotate-0">
                <span aria-hidden="true" className="print-tape" />
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    alt={t(about.imageAlt)}
                    className="print-art object-contain"
                    fill
                    sizes="(min-width: 1280px) 456px, 384px"
                    src="/about-me.webp"
                  />
                </div>
              </div>
              <figcaption className="redline-note absolute -bottom-11 right-0 -rotate-3 sm:-right-6">
                {t(about.note)}
              </figcaption>
            </figure>
          </div>

          <div className="space-y-6 text-lg leading-relaxed sm:text-xl xl:col-span-7 xl:pt-3">
            {about.paragraphs.map((paragraph, index) => (
              <p
                className={index === 0 ? "text-foreground" : "text-muted-foreground"}
                key={`${paragraph.en}-${paragraph.de}`}
              >
                {t(paragraph)}
              </p>
            ))}
          </div>
        </div>

        <dl className="mt-24 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {about.stats.map((stat) => (
            <div className="flex flex-col-reverse gap-3" key={stat.key}>
              <dt className="text-center text-sm font-medium text-muted-foreground">
                {t(about.labels[stat.key as keyof typeof about.labels])}
              </dt>
              <dd>
                <span className="sr-only">{t(stat.value)}</span>
                <DimensionLine value={t(stat.value)} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

AboutSection.displayName = "AboutSection";

export default AboutSection;
