"use client";

import { useEffect } from "react";

/**
 * Measures the fixed header height and sets CSS var --header so
 * #anchor jumps land perfectly below the header on any screen size.
 */
export default function ScrollOffsets() {
  useEffect(() => {
    const set = () => {
      const header = document.querySelector("header") as HTMLElement | null;
      const h = header ? Math.round(header.getBoundingClientRect().height) : 96;
      document.documentElement.style.setProperty("--header", `${h}px`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return null;
}
