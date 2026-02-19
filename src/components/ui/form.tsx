"use client";

import React from "react";
import { Root as LabelPrimitiveRoot } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { FormFieldContext, FormItemContext, useFormField } from "./form-context";

// const Form = FormProvider; // Removed to ensure only components are effectively exported or defined at top level for this module
// Consumers should import FormProvider directly from 'react-hook-form' if needed.

// FormField remains here as it uses FormFieldContext
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// FormItem remains here as it uses FormItemContext
const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div className={cn("space-y-2", className)} ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitiveRoot>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label className={cn(error && "text-destructive", className)} htmlFor={formItemId} ref={ref} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField();

    return (
      <Slot
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        id={formItemId}
        ref={ref}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p className={cn("text-sm font-medium text-destructive", className)} id={formMessageId} ref={ref} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export {
  // useFormField, // Should be imported from ./form-context by components that need it
  // Form, // Should be imported from react-hook-form by components that need it
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
};
