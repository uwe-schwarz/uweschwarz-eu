"use client";

import type { ComponentPropsWithoutRef, ElementRef, Ref } from "react";
import { Root as LabelPrimitiveRoot } from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitiveRoot>, VariantProps<typeof labelVariants> {
  ref?: Ref<ElementRef<typeof LabelPrimitiveRoot>>;
}

function Label({ className, ref, ...props }: LabelProps) {
  return <LabelPrimitiveRoot className={cn(labelVariants(), className)} ref={ref} {...props} />;
}

export { Label };
