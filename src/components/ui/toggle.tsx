"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";
import { toggleVariants, type ToggleVariantProps } from "./toggle-variants";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & ToggleVariantProps
>(({ className, size, variant, ...props }, ref) => (
  <TogglePrimitive.Root className={cn(toggleVariants({ className, size, variant }))} ref={ref} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
export { toggleVariants, type ToggleVariantProps } from "./toggle-variants";
