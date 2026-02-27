/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const QR_V = 11;

type PromoId = "cabinetry" | "referrals" | "remodel";

type Promo = {
  id: PromoId;
  title: string;
  sub: string;
  href: string;
  qrPath: string;
  cta: string;
};

const PROMOS: Record<PromoId, Promo> = {
  cabinetry: {
    id: "cabinetry",
    title: "CABINETRY PACKAGES",
    sub: "Kith • Mouser • ProCraft — design, ordering, and install support.",
    href: "/?quote=1",
    qrPath: "/?quote=1",
    cta: "Get a Quote",
  },
  remodel: {
    id: "remodel",
    title: "PROJECT INTAKE",
    sub: "Construction docs + design support. Tap to start a project.",
    href: "/?quote=1",
    qrPath: "/?quote=1",
    cta: "Start",
  },
  referrals: {
    id: "referrals",
    title: "REFERRAL REWARDS",
    sub: "Earn rewards when friends book. Tap or scan to submit.",
    href: "/referrals",
    qrPath: "/referrals",
    cta: "Open",
  },
};

const ROTATE_MS = 4000;

/**
 * "Docked" = footer is actually reached (not just barely visible).
 * We consider it docked when footer's top is within the bottom ~22% of the viewport.
 * Tune DOCK_PCT + DOCK_PX to taste.
 */
const DOCK_PCT = 0.78; // 78% down the viewport
const DOCK_PX = 40; // extra cushion

export default function HolidayFloat() {
  const [footerDocked, setFooterDocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const order: PromoId[] = useMemo(
    () => ["cabinetry", "remodel", "referrals"],
    [],
  );
  const [idx, setIdx] = useState(0);

  const mobileRef = useRef<HTMLElement | null>(null);

  // Detect "footer pocket" (docked)
  useEffect(() => {
    const footer =
      (document.getElementById("site-footer") as HTMLElement | null) ??
      (document.querySelector("footer") as HTMLElement | null);

    if (!footer) {
      setFooterDocked(false);
      return;
    }

    const computeDocked = () => {
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

      // Footer is on screen at all
      const visible = rect.bottom > 0 && rect.top < vh;

      // Footer top is low enough in viewport to feel "docked"
      const dockLine = vh * DOCK_PCT - DOCK_PX;
      const docked = visible && rect.top <= dockLine;

      setFooterDocked(docked);
    };

    // IO just to know "something changed", then we compute precisely with rects
    const io = new IntersectionObserver(() => {
      requestAnimationFrame(computeDocked);
    });

    io.observe(footer);

    // Also handle resize/scroll for consistent feel
    window.addEventListener("scroll", computeDocked, { passive: true });
    window.addEventListener("resize", computeDocked);
    window.addEventListener("orientationchange", computeDocked);

    // Initial
    computeDocked();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", computeDocked);
      window.removeEventListener("resize", computeDocked);
      window.removeEventListener("orientationchange", computeDocked);
    };
  }, []);

  const open = footerDocked && !dismissed;

  // Rotate promos only while open
  useEffect(() => {
    if (!open) return;

    const t = window.setInterval(() => {
      setIdx((n) => (n + 1) % order.length);
    }, ROTATE_MS);

    return () => window.clearInterval(t);
  }, [open, order.length]);

  // When leaving footer pocket, reset rotation so it starts consistent next time
  useEffect(() => {
    if (!footerDocked) setIdx(0);
  }, [footerDocked]);

  const promoId = order[idx] ?? "cabinetry";
  const promo = PROMOS[promoId] ?? PROMOS.cabinetry;

  const qrPath = promo.qrPath.startsWith("/")
    ? promo.qrPath
    : `/${promo.qrPath}`;

  // Expose dock height var (so other fixed UI can offset if needed)
  useEffect(() => {
    const root = document.documentElement;

    const reset = () => root.style.setProperty("--holiday-float-dock", "0px");

    if (!open) {
      reset();
      return;
    }

    const el = mobileRef.current;
    if (!el) {
      reset();
      return;
    }

    const apply = () => {
      const h = Math.ceil(el.getBoundingClientRect().height || 0);
      root.style.setProperty("--holiday-float-dock", `${h + 12}px`);
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);

    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
      reset();
    };
  }, [open]);

  if (!open) return null;

  // iOS safe-area + optional bottom band var
  const bottomOffset =
    "calc(env(safe-area-inset-bottom) + 14px + var(--bottom-band-height, 0px))";

  const dismiss = () => setDismissed(true);

  return (
    <>
      {/* MOBILE */}
      <aside
        ref={mobileRef}
        className="md:hidden fixed left-3 right-3 z-[60] text-white"
        style={{ bottom: bottomOffset }}
        aria-live="polite"
      >
        <div className="rounded-xl bg-black/80 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="rounded-md bg-white p-1 ring-1 ring-black/10">
              <img
                src={`/api/qr?data=${encodeURIComponent(qrPath)}&v=${QR_V}`}
                alt="Promo QR"
                width={56}
                height={56}
                className="block"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-emerald-300/95">
                {promo.title}
              </p>
              <p className="truncate text-xs text-white/85">{promo.sub}</p>

              <div className="mt-2 flex items-center gap-2">
                <a
                  href={promo.href}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 px-2.5 py-1 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-400/10"
                >
                  {promo.cta}
                </a>

                <button
                  onClick={dismiss}
                  className="ml-auto inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] text-white/70 hover:text-white/95"
                  type="button"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* DESKTOP */}
      <aside
        className="hidden md:block fixed right-6 z-[60] max-w-[96vw] text-white"
        style={{ bottom: bottomOffset }}
        aria-live="polite"
      >
        <div className="overflow-hidden rounded-2xl bg-black/60 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex w-[720px] max-w-[96vw] items-stretch gap-4 p-5 sm:gap-6 sm:p-6">
            <div className="flex w-[108px] shrink-0 flex-col items-center">
              <div className="rounded-lg bg-white p-2 ring-1 ring-black/10">
                <img
                  src={`/api/qr?data=${encodeURIComponent(qrPath)}&v=${QR_V}`}
                  alt="Promo QR"
                  width={84}
                  height={84}
                  loading="lazy"
                  decoding="async"
                  className="block"
                />
              </div>

              <a
                href="mailto:info@dezeniodraftdesign.com?subject=Dezenio%20Inquiry"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 sm:text-sm"
              >
                Email Us
              </a>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg font-semibold uppercase tracking-wide text-emerald-300/95">
                {promo.title}
              </p>
              <h3 className="mt-1 text-base font-semibold sm:text-lg">
                {promo.sub}
              </h3>

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href="tel:16154742004"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 min-w-[220px]"
                >
                  Call (615) 474-2004
                </a>

                <a
                  href={promo.href}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/10"
                >
                  {promo.cta}
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={dismiss}
            className="block w-full border-t border-white/10 px-4 py-2.5 text-center text-[11px] text-white/65 hover:text-white/85"
            type="button"
          >
            Dismiss
          </button>
        </div>
      </aside>
    </>
  );
}
