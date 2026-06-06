"use client";

import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariantProps } from "./badge-variants";

interface BadgeProps extends BadgeVariantProps, HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function Badge({ className, ref, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} ref={ref} {...props} />;
}

export { Badge };
