import React from "react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/SettingsContext";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { SiX, SiXing, SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { t } = useSettings();
  const { contact } = siteContent;
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // This would typically send the form data to a backend
    // For now, we'll just show a success toast
    toast({
      title: t({ en: "Message sent!", de: "Nachricht gesendet!" }),
      description: t({
        en: "Thanks for reaching out. I'll get back to you soon.",
        de: "Danke für deine Nachricht. Ich werde mich bald bei dir melden.",
      }),
    });

    // Reset the form
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-gradient">{t(contact.title)}</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          {t(contact.subtitle)}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">
                  {t({ en: "Let's Connect", de: "Lass uns in Kontakt treten" })}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t({
                    en: "Feel free to reach out for collaborations or just a friendly hello.",
                    de: "Kontaktiere mich gerne für Zusammenarbeiten oder einfach nur für ein freundliches Hallo.",
                  })}
                </p>

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t(contact.emailLabel)}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium mb-4">
                  {t({ en: "Find me on", de: "Finde mich auf" })}
                </h4>
                <div className="flex space-x-4">
                  {contact.socialLinks.github && (
                    <a
                      href={contact.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <SiGithub className="w-5 h-5" />
                    </a>
                  )}

                  {contact.socialLinks.linkedin && (
                    <a
                      href={contact.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        className="w-5 h-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}

                  {contact.socialLinks.xing && (
                    <a
                      href={contact.socialLinks.xing}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Xing"
                    >
                      <SiXing className="w-5 h-5" />
                    </a>
                  )}

                  {contact.socialLinks.x && (
                    <a
                      href={contact.socialLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="X"
                    >
                      <SiX className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 border border-border shadow-sm"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t(contact.formLabels.name)}
                  </label>
                  <Input
                    id="name"
                    placeholder={t({ en: "Your name", de: "Dein Name" })}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t(contact.formLabels.email)}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t({ en: "Your email", de: "Deine E-Mail" })}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t(contact.formLabels.message)}
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={t({
                      en: "Your message",
                      de: "Deine Nachricht",
                    })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {t(contact.formLabels.send)}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
