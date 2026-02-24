/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REF_URL_PROD = "https://dezeniodraftdesign.com/referrals";
const REF_PATH = "/referrals";

const PROD_HOSTS = new Set([
  "dezeniodraftdesign.com",
  "www.dezeniodraftdesign.com",
]);

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Only bounce to prod when deployed (production build)
    if (process.env.NODE_ENV !== "production") return;

    // If someone opened /referrals on a non-prod host (preview), bounce to prod.
    if (
      typeof window !== "undefined" &&
      !PROD_HOSTS.has(window.location.hostname)
    ) {
      window.location.replace(REF_URL_PROD);
    }
  }, []);

  return (
    <main
      className="relative min-h-[calc(100vh-var(--header,96px))]
                 bg-[url('/backgrounds/Dezenio-HomeBG.png')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/55" />

      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Close button */}
        <button
          onClick={() =>
            history.length > 1 ? router.back() : router.push("/")
          }
          aria-label="Close referral panel"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white/80 ring-1 ring-white/20 hover:bg-black/70"
        >
          ✕ Close
        </button>

        <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-semibold">Referral Rewards</h1>
          <p className="mt-2 text-white/80">
            Share us with a neighbor or friend. When they book a qualifying
            project, you’ll receive a reward.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">How it works</h2>
              <ul className="mt-2 space-y-2 text-white/80">
                <li>• Send them this page or let them scan the QR.</li>
                <li>
                  • If they sign a qualifying project, you choose your reward.
                </li>
                <li>
                  • Rewards are issued after contract signing and first invoice.
                </li>
              </ul>

              <h2 className="mt-6 text-lg font-semibold">Rewards</h2>
              <ul className="mt-2 space-y-2 text-white/80">
                <li>
                  • <b>Cash or Gift Card</b> — simple “thank you,” great for
                  small projects.
                </li>
                <li>
                  • <b>Credit on Your Next Project</b> — apply toward design,
                  docs, or cabinetry.
                </li>
                <li>
                  • <b>Priority Scheduling</b> — we fast-track referred projects
                  and your next one.
                </li>
              </ul>

              <p className="mt-4 text-xs text-white/60">
                *Exact reward value depends on project scope. Priority
                scheduling means your project (and the referral) is placed into
                the next available slot, ahead of general inquiries.
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 text-center">
              <img
                // ✅ QR encodes a RELATIVE PATH so /api/qr will force prod for scanning
                src={`/api/qr?data=${encodeURIComponent(REF_PATH)}&v=4`}
                alt="Referral QR"
                width={256}
                height={256}
                className="mx-auto block"
              />
              <p className="mt-2 text-xs text-black/70">
                Scan or share:{" "}
                <a href={REF_URL_PROD} className="underline">
                  {REF_URL_PROD}
                </a>
              </p>
              <div className="mt-4 grid gap-2">
                <a
                  href="tel:16154742004"
                  className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
                >
                  Call (615) 474-2004
                </a>
                <a
                  href="mailto:info@dezeniodraftdesign.com?subject=Referral"
                  className="rounded-full border border-black/20 px-4 py-2 text-sm font-semibold text-black"
                >
                  Email Referral
                </a>
                {/* Route to home and auto-open the existing QuoteModal */}
                <button
                  onClick={() => router.push("/?quote=1")}
                  className="rounded-full border border-emerald-500/50 px-4 py-2 text-sm font-semibold text-emerald-600"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-white/60">
            Terms apply. Rewards issued after the referred project is signed and
            invoiced. Cash/gift card alternatives available on request.
          </p>
        </div>
      </section>
    </main>
  );
}
