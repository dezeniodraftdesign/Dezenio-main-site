// src/app/components/BottomBand.tsx
"use client";

import { CSSProperties, useEffect, useState } from "react";

const ITEMS = [
  "Factory-Direct Cabinetry",
  "Authorized Factory Dealer",
  "Boutique-Level Service",
  "Built on Relationships",
];

const BAND_H = 48; // ribbon height
const HIDE_EARLY = 8; // start hiding a hair before the contact ends

export default function BottomBand() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact"); // your existing section id
    const footer = document.getElementById("site-footer"); // fallback if contact is missing

    const onScroll = () => {
      const doc = document.documentElement;
      let shouldHide = false;

      if (contact) {
        // Hide when the bottom of #contact is at (or above) the bottom of the viewport
        // with a small early offset so it never clashes with the footer.
        const rect = contact.getBoundingClientRect();
        const threshold = window.innerHeight + HIDE_EARLY;
        if (rect.bottom <= threshold) shouldHide = true;
      } else if (footer) {
        // Fallback: if we can see the footer at all, hide
        const r = footer.getBoundingClientRect();
        if (r.top < window.innerHeight) shouldHide = true;
      }

      // Belt & suspenders: if we're truly at the bottom of the page, hide
      const atBottom = doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 2;
      if (atBottom) shouldHide = true;

      setHidden(shouldHide);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const vars: CSSProperties & { ["--bottom-band-height"]?: string } = {
    ["--bottom-band-height"]: `${BAND_H}px`,
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 z-[55] transition-opacity duration-200 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{ bottom: 0 }}
    >
      <div className="pointer-events-auto w-full" style={vars}>
        <div className="relative mx-auto max-w-[2000px]">
          {/* top/bottom hairlines */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/55" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/55" />

          {/* translucent body */}
          <div className="h-[48px] bg-white/10">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-6">
              <ul className="flex flex-wrap items-center text-[13px] tracking-wide text-white/90">
                {ITEMS.map((t, i) => (
                  <li key={t} className="flex items-center">
                    {i !== 0 && (
                      <span className="mx-5 inline-block h-[5px] w-[5px] rounded-full bg-white/75" />
                    )}
                    <span className="whitespace-nowrap">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
