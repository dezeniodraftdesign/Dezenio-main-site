"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesInner />
    </Suspense>
  );
}

function ServicesInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  const cards = [
    {
      title: "Cabinetry: Sales, Design & Installation",
      href: "/cabinetry",
      image: "/sections/cabinetry.png",
      blurb:
        "Factory-direct cabinetry sales with design guidance, finish and product selection, ordering coordination, delivery planning, and installation support for kitchens, baths, and residential remodels.",
    },
    {
      title: "Concept Design & Construction Documents",
      href: "/design-documents",
      image: "/sections/plans.png",
      blurb:
        "Concept design, layout development, as-builts, visual planning, and permit-focused construction documents that help move a project from early ideas into clear, buildable direction.",
    },
    {
      title: "Construction & Remodeling",
      href: "/construction-remodeling",
      image: "/sections/campbell.png",
      blurb:
        "Renovation planning, additions, framing coordination, and project support that helps move residential work from concept into execution.",
    },
  ];

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+160px)] text-white"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/sections/lakeshore.png"
          alt="Dezenio Draft Design services background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/34" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_40%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl pt-18 text-center md:pt-20">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/72">
            CABINETRY • DESIGN • CONSTRUCTION
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
            Services
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/84 md:text-lg">
            Cabinetry-first services supported by concept design, construction
            documents, and remodel coordination across Nashville and Middle
            Tennessee.
          </p>
        </section>

        <section className="mx-auto mt-6 max-w-7xl">
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
            {cards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group overflow-hidden rounded-2xl bg-white/5 text-left ring-1 ring-white/8 backdrop-blur-sm transition hover:bg-white/7 hover:ring-white/14"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-black/8 to-transparent" />
                </div>

                <div className="flex min-h-[240px] flex-col p-6">
                  <h3 className="text-[1.08rem] font-semibold leading-snug text-white">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/80">
                    {c.blurb}
                  </p>
                  <p className="mt-auto pt-6 text-sm font-semibold text-white/90">
                    Explore service{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl">
          <div className="rounded-2xl bg-white/5 px-6 py-8 ring-1 ring-white/8 backdrop-blur-sm text-center md:px-8 md:py-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/80 md:text-lg">
              Whether you are planning cabinetry, concept work, construction
              documents, or a remodel, we can help point you in the right
              direction.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Get a Quote
              </button>

              <Link
                href="/cabinetry"
                className="rounded-full border border-white/22 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                View Cabinetry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
