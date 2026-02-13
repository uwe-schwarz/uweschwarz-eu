"use client";

import React, { useState } from "react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Mail, Send, Phone } from "lucide-react";
import { SiXing, SiX, SiGithub, SiBluesky, SiFreelancermap } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const ContactSection = () => {
  const { t } = useSettings();
  const { contact } = siteContent;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Schema mit Zod für Validierung
  const formSchema = z.object({
    email: z.string().email({
      message: t(contact.formStatus.validation.email),
    }),
    message: z.string().min(10, {
      message: t(contact.formStatus.validation.message),
    }),
    name: z.string().min(2, {
      message: t(contact.formStatus.validation.name),
    }),
    verify: z.string(),
  });

  // React Hook Form initialisieren
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      verify: "",
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  // Formular absenden
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-mail", {
        body: JSON.stringify({
          verify: values.verify,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();

      if (response.ok && data) {
        toast({
          description: t(contact.formStatus.sentDescription),
          title: t(contact.formStatus.sentTitle),
        });
        form.reset();
      } else {
        throw new Error(data?.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        description: t(contact.formStatus.errorDescription),
        title: t(contact.formStatus.errorTitle),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div>
            <FormProvider {...form}>
              <form
                className="bg-card rounded-xl p-8 border border-border shadow-sm"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-6">
                  {/* Hidden verify field */}
                  <FormField
                    control={form.control}
                    name="verify"
                    render={({ field }) => <Input type="hidden" {...field} />}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(contact.formLabels.name)}</FormLabel>
                        <FormControl>
                          <Input autoComplete="name" placeholder={t(contact.formPlaceholders.name)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(contact.formLabels.email)}</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="email"
                            placeholder={t(contact.formPlaceholders.email)}
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(contact.formLabels.message)}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t(contact.formPlaceholders.message)} rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" disabled={isSubmitting} type="submit">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t(contact.formStatus.sending)}
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t(contact.formLabels.send)}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
