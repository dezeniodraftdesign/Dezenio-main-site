"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function AboutPage() {
  // ✅ Next.js 16 build requirement:
  // useSearchParams() must be inside a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <AboutInner />
    </Suspense>
  );
}

function AboutInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Dezenio Draft Design, Inc.",
      url: "https://dezeniodraftdesign.com/about",
      telephone: "+16154742004",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashville",
        addressRegion: "TN",
        addressCountry: "US",
      },
      areaServed: [
        "Nashville, TN",
        "Franklin, TN",
        "Brentwood, TN",
        "Nolensville, TN",
        "Smyrna, TN",
        "Murfreesboro, TN",
        "Mount Juliet, TN",
        "Hendersonville, TN",
      ],
      sameAs: [
        "https://www.facebook.com/dezeniodraftdesign",
        "https://www.instagram.com/dezeniodraftdesign",
        "https://www.tiktok.com/@dezenio.draft.design",
      ],
      description:
        "Design-led cabinetry dealer with permit-ready construction documents serving Nashville and surrounding Middle Tennessee.",
    }),
    [],
  );

  return (
    <div
      id="top"
      className="relative min-h-[100dvh] flex flex-col text-white pb-[var(--bottom-band-height,52px)]"
    >
      <ScrollOffsets />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_38%]"
        />

        {/* ✅ LUXE SCRIM (lighter + cleaner, no heavy vignette bar) */}
        <div className="absolute inset-0 bg-black/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/18 to-black/42" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.30)_60%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      {/* ✅ Give the hero breathing room so it never feels “cut off” */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16">
        {/* HERO */}
        <section className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            About Dezenio Draft Design
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
            Cabinetry-first.
            <br />
            Plans when you need them.
          </h1>

          <p className="mt-5 text-white/85 md:text-lg leading-7">
            Dezenio Draft Design is a Nashville-based design + documentation
            studio with a cabinetry division. We help homeowners and builders
            move from concept to clean execution — with factory-direct
            cabinetry, professional installation, and permit-ready construction
            documents when the scope requires it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setQuoteOpen(true)}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Get a Quote
            </button>

            <Link
              href="/services"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              View Services
            </Link>

            <Link
              href="/cabinetry"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Cabinetry
            </Link>
          </div>
        </section>

        {/* ✅ Cards: lighter glass, tighter, more premium */}
        <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white/6 ring-1 ring-white/12 p-6 backdrop-blur-xl">
            <h2 className="text-base font-semibold text-white">What we do</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Cabinetry design, quoting, ordering support, installation</li>
              <li>As-builts + site planning (when needed)</li>
              <li>
                Permit-ready construction documents for remodels/additions
              </li>
              <li>Builder-friendly coordination + clean deliverables</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/6 ring-1 ring-white/12 p-6 backdrop-blur-xl">
            <h2 className="text-base font-semibold text-white">Why it works</h2>
            <p className="mt-4 text-sm text-white/80 leading-6">
              Most teams are either design-only or install-only. We’re built for
              the in-between: design-led cabinetry with build-ready
              documentation — fewer surprises, cleaner timelines, better
              execution.
            </p>
            <p className="mt-4 text-xs text-white/60 leading-5">
              Make decisions once, document them cleanly, and carry them through
              install.
            </p>
          </div>

          <div className="rounded-2xl bg-white/6 ring-1 ring-white/12 p-6 backdrop-blur-xl">
            <h2 className="text-base font-semibold text-white">Service area</h2>
            <p className="mt-4 text-sm text-white/80 leading-6">
              Nashville + surrounding Middle Tennessee — Franklin, Brentwood,
              Nolensville, Smyrna, Murfreesboro, Mount Juliet, Hendersonville.
            </p>
            <p className="mt-4 text-xs text-white/60">
              Remote quoting available when plans + selections are clear.
            </p>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/6 ring-1 ring-white/12 p-6 backdrop-blur-xl">
            <h2 className="text-base font-semibold text-white">Our process</h2>
            <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal pl-5">
              <li>
                <span className="font-semibold text-white/90">Discovery:</span>{" "}
                goals, budget band, timeline, site conditions.
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Design + Specs:
                </span>{" "}
                layout, selections, appliance planning, trim/hardware.
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Quote + Order:
                </span>{" "}
                confirm scope, lead times, place order.
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Delivery + Install:
                </span>{" "}
                coordinate, stage, install, punch.
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Docs (if needed):
                </span>{" "}
                permit-ready plans for remodel/addition scope.
              </li>
            </ol>
          </div>

          <div className="rounded-2xl bg-white/6 ring-1 ring-white/12 p-6 backdrop-blur-xl">
            <h2 className="text-base font-semibold text-white">
              Cabinetry lines
            </h2>
            <p className="mt-4 text-sm text-white/80 leading-6">
              We’ll guide you to the right line based on budget, lead time, and
              finish needs.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>
                <span className="font-semibold text-white/90">
                  Kith Kitchens
                </span>{" "}
                (primary)
              </li>
              <li>
                <span className="font-semibold text-white/90">Mouser</span>{" "}
                (premium / custom)
              </li>
              <li>
                <span className="font-semibold text-white/90">ProCraft</span>{" "}
                (quick-ship options)
              </li>
              <li>
                <span className="font-semibold text-white/90">Bishop</span>
              </li>
              <li>
                <span className="font-semibold text-white/90">Adornus</span>{" "}
                (available on request)
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/60">
              Hardware + storage: Richelieu and Rev-A-Shelf.
            </p>
          </div>
        </section>
      </main>

      {/* ✅ Footer landing: short fade only (not a giant slab) */}
      <section aria-hidden className="relative">
        <div className="h-16 md:h-20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/70" />
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
