"use client";

import Image from "next/image";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { UsersIcon } from "@/components/icons/users";
import { FolderCheckIcon } from "@/components/icons/folder-check";
import { FlaskIcon } from "@/components/icons/flask";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

const iconMap: Record<string, IconComponent> = {
  experience: UsersIcon,
  projects: FolderCheckIcon,
  technologies: FlaskIcon,
};

const AboutSection = () => {
  const { t } = useSettings();
  const { about } = siteContent;

  // Stats display (now fully from content)
  const stats = about.stats.map((stat) => ({
    ...stat,
    icon: iconMap[stat.key] || UsersIcon,
  }));

  return (
    <section className="section-padding relative overflow-hidden" id="about">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-aurora opacity-70" />
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col items-center gap-4 text-center reveal-up">
          <h2 className="text-4xl md:text-5xl">
            <span className="text-gradient">{t(about.title)}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Image Card */}
          <div className="lg:col-span-2 reveal-up">
            <div className="glass-panel h-full overflow-hidden p-2">
              <div className="relative h-full min-h-72 overflow-hidden rounded-xl bg-linear-to-br from-primary/30 to-accent/30">
                <Image
                  alt={t(about.imageAlt)}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width:1280px) 500px, (min-width:1024px) 400px, (min-width:768px) 900px, 600px"
                  src="/about-me.webp"
                />
              </div>
            </div>
          </div>

          {/* Text Card */}
          <div className="lg:col-span-3 reveal-up">
            <div className="glass-panel h-full space-y-6 p-7 md:p-9">
              {about.paragraphs.map((paragraph) => (
                <p className="text-base md:text-lg leading-relaxed" key={`${paragraph.en}-${paragraph.de}`}>
                  {t(paragraph)}
                </p>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-5 reveal-up">
            {stats.map((stat) => (
              <div className="glass-panel hover-lift flex items-center gap-4 p-6" key={stat.key}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <stat.icon size={24} />
                </div>
                <div>
                  <span className="block text-3xl font-bold tracking-tight">{t(stat.value)}</span>
                  <span className="text-sm text-muted-foreground">
                    {t(about.labels[stat.key as keyof typeof about.labels])}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
