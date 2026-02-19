"use client";

import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariantProps } from "./badge-variants";

interface BadgeProps extends BadgeVariantProps, HTMLAttributes<HTMLDivElement> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <div className={cn(badgeVariants({ variant }), className)} ref={ref} {...props} />;
});
Badge.displayName = "Badge";

export { Badge };
