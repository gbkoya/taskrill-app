"use client";
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // Initialize state with the current media query value (only runs once)
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Check if window is defined (for SSR/Next.js safety)
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia(query);

    // Create listener function - only update when changes occur
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]); // Only re-run when query changes

  return matches;
}
