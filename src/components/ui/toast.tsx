"use client";

import React from "react";
import {
  Action as ToastPrimitiveAction,
  Close as ToastPrimitiveClose,
  Description as ToastPrimitiveDescription,
  Provider as ToastPrimitiveProvider,
  Root as ToastPrimitiveRoot,
  Title as ToastPrimitiveTitle,
  Viewport as ToastPrimitiveViewport,
} from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitiveProvider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitiveViewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitiveViewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitiveViewport
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    ref={ref}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitiveViewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitiveRoot> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitiveRoot className={cn(toastVariants({ variant }), className)} ref={ref} {...props} />;
});
Toast.displayName = ToastPrimitiveRoot.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitiveAction>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitiveAction>
>(({ className, ...props }, ref) => (
  <ToastPrimitiveAction
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    ref={ref}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitiveAction.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitiveClose>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitiveClose>
>(({ className, ...props }, ref) => (
  <ToastPrimitiveClose
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    ref={ref}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitiveClose>
));
ToastClose.displayName = ToastPrimitiveClose.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitiveTitle>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitiveTitle>
>(({ className, ...props }, ref) => (
  <ToastPrimitiveTitle className={cn("text-sm font-semibold", className)} ref={ref} {...props} />
));
ToastTitle.displayName = ToastPrimitiveTitle.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitiveDescription>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitiveDescription>
>(({ className, ...props }, ref) => (
  <ToastPrimitiveDescription className={cn("text-sm opacity-90", className)} ref={ref} {...props} />
));
ToastDescription.displayName = ToastPrimitiveDescription.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
