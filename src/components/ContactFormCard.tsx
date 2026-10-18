"use client";

import React, { useId, useMemo, useState } from "react";
import { RotateCcw, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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

// The send button disappears under the thank-you note; focus moves to its reset button.
const focusOnMount = (node: HTMLButtonElement | null) => {
  node?.focus();
};

// First line like "Thema: KI einführen, Security" (either language, so a
// language switch never stacks a second prefix).
const TOPIC_LINE_PATTERN = /^(?:Thema|Topic):([^\n]*)(?:\n+|$)/u;

const getSelectedTopics = (message: string, topics: Array<string>) => {
  const topicLine = TOPIC_LINE_PATTERN.exec(message)?.[1] ?? "";
  const named = new Set(topicLine.split(",").map((topic) => topic.trim()));
  return topics.filter((topic) => named.has(topic));
};

const withTopics = (message: string, prefix: string, topics: Array<string>) => {
  const body = message.replace(TOPIC_LINE_PATTERN, "");
  return topics.length ? `${prefix} ${topics.join(", ")}\n\n${body}` : body;
};

const ContactFormCard = () => {
  const { t } = useSettings();
  const { contact } = siteContent;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const topicsLabelId = useId();
  const topicLabels = contact.formTopics.items.map((topic) => t(topic));

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
  const message = useWatch({ control: form.control, name: "message" });
  const selectedTopics = getSelectedTopics(message, topicLabels);

  const toggleTopic = (topic: string) => {
    const nextTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((selected) => selected !== topic)
      : topicLabels.filter((label) => label === topic || selectedTopics.includes(label));

    form.setValue("message", withTopics(form.getValues("message"), t(contact.formTopics.prefix), nextTopics), {
      shouldDirty: true,
      shouldValidate: form.formState.isSubmitted,
    });
  };

  const writeAnother = () => {
    setIsSent(false);
    // The fields become visible again in the same commit; focus the first one.
    requestAnimationFrame(() => form.setFocus("name"));
  };

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

      // The handwritten thank-you note replaces the form; no extra toast.
      form.reset();
      setIsSent(true);
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
      <div className="sheet relative">
        {/* After sending, the form stays mounted (and keeps its size) but hidden
          beneath the thank-you note, so nothing below it jumps. */}
        <form
          {...webMcpFormAttributes}
          className={`p-6 sm:p-9 ${isSent ? "invisible" : ""}`}
          inert={isSent}
          onSubmit={handleSubmit}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Hidden verify field */}
            <FormField
              control={form.control}
              name="verify"
              render={({ field }) => <Input className="hidden" type="hidden" {...field} />}
            />

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

            <div aria-labelledby={topicsLabelId} className="sm:col-span-2" role="group">
              <p className="text-sm font-medium" id={topicsLabelId}>
                {t(contact.formTopics.label)}
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {topicLabels.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);

                  return (
                    <li key={topic}>
                      <button
                        aria-pressed={isSelected}
                        className={`inline-flex min-h-9 items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background text-foreground hover:border-primary hover:text-primary"
                        }`}
                        onClick={() => toggleTopic(topic)}
                        type="button"
                      >
                        {topic}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="sm:col-span-2" id="contact-message">
                  <FormLabel>{t(contact.formLabels.message)}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...webMcpParameterDescriptions.message}
                      minLength={10}
                      placeholder={t(contact.formPlaceholders.message)}
                      required
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              aria-busy={isSubmitting}
              className="w-full sm:col-span-2"
              disabled={isSubmitting}
              size="lg"
              type="submit"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t(contact.formStatus.sending)}
                </div>
              ) : (
                <>
                  <Send aria-hidden="true" />
                  {t(contact.formLabels.send)}
                </>
              )}
            </Button>
          </div>
        </form>

        <div
          aria-live="polite"
          className={isSent ? "absolute inset-0 flex items-center justify-center p-6" : "sr-only"}
        >
          {isSent && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-end gap-2">
                <p className="redline-note max-w-[12em] -rotate-3 text-balance">{t(contact.formStatus.sentNote)}</p>
                <svg aria-hidden="true" className="h-12 w-12 shrink-0 text-redline" fill="none" viewBox="0 0 48 48">
                  <path
                    className="draw-stroke [--stroke-length:60]"
                    d="M8 26 L 19 37 L 41 10"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3.5}
                  />
                </svg>
              </div>
              <Button onClick={writeAnother} ref={focusOnMount} size="sm" type="button" variant="outline">
                <RotateCcw aria-hidden="true" />
                {t(contact.formStatus.sentReset)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

ContactFormCard.displayName = "ContactFormCard";

export default ContactFormCard;
