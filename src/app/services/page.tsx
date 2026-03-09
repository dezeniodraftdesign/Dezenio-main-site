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
      title: "Cabinetry: Design & Install",
      href: "/cabinetry",
      image: "/sections/cabinetry.png",
      blurb:
        "Kith, Mouser, ProCraft (plus Bishop + Adornus on request) — design support, ordering, delivery, and full installation. Hardware: Richelieu + Rev-A-Shelf.",
    },
    {
      title: "Construction Documents",
      href: "/construction-documents",
      image: "/sections/plans.png",
      blurb:
        "Permit-focused plans: site, foundation, framing, roof, elevations, and details for buildable results.",
    },
    {
      title: "Design & Remodeling Support",
      href: "/design-remodeling",
      image: "/sections/render.png",
      blurb:
        "Concepts to permit-ready details — renovations, additions, as-builts, and coordination support.",
    },
  ];

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 15.7%" }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <h1 className="text-center text-3xl font-bold md:text-4xl">
          Our Services
        </h1>

        <p className="mx-auto mt-4 max-w-[760px] text-center text-white/80 md:text-lg leading-7">
          Cabinetry-first delivery, with permit-ready documentation and
          buildable planning—when you need it.
        </p>

        {/* ✅ MATCHES HOME (#services) IMAGE CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/7.5 hover:ring-white/20"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-white">{c.title}</h2>
                <p className="mt-3 text-sm text-white/80">{c.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-white/90">
                  Learn more{" "}
                  <span className="inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA row (keep your existing intent) */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Quote
          </button>

          <Link
            href="/cabinetry"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Cabinetry Brands
          </Link>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
