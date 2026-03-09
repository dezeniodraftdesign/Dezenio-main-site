"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";
import QuoteModal from "../components/QuoteModal";

export default function QuotePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      {/* Background (admin/utility style) */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 1.7%" }} // ✅ choose stitch frame here
        />
        <div className="absolute inset-0 bg-black/69" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Project Intake
          </p>

          <h1
            className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ textShadow: "0 10px 26px rgba(0,0,0,0.55)" }}
          >
            Get a quote.
          </h1>

          <p
            className="mt-4 text-white/85 md:text-lg leading-7"
            style={{ textShadow: "0 10px 26px rgba(0,0,0,0.55)" }}
          >
            Share your scope and we’ll respond with next steps — whether you
            need cabinetry, construction documents, or remodeling support.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => setQuoteOpen(true)}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Start Quote Intake
            </button>

            <a
              href="/services"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              View Services
            </a>

            <a
              href="/contact"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact Info
            </a>
          </div>
        </div>

        {/* Quote-specific content (no cards) */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              What to include
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/85 leading-7">
              <li>
                <span className="font-semibold text-white/90">
                  Project address
                </span>{" "}
                + city (or area).
              </li>
              <li>
                <span className="font-semibold text-white/90">Scope</span> —
                what you’re changing, adding, or replacing.
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Plans / inspiration
                </span>{" "}
                (PDFs, screenshots, photos) if you have them.
              </li>
              <li>
                <span className="font-semibold text-white/90">Timeline</span>{" "}
                and whether you’re in a rush.
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Budget range
                </span>{" "}
                (even a ballpark helps us guide options).
              </li>
            </ul>

            <p className="mt-6 text-xs text-white/60">
              Don’t worry if you don’t have everything — submit what you can and
              we’ll guide the next steps.
            </p>
          </div>

          <div>
            <h2
              className="text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              What happens next
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-white/85 leading-7 list-decimal pl-5">
              <li>We review your info and any attachments.</li>
              <li>
                We follow up with questions (if needed) to lock scope + timing.
              </li>
              <li>
                You get a clear quote / next-step plan based on your service
                type.
              </li>
            </ol>

            <div className="mt-8">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Open the Quote Form
              </button>
            </div>
          </div>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
