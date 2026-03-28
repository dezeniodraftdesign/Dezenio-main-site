/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

const REF_URL_PROD = "https://dezeniodraftdesign.com/referrals";
const REF_PATH = "/referrals";

const PROD_HOSTS = new Set([
  "dezeniodraftdesign.com",
  "www.dezeniodraftdesign.com",
]);

type MobileReferralSectionKey = "how" | "share" | "rewards" | "best";

export default function ReferralsPage() {
  return (
    <Suspense fallback={null}>
      <ReferralsInner />
    </Suspense>
  );
}

function ReferralsInner() {
  const router = useRouter();

  // Keep QR/share open by default on mobile
  const [openMobileSection, setOpenMobileSection] =
    useState<MobileReferralSectionKey | null>("share");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    if (
      typeof window !== "undefined" &&
      !PROD_HOSTS.has(window.location.hostname)
    ) {
      window.location.replace(REF_URL_PROD);
    }
  }, []);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Referral Rewards | Dezenio Draft Design",
      url: REF_URL_PROD,
      description:
        "Refer a friend, neighbor, builder, or client to Dezenio Draft Design and receive a referral reward when they move forward with a qualifying project.",
    }),
    [],
  );

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+76px)] text-white md:pb-[calc(var(--bottom-band-height,64px)+110px)]"
    >
      <ScrollOffsets />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[3.0] object-[6%_104%] md:scale-100 md:object-[50%_81%]"
        />
        <div className="absolute inset-0 bg-black/46 md:bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/18 to-black/44 md:from-black/24 md:via-black/10 md:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_34%)] md:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.12),transparent_36%)]" />
      </div>

      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <section className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/72 md:text-xs">
            REFERRAL REWARDS
          </p>

          <h1 className="mt-3 text-[2.2rem] font-extrabold tracking-tight leading-[0.98] md:text-6xl">
            Send us a friend.
            <br />
            Get rewarded.
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-white/84 md:text-lg md:leading-8">
            Share Dezenio with a friend, neighbor, builder, or client. When they
            move forward with a qualifying project, you’ll receive a referral
            reward.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:hidden">
            <button
              type="button"
              onClick={() => router.push("/quote")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a Project
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={REF_URL_PROD}
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open Referral Page
              </a>

              <Link
                href="/services"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Services
              </Link>
            </div>
          </div>
        </section>

        {/* MOBILE */}
        <section className="mx-auto mt-8 max-w-5xl md:hidden">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
            Referral sections
          </p>

          <h2 className="mt-3 text-[1.85rem] font-extrabold tracking-tight leading-tight text-white">
            Choose a section
          </h2>

          <p className="mt-3 text-[15px] leading-6 text-white/76">
            Tap a section to keep the mobile experience tighter and easier to
            move through.
          </p>

          <div className="mt-4 space-y-3">
            <MobileAccordionCard
              label="How it works"
              title="How the referral process works"
              body="Share the page, let them move forward, then choose your reward."
              open={openMobileSection === "how"}
              onToggle={() =>
                setOpenMobileSection((prev) => (prev === "how" ? null : "how"))
              }
            >
              <div className="space-y-3 text-[14px] leading-7 text-white/80">
                <ul className="space-y-2">
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

                <p className="text-[13px] leading-6 text-white/68">
                  Terms apply. Exact reward value depends on project scope.
                </p>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Share"
              title="Share link / QR"
              body="Send the page directly or use the QR code."
              open={openMobileSection === "share"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "share" ? null : "share",
                )
              }
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-white p-3">
                    <img
                      src={`/api/qr?data=${encodeURIComponent(REF_PATH)}&v=4`}
                      alt="Referral QR"
                      width={220}
                      height={220}
                      className="mx-auto block"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white/70">Share this page</p>
                  <a
                    href={REF_URL_PROD}
                    className="mt-2 block break-all text-sm leading-7 text-white underline underline-offset-4 hover:text-white/85"
                  >
                    dezeniodraftdesign.com/referrals
                  </a>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:16154742004"
                    className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Call (615) 474-2004
                  </a>

                  <a
                    href="mailto:info@dezeniodraftdesign.com?subject=Referral"
                    className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Email Referral
                  </a>

                  <a
                    href={REF_URL_PROD}
                    className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Open Referral Page
                  </a>

                  <button
                    type="button"
                    onClick={() => router.push("/quote")}
                    className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Start a Project
                  </button>
                </div>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Rewards"
              title="Reward options"
              body="Cash, project credit, or priority scheduling."
              open={openMobileSection === "rewards"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "rewards" ? null : "rewards",
                )
              }
            >
              <div className="space-y-3 text-[14px] leading-7 text-white/80">
                <ul className="space-y-3">
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

                <p className="text-[13px] leading-6 text-white/68">
                  Rewards are issued after the referred project is signed and
                  invoiced. Cash and gift-card alternatives available on
                  request.
                </p>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Best referrals"
              title="Best referral types"
              body="Projects that tend to be the strongest fit."
              open={openMobileSection === "best"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "best" ? null : "best",
                )
              }
            >
              <ul className="space-y-2 text-[14px] leading-7 text-white/80">
                <li>• Kitchen and bath remodels</li>
                <li>• Cabinetry projects</li>
                <li>• Additions and permit drawing scope</li>
                <li>• Friends or neighbors needing a clearer next step</li>
              </ul>
            </MobileAccordionCard>
          </div>
        </section>

        {/* DESKTOP */}
        <section className="mx-auto mt-6 hidden max-w-6xl md:block">
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
                      <div className="rounded-2xl border border-white/10 bg-black/18 p-4 ring-1 ring-white/6">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                          Share this page
                        </p>

                        <a
                          href={REF_URL_PROD}
                          className="mt-2 block text-sm leading-6 text-white underline underline-offset-4 hover:text-white/85"
                        >
                          dezeniodraftdesign.com/referrals
                        </a>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
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

                        <a
                          href={REF_URL_PROD}
                          className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Open Referral Page
                        </a>

                        <button
                          type="button"
                          onClick={() => router.push("/quote")}
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

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={REF_URL_PROD}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 md:py-2.5"
              >
                Open Referral Page
              </a>

              <Link
                href="/services"
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 md:py-2.5"
              >
                View Services
              </Link>

              <button
                type="button"
                onClick={() => router.push("/quote")}
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 md:py-2.5"
              >
                Start a Project
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MobileAccordionCard({
  label,
  title,
  body,
  open,
  onToggle,
  children,
}: {
  label: string;
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/12 bg-[rgba(12,14,20,0.38)] ring-1 ring-white/6 backdrop-blur-[10px] shadow-[0_16px_32px_rgba(0,0,0,0.16)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left"
      >
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">
            {label}
          </p>
          <h3 className="mt-1 text-[1.1rem] font-semibold leading-snug text-white">
            {title}
          </h3>
          <p className="mt-2 text-[14px] leading-6 text-white/74">{body}</p>
        </div>

        <div className="shrink-0 rounded-full border border-white/16 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/76">
          {open ? "Close" : "Open"}
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-4 pb-4 pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
