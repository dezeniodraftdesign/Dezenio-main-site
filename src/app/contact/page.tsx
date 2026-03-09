"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";
import QuoteModal from "../components/QuoteModal";

export default function ContactPage() {
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
          style={{ objectPosition: "50% 1.7%" }} // ✅ pick stitch frame here
        />
        {/* Darken BG for readability (no glass cards) */}
        <div className="absolute inset-0 bg-black/69" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Contact
          </p>

          <h1
            className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ textShadow: "0 10px 26px rgba(0,0,0,0.55)" }}
          >
            Let’s talk about your project.
          </h1>

          <p
            className="mt-4 text-white/85 md:text-lg leading-7"
            style={{ textShadow: "0 10px 26px rgba(0,0,0,0.55)" }}
          >
            Cabinetry-first execution with buildable planning and permit-ready
            documentation when you need it. Nashville + surrounding Middle
            Tennessee.
          </p>
        </div>

        {/* No glass card — just clean columns */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: contact */}
          <div className="max-w-md">
            <h2
              className="text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              Contact
            </h2>

            <div className="mt-4 space-y-3 text-sm text-white/90">
              <a
                className="block underline underline-offset-4 hover:text-white"
                href="tel:16154742004"
              >
                (615) 474-2004
              </a>

              <a
                className="block underline underline-offset-4 hover:text-white"
                href="mailto:info@dezeniodraftdesign.com"
              >
                info@dezeniodraftdesign.com
              </a>

              <div className="text-white/75">
                Nashville, Tennessee <span className="text-white/50">•</span>{" "}
                Remote quoting available when plans + selections are clear.
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Start a Project
              </button>

              <a
                href="/services"
                className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                View Services
              </a>
            </div>
          </div>

          {/* Right: service area + map (no card wrapper) */}
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              Service area
            </h2>

            <p
              className="mt-3 text-sm text-white/85 leading-7 max-w-xl"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.55)" }}
            >
              Nashville + surrounding Middle Tennessee — Franklin, Brentwood,
              Nolensville, Smyrna, Murfreesboro, Mount Juliet, Hendersonville,
              and nearby areas.
            </p>

            {/* Map: edge-to-edge feel, no glass ring */}
            <div className="mt-6 overflow-hidden rounded-2xl">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Nashville%2C%20TN&z=10&output=embed"
                className="h-[340px] w-full"
                loading="lazy"
              />
            </div>

            <p className="mt-4 text-xs text-white/60">
              For fastest turnaround: send plans (PDF), inspiration, and your
              desired timeline.
            </p>
          </div>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
