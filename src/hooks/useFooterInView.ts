import { useEffect, useState } from "react";

/**
 * Returns true when the page <footer> is visible in the viewport.
 * Useful for moving fixed/floating UI so it doesn't block footer links.
 */
export function useFooterInView() {
  const [isFooterInView, setIsFooterInView] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Fallback for very old browsers
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterInView(Boolean(entry?.isIntersecting)),
      {
        root: null,
        threshold: 0.01,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return isFooterInView;
}
