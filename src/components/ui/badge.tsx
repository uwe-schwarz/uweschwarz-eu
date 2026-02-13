"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariantProps } from "./badge-variants";

export interface BadgeProps extends BadgeVariantProps, React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
// It's generally better to export types separately if they are needed elsewhere.
// export type { BadgeProps }; // This line is commented out as BadgeProps is already exported above.
