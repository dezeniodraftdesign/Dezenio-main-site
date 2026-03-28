"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

type MobileConstructionSectionKey =
  | "support"
  | "fit"
  | "alignment"
  | "benefits"
  | "overlap";

export default function ConstructionRemodelingPage() {
  return (
    <Suspense fallback={null}>
      <ConstructionRemodelingInner />
    </Suspense>
  );
}

function ConstructionRemodelingInner() {
  const router = useRouter();
  const [openMobileSection, setOpenMobileSection] =
    useState<MobileConstructionSectionKey | null>("support");

  const glassCard =
    "rounded-[22px] border border-white/12 bg-[rgba(12,14,20,0.40)] p-4 ring-1 ring-white/6 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.18)] md:rounded-[24px] md:p-6";

  const sectionPanel =
    "rounded-[24px] border border-white/10 bg-[rgba(10,12,18,0.28)] p-5 ring-1 ring-white/8 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] md:rounded-[28px] md:p-7";

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+76px)] text-white md:pb-[calc(var(--bottom-band-height,64px)+110px)]"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/sections/render.png"
          alt="Construction and remodeling background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
        <div className="absolute inset-0 bg-black/28 md:bg-black/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/14 to-black/38" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_34%)]" />
      </div>

      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 md:pb-14 md:pt-20 lg:px-8">
        <section className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-white/72 md:text-xs">
            CONSTRUCTION &amp; REMODELING
          </p>

          <h1 className="mt-4 text-[2.15rem] font-extrabold tracking-tight leading-[1.02] text-white md:text-6xl">
            Construction support for residential
            <br />
            &amp; select commercial scope
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-7 text-white/88 md:mt-6 md:text-lg md:leading-8">
            Practical support for remodels, additions, interior build-outs,
            cabinetry-related planning, and field execution — especially where
            design decisions need to stay aligned through installation and
            completion.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:hidden">
            <button
              onClick={() => router.push("/quote")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a Project
            </button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/services"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Services
              </Link>
              <Link
                href="/quote"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Quote
              </Link>
            </div>
          </div>
        </section>

        {/* MOBILE */}
        <section className="mx-auto mt-8 max-w-5xl md:hidden">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
            Construction sections
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
              label="Support"
              title="What we support"
              body="Remodels, additions, cabinetry-related planning, and build-phase coordination."
              open={openMobileSection === "support"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "support" ? null : "support",
                )
              }
            >
              <ul className="space-y-2 text-[14px] leading-7 text-white/80">
                <li>• Residential remodel coordination</li>
                <li>• Small additions and layout revisions</li>
                <li>
                  • Cabinetry-related field verification and install planning
                </li>
                <li>• Framing and build-phase communication support</li>
                <li>• Demo-to-rebuild planning awareness</li>
                <li>• Select commercial interior and build-out coordination</li>
                <li>• Construction documents when the scope calls for them</li>
              </ul>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Best fit"
              title="Best fit for"
              body="Projects where planning, cabinetry, and field execution need to stay aligned."
              open={openMobileSection === "fit"}
              onToggle={() =>
                setOpenMobileSection((prev) => (prev === "fit" ? null : "fit"))
              }
            >
              <ul className="space-y-2 text-[14px] leading-7 text-white/80">
                <li>
                  • Kitchen and bath remodels with active construction scope
                </li>
                <li>
                  • Projects where cabinetry and field coordination need
                  alignment
                </li>
                <li>
                  • Builders who want clearer support across planning and
                  execution
                </li>
                <li>• Homeowners who need a more guided remodel process</li>
                <li>
                  • Select commercial interiors needing cleaner coordination
                </li>
              </ul>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Alignment"
              title="Built to stay aligned"
              body="Helps keep design intent, field conditions, and execution cleaner from start to finish."
              open={openMobileSection === "alignment"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "alignment" ? null : "alignment",
                )
              }
            >
              <div className="space-y-4 text-[14px] leading-7 text-white/80">
                <p>
                  This work is especially useful when cabinetry, layout,
                  framing, finish decisions, field conditions, and construction
                  sequencing begin to affect one another.
                </p>
                <p>
                  The goal is not just to move the build forward, but to help it
                  stay visually aligned, practically coordinated, and easier to
                  execute well.
                </p>
                <p>
                  That applies not only to residential remodels and additions,
                  but also to select commercial interiors and build-out scope
                  where planning, coordination, and execution need to stay
                  cleaner from start to finish.
                </p>
                <p className="text-white/72">
                  Dezenio brings a cabinetry-first, construction-aware
                  perspective to projects that need more than product selection
                  alone.
                </p>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Benefits"
              title="How this support helps"
              body="Cleaner coordination, fewer disconnects, and better execution."
              open={openMobileSection === "benefits"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "benefits" ? null : "benefits",
                )
              }
            >
              <ul className="space-y-2 text-[14px] leading-7 text-white/80">
                <li>• Clarifies scope before build-phase decisions multiply</li>
                <li>
                  • Keeps cabinetry planning tied to real field conditions
                </li>
                <li>
                  • Reduces disconnect between design intent and execution
                </li>
                <li>
                  • Supports cleaner communication with builders and trades
                </li>
                <li>
                  • Helps projects stay more coordinated through installation
                </li>
              </ul>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Overlap"
              title="Typical overlap"
              body="Where cabinetry, layout, field verification, and construction documents intersect."
              open={openMobileSection === "overlap"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "overlap" ? null : "overlap",
                )
              }
            >
              <ul className="space-y-2 text-[14px] leading-7 text-white/80">
                <li>• Cabinetry planning plus remodel coordination</li>
                <li>
                  • Layout revisions that affect framing or finish decisions
                </li>
                <li>• Field verification before ordering or installation</li>
                <li>• Interior build-out scope requiring stronger alignment</li>
                <li>
                  • Construction documents added where scope calls for them
                </li>
              </ul>
            </MobileAccordionCard>
          </div>
        </section>

        {/* DESKTOP */}
        <section className="mx-auto mt-10 hidden max-w-6xl grid-cols-1 gap-8 md:grid lg:grid-cols-2">
          <div className={glassCard}>
            <h2 className="text-lg font-semibold">What we support</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/80">
              <li>Residential remodel coordination</li>
              <li>Small additions and layout revisions</li>
              <li>Cabinetry-related field verification and install planning</li>
              <li>Framing and build-phase communication support</li>
              <li>Demo-to-rebuild planning awareness</li>
              <li>Select commercial interior and build-out coordination</li>
              <li>Construction documents when the scope calls for them</li>
            </ul>
          </div>

          <div className={glassCard}>
            <h2 className="text-lg font-semibold">Best fit for</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/80">
              <li>Kitchen and bath remodels with active construction scope</li>
              <li>
                Projects where cabinetry and field coordination need to stay
                aligned
              </li>
              <li>
                Builders who want clearer support across planning and execution
              </li>
              <li>Homeowners who need a more guided remodel process</li>
              <li>
                Select commercial interiors that benefit from stronger layout,
                coordination, and finish planning
              </li>
            </ul>
          </div>
        </section>

        <section className="mx-auto mt-10 hidden max-w-6xl md:block">
          <div className={sectionPanel}>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Built to stay aligned from planning through execution
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/82 md:text-base">
              This work is especially useful when cabinetry, layout, framing,
              finish decisions, field conditions, and construction sequencing
              begin to affect one another. The goal is not just to move the
              build forward, but to help it stay visually aligned, practically
              coordinated, and easier to execute well.
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/78 md:text-base">
              That applies not only to residential remodels and additions, but
              also to select commercial interiors and build-out scope where
              planning, coordination, and execution need to stay cleaner from
              start to finish.
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/74 md:text-base">
              Dezenio brings a cabinetry-first, construction-aware perspective
              to projects that need more than product selection alone.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 hidden max-w-6xl md:block">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className={glassCard}>
              <h2 className="text-lg font-semibold">How this support helps</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/80">
                <li>Clarifies scope before build-phase decisions multiply</li>
                <li>Keeps cabinetry planning tied to real field conditions</li>
                <li>Reduces disconnect between design intent and execution</li>
                <li>Supports cleaner communication with builders and trades</li>
                <li>
                  Helps projects stay more coordinated through installation
                </li>
              </ul>
            </div>

            <div className={glassCard}>
              <h2 className="text-lg font-semibold">Typical overlap</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/80">
                <li>Cabinetry planning plus remodel coordination</li>
                <li>
                  Layout revisions that affect framing or finish decisions
                </li>
                <li>Field verification before ordering or installation</li>
                <li>Interior build-out scope requiring stronger alignment</li>
                <li>Construction documents added where scope calls for them</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className="rounded-[24px] border border-white/10 bg-[rgba(10,12,18,0.26)] px-6 py-8 ring-1 ring-white/8 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] md:px-8 md:py-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Need clearer support through a remodel or build-out?
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
                  Whether the project involves a residential remodel, addition,
                  tenant build-out, or cabinetry-driven interior scope, we can
                  help define the next step and support clearer coordination
                  moving forward.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={() => router.push("/quote")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 md:py-2.5"
                >
                  Start a Project
                </button>

                <Link
                  href="/services"
                  className="rounded-full border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 md:py-2.5"
                >
                  Back to Services
                </Link>
              </div>
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
