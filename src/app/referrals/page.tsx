/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

const REF_URL_PROD = "https://dezeniodraftdesign.com/referrals";
const REF_PATH = "/referrals";

const PROD_HOSTS = new Set([
  "dezeniodraftdesign.com",
  "www.dezeniodraftdesign.com",
]);

export default function ReferralsPage() {
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
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      {/* Background (admin/utility style) */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 1.7%" }} // ✅ pick stitch frame here
        />
        <div className="absolute inset-0 bg-black/69" />
      </div>

      {/* We still want header/nav for trust + consistency */}
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {/* Close button */}
        <button
          onClick={() =>
            history.length > 1 ? router.back() : router.push("/")
          }
          aria-label="Close referral page"
          className="fixed right-4 top-[92px] z-50 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white/80 ring-1 ring-white/20 hover:bg-black/70"
        >
          ✕ Close
        </button>

        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Referral Rewards
          </p>

          <h1
            className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ textShadow: "0 10px 26px rgba(0,0,0,0.55)" }}
          >
            Send us a friend.
            <br />
            Get rewarded.
          </h1>

          <p
            className="mt-4 text-white/85 md:text-lg leading-7"
            style={{ textShadow: "0 10px 26px rgba(0,0,0,0.55)" }}
          >
            Share this page with a neighbor or friend. When they book a
            qualifying project, you’ll receive a reward.
          </p>
        </div>

        {/* No big glass card — clean columns */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left column: explanation */}
          <div className="max-w-xl">
            <h2
              className="text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              How it works
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/85 leading-7">
              <li>• Send them this page or have them scan the QR.</li>
              <li>
                • If they sign a qualifying project, you choose your reward.
              </li>
              <li>
                • Rewards are issued after contract signing and first invoice.
              </li>
            </ul>

            <h2
              className="mt-10 text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              Rewards
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/85 leading-7">
              <li>
                •{" "}
                <span className="font-semibold text-white/90">
                  Cash or Gift Card
                </span>{" "}
                — simple “thank you,” great for small projects.
              </li>
              <li>
                •{" "}
                <span className="font-semibold text-white/90">
                  Credit on Your Next Project
                </span>{" "}
                — apply toward design, docs, or cabinetry.
              </li>
              <li>
                •{" "}
                <span className="font-semibold text-white/90">
                  Priority Scheduling
                </span>{" "}
                — fast-track referred projects and your next one.
              </li>
            </ul>

            <p className="mt-6 text-xs text-white/60 leading-6">
              *Exact reward value depends on scope. Priority scheduling means
              your project (and the referral) is placed into the next available
              slot ahead of general inquiries.
            </p>
          </div>

          {/* Right column: QR + actions (no white “card”) */}
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              Share link / QR
            </h2>

            <div className="mt-5 flex items-start gap-6">
              <div className="shrink-0 rounded-2xl bg-white p-3">
                <img
                  // ✅ QR encodes a RELATIVE PATH so /api/qr can force prod for scanning
                  src={`/api/qr?data=${encodeURIComponent(REF_PATH)}&v=4`}
                  alt="Referral QR"
                  width={220}
                  height={220}
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-white/85 leading-7">
                  Share this URL:
                  <br />
                  <a
                    href={REF_URL_PROD}
                    className="underline underline-offset-4 hover:text-white break-all"
                  >
                    {REF_URL_PROD}
                  </a>
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="tel:16154742004"
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
                  >
                    Call (615) 474-2004
                  </a>

                  <a
                    href="mailto:info@dezeniodraftdesign.com?subject=Referral"
                    className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Email Referral
                  </a>

                  <button
                    onClick={() => router.push("/quote")}
                    className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Start a Project
                  </button>
                </div>

                <p className="mt-6 text-[11px] text-white/60 leading-6">
                  Terms apply. Rewards issued after the referred project is
                  signed and invoiced. Cash/gift card alternatives available on
                  request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
