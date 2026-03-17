"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

type FeatureImage = {
  title: string;
  text: string;
  image: string;
  imageStyle?: React.CSSProperties;
};

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

  const featureImages: FeatureImage[] = [
    {
      title: "Remodel coordination and build-phase support",
      text: "Use this area for a clean remodel-in-progress image, framing plus finish overlap, or a project visual that communicates organized field execution.",
      image: "/sections/render.png",
      imageStyle: { objectPosition: "50% 50%" },
    },
    {
      title: "Cabinetry, layout, and field execution staying aligned",
      text: "A strong placeholder for cabinetry-related planning, install awareness, and the point where design intent begins meeting real-world construction decisions.",
      image: "/sections/render.png",
      imageStyle: { objectPosition: "50% 50%" },
    },
    {
      title: "Residential and select commercial interior build-out support",
      text: "This can later be replaced with a light commercial or refined interior build-out image that still feels polished and on-brand.",
      image: "/sections/render.png",
      imageStyle: { objectPosition: "50% 50%" },
    },
  ];

  return (
    <div
      id="top"
      className="relative pb-[calc(var(--bottom-band-height,64px)+140px)] text-white"
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
        <div className="absolute inset-0 bg-black/68" />
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

        <section className="mt-12 rounded-2xl bg-white/8 p-5 ring-1 ring-white/10 backdrop-blur-md md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Built to stay aligned from planning through execution
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                This work is especially useful when cabinetry, layout, framing,
                finish decisions, field conditions, and construction sequencing
                begin to affect one another. The goal is not just to move the
                build forward, but to help it stay visually aligned, practically
                coordinated, and easier to execute well.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                Dezenio brings a cabinetry-first, construction-aware perspective
                to projects that need more than product selection alone.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-black/16 ring-1 ring-white/10">
              <div className="relative h-[260px] overflow-hidden md:h-[320px]">
                <Image
                  src="/sections/render.png"
                  alt="Construction support and field coordination"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 50%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/16 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Image Direction
          </h2>
          <p className="mt-3 max-w-3xl text-white/78 leading-relaxed">
            For now, these can remain placeholders until stronger field images
            are sourced. The ideal direction is clean remodels in progress,
            framing plus finished interior overlap, plan-overlay imagery, and
            refined build-phase visuals that still feel premium.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureImages.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl bg-white/8 ring-1 ring-white/10 backdrop-blur-md"
              >
                <div className="relative h-[210px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    style={item.imageStyle}
                  />
                  <div className="absolute inset-0 bg-black/10" />
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

        <section className="mt-12">
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
