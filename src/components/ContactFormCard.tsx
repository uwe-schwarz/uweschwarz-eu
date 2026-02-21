"use client";

import React, { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactFormCard = () => {
  const { t } = useSettings();
  const { contact } = siteContent;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().email({
          error: t(contact.formStatus.validation.email),
        }),
        message: z.string().min(10, {
          error: t(contact.formStatus.validation.message),
        }),
        name: z.string().min(2, {
          error: t(contact.formStatus.validation.name),
        }),
        verify: z.string(),
      }),
    [contact.formStatus.validation.email, contact.formStatus.validation.message, contact.formStatus.validation.name, t],
  );
  const formResolver = useMemo(() => zodResolver(formSchema), [formSchema]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      verify: "",
    },
    resolver: formResolver,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-mail", {
        body: JSON.stringify({
          email: values.email,
          message: values.message,
          name: values.name,
          verify: values.verify,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        toast({
          description: t(contact.formStatus.sentDescription),
          title: t(contact.formStatus.sentTitle),
        });
        form.reset();
        return;
      }

      let errorMessage = t(contact.formStatus.errorDescription);
      const responseBody = await response.text();

      if (responseBody.trim()) {
        let errorData: { error?: string } | undefined;

        try {
          errorData = JSON.parse(responseBody) as { error?: string };
          if (typeof errorData.error === "string" && errorData.error.trim()) {
            errorMessage = errorData.error;
          } else {
            errorMessage = responseBody;
          }
        } catch {
          errorMessage = responseBody;
        }
      }

      throw new Error(errorMessage);
    } catch (error) {
      const fallbackErrorDescription = t(contact.formStatus.errorDescription);
      const toastDescription =
        error instanceof Error && error.message.trim() ? error.message : fallbackErrorDescription;
      console.error("Error sending message:", error);
      toast({
        description: toastDescription,
        title: t(contact.formStatus.errorTitle),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="bg-card rounded-xl p-8 border border-border shadow-sm" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Hidden verify field */}
          <FormField control={form.control} name="verify" render={({ field }) => <Input type="hidden" {...field} />} />

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
                  <Input autoComplete="email" placeholder={t(contact.formPlaceholders.email)} type="email" {...field} />
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

          <Button aria-busy={isSubmitting} className="w-full" disabled={isSubmitting} type="submit">
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
  );
};

ContactFormCard.displayName = "ContactFormCard";

export default ContactFormCard;
