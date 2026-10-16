"use client";

import { Mail, Phone } from "lucide-react";
import ContactFormCard from "@/components/ContactFormCard";
import { FreelancermapIcon, GitHubIcon, LinkedInIcon, XIcon, XingIcon } from "@/components/icons/brand-icons";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";

const socialLinkClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-input bg-card text-muted-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-primary hover:text-primary";

const directLineClassName =
  "group flex items-center gap-4 rounded-2xl border border-transparent py-2 transition-colors hover:text-primary";

const ContactSection = () => {
  const { t } = useSettings();
  const { contact } = siteContent;

  return (
    <section className="section-space relative" id="contact">
      <div className="section-shell">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="section-title">{t(contact.title)}</h2>
            <p className="section-lede">{t(contact.subtitle)}</p>

            <h3 className="mt-12 text-sm font-semibold text-muted-foreground">{t(contact.infoTitle)}</h3>
            <div className="mt-4 space-y-2">
              <a className={directLineClassName} href={`mailto:${contact.email}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">{t(contact.emailLabel)}</span>
                  <span className="type-heading block truncate text-lg sm:text-xl">{contact.email}</span>
                </span>
              </a>
              <a className={directLineClassName} href={`tel:${contact.phone.replaceAll(" ", "")}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">{t(contact.phoneLabel)}</span>
                  <span className="type-heading block text-lg sm:text-xl">{contact.phone}</span>
                </span>
              </a>
            </div>

            <h3 className="mt-10 text-sm font-semibold text-muted-foreground">{t(contact.findMeOn)}</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {contact.socialLinks.github && (
                <a
                  aria-label="GitHub"
                  className={socialLinkClassName}
                  href={contact.socialLinks.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubIcon className="h-5 w-5" />
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
                  <LinkedInIcon className="h-[1.1rem] w-[1.1rem]" />
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
                  <XingIcon className="h-5 w-5" />
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
                  <XIcon className="h-4 w-4" />
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
                  <FreelancermapIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="relative lg:col-span-7 lg:pt-4">
            <div aria-hidden="true" className="mb-3 flex items-end justify-end gap-1 pr-2 sm:pr-10">
              <p className="redline-note max-w-[18rem] -rotate-3 text-right">{t(contact.note)}</p>
              <svg className="h-10 w-10 shrink-0 translate-y-5 text-redline" fill="none" viewBox="0 0 40 40">
                <path d="M6 4 C 22 6, 30 14, 30 32" stroke="currentColor" strokeLinecap="round" strokeWidth={2.5} />
                <path
                  d="M23 26 L 30 34 L 36 25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                />
              </svg>
            </div>
            <ContactFormCard />
          </div>
        </div>
      </div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
