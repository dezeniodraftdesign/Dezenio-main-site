"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function CabinetryPage() {
  // ✅ Next build requirement: useSearchParams() must be inside a Suspense boundary
  return (
    <Suspense fallback={null}>
      <CabinetryInner />
    </Suspense>
  );
}

function CabinetryInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+240px)]"
    >
      <ScrollOffsets />

      {/* Background: HARD-LOCK to the bottom of the stitched image */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_100%] scale-[1.18] origin-bottom"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Authorized Cabinetry Dealer in Nashville, TN
        </h1>

        <p className="mt-5 max-w-3xl text-white/85 md:text-lg">
          Through our Cabinetry Division, we provide factory-direct cabinetry
          with professional design support, ordering coordination, and
          installation. Ideal for builders and homeowners who want clean
          process, accurate details, and reliable follow-through.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">Lines We Carry</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>
                <strong className="text-white">Kith Kitchens</strong> (primary)
              </li>
              <li>
                <strong className="text-white">Mouser</strong> (premium /
                custom)
              </li>
              <li>
                <strong className="text-white">ProCraft</strong> (quick-ship
                options available)
              </li>
              <li>
                <strong className="text-white">Bishop</strong>
              </li>
              <li>
                <strong className="text-white">Adornus</strong> (available on
                request)
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/60">
              We’ll guide you to the right line based on budget, lead time, and
              finish needs.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">What We Handle</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Design + layout refinement</li>
              <li>Spec-accurate quotes</li>
              <li>Ordering + logistics coordination</li>
              <li>Delivery planning</li>
              <li>Professional installation</li>
            </ul>
            <p className="mt-4 text-xs text-white/60">
              If you have plans, we can take off quickly. If not, we can help
              define the scope.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h2 className="text-lg font-semibold">Best Fit For</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>New builds + custom homes</li>
              <li>Kitchen &amp; bath remodels</li>
              <li>Builder packages</li>
              <li>Spec homes</li>
            </ul>
            <p className="mt-4 text-xs text-white/60">
              Serving Nashville + surrounding Middle Tennessee.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Cabinet Quote
          </button>

          <Link
            href="/#services"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            View Services
          </Link>

          <a
            href="https://dezeniocabinetry.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Visit Dezenio Cabinetry
          </a>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
