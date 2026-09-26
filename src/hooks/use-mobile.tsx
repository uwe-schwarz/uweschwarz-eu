"use client";

import React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [breakpoint],
  );
  const isMobile = React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < breakpoint,
    () => false,
  );
  return isMobile;
}
