"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [pathname]);
};
