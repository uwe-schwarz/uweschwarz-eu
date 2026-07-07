"use client";

import { Mail, Phone } from "lucide-react";
import { SiBluesky, SiFreelancermap, SiGithub, SiX, SiXing } from "react-icons/si";
import ContactFormCard from "@/components/ContactFormCard";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";

const socialLinkClassName =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/60 transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground";

const ContactSection = () => {
  const { t } = useSettings();
  const { contact } = siteContent;

  return (
    <section className="section-padding bg-muted/40" id="contact">
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col items-center gap-4 text-center reveal-up">
          <h2 className="text-4xl md:text-5xl">
            <span className="text-gradient">{t(contact.title)}</span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{t(contact.subtitle)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto reveal-up">
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="glass-panel p-8">
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
                      className={socialLinkClassName}
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
                      className={socialLinkClassName}
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
                      className={socialLinkClassName}
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
                      className={socialLinkClassName}
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
                      className={socialLinkClassName}
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
                      className={socialLinkClassName}
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
          <ContactFormCard />
        </div>
      </div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
