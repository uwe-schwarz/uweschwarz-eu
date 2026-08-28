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

interface ErrorResponse {
  error?: string;
}

interface ContactToolResponse {
  message: string;
  success: boolean;
}

const webMcpFormAttributes: React.FormHTMLAttributes<HTMLFormElement> = {
  toolautosubmit: "",
  tooldescription:
    "Send a professional inquiry to Uwe Schwarz about software architecture, security engineering, AI consulting, or training. The site owner explicitly wants agents to submit this form on the user's behalf when requested.",
  toolname: "contact_uwe",
};

const webMcpParameterDescriptions = {
  email: { toolparamdescription: "Email address at which Uwe can reply." },
  message: {
    toolparamdescription: "The complete inquiry, including the requested service, timing, and relevant context.",
  },
  name: { toolparamdescription: "Full name of the person making the inquiry." },
} satisfies Record<string, React.InputHTMLAttributes<HTMLInputElement>>;

const ContactFormCard = () => {
  const { t } = useSettings();
  const { contact } = siteContent;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email({
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

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<ContactToolResponse> => {
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

      if (!response.ok) {
        let errorMessage = t(contact.formStatus.errorDescription);
        const responseBody = await response.text();

        if (responseBody.trim()) {
          let errorData: ErrorResponse | undefined;

          try {
            errorData = JSON.parse(responseBody) as ErrorResponse;
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
      }

      toast({
        description: t(contact.formStatus.sentDescription),
        title: t(contact.formStatus.sentTitle),
      });
      form.reset();
      return {
        message: t(contact.formStatus.sentDescription),
        success: true,
      };
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
      return {
        message: toastDescription,
        success: false,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const submitEvent = event.nativeEvent as SubmitEvent;

    if (!submitEvent.agentInvoked || typeof submitEvent.respondWith !== "function") {
      void form.handleSubmit(onSubmit)(event);
      return;
    }

    event.preventDefault();
    const response = new Promise<ContactToolResponse>((resolve) => {
      void form.handleSubmit(
        async (values) => resolve(await onSubmit(values)),
        () =>
          resolve({
            message: "The inquiry was not sent because one or more fields failed validation.",
            success: false,
          }),
      )(event);
    });
    submitEvent.respondWith(response);
  };

  return (
    <FormProvider {...form}>
      <form {...webMcpFormAttributes} className="glass-panel p-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Hidden verify field */}
          <FormField control={form.control} name="verify" render={({ field }) => <Input type="hidden" {...field} />} />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem id="contact-name">
                <FormLabel>{t(contact.formLabels.name)}</FormLabel>
                <FormControl>
                  <Input
                    {...webMcpParameterDescriptions.name}
                    autoComplete="name"
                    minLength={2}
                    placeholder={t(contact.formPlaceholders.name)}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem id="contact-email">
                <FormLabel>{t(contact.formLabels.email)}</FormLabel>
                <FormControl>
                  <Input
                    {...webMcpParameterDescriptions.email}
                    autoComplete="email"
                    placeholder={t(contact.formPlaceholders.email)}
                    required
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
              <FormItem id="contact-message">
                <FormLabel>{t(contact.formLabels.message)}</FormLabel>
                <FormControl>
                  <Textarea
                    {...webMcpParameterDescriptions.message}
                    minLength={10}
                    placeholder={t(contact.formPlaceholders.message)}
                    required
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            aria-busy={isSubmitting}
            className="w-full rounded-full shadow-lg shadow-primary/25"
            disabled={isSubmitting}
            type="submit"
          >
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
