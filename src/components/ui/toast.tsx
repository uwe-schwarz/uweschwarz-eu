"use client";

import type { ComponentPropsWithoutRef, ElementRef, ReactElement, Ref } from "react";
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

interface ToastViewportProps extends ComponentPropsWithoutRef<typeof ToastPrimitiveViewport> {
  ref?: Ref<ElementRef<typeof ToastPrimitiveViewport>>;
}

function ToastViewport({ className, ref, ...props }: ToastViewportProps) {
  return (
    <ToastPrimitiveViewport
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

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

interface ToastRootProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitiveRoot>, VariantProps<typeof toastVariants> {
  ref?: Ref<ElementRef<typeof ToastPrimitiveRoot>>;
}

function Toast({ className, ref, variant, ...props }: ToastRootProps) {
  return <ToastPrimitiveRoot className={cn(toastVariants({ variant }), className)} ref={ref} {...props} />;
}

interface ToastActionProps extends ComponentPropsWithoutRef<typeof ToastPrimitiveAction> {
  ref?: Ref<ElementRef<typeof ToastPrimitiveAction>>;
}

function ToastAction({ className, ref, ...props }: ToastActionProps) {
  return (
    <ToastPrimitiveAction
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

interface ToastCloseProps extends ComponentPropsWithoutRef<typeof ToastPrimitiveClose> {
  ref?: Ref<ElementRef<typeof ToastPrimitiveClose>>;
}

function ToastClose({ className, ref, ...props }: ToastCloseProps) {
  return (
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
  );
}

interface ToastTitleProps extends ComponentPropsWithoutRef<typeof ToastPrimitiveTitle> {
  ref?: Ref<ElementRef<typeof ToastPrimitiveTitle>>;
}

function ToastTitle({ className, ref, ...props }: ToastTitleProps) {
  return <ToastPrimitiveTitle className={cn("text-sm font-semibold", className)} ref={ref} {...props} />;
}

interface ToastDescriptionProps extends ComponentPropsWithoutRef<typeof ToastPrimitiveDescription> {
  ref?: Ref<ElementRef<typeof ToastPrimitiveDescription>>;
}

function ToastDescription({ className, ref, ...props }: ToastDescriptionProps) {
  return <ToastPrimitiveDescription className={cn("text-sm opacity-90", className)} ref={ref} {...props} />;
}

type ToastProps = ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
