"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface UseFitTextOptions {
  depKey?: unknown; // dependency to trigger recalculation (e.g. text)
  maxFontSize?: number;
  minFontSize?: number;
  resolution?: number; // px, how precise the fitting should be
}

export function useFitText({ depKey, maxFontSize = 48, minFontSize = 18, resolution = 1 }: UseFitTextOptions = {}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  const fit = useCallback(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const parent = el.parentElement;
    if (!parent) {
      return;
    }

    // Reset font size to max before measuring
    el.style.fontSize = `${maxFontSize}px`;
    el.style.whiteSpace = "nowrap";
    el.style.display = "inline-block";
    el.style.width = "auto";

    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;

    // Binary search for best font size
    let low = minFontSize;
    let high = maxFontSize;
    let best = minFontSize;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      el.style.fontSize = `${mid}px`;
      // Use scrollWidth/Height to check overflow
      if (el.scrollWidth <= parentWidth && el.scrollHeight <= parentHeight) {
        best = mid;
        low = mid + resolution;
      } else {
        high = mid - resolution;
      }
    }
    setFontSize(best);
  }, [minFontSize, maxFontSize, resolution]);

  const fitRef = useRef(fit);

  useLayoutEffect(() => {
    fitRef.current = fit;
  }, [fit]);

  const runLatestFit = useCallback(() => {
    fitRef.current();
  }, []);

  useLayoutEffect(() => {
    runLatestFit();
  }, [depKey, runLatestFit]);

  useLayoutEffect(() => {
    runLatestFit();
    // Listen for container resize
    const parent = containerRef.current?.parentElement;
    if (!parent) {
      return;
    }
    const ro = new window.ResizeObserver(runLatestFit);
    ro.observe(parent);
    return () => {
      ro.disconnect();
    };
  }, [runLatestFit]);

  // Also refit on window resize (for safety)
  useLayoutEffect(() => {
    const handleResize = () => {
      fitRef.current();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { fontSize, ref: containerRef };
}
