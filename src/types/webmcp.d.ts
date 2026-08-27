import "react";

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
