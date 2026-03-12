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

  const gallery = [
    {
      title: "On-Site Coordination",
      text: "Use this area for jobsite photos, progress shots, or team images that show real field execution.",
      image: "/sections/render.png",
    },
    {
      title: "Remodel Scope",
      text: "Great for before-and-after examples, framing progress, or staged renovation milestones.",
      image: "/sections/render.png",
    },
    {
      title: "Build Support",
      text: "Add project snapshots that reinforce your install, remodel, and construction support work.",
      image: "/sections/render.png",
    },
  ];

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
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
        <div className="absolute inset-0 bg-black/69" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <section className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70">
            CONSTRUCTION &amp; REMODELING
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Construction &amp; Remodeling
          </h1>

          <p className="mt-5 max-w-3xl text-white/85 md:text-lg leading-relaxed">
            Practical support for renovations, additions, field coordination,
            and build-phase execution — especially where cabinetry, design, and
            construction scope overlap.
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md">
            <h2 className="text-lg font-semibold">What we support</h2>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-white/80">
              <li>Residential remodel coordination</li>
              <li>Small additions and layout changes</li>
              <li>Cabinetry-related field verification and install planning</li>
              <li>Framing and build-phase communication support</li>
              <li>Execution guidance tied back to the design intent</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md">
            <h2 className="text-lg font-semibold">Best fit for</h2>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-white/80">
              <li>Kitchen and bath remodels with active construction scope</li>
              <li>Projects that need design + field coordination together</li>
              <li>
                Builders who want clear support across planning and execution
              </li>
              <li>Homeowners needing a more guided remodel process</li>
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Field Gallery</h2>
          <p className="mt-3 max-w-3xl text-white/78">
            Later, this can hold jobsite images, team photos, installs in
            progress, or before-and-after remodel visuals.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {gallery.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl bg-white/8 ring-1 ring-white/10 backdrop-blur-md"
              >
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/12" />
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/78">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Start a Project
          </button>

          <Link
            href="/services"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Back to Services
          </Link>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
