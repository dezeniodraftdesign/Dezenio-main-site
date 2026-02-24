/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PROD_HOST = "dezeniodraftdesign.com";
const KEY = "hideHolidayCTA_until";
const SNOOZE_MS = 24 * 60 * 60 * 1000;
const QR_V = 9;

type PromoId = "referrals" | "cabinetry" | "remodel";

type Promo = {
  id: PromoId;
  title: string;
  sub: string;
  href: string; // relative ok
  qrPath: string; // relative; /api/qr normalizes to prod
  cta: string;
};

const PROMOS: Record<PromoId, Promo> = {
  cabinetry: {
    id: "cabinetry",
    title: "Cabinetry Packages",
    sub: "Kith • Mouser • ProCraft — design, ordering, and install support.",
    href: "/?quote=1",
    qrPath: "/?quote=1",
    cta: "Get a Quote",
  },
  remodel: {
    id: "remodel",
    title: "Booking Kitchen & Bath",
    sub: "Design + docs + remodel support in Nashville & Middle TN. Limited slots.",
    href: "/?quote=1",
    qrPath: "/?quote=1",
    cta: "Start a Project",
  },
  referrals: {
    id: "referrals",
    title: "Referral Rewards",
    sub: "Refer a friend. Earn rewards when they book. Tap or scan to submit.",
    href: "/referrals",
    qrPath: "/referrals",
    cta: "Referrals Page",
  },
};

// ✅ match your EXISTING homepage ids
const CHAPTERS: { selector: string; promoId: PromoId }[] = [
  { selector: "#services", promoId: "cabinetry" },
  { selector: "#about", promoId: "remodel" },
  { selector: "#contact", promoId: "referrals" },
];

const DEFAULT_PROMO: PromoId = "cabinetry";

function prodUrl(path: string) {
  return `https://${PROD_HOST}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function HolidayFloat() {
  // ✅ hooks FIRST (always called)
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activePromoId, setActivePromoId] = useState<PromoId>(DEFAULT_PROMO);
  const activeRef = useRef<PromoId>(DEFAULT_PROMO);

  // keep ref in sync (no conditional)
  activeRef.current = activePromoId;

  // compute hides AFTER hooks
  const shouldHideOnRoute = pathname === "/referrals";

  useEffect(() => {
    const until = Number(localStorage.getItem(KEY) || "0");
    setOpen(Date.now() > until);
  }, []);

  const snooze = () => {
    localStorage.setItem(KEY, String(Date.now() + SNOOZE_MS));
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    if (shouldHideOnRoute) return;

    const targets: { el: Element; promoId: PromoId }[] = [];
    for (const ch of CHAPTERS) {
      const el = document.querySelector(ch.selector);
      if (el) targets.push({ el, promoId: ch.promoId });
    }
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        let best: { promoId: PromoId; ratio: number } | null = null;

        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const found = targets.find((t) => t.el === e.target);
          if (!found) continue;

          const ratio = e.intersectionRatio;
          if (!best || ratio > best.ratio)
            best = { promoId: found.promoId, ratio };
        }

        if (!best) return;

        if (activeRef.current !== best.promoId) {
          setActivePromoId(best.promoId);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
      },
    );

    targets.forEach((t) => obs.observe(t.el));
    return () => obs.disconnect();
  }, [open, shouldHideOnRoute]);

  const promo = useMemo(
    () => PROMOS[activePromoId] ?? PROMOS[DEFAULT_PROMO],
    [activePromoId],
  );
  const qrPath = promo.qrPath.startsWith("/")
    ? promo.qrPath
    : `/${promo.qrPath}`;

  // ✅ final returns AFTER hooks
  if (shouldHideOnRoute) return null;
  if (!open) return null;

  const bottomOffset = `calc(var(--bottom-band-height, 64px) + 22px)`;

  return (
    <>
      {/* MOBILE */}
      <aside
        className="md:hidden fixed right-3 z-[60] text-white"
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

              <p className="mt-2 text-[11px] text-white/50">
                QR target: {prodUrl(qrPath)}
              </p>
            </div>
          </div>

          <button
            onClick={snooze}
            className="block w-full border-t border-white/10 px-4 py-2.5 text-center text-[11px] text-white/65 hover:text-white/85"
          >
            Dismiss (snoozes)
          </button>
        </div>
      </aside>
    </>
  );
}
