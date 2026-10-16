"use client";

import type { ComponentProps, Ref } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  ref?: Ref<HTMLInputElement>;
}

function Input({ className, ref, type, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-lg border border-input bg-background/60 px-4 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  );
}

export { Input };
