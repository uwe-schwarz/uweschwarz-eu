import "react";

declare global {
  interface SubmitEvent {
    readonly agentInvoked?: boolean;
    respondWith?(response: Promise<unknown>): void;
  }
}

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolautosubmit?: string;
    tooldescription?: string;
    toolname?: string;
  }

  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}
