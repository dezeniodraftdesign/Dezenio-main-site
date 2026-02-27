"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function ServicesPage() {
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
          Services
        </h1>
        <p className="mt-5 max-w-3xl text-white/85 md:text-lg">
          Cabinetry-first delivery, with permit-ready documentation and
          buildable planning when you need it.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Link
            href="/cabinetry"
            className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/7.5 hover:ring-white/20"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold">
                Cabinetry: Design &amp; Install
              </h2>
              <p className="mt-3 text-sm text-white/80">
                Kith • Mouser • ProCraft (plus Bishop + Adornus on request).
                Hardware &amp; storage: Richelieu + Rev-A-Shelf. We handle
                design, quoting, ordering, delivery coordination, and
                installation.
              </p>
              <p className="mt-4 text-sm font-semibold text-white/90">
                View Cabinetry{" "}
                <span className="inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>

          <Link
            href="/construction-documents"
            className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/7.5 hover:ring-white/20"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold">Construction Documents</h2>
              <p className="mt-3 text-sm text-white/80">
                Permit-focused plan sets: site planning, floor plans,
                elevations, sections, and details for clear approvals and
                buildable results.
              </p>
              <p className="mt-4 text-sm font-semibold text-white/90">
                View Plans{" "}
                <span className="inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>

          <Link
            href="/design-remodeling"
            className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/7.5 hover:ring-white/20"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold">
                Design &amp; Remodeling Support
              </h2>
              <p className="mt-3 text-sm text-white/80">
                Concepts to permit-ready details — renovations, additions,
                as-builts, and clean coordination for homeowners and builders.
              </p>
              <p className="mt-4 text-sm font-semibold text-white/90">
                View Design Support{" "}
                <span className="inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Quote
          </button>
          <a
            href="/cabinetry"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Cabinetry Brands
          </a>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
