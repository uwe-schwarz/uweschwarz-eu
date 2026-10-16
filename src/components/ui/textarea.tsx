"use client";

import type { Ref, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-base transition-colors placeholder:text-muted-foreground hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export { Textarea };
