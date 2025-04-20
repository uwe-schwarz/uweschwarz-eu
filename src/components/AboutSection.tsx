
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { siteContent } from '@/content/content';
import { Users, FolderArchive, Code } from 'lucide-react';

const AboutSection = () => {
  const { t } = useSettings();
  const { about } = siteContent;

  // Stats display (these could be pulled from the content or calculated)
  const stats = [
    { 
      value: "15+", 
      label: about.labels.experience, 
      icon: Users 
    },
    { 
      value: "50+", 
      label: about.labels.projects, 
      icon: FolderArchive 
    },
    { 
      value: "20+", 
      label: about.labels.technologies, 
      icon: Code 
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-gradient">{t(about.title)}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Column */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-lg overflow-hidden shadow-xl hover-scale border-4 border-white dark:border-gray-800">
                <img 
                  src="/about-me.png" 
                  alt="Uwe Schwarz" 
                  className="w-full h-full object-cover aspect-[4/5]"
                />
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
                key={index} 
                className={`text-base md:text-lg leading-relaxed ${index !== about.paragraphs.length - 1 ? 'mb-6' : ''}`}
              >
                {t(paragraph)}
              </p>
            ))}
            
            {/* AI badge */}
            <div className="mt-8 mb-8">
              <span className="ai-badge">
                <span className="mr-1">🤖</span> AI Enthusiast
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-card rounded-lg shadow-sm border border-border hover-scale transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 mb-4 rounded-full bg-primary/10 text-primary">
                      <stat.icon size={24} />
                    </div>
                    <span className="text-3xl font-bold mb-1">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{t(stat.label)}</span>
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
