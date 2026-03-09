/* FILE: src/app/components/BottomBand.tsx */
"use client";

import { CSSProperties, useEffect, useState } from "react";

const ITEMS = [
  "Factory-Direct Cabinetry",
  "Authorized Factory Dealer",
  "Boutique-Level Service",
  "Built on Relationships",
];

const BAND_H = 48; // ribbon height

type Props = {
  /** Element id to hide the band when it enters the viewport. Defaults to site-footer. */
  hideOnId?: string;
};

export default function BottomBand({ hideOnId = "site-footer" }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(hideOnId);

    const onScroll = () => {
      const doc = document.documentElement;
      let shouldHide = false;

      if (target) {
        const r = target.getBoundingClientRect();
        // If footer (or target) is visible at all, hide
        if (r.top < window.innerHeight) shouldHide = true;
      }

      // Also hide if we're truly at the bottom
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
  }, [hideOnId]);

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
          <div className="absolute inset-x-0 top-0 h-px bg-white/55" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/55" />

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
