/* FILE: src/app/cabinetry/page.tsx */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";
import BrochureShelf from "../components/BrochureShelf";
import { getAllBrands } from "./brand-data";

export default function CabinetryPage() {
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

  const brands = useMemo(
    () =>
      getAllBrands().filter((brand) =>
        ["kith", "mouser", "bishop", "procraft", "adornus"].includes(
          brand.slug,
        ),
      ),
    [],
  );

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
          style={{ objectPosition: "50% 99.3%" }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Cabinetry
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
          Cabinetry Design &amp; Installation
        </h1>

        <p className="mt-5 max-w-3xl text-white/85 md:text-lg leading-7">
          Cabinetry-first delivery, built around accurate specs and clean
          execution. We handle design support, quoting, ordering coordination,
          delivery planning, and professional installation across Nashville and
          Middle Tennessee.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Cabinetry Quote
          </button>

          <a
            href="#brands"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            View Cabinet Lines
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Lines we offer</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>
                <span className="font-semibold text-white/90">
                  Kith Kitchens
                </span>{" "}
                (primary)
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Mouser Cabinetry
                </span>{" "}
                (premium / custom)
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  ProCraft Cabinetry
                </span>{" "}
                (quick-ship options)
              </li>
              <li>
                <span className="font-semibold text-white/90">
                  Bishop Cabinets
                </span>
              </li>
              <li>
                <span className="font-semibold text-white/90">Adornus</span>{" "}
                (available on request)
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/60">
              Hardware &amp; storage: Richelieu and Rev-A-Shelf.
            </p>
          </section>

          <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">What’s included</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Design support + layout refinement</li>
              <li>Appliance planning, panels, fillers, trim, moldings</li>
              <li>Hardware + accessory planning (pullouts, storage, etc.)</li>
              <li>Accurate quoting with clear scope + options</li>
              <li>Ordering coordination + delivery planning</li>
              <li>Professional installation + punch support</li>
            </ul>
          </section>
        </div>

        <section className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">Best fit for</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white/90">Homeowners</p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                Kitchens, baths, built-ins, and remodel scopes where you want a
                clean process and a finished result that matches the plan.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Builders</p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                Fast takeoffs, accurate specs, and reliable coordination to keep
                schedules moving.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">
                Remodel / Additions
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                When cabinetry and construction docs need to speak the same
                language for fewer surprises in the field.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">
            Cabinet Construction Options
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white/90">
                Framed Cabinetry
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                Traditional cabinet construction where doors attach to a face
                frame, offering durability and classic styling.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">
                Frameless Cabinetry
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                European-style construction without a face frame, providing
                greater interior access and a cleaner modern aesthetic.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">
                Inset Cabinetry
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                Doors sit flush inside the cabinet frame for a refined,
                furniture-style appearance. Available through select cabinet
                manufacturers.
              </p>
            </div>
          </div>
        </section>

        <section id="brands" className="mt-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Cabinet lines
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Brands &amp; brochure resources
          </h2>
          <p className="mt-4 max-w-3xl text-white/80 leading-7">
            Browse brochures, literature, and brand information for the cabinet
            lines we represent.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8">
            {brands.map((brand) => {
              const brochures =
                brand.brochures?.map((b) => ({
                  label: b.title,
                  url: b.url,
                  openUrl: b.url,
                  mode: "viewer" as const,
                })) ?? [];

              return (
                <section
                  key={brand.slug}
                  id={brand.slug}
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_.85fr]">
                    <div>
                      <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                        {brand.badge}
                      </div>

                      <h3 className="mt-4 text-2xl font-bold tracking-tight">
                        {brand.name}
                      </h3>

                      <p className="mt-3 max-w-3xl text-white/80 leading-7">
                        {brand.tagline}
                      </p>

                      <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/80 sm:grid-cols-2">
                        {brand.highlights.map((item) => (
                          <li key={item} className="leading-6">
                            • {item}
                          </li>
                        ))}
                      </ul>

                      {brand.manufacturerUrl ? (
                        <div className="mt-6">
                          <a
                            href={brand.manufacturerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                          >
                            Visit Manufacturer
                          </a>
                        </div>
                      ) : null}

                      <BrochureShelf brochures={brochures} />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                        At a glance
                      </p>

                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                            Lead time
                          </p>
                          <p className="mt-1 text-base font-semibold text-white/95">
                            {brand.atAGlance.leadTime}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                            Construction
                          </p>
                          <p className="mt-1 text-base font-semibold text-white/95">
                            {brand.atAGlance.construction}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                            Style coverage
                          </p>
                          <p className="mt-1 text-base font-semibold text-white/95">
                            {brand.atAGlance.styleCoverage}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                            Price tier
                          </p>
                          <p className="mt-1 text-base font-semibold text-white/95">
                            {brand.atAGlance.priceTier}
                          </p>
                        </div>

                        {brand.atAGlance.note ? (
                          <p className="pt-2 text-xs leading-5 text-white/55">
                            {brand.atAGlance.note}
                          </p>
                        ) : null}

                        {!brochures.length && (
                          <p className="pt-2 text-xs leading-5 text-white/55">
                            Brochure links can be added here later for this
                            brand.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">
            Typical Kitchen Cabinetry Investment
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
            <li>Small kitchen projects: $15,000 – $25,000</li>
            <li>Mid-size kitchens: $25,000 – $50,000</li>
            <li>Large custom kitchens: $50,000 – $120,000+</li>
          </ul>
          <p className="mt-4 text-xs text-white/60">
            Final pricing depends on cabinet line, finishes, layout complexity,
            and installation requirements.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setQuoteOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Cabinetry Quote
          </button>

          <Link
            href="/services"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Back to Services
          </Link>

          <Link
            href="/referrals"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Referral Program
          </Link>
        </div>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
