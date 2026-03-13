"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";
import BrochureShelf from "../components/BrochureShelf";
import { getAllBrands, type Brand } from "./brand-data";

const brandLogos: Record<string, string> = {
  kith: "/logos/kith-logo.webp",
  mouser: "/logos/mouser-logo.webp",
  bishop: "/logos/bishop-logo.png",
  procraft: "/logos/procraft-logo.webp",
  adornus: "/logos/adornus-logo.webp",
  richelieu: "/logos/richelieu-logo.png",
};

const brandSectionIds: Record<string, string> = {
  kith: "kith-kitchens",
  mouser: "mouser-cabinetry",
  procraft: "procraft-cabinetry",
  bishop: "bishop-cabinets",
  adornus: "adornus",
  richelieu: "richelieu-hardware",
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
    "Quick-ship / RTA program. Available assembled or flat-pack depending on program and schedule needs. We typically prefer factory assembly for warranty, consistency, and smoother production logistics, but field assembly can be coordinated when needed.",
  adornus:
    "Quick-ship / RTA option with practical selections and flexible fulfillment. Available assembled or unassembled depending on program and timing. We generally prefer factory-built delivery for warranty and product-flow logistics, but can coordinate assembled or non-assembled options as needed.",
};

const panelClass =
  "rounded-[28px] border border-white/12 bg-[rgba(30,32,38,0.28)] p-6 md:p-8 backdrop-blur-md shadow-[0_18px_48px_rgba(0,0,0,0.14)]";

const softPanelClass =
  "rounded-[22px] border border-white/10 bg-[rgba(24,26,32,0.22)] p-5 md:p-6 backdrop-blur-sm shadow-[0_12px_28px_rgba(0,0,0,0.10)]";

type BrochureItem = {
  label: string;
  url: string;
  openUrl: string;
  mode: "viewer";
};

function getLogoImageClass(slug: string) {
  switch (slug) {
    case "kith":
      return "max-h-[56px] max-w-[270px]";
    case "mouser":
      return "max-h-[58px] max-w-[215px]";
    case "bishop":
      return "max-h-[34px] max-w-[190px]";
    case "procraft":
      return "max-h-[30px] max-w-[170px]";
    case "adornus":
      return "max-h-[58px] max-w-[250px]";
    case "richelieu":
      return "max-h-[34px] max-w-[175px]";
    default:
      return "max-h-[48px] max-w-[240px]";
  }
}

function getLogoStageClass(slug: string) {
  switch (slug) {
    case "mouser":
      return "bg-black/55 border-white/14";
    case "adornus":
      return "bg-white/[0.12] border-black/20";
    case "kith":
      return "bg-white/[0.10] border-white/18";
    case "bishop":
      return "bg-white/[0.08] border-white/16";
    case "procraft":
      return "bg-white/[0.09] border-white/16";
    case "richelieu":
      return "bg-white/[0.09] border-white/16";
    default:
      return "bg-white/[0.08] border-white/16";
  }
}

function getLogoGlowClass(slug: string) {
  switch (slug) {
    case "mouser":
      return "drop-shadow-[0_0_16px_rgba(255,255,255,0.18)]";
    case "kith":
      return "drop-shadow-[0_0_10px_rgba(255,255,255,0.10)]";
    case "bishop":
      return "drop-shadow-[0_0_10px_rgba(255,210,90,0.10)]";
    case "procraft":
      return "drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]";
    case "adornus":
      return "drop-shadow-[0_0_10px_rgba(0,0,0,0.22)]";
    case "richelieu":
      return "drop-shadow-[0_0_10px_rgba(255,80,80,0.10)]";
    default:
      return "";
  }
}

function getLogoWrapClass(slug: string) {
  switch (slug) {
    case "mouser":
    case "kith":
      return "px-7 py-5";
    case "bishop":
    case "procraft":
    case "richelieu":
      return "px-6 py-5";
    case "adornus":
      return "px-7 py-4";
    default:
      return "px-7 py-5";
  }
}

function LogoStage({ slug, name }: { slug: string; name: string }) {
  const logo = brandLogos[slug];
  if (!logo) return null;

  return (
    <div
      className={`inline-flex min-h-[92px] w-full max-w-[300px] items-center rounded-[20px] border ${getLogoStageClass(
        slug,
      )} ${getLogoWrapClass(slug)}`}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={520}
        height={160}
        className={`h-auto w-auto object-contain object-left ${getLogoImageClass(
          slug,
        )} ${getLogoGlowClass(slug)}`}
        unoptimized
      />
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

  const brands = useMemo<Brand[]>(
    () =>
      getAllBrands().filter((brand) =>
        ["kith", "mouser", "bishop", "procraft", "adornus"].includes(
          brand.slug,
        ),
      ),
    [],
  );

  const primaryBrands = brands.filter((brand) =>
    ["kith", "mouser", "procraft"].includes(brand.slug),
  );

  const supportBrands = brands.filter((brand) =>
    ["bishop", "adornus"].includes(brand.slug),
  );

  return (
    <div
      id="top"
      className="relative pb-[calc(var(--bottom-band-height,64px)+140px)] text-white"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio cabinetry background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
        <div className="absolute inset-0 bg-black/24" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.06)_22%,rgba(0,0,0,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <section className="max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/72">
            Cabinetry division
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight leading-tight md:text-6xl">
            Cabinetry Sales, Design &amp; Installation
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-7 text-white/86 md:text-lg">
            Factory-direct cabinetry access with design guidance, line
            selection, layout support, ordering coordination, delivery planning,
            and professional installation across Nashville and Middle Tennessee.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setQuoteOpen(true)}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get a Cabinetry Quote
            </button>

            <a
              href="#cabinet-lines"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Cabinet Lines
            </a>

            <Link
              href="/services"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to Services
            </Link>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className={panelClass}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
              What we handle
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight leading-tight md:text-3xl">
              Cabinetry-first support with real project coordination
            </h2>

            <p className="mt-4 leading-7 text-white/82">
              We help clients move from product selection into a cleaner,
              buildable result — whether that means a simple cabinetry package,
              a full kitchen remodel, or cabinet planning that needs to stay
              aligned with the broader project.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className={softPanelClass}>
                <h3 className="text-lg font-bold">Lines we offer</h3>
                <ul className="mt-4 space-y-2 leading-7 text-white/84">
                  <li>• Kith Kitchens</li>
                  <li>• Mouser Cabinetry</li>
                  <li>• ProCraft Cabinetry</li>
                  <li>• Bishop Cabinets</li>
                  <li>• Adornus</li>
                </ul>
                <p className="mt-4 text-sm leading-6 text-white/72">
                  Hardware &amp; storage support: Richelieu and Rev-A-Shelf.
                </p>
              </div>

              <div className={softPanelClass}>
                <h3 className="text-lg font-bold">What’s included</h3>
                <ul className="mt-4 space-y-2 leading-7 text-white/84">
                  <li>• Design support + layout refinement</li>
                  <li>• Appliance planning, fillers, trim, moldings</li>
                  <li>• Hardware + accessory planning</li>
                  <li>• Accurate quoting with clear scope + options</li>
                  <li>• Ordering coordination + delivery planning</li>
                  <li>• Professional installation + punch support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
              Best fit for
            </p>

            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-bold">Homeowners</h3>
                <p className="mt-2 leading-7 text-white/80">
                  Kitchens, baths, built-ins, and remodel scopes where you want
                  clean guidance and a finished result that matches the plan.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Builders</h3>
                <p className="mt-2 leading-7 text-white/80">
                  Fast takeoffs, accurate specs, and reliable coordination to
                  keep schedules moving.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Remodel / Additions</h3>
                <p className="mt-2 leading-7 text-white/80">
                  Projects where cabinetry and construction documentation need
                  to stay aligned for fewer surprises in the field.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Process + investment
            </p>
            <h2 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight leading-tight md:text-4xl">
              Clear quoting first, deeper design when the project is ready
            </h2>
          </div>

          <p className="max-w-xl leading-7 text-white/78 lg:ml-auto lg:text-right">
            Cabinetry planning can begin with budgetary guidance, then move into
            design development and final ordering once selections and scope are
            ready to tighten up.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className={panelClass}>
            <h2 className="text-xl font-bold">How cabinetry design works</h2>

            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <p className="text-base font-semibold text-white/92">
                  1. Budgetary quoting
                </p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  We typically begin with a preliminary budgetary range based on
                  scope, measurements, and product level.
                </p>
              </div>

              <div>
                <p className="text-base font-semibold text-white/92">
                  2. Design retainer
                </p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  When a client is ready to move into active layout development,
                  selections, and pricing refinement, a design retainer may be
                  required.
                </p>
              </div>

              <div>
                <p className="text-base font-semibold text-white/92">
                  3. Credit with purchase
                </p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  The retainer is applied toward the cabinetry purchase when the
                  project moves forward with Dezenio.
                </p>
              </div>
            </div>

            <div className={`mt-6 ${softPanelClass}`}>
              <p className="text-sm font-semibold text-white/90">
                Important note
              </p>
              <p className="mt-2 text-sm leading-6 text-white/78">
                We offer design with cabinetry purchase — not unlimited free
                design work without project commitment. Retainers vary by
                project scope and help protect design time, technical
                development, and quoting accuracy.
              </p>
            </div>
          </div>

          <div className={panelClass}>
            <h2 className="text-xl font-bold">
              Typical kitchen cabinetry investment
            </h2>

            <ul className="mt-5 space-y-2 leading-7 text-white/84">
              <li>• Small kitchen projects: $15,000 – $25,000</li>
              <li>• Mid-size kitchens: $25,000 – $50,000</li>
              <li>• Large custom kitchens: $50,000 – $120,000+</li>
            </ul>

            <p className="mt-5 text-sm leading-6 text-white/72">
              Final pricing depends on cabinet line, finishes, layout
              complexity, hardware selections, delivery planning, and
              installation requirements.
            </p>

            <div className={`mt-6 ${softPanelClass}`}>
              <h3 className="text-lg font-bold">Hardware + accessories</h3>
              <p className="mt-3 leading-7 text-white/80">
                Hardware and storage planning can be folded into the cabinet
                design process so selections feel intentional from the start.
              </p>

              <div className="mt-4">
                <a
                  href={`#${brandSectionIds.richelieu}`}
                  className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Richelieu
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="cabinet-lines" className="mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Featured cabinet lines
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight leading-tight md:text-4xl">
                Cabinet lines that match the pace and finish level of the job
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-white/78 lg:ml-auto lg:text-right">
              Browse the lines we represent, compare style coverage and lead
              times, and open brochure resources without turning the whole page
              into a parts catalog.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {primaryBrands.map((brand) => (
              <BrandRow key={brand.slug} brand={brand} />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {supportBrands.map((brand) => (
              <CompactBrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>

        <section id={brandSectionIds.richelieu} className="mt-16">
          <div className={panelClass}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_.92fr]">
              <div>
                <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Hardware + accessories
                </div>

                <div className="mt-4">
                  <LogoStage slug="richelieu" name="Richelieu" />
                </div>

                <h3 className="mt-5 text-[2rem] font-extrabold tracking-tight leading-tight">
                  Richelieu Hardware &amp; Storage
                </h3>

                <p className="mt-3 leading-7 text-white/84">
                  Decorative hardware, organizational accessories, pull-outs,
                  specialty storage, and finishing pieces that help tie the
                  cabinetry package together cleanly.
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/82 sm:grid-cols-2">
                  <li>• Decorative hardware selections</li>
                  <li>• Pull-outs and storage accessories</li>
                  <li>• Interior organization options</li>
                  <li>• Finish-driven final detailing support</li>
                </ul>

                <div className="mt-5">
                  <a
                    href="https://www.richelieu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Visit manufacturer
                  </a>
                </div>
              </div>

              <aside className={softPanelClass}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">
                  How it fits in
                </p>

                <div className="mt-5 space-y-4 text-sm leading-7 text-white/84">
                  <p>
                    Richelieu helps round out cabinetry scope beyond the boxes
                    and doors — especially when a project needs better storage
                    planning, cleaner functionality, and stronger finish
                    coordination.
                  </p>
                  <p>
                    Hardware and accessory planning can be folded into the
                    cabinet design process so selections feel intentional from
                    the start instead of becoming an afterthought later.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="rounded-[30px] border border-white/12 bg-[rgba(30,32,38,0.30)] px-6 py-8 text-center backdrop-blur-md shadow-[0_18px_42px_rgba(0,0,0,0.14)] md:px-10 md:py-10">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">
              Need help sorting through the right cabinet line?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-white/80">
              Whether the project needs speed, deeper customization, cleaner
              finish coordination, or a cabinetry package that works alongside
              broader design and documentation support, we can help point you in
              the right direction.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Get a Cabinetry Quote
              </button>

              <Link
                href="/services"
                className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}

function BrandRow({ brand }: { brand: Brand }) {
  const brochures: BrochureItem[] =
    brand.brochures?.map((brochure) => ({
      label: brochure.title,
      url: brochure.url,
      openUrl: brochure.url,
      mode: "viewer",
    })) ?? [];

  const sectionId = brandSectionIds[brand.slug] ?? brand.slug;
  const displayConstruction =
    constructionOverrides[brand.slug] ?? brand.atAGlance.construction;

  return (
    <section
      id={sectionId}
      className="rounded-[28px] border border-white/12 bg-[rgba(30,32,38,0.28)] p-6 backdrop-blur-md shadow-[0_18px_42px_rgba(0,0,0,0.14)] md:p-7"
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr_320px]">
        <div>
          <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
            {brand.badge}
          </div>

          <div className="mt-4">
            <LogoStage slug={brand.slug} name={brand.name} />
          </div>
        </div>

        <div>
          <h3 className="text-[2rem] font-extrabold tracking-tight leading-tight">
            {brand.name}
          </h3>

          <p className="mt-3 leading-7 text-white/84">{brand.tagline}</p>

          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/82 sm:grid-cols-2">
            {brand.highlights.slice(0, 4).map((item) => (
              <li key={item} className="leading-6">
                • {item}
              </li>
            ))}
          </ul>

          {extraNotes[brand.slug] ? (
            <div className="mt-5 rounded-[18px] border border-white/10 bg-black/16 p-4">
              <p className="text-sm leading-6 text-white/74">
                {extraNotes[brand.slug]}
              </p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            {brand.manufacturerUrl ? (
              <a
                href={brand.manufacturerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Visit manufacturer
              </a>
            ) : null}
          </div>
        </div>

        <aside className={softPanelClass}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">
            At a glance
          </p>

          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
                Lead time
              </p>
              <p className="mt-1 font-semibold text-white/92">
                {brand.atAGlance.leadTime}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
                Price tier
              </p>
              <p className="mt-1 font-semibold text-white/92">
                {brand.atAGlance.priceTier}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
                Construction
              </p>
              <p className="mt-1 font-semibold text-white/92">
                {displayConstruction}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
                Style coverage
              </p>
              <p className="mt-1 font-semibold text-white/92">
                {brand.atAGlance.styleCoverage}
              </p>
            </div>
          </div>

          {brochures.length > 0 ? (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/58">
                Brochures
              </p>
              <div className="mt-3">
                <BrochureShelf brochures={brochures} />
              </div>
            </div>
          ) : (
            <p className="mt-6 text-xs leading-5 text-white/55">
              Brochure links can be added here later for this brand.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

function CompactBrandCard({ brand }: { brand: Brand }) {
  const brochures: BrochureItem[] =
    brand.brochures?.map((brochure) => ({
      label: brochure.title,
      url: brochure.url,
      openUrl: brochure.url,
      mode: "viewer",
    })) ?? [];

  const sectionId = brandSectionIds[brand.slug] ?? brand.slug;
  const displayConstruction =
    constructionOverrides[brand.slug] ?? brand.atAGlance.construction;

  return (
    <section
      id={sectionId}
      className="rounded-[28px] border border-white/12 bg-[rgba(30,32,38,0.28)] p-6 backdrop-blur-md shadow-[0_18px_42px_rgba(0,0,0,0.14)] md:p-7"
    >
      <div className="flex flex-col gap-5">
        <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
          {brand.badge}
        </div>

        <LogoStage slug={brand.slug} name={brand.name} />

        <h3 className="text-[2rem] font-extrabold tracking-tight leading-tight">
          {brand.name}
        </h3>

        <p className="leading-7 text-white/84">{brand.tagline}</p>

        <ul className="grid grid-cols-1 gap-2 text-sm text-white/82 sm:grid-cols-2">
          {brand.highlights.slice(0, 4).map((item) => (
            <li key={item} className="leading-6">
              • {item}
            </li>
          ))}
        </ul>

        {extraNotes[brand.slug] ? (
          <div className="rounded-[18px] border border-white/10 bg-black/16 p-4">
            <p className="text-sm leading-6 text-white/74">
              {extraNotes[brand.slug]}
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
              Lead time
            </p>
            <p className="mt-1 font-semibold text-white/92">
              {brand.atAGlance.leadTime}
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
              Price tier
            </p>
            <p className="mt-1 font-semibold text-white/92">
              {brand.atAGlance.priceTier}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
              Construction
            </p>
            <p className="mt-1 font-semibold text-white/92">
              {displayConstruction}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">
              Style coverage
            </p>
            <p className="mt-1 font-semibold text-white/92">
              {brand.atAGlance.styleCoverage}
            </p>
          </div>
        </div>

        {brochures.length > 0 ? (
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/58">
              Brochures
            </p>
            <div className="mt-3">
              <BrochureShelf brochures={brochures} />
            </div>
          </div>
        ) : (
          <p className="text-xs leading-5 text-white/55">
            Brochure links can be added here later for this brand.
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={`#${sectionId}`}
            className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View details
          </a>

          {brand.manufacturerUrl ? (
            <a
              href={brand.manufacturerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Visit manufacturer
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
