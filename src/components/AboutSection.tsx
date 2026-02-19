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

const gridColsMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
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
    <section className="section-padding bg-muted/30" id="about">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-16">
          <span className="text-gradient">{t(about.title)}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Image Column */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-lg overflow-hidden shadow-xl hover-scale border-4 border-white dark:border-gray-800">
                <div className="bg-linear-to-br from-primary/40 to-accent/40 aspect-4/5 relative overflow-hidden">
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

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg transform rotate-6 -z-10"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-lg transform -rotate-6 -z-10"></div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-3">
            {/* About paragraphs */}
            {about.paragraphs.map((paragraph, index) => (
              <p
                className={`text-base md:text-lg leading-relaxed ${index !== about.paragraphs.length - 1 ? "mb-6" : ""}`}
                key={`${paragraph.en}-${paragraph.de}`}
              >
                {t(paragraph)}
              </p>
            ))}

            {/* Stats */}
            <div className={`mt-10 grid grid-cols-1 gap-8 ${gridColsMap[stats.length] || "sm:grid-cols-3"}`}>
              {stats.map((stat) => (
                <div
                  className="p-4 bg-card rounded-lg shadow-sm border border-border hover-scale transition-all"
                  key={stat.key}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 mb-4 rounded-full bg-primary/10 text-primary">
                      <stat.icon size={24} />
                    </div>
                    <span className="text-3xl font-bold mb-1">{t(stat.value)}</span>
                    <span className="text-sm text-muted-foreground">
                      {t(about.labels[stat.key as keyof typeof about.labels])}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
