"use client";

import { useId, useMemo } from "react";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, Ref } from "react";
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
  const contextValue = useMemo(() => ({ name: props.name }), [props.name]);

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// FormItem remains here as it uses FormItemContext
interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function FormItem({ className, ref, ...props }: FormItemProps) {
  const id = useId();
  const contextValue = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)} ref={ref} {...props} />
    </FormItemContext.Provider>
  );
}

interface FormLabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitiveRoot> {
  ref?: Ref<ElementRef<typeof LabelPrimitiveRoot>>;
}

function FormLabel({ className, ref, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField();

  return <Label className={cn(error && "text-destructive", className)} htmlFor={formItemId} ref={ref} {...props} />;
}

interface FormControlProps extends ComponentPropsWithoutRef<typeof Slot> {
  ref?: Ref<ElementRef<typeof Slot>>;
}

function FormControl({ ref, ...props }: FormControlProps) {
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
}

interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

function FormMessage({ children, className, ref, ...props }: FormMessageProps) {
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
}

export {
  // useFormField, // Should be imported from ./form-context by components that need it
  // Form, // Should be imported from react-hook-form by components that need it
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
};
