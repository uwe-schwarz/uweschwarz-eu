"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariantProps } from "./badge-variants";

interface BadgeProps extends BadgeVariantProps, React.HTMLAttributes<HTMLDivElement> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <div className={cn(badgeVariants({ variant }), className)} ref={ref} {...props} />;
});
Badge.displayName = "Badge";

export { Badge };
