"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function ConstructionRemodelingPage() {
  return (
    <Suspense fallback={null}>
      <ConstructionRemodelingInner />
    </Suspense>
  );
}

function ConstructionRemodelingInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  return (
    <div
      id="top"
      className="relative pb-[calc(var(--bottom-band-height,64px)+120px)] text-white"
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
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/12 to-black/34" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_34%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <section className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70">
            CONSTRUCTION &amp; REMODELING
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl">
            Construction Support for Residential &amp; Select Commercial Scope
          </h1>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-white/85 md:text-lg">
            Practical support for remodels, additions, interior build-outs,
            cabinetry-related planning, and field execution — especially where
            design decisions need to stay aligned through installation and
            completion.
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md">
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

          <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md">
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

        <section className="mx-auto mt-12 max-w-6xl">
          <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md md:p-8">
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

        <section className="mx-auto mt-12 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md">
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

            <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md">
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

        <section className="mx-auto mt-12 max-w-6xl">
          <div className="rounded-2xl bg-white/8 px-6 py-8 ring-1 ring-white/10 backdrop-blur-md md:px-8 md:py-10">
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

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Start a Project
                </button>

                <Link
                  href="/services"
                  className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
