/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const KEY = "hideHolidayCTA_until";
const SNOOZE_MS = 24 * 60 * 60 * 1000;
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

// Match your homepage anchors
const CHAPTERS: { selector: string; promoId: PromoId }[] = [
  { selector: "#services", promoId: "cabinetry" },
  { selector: "#about", promoId: "remodel" },
  { selector: "#contact", promoId: "referrals" },
];

// What promo should show at the TOP of the page
const TOP_PROMO: PromoId = "cabinetry";

// Where we “focus” in the viewport to decide which section is active
const FOCUS_Y = 0.4; // 40% down the viewport feels natural on mobile
const TOP_RESET_PX = 140; // if scrollY < this, force TOP_PROMO

export default function HolidayFloat() {
  const pathname = usePathname();
  const hideOnThisRoute = pathname?.startsWith("/referrals") ?? false;

  const [open, setOpen] = useState(false);
  const [activePromoId, setActivePromoId] = useState<PromoId>(TOP_PROMO);

  // Measure height (only needed if other UI wants to avoid it later)
  const mobileRef = useRef<HTMLElement | null>(null);

  // Initial open/snooze
  useEffect(() => {
    try {
      const until = Number(localStorage.getItem(KEY) || "0");
      setOpen(Date.now() > until);
    } catch {
      setOpen(true);
    }
  }, []);

  const snooze = () => {
    try {
      localStorage.setItem(KEY, String(Date.now() + SNOOZE_MS));
    } catch {}
    setOpen(false);
  };

  // Expose dock height for other UI if desired (safe + no-any)
  useEffect(() => {
    const root = document.documentElement;
    const reset = () => root.style.setProperty("--holiday-float-dock", "0px");

    if (!open || hideOnThisRoute) {
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
  }, [open, hideOnThisRoute]);

  // ✅ Reliable “active promo” selection (no IntersectionObserver)
  useEffect(() => {
    if (!open || hideOnThisRoute) return;

    const pickPromo = () => {
      // Always reset at the very top
      if (window.scrollY < TOP_RESET_PX) {
        setActivePromoId(TOP_PROMO);
        return;
      }

      const vh = window.innerHeight || 800;
      const focus = vh * FOCUS_Y;

      // Evaluate candidates
      let best: { id: PromoId; score: number } | null = null;

      for (const ch of CHAPTERS) {
        const el = document.querySelector(ch.selector) as HTMLElement | null;
        if (!el) continue;

        const r = el.getBoundingClientRect();

        // Only consider sections that are somewhat near the viewport
        // (prevents random jumps)
        const visibleBand = r.bottom > vh * 0.15 && r.top < vh * 0.85;
        if (!visibleBand) continue;

        // Score: distance from our focus line (lower is better)
        const score = Math.abs(r.top - focus);

        if (!best || score < best.score) best = { id: ch.promoId, score };
      }

      if (best) setActivePromoId(best.id);
      // If no best found, don’t change — avoids flicker
    };

    // Run immediately and on scroll/resize
    pickPromo();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickPromo);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
    };
  }, [open, hideOnThisRoute]);

  const promo = useMemo(
    () => PROMOS[activePromoId] ?? PROMOS[TOP_PROMO],
    [activePromoId],
  );
  const qrPath = promo.qrPath.startsWith("/")
    ? promo.qrPath
    : `/${promo.qrPath}`;

  if (!open || hideOnThisRoute) return null;

  // iOS safe-area + optional bottom band var
  const bottomOffset =
    "calc(env(safe-area-inset-bottom) + 14px + var(--bottom-band-height, 0px))";

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
                  onClick={snooze}
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
            onClick={snooze}
            className="block w-full border-t border-white/10 px-4 py-2.5 text-center text-[11px] text-white/65 hover:text-white/85"
            type="button"
          >
            Dismiss (snoozes)
          </button>
        </div>
      </aside>
    </>
  );
}
