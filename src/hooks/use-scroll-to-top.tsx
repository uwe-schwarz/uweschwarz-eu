
import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);
};
