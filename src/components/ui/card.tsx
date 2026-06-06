"use client";

import type { HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function Card({ className, ref, ...props }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} ref={ref} {...props} />
  );
}

function CardContent({ className, ref, ...props }: CardProps) {
  return <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />;
}

export { Card, CardContent };
