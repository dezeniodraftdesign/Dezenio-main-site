/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

const REF_URL_PROD = "https://dezeniodraftdesign.com/referrals";
const REF_PATH = "/referrals";

const PROD_HOSTS = new Set([
  "dezeniodraftdesign.com",
  "www.dezeniodraftdesign.com",
]);

export default function ReferralsPage() {
  const router = useRouter();
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

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
      className="relative pb-[calc(var(--bottom-band-height,64px)+80px)] text-white"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[3.15] object-[2%_101%] md:scale-100 md:object-[50%_81%]"
        />
        <div className="absolute inset-0 bg-black/42 md:bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/18 to-black/44 md:from-black/24 md:via-black/10 md:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_34%)] md:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.12),transparent_36%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <button
          type="button"
          onClick={() =>
            typeof window !== "undefined" && window.history.length > 1
              ? router.back()
              : router.push("/")
          }
          aria-label="Close referral page"
          className="fixed right-4 top-[92px] z-50 rounded-full border border-white/18 bg-black/50 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition hover:bg-black/65"
        >
          ✕ Close
        </button>

        <section className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/72">
            REFERRAL REWARDS
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight leading-[0.98] md:text-6xl">
            Send us a friend.
            <br />
            Get rewarded.
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/84 md:text-lg">
            Share Dezenio with a friend, neighbor, builder, or client. When they
            move forward with a qualifying project, you’ll receive a referral
            reward.
          </p>
        </section>

        <section className="mx-auto mt-6 max-w-6xl">
          <div className="rounded-[28px] border border-white/12 bg-[rgba(24,26,32,0.34)] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur-md md:p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.03fr_.97fr] lg:gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  How it works
                </h2>

                <ul className="mt-4 space-y-2 text-sm leading-7 text-white/82 md:text-base">
                  <li>• Send them this page or have them scan the QR code.</li>
                  <li>
                    • If they move forward with a qualifying project, you choose
                    your reward.
                  </li>
                  <li>
                    • Rewards are issued after contract signing and first
                    invoice.
                  </li>
                </ul>

                <div className="mt-4 rounded-2xl bg-black/16 p-4 ring-1 ring-white/8">
                  <h3 className="text-lg font-semibold text-white/92">
                    Rewards
                  </h3>

                  <ul className="mt-3 space-y-3 text-sm leading-7 text-white/80">
                    <li>
                      •{" "}
                      <span className="font-semibold text-white/92">
                        Cash or Gift Card
                      </span>{" "}
                      — simple thank-you rewards, especially useful for smaller
                      projects.
                    </li>
                    <li>
                      •{" "}
                      <span className="font-semibold text-white/92">
                        Credit on Your Next Project
                      </span>{" "}
                      — apply toward cabinetry, design work, or construction
                      documents.
                    </li>
                    <li>
                      •{" "}
                      <span className="font-semibold text-white/92">
                        Priority Scheduling
                      </span>{" "}
                      — fast-track the referred project and help move your next
                      one up too.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Share link / QR
                </h2>

                <div className="mt-4 rounded-2xl bg-black/16 p-4 ring-1 ring-white/8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="shrink-0 rounded-2xl bg-white p-3">
                      <img
                        src={`/api/qr?data=${encodeURIComponent(REF_PATH)}&v=4`}
                        alt="Referral QR"
                        width={210}
                        height={210}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white/70">Share this URL</p>
                      <a
                        href={REF_URL_PROD}
                        className="mt-2 block break-all text-sm leading-7 text-white underline underline-offset-4 hover:text-white/85"
                      >
                        {REF_URL_PROD}
                      </a>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <a
                          href="tel:16154742004"
                          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                        >
                          Call (615) 474-2004
                        </a>

                        <a
                          href="mailto:info@dezeniodraftdesign.com?subject=Referral"
                          className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Email Referral
                        </a>

                        <button
                          type="button"
                          onClick={() => setQuoteOpen(true)}
                          className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Start a Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <p className="text-xs leading-6 text-white/60">
                  Terms apply. Rewards are issued after the referred project is
                  signed and invoiced. Cash and gift-card alternatives available
                  on request.
                </p>
              </div>

              <div className="lg:col-span-2">
                <p className="text-xs leading-6 text-white/60">
                  *Exact reward value depends on project scope. Priority
                  scheduling means the referred project, and your next project,
                  may be placed into the next available opening ahead of general
                  inquiries.
                </p>
              </div>

              <div className="rounded-2xl bg-black/16 p-4 ring-1 ring-white/8 lg:col-span-2">
                <h3 className="text-lg font-semibold text-white/92">
                  Best referrals
                </h3>

                <ul className="mt-3 grid gap-x-10 gap-y-2 text-sm leading-7 text-white/80 md:grid-cols-2">
                  <li>• Kitchen and bath remodels</li>
                  <li>• Cabinetry projects</li>
                  <li>• Additions and permit drawing scope</li>
                  <li>• Friends or neighbors needing a clearer next step</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-5xl">
          <div className="rounded-[28px] border border-white/12 bg-[rgba(24,26,32,0.32)] px-6 py-6 text-center shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur-md md:px-10 md:py-7">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">
              Know someone planning a project?
            </h2>

            <p className="mx-auto mt-3 max-w-3xl leading-7 text-white/80">
              Send them here. If the project is a fit and they move forward,
              we’ll make sure your referral is recognized and rewarded.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={REF_URL_PROD}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Open Referral Link
              </a>

              <Link
                href="/services"
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
