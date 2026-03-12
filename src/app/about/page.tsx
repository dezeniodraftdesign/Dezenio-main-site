"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function AboutPage() {
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
      founder: { "@type": "Person", name: "Pime Hernandez" },
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
      description:
        "Cabinetry-first execution with permit-ready construction documents serving Nashville and surrounding Middle Tennessee.",
    }),
    [],
  );

  return (
    <div
      id="top"
      className="relative min-h-[100dvh] text-white pb-[calc(var(--bottom-band-height,52px)+240px)]"
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
          className="object-cover"
          // Dial stitch slice as needed for About
          style={{ objectPosition: "50% 1.7%" }}
        />

        {/* Luxe scrim — readable, not heavy */}
        <div className="absolute inset-0 bg-black/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/14 to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.10)_45%,rgba(0,0,0,0.00)_72%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
        {/* PAGE ID (make it obviously “About”) */}
        <section className="max-w-4xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
            About
          </p>
          <p className="mt-2 text-[12px] font-medium tracking-wide text-white/60">
            Dezenio Draft Design • Nashville, TN
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02] drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
            Cabinetry-first.
            <br />
            Plans when you need them.
          </h1>

          {/* WHO WE ARE / WHAT WE DO (strong + non-AI) */}
          <div className="mt-7 space-y-4">
            <p className="text-white/88 md:text-lg leading-7 drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)]">
              Dezenio is a cabinetry-first studio built around execution. We
              help homeowners and builders make the key decisions early—layout,
              appliance planning, trim, and hardware—then carry those decisions
              through ordering and installation so the finished result matches
              the intent.
            </p>

            <p className="text-white/84 md:text-lg leading-7">
              When scope requires it, we also produce permit-ready construction
              documents—clean, buildable drawings that reduce field confusion.
            </p>

            <p className="text-white/80 md:text-lg leading-7">
              <span className="font-semibold text-white/90">Standard:</span> If
              it won’t install clean, we don’t design it that way.
            </p>
          </div>

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

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/12" />

        {/* WHAT WE DO (editorial columns, no cards) */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
            What we do
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Cabinetry packages
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-6">
                Design support, quoting, ordering coordination, delivery
                planning, and professional installation—built for clean
                timelines and fewer surprises.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/75 list-disc pl-5">
                <li>Appliance planning + panels</li>
                <li>Trim, fillers, moldings, and hardware</li>
                <li>Builder coordination + punch support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Construction documents
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-6">
                Permit-ready plan sets for remodel/addition scope—clear,
                buildable drawings that help approvals and reduce field
                confusion.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/75 list-disc pl-5">
                <li>As-builts (when needed)</li>
                <li>Floor plans, elevations, sections, details</li>
                <li>Site planning + basic coordination</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Service area</h3>
              <p className="mt-2 text-sm text-white/80 leading-6">
                Nashville + surrounding Middle Tennessee—Franklin, Brentwood,
                Nolensville, Smyrna, Murfreesboro, Mount Juliet, Hendersonville.
              </p>
              <p className="mt-3 text-sm text-white/70 leading-6">
                Remote quoting available when plans + selections are clear.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/12" />

        {/* MEET THE OWNER (simple, real, premium) */}
        <section className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Meet the owner
            </h2>

            <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-white">
              Pime Hernandez
            </h3>

            <p className="mt-3 text-sm md:text-base text-white/82 leading-7">
              Pime leads Dezenio with a cabinetry-first standard: design
              decisions that install clean. After relocating to Middle Tennessee
              in 2013, he spent years building deep local experience in kitchen
              + bath design and cabinetry execution—learning how projects move
              here, how jobsites behave, and what it takes to deliver
              consistently.
            </p>

            <p className="mt-4 text-sm md:text-base text-white/82 leading-7">
              Dezenio is owner-led and hands-on—built for clear specs, real
              timelines, and accountable delivery.
            </p>
          </div>

          <div className="rounded-2xl bg-black/14 ring-1 ring-white/10 backdrop-blur-xl p-6">
            <h4 className="text-sm font-semibold text-white/90">
              What clients notice
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/78 list-disc pl-5">
              <li>Fast, accurate takeoffs from plans</li>
              <li>Appliance panels + trim/hardware dialed in</li>
              <li>Clear communication and real timelines</li>
              <li>Execution that matches the design intent</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Start a Project
              </button>
              <Link
                href="/cabinetry"
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                View Cabinetry
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/12" />

        {/* PROCESS + LINES (editorial, no card wall) */}
        <section className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Our process
            </h2>

            <ol className="mt-4 space-y-3 text-sm md:text-base text-white/82 list-decimal pl-5">
              <li>
                <span className="font-semibold text-white/92">Discovery:</span>{" "}
                goals, budget band, timeline, site conditions.
              </li>
              <li>
                <span className="font-semibold text-white/92">
                  Design + Specs:
                </span>{" "}
                layout, selections, appliance planning, trim/hardware.
              </li>
              <li>
                <span className="font-semibold text-white/92">
                  Quote + Order:
                </span>{" "}
                confirm scope, lead times, place order.
              </li>
              <li>
                <span className="font-semibold text-white/92">
                  Delivery + Install:
                </span>{" "}
                coordinate, stage, install, punch.
              </li>
              <li>
                <span className="font-semibold text-white/92">
                  Docs (if needed):
                </span>{" "}
                permit-ready plans for remodel/addition scope.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Cabinetry lines
            </h2>

            <p className="mt-4 text-sm md:text-base text-white/82 leading-7">
              We’ll guide you to the right line based on budget, lead time, and
              finish needs.
            </p>

            <ul className="mt-4 space-y-2 text-sm md:text-base text-white/82 list-disc pl-5">
              <li>
                <span className="font-semibold text-white/92">
                  Kith Kitchens
                </span>{" "}
                (primary)
              </li>
              <li>
                <span className="font-semibold text-white/92">Mouser</span>{" "}
                (premium / custom)
              </li>
              <li>
                <span className="font-semibold text-white/92">ProCraft</span>{" "}
                (quick-ship options)
              </li>
              <li>
                <span className="font-semibold text-white/92">Bishop</span>
              </li>
              <li>
                <span className="font-semibold text-white/92">Adornus</span>{" "}
                (available on request)
              </li>
            </ul>

            <p className="mt-4 text-sm text-white/70">
              Hardware + storage: Richelieu and Rev-A-Shelf.
            </p>
          </div>
        </section>

        {/* Bottom CTA band (simple + not conflicting) */}
        <section className="mt-12 rounded-2xl bg-black/12 ring-1 ring-white/10 backdrop-blur-xl p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Ready to price a project?
              </h3>
              <p className="mt-1 text-sm text-white/75">
                Fast quotes when plans are clear. We’ll help define scope when
                they aren’t.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Get a Quote
              </button>
              <Link
                href="/cabinetry"
                className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Cabinetry
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
