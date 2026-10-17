import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const noopSubscribe = () => () => undefined;

/** false during SSR and hydration, true once the client has taken over. */
export const useHasHydrated = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

/**
 * Like motion's useReducedMotion, but reports false until hydration is done,
 * so the first client render matches the server markup. The real preference
 * applies on the next render.
 */
export const useHydrationSafeReducedMotion = () => {
  const prefersReducedMotion = useReducedMotion();
  const hasHydrated = useHasHydrated();
  return hasHydrated && Boolean(prefersReducedMotion);
};
