"use client";

import React from "react";
import { Root as TogglePrimitiveRoot } from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";
import { toggleVariants, type ToggleVariantProps } from "./toggle-variants";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitiveRoot> & ToggleVariantProps
>(({ className, size, variant, ...props }, ref) => (
  <TogglePrimitiveRoot className={cn(toggleVariants({ className, size, variant }))} ref={ref} {...props} />
));

Toggle.displayName = TogglePrimitiveRoot.displayName;

export { Toggle };
export { toggleVariants, type ToggleVariantProps } from "./toggle-variants";
