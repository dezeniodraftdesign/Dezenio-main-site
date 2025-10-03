/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

const REF_URL =
  process.env.NEXT_PUBLIC_REF_URL || "https://dezeniodraftdesign.com/referrals";

const KEY = "hideHolidayCTA_until";
const SNOOZE_MS = 24 * 60 * 60 * 1000;

export default function HolidayFloat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const until = Number(localStorage.getItem(KEY) || "0");
    setOpen(Date.now() > until);
  }, []);

  if (!open) return null;

  const snooze = () => {
    localStorage.setItem(KEY, String(Date.now() + SNOOZE_MS));
    setOpen(false);
  };

  // Keep clear of BottomBand on all breakpoints
  const bottomOffset = `calc(var(--bottom-band-height, 64px) + 22px)`;

  return (
    <>
      {/* ---------- MOBILE: compact badge ---------- */}
      <aside
        className="md:hidden fixed right-3 z-[60] text-white"
        style={{ bottom: bottomOffset }}
        aria-live="polite"
      >
        <div className="rounded-xl bg-black/80 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-3 py-2.5">
            {/* slightly larger QR on mobile */}
            <div className="rounded-md bg-white p-1 ring-1 ring-black/10">
              <img
                src={`/api/qr?data=${encodeURIComponent(REF_URL)}&v=3`}
                alt="Referral QR"
                width={56}
                height={56}
                className="block"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-emerald-300/95">
                Holiday Rush
              </p>
              <p className="truncate text-xs text-white/85">
                Booking fast for the holidays.
              </p>

              <div className="mt-2 flex items-center gap-2">
                <a
                  href="tel:16154742004"
                  className="inline-flex items-center justify-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black hover:bg-white/90"
                >
                  Call
                </a>
                <a
                  href={REF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 px-2.5 py-1 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-400/10"
                >
                  Rewards
                </a>
                <button
                  onClick={snooze}
                  className="ml-auto inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] text-white/70 hover:text-white/95"
                  aria-label="Dismiss (snoozes 24h)"
                  title="Dismiss (snoozes 24h)"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- DESKTOP/TABLET ---------- */}
      <aside
        className="hidden md:block fixed right-6 z-[60] max-w-[96vw] text-white"
        style={{ bottom: bottomOffset }}
        aria-live="polite"
      >
        <div className="overflow-hidden rounded-2xl bg-black/60 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex w-[720px] max-w-[96vw] items-stretch gap-4 p-5 sm:gap-6 sm:p-6">
            {/* LEFT: QR + Email */}
            <div className="flex w-[108px] shrink-0 flex-col items-center">
              <div className="rounded-lg bg-white p-2 ring-1 ring-black/10">
                <img
                  src={`/api/qr?data=${encodeURIComponent(REF_URL)}&v=3`}
                  alt="Referral QR"
                  width={84}
                  height={84}
                  loading="lazy"
                  decoding="async"
                  className="block"
                />
              </div>

              <a
                href="mailto:info@dezeniodraftdesign.com?subject=Holiday%20Project"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 sm:text-sm"
              >
                Email Us
              </a>
            </div>

            {/* RIGHT: Copy + buttons */}
            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg font-semibold uppercase tracking-wide text-emerald-300/95">
                Holiday Rush Is On
              </p>
              <h3 className="mt-1 text-base font-semibold sm:text-lg">
                Booking fast for Thanksgiving &amp; Christmas.
              </h3>
              <p className="mt-1 text-xs text-white/80 sm:text-sm">
                Ask about referral rewards and priority scheduling.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href="tel:16154742004"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 min-w-[220px]"
                >
                  Call (615) 474-2004
                </a>

                <a
                  href={REF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/10"
                >
                  Referral Rewards
                </a>
              </div>
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
