"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { invalidContactFields, type ContactField, type ContactValues } from "@/lib/contact-validation";
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

  const [invalidFields, setInvalidFields] = useState<Array<ContactField>>([]);

  const onSubmit = async (values: ContactValues, formElement: HTMLFormElement): Promise<ContactToolResponse> => {
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
      formElement.reset();
      setInvalidFields([]);
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
    event.preventDefault();
    const formElement = event.currentTarget;
    const values = Object.fromEntries(new FormData(formElement)) as unknown as ContactValues;
    const invalid = invalidContactFields(values);
    setInvalidFields(invalid);
    const submitEvent = event.nativeEvent as SubmitEvent;
    let response: Promise<ContactToolResponse>;
    if (invalid.length > 0) {
      formElement.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      response = Promise.resolve({
        message: "The inquiry was not sent because one or more fields failed validation.",
        success: false,
      });
    } else {
      response = onSubmit(values, formElement);
    }
    if (submitEvent.agentInvoked && typeof submitEvent.respondWith === "function") {
      submitEvent.respondWith(response);
    }
  };

  return (
    <form
      {...webMcpFormAttributes}
      className="glass-panel p-8"
      onChange={(event) => {
        if (invalidFields.length > 0) {
          const values = Object.fromEntries(new FormData(event.currentTarget)) as unknown as ContactValues;
          setInvalidFields(invalidContactFields(values));
        }
      }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <Input defaultValue="" name="verify" type="hidden" />
        {(["name", "email", "message"] as const).map((field) => {
          const id = `contact-${field}-form-item`;
          const error = invalidFields.includes(field);
          const attributes = {
            ...webMcpParameterDescriptions[field],
            "aria-describedby": error ? `${id}-message` : undefined,
            "aria-invalid": error,
            id,
            minLength: field === "message" ? 10 : field === "name" ? 2 : undefined,
            name: field,
            placeholder: t(contact.formPlaceholders[field]),
            required: true,
          };
          return (
            <div className="space-y-2" key={field}>
              <label className={`text-sm font-medium leading-none${error ? " text-destructive" : ""}`} htmlFor={id}>
                {t(contact.formLabels[field])}
              </label>
              {field === "message" ? (
                <Textarea {...attributes} rows={5} />
              ) : (
                <Input {...attributes} autoComplete={field} type={field === "email" ? "email" : "text"} />
              )}
              {error && (
                <p className="text-sm font-medium text-destructive" id={`${id}-message`} role="alert">
                  {t(contact.formStatus.validation[field])}
                </p>
              )}
            </div>
          );
        })}

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
  );
};

ContactFormCard.displayName = "ContactFormCard";

export default ContactFormCard;
