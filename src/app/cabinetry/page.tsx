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

const brandLogos: Record<string, string> = {
  kith: "/logos/kith-logo.webp",
  mouser: "/logos/mouser-logo.webp",
  bishop: "/logos/bishop-logo.png",
  procraft: "/logos/procraft-logo.webp",
  adornus: "/logos/adornus-logo.webp",
  richelieu: "/logos/richelieu-logo.png",
};

const constructionOverrides: Record<string, string> = {
  mouser: "Inset · Framed · Frameless",
  bishop: "Inset · Framed · Frameless",
  kith: "Framed · Frameless",
  adornus: "Framed · Frameless",
  procraft: "Framed · Frameless",
};

const extraNotes: Record<string, string> = {
  procraft:
    "Quick-ship / RTA program. Available assembled or flat-pack depending on program and schedule needs. We typically prefer factory assembly for warranty, consistency, and smoother production logistics, but field assembly can be coordinated when needed to help accelerate a project.",
  adornus:
    "Quick-ship / RTA option with practical selections and flexible fulfillment. Available assembled or unassembled depending on program and timing. We generally prefer factory-built delivery for warranty and product-flow logistics, but can coordinate assembled or non-assembled options as needed.",
};

const glassCardClass =
  "rounded-[28px] border border-white/10 bg-[rgba(6,6,8,0.62)] p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.40)]";

const glassInsetClass =
  "rounded-[24px] border border-white/10 bg-[rgba(0,0,0,0.68)] p-6 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.34)]";

const brandCardClass =
  "rounded-[30px] border border-white/10 bg-[rgba(6,6,8,0.74)] p-6 md:p-8 backdrop-blur-xl shadow-[0_22px_80px_rgba(0,0,0,0.46)]";

const atGlanceClass =
  "rounded-[28px] border border-white/10 bg-[rgba(0,0,0,0.88)] p-6 md:p-8 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.52)]";

function getLogoImageClass(slug: string) {
  switch (slug) {
    case "kith":
      return "max-h-[56px] max-w-[292px]";
    case "mouser":
      return "max-h-[58px] max-w-[250px]";
    case "bishop":
      return "max-h-[44px] max-w-[270px] scale-[1.45] origin-left";
    case "procraft":
      return "max-h-[42px] max-w-[250px] scale-[1.55] origin-left";
    case "adornus":
      return "max-h-[58px] max-w-[286px]";
    case "richelieu":
      return "max-h-[46px] max-w-[230px] scale-[1.12] origin-left";
    default:
      return "max-h-[54px] max-w-[280px]";
  }
}

function LogoStage({ slug, name }: { slug: string; name: string }) {
  const logo = brandLogos[slug];
  if (!logo) return null;

  return (
    <div className="mt-4 mb-5">
      <div className="flex h-[98px] w-[320px] max-w-full items-center rounded-[20px] bg-white px-7 shadow-[0_12px_34px_rgba(0,0,0,0.20)]">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={520}
          height={140}
          className={`h-auto w-auto object-contain object-left ${getLogoImageClass(
            slug,
          )}`}
          unoptimized
        />
      </div>
    </div>
  );
}

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
        <div className="absolute inset-0 bg-black/72" />
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
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Get a Cabinetry Quote
          </button>

          <a
            href="#brands"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Cabinet Lines
          </a>

          <Link
            href="/referrals"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Referral Program
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className={glassCardClass}>
            <h2 className="text-lg font-bold">Lines we offer</h2>
            <ul className="mt-4 space-y-2 text-white/88">
              <li>• Kith Kitchens (primary)</li>
              <li>• Mouser Cabinetry (premium / custom)</li>
              <li>• ProCraft Cabinetry (quick-ship / RTA)</li>
              <li>• Bishop Cabinets</li>
              <li>• Adornus (quick-ship / RTA)</li>
            </ul>
            <p className="mt-5 text-sm text-white/70">
              Hardware &amp; storage support: Richelieu and Rev-A-Shelf.
            </p>
          </section>

          <section className={glassCardClass}>
            <h2 className="text-lg font-bold">What’s included</h2>
            <ul className="mt-4 space-y-2 text-white/88">
              <li>• Design support + layout refinement</li>
              <li>• Appliance planning, panels, fillers, trim, moldings</li>
              <li>• Hardware + accessory planning (pullouts, storage, etc.)</li>
              <li>• Accurate quoting with clear scope + options</li>
              <li>• Ordering coordination + delivery planning</li>
              <li>• Professional installation + punch support</li>
            </ul>
          </section>
        </div>

        <section className={`mt-8 ${glassCardClass}`}>
          <h2 className="text-lg font-bold">Best fit for</h2>

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-white">Homeowners</h3>
              <p className="mt-2 text-white/78 leading-7">
                Kitchens, baths, built-ins, and remodel scopes where you want a
                clean process and a finished result that matches the plan.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Builders</h3>
              <p className="mt-2 text-white/78 leading-7">
                Fast takeoffs, accurate specs, and reliable coordination to keep
                schedules moving.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Remodel / Additions</h3>
              <p className="mt-2 text-white/78 leading-7">
                When cabinetry and construction docs need to speak the same
                language for fewer surprises in the field.
              </p>
            </div>
          </div>
        </section>

        <section className={`mt-8 ${glassCardClass}`}>
          <h2 className="text-lg font-bold">Cabinet Construction Options</h2>

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-white">Framed Cabinetry</h3>
              <p className="mt-2 text-white/78 leading-7">
                Traditional cabinet construction where doors attach to a face
                frame, offering durability and classic styling.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Frameless Cabinetry</h3>
              <p className="mt-2 text-white/78 leading-7">
                European-style construction without a face frame, providing
                greater interior access and a cleaner modern aesthetic.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Inset Cabinetry</h3>
              <p className="mt-2 text-white/78 leading-7">
                Doors sit flush inside the cabinet frame for a refined,
                furniture-style appearance. Available through select cabinet
                manufacturers.
              </p>
            </div>
          </div>
        </section>

        <section id="brands" className="mt-10">
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
              const brochureItems =
                brand.brochures?.map((brochure) => ({
                  label: brochure.title,
                  url: brochure.url,
                  openUrl: brochure.url,
                  mode: "viewer" as const,
                })) ?? [];

              const displayConstruction =
                constructionOverrides[brand.slug] ??
                brand.atAGlance.construction;

              return (
                <section
                  key={brand.slug}
                  id={brand.slug}
                  className={brandCardClass}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_.85fr]">
                    <div>
                      <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                        {brand.badge}
                      </div>

                      <LogoStage slug={brand.slug} name={brand.name} />

                      <h3 className="text-2xl font-bold tracking-tight">
                        {brand.name}
                      </h3>

                      <p className="mt-3 max-w-3xl text-white/82 leading-7">
                        {brand.tagline}
                      </p>

                      <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/82 sm:grid-cols-2">
                        {brand.highlights.map((item) => (
                          <li key={item} className="leading-6">
                            • {item}
                          </li>
                        ))}
                      </ul>

                      {extraNotes[brand.slug] ? (
                        <div className={`mt-5 ${glassInsetClass}`}>
                          <p className="text-sm leading-6 text-white/78">
                            {extraNotes[brand.slug]}
                          </p>
                        </div>
                      ) : null}

                      {brand.manufacturerUrl ? (
                        <div className="mt-5">
                          <a
                            href={brand.manufacturerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                          >
                            Visit Manufacturer
                          </a>
                        </div>
                      ) : null}

                      {brochureItems.length > 0 ? (
                        <div className="mt-6">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                            Brochures
                          </p>
                          <p className="mt-2 text-sm text-white/75">
                            View online resources
                          </p>

                          <div className="mt-4">
                            <BrochureShelf brochures={brochureItems} />
                          </div>
                        </div>
                      ) : (
                        <p className="mt-6 text-xs leading-5 text-white/55">
                          Brochure links can be added here later for this brand.
                        </p>
                      )}
                    </div>

                    <div className={atGlanceClass}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                        At a glance
                      </p>

                      <dl className="mt-5 space-y-5">
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                            Lead time
                          </dt>
                          <dd className="mt-1 text-xl font-bold text-white/95">
                            {brand.atAGlance.leadTime}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                            Construction
                          </dt>
                          <dd className="mt-1 text-lg font-semibold text-white/92">
                            {displayConstruction}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                            Style coverage
                          </dt>
                          <dd className="mt-1 text-lg font-semibold text-white/92">
                            {brand.atAGlance.styleCoverage}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                            Price tier
                          </dt>
                          <dd className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                            {brand.atAGlance.priceTier}
                          </dd>
                        </div>
                      </dl>

                      {brand.atAGlance.note ? (
                        <p className="mt-6 text-xs leading-5 text-white/58">
                          {brand.atAGlance.note}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className={`mt-10 ${brandCardClass}`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                Hardware + accessories
              </div>

              <LogoStage slug="richelieu" name="Richelieu" />

              <h3 className="text-2xl font-bold tracking-tight">
                Richelieu Hardware &amp; Storage
              </h3>

              <p className="mt-3 max-w-3xl text-white/82 leading-7">
                Decorative hardware, organizational accessories, pull-outs,
                specialty storage, and functional finishing pieces that help tie
                the cabinetry package together cleanly.
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/82 sm:grid-cols-2">
                <li>• Decorative hardware selections</li>
                <li>• Pull-outs and storage accessories</li>
                <li>• Interior organization options</li>
                <li>• Finish-driven final detailing support</li>
              </ul>
            </div>

            <div className={atGlanceClass}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                How it fits in
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-white/82">
                <p>
                  Richelieu is part of how we round out cabinetry scope beyond
                  the boxes and doors — especially when a project needs better
                  storage planning, cleaner functionality, and stronger finish
                  coordination.
                </p>
                <p>
                  Hardware and accessory planning can be folded into the cabinet
                  design process so selections feel intentional from the start
                  instead of becoming an afterthought later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`mt-10 ${glassCardClass}`}>
          <h2 className="text-lg font-semibold">
            Typical Kitchen Cabinetry Investment
          </h2>

          <ul className="mt-4 space-y-2 text-sm text-white/82 list-disc pl-5">
            <li>Small kitchen projects: $15,000 – $25,000</li>
            <li>Mid-size kitchens: $25,000 – $50,000</li>
            <li>Large custom kitchens: $50,000 – $120,000+</li>
          </ul>

          <p className="mt-4 text-xs text-white/60">
            Final pricing depends on cabinet line, finishes, layout complexity,
            hardware selections, and installation requirements.
          </p>
        </section>

        <section className={`mt-10 ${glassCardClass}`}>
          <h2 className="text-lg font-semibold">How cabinetry design works</h2>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white/90">
                1. Budgetary quoting
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                We typically begin with a preliminary budgetary range based on
                the scope, measurements, and product level discussed.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white/90">
                2. Design retainer
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                For clients ready to move into active layout development,
                selections, and pricing refinement, a cabinetry design retainer
                may be required.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white/90">
                3. Credit with purchase
              </p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                The retainer is applied toward the cabinetry purchase when the
                project moves forward with Dezenio. If cabinetry is not
                purchased, the retainer is non-refundable.
              </p>
            </div>
          </div>

          <div className={`mt-6 ${glassInsetClass}`}>
            <p className="text-sm font-semibold text-white/90">
              Important note
            </p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              We offer design with cabinetry purchase — not unlimited free
              design work without project commitment. Retainers vary by project
              scope and complexity, and are structured to protect design time,
              technical development, and quoting accuracy.
            </p>
          </div>
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
