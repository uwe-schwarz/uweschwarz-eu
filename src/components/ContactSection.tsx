"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Mail, Phone } from "lucide-react";
import { SiXing, SiX, SiGithub, SiBluesky, SiFreelancermap } from "@icons-pack/react-simple-icons";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";

const ContactFormCardFallback = () => {
  return (
    <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-muted/60 animate-pulse"></div>
          <div className="h-10 w-full rounded bg-muted/60 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-muted/60 animate-pulse"></div>
          <div className="h-10 w-full rounded bg-muted/60 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-muted/60 animate-pulse"></div>
          <div className="h-28 w-full rounded bg-muted/60 animate-pulse"></div>
        </div>
        <div className="h-10 w-full rounded bg-muted/60 animate-pulse"></div>
      </div>
    </div>
  );
};

const ContactFormCard = dynamic(() => import("@/components/ContactFormCard"), {
  loading: () => <ContactFormCardFallback />,
  ssr: false,
});

const ContactSection = () => {
  const { t } = useSettings();
  const { contact } = siteContent;
  const formCardMountRef = useRef<HTMLDivElement>(null);
  const [shouldLoadFormCard, setShouldLoadFormCard] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (shouldLoadFormCard) {
      return;
    }

    const target = formCardMountRef.current;
    if (!target) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoadFormCard(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoadFormCard]);

  return (
    <section className="section-padding bg-muted/30" id="contact">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-4">
          <span className="text-gradient">{t(contact.title)}</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">{t(contact.subtitle)}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <div className="mb-8">
                <h3 className="text-xl mb-4">{t(contact.infoTitle)}</h3>
                <p className="text-muted-foreground mb-6">{t(contact.infoText)}</p>

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t(contact.emailLabel)}</p>
                    <a
                      className="text-foreground hover:text-primary transition-colors link-underline"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t(contact.phoneLabel)}</p>
                    <a
                      className="text-foreground hover:text-primary transition-colors link-underline"
                      href={`tel:${contact.phone}`}
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium mb-4">{t(contact.findMeOn)}</h4>
                <div className="flex space-x-4">
                  {contact.socialLinks.github && (
                    <a
                      aria-label="GitHub"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      href={contact.socialLinks.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <SiGithub className="w-5 h-5" />
                    </a>
                  )}

                  {contact.socialLinks.linkedin && (
                    <a
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      href={contact.socialLinks.linkedin}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect height="12" width="4" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}

                  {contact.socialLinks.xing && (
                    <a
                      aria-label="Xing"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      href={contact.socialLinks.xing}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <SiXing className="w-5 h-5" />
                    </a>
                  )}

                  {contact.socialLinks.x && (
                    <a
                      aria-label="X"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      href={contact.socialLinks.x}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <SiX className="w-5 h-5" />
                    </a>
                  )}

                  {contact.socialLinks.bluesky && (
                    <a
                      aria-label="Bluesky"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      href={contact.socialLinks.bluesky}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <SiBluesky className="w-5 h-5" />
                    </a>
                  )}

                  {contact.socialLinks.freelancermap && (
                    <a
                      aria-label="Freelancermap"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      href={contact.socialLinks.freelancermap}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <SiFreelancermap className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formCardMountRef}>{shouldLoadFormCard ? <ContactFormCard /> : <ContactFormCardFallback />}</div>
        </div>
      </div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
