import type { MouseEvent } from "react";
import type { Theme } from "@/contexts/settings-hook";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

// Switches the theme with a circular wipe that starts at the clicked control.
// Falls back to an instant switch without View Transitions or with reduced motion.
export function applyThemeWithTransition(
  nextTheme: Theme,
  setTheme: (theme: Theme) => void,
  event?: MouseEvent<HTMLElement>,
) {
  const root = document.documentElement;
  const apply = () => {
    root.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
  };
  const viewTransitionDocument = document as ViewTransitionDocument;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof viewTransitionDocument.startViewTransition !== "function" || prefersReducedMotion) {
    apply();
    return;
  }

  if (event) {
    const rect = event.currentTarget.getBoundingClientRect();
    root.style.setProperty("--theme-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--theme-y", `${rect.top + rect.height / 2}px`);
  }

  root.classList.add("theme-transition");
  const transition = viewTransitionDocument.startViewTransition(apply);
  void transition.finished.finally(() => root.classList.remove("theme-transition"));
}
