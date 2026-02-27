"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function DesignRemodelingPage() {
  return (
    <Suspense fallback={null}>
      <DesignRemodelingInner />
    </Suspense>
  );
}

function DesignRemodelingInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Design &amp; Remodeling Support
        </h1>
        <p className="mt-5 max-w-3xl text-white/85 md:text-lg">
          Design support that stays buildable — from concept through
          permit-ready details for renovations and additions.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">What we help with</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Concept plans + layout optimization</li>
              <li>As-builts with overlays</li>
              <li>Permit-ready drawings (when needed)</li>
              <li>Coordination support for builders and trades</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">Where it pairs best</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Kitchen / bath remodels with cabinetry packages</li>
              <li>Small additions + reconfigurations</li>
              <li>Builder support when deadlines are tight</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Quote
          </button>
          <a
            href="/services"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Back to Services
          </a>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
