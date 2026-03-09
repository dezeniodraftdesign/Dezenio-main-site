"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function ConstructionDocumentsPage() {
  return (
    <Suspense fallback={null}>
      <ConstructionDocumentsInner />
    </Suspense>
  );
}

function ConstructionDocumentsInner() {
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

      {/* Background (universal snippet) */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          // ✅ Change ONLY this per page to select the stitch slice
          // Frame refs: 7.1 | 21.4 | 35.7 | 50 | 64.3 | 78.6 | 92.9 (or 100)
          style={{ objectPosition: "50% 97.9%" }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Construction Documents
        </h1>
        <p className="mt-5 max-w-3xl text-white/85 md:text-lg">
          Permit-focused plan sets built for clear approvals and buildable
          results across Nashville and Middle Tennessee.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">Typical deliverables</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Existing conditions / as-builts (when needed)</li>
              <li>Floor plans, elevations, sections, details</li>
              <li>Site planning and basic coordination</li>
              <li>Builder / inspector collaboration support</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">Best fit for</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Additions, remodels, and small residential projects</li>
              <li>Builder packages that need clean, fast plan sets</li>
              <li>Projects that also include cabinetry scope</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Start a Project
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
