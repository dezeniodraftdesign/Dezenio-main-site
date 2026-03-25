"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
  "rounded-[24px] border border-white/12 bg-[rgba(24,26,32,0.30)] p-4 sm:p-5 md:rounded-[28px] md:p-7 backdrop-blur-md shadow-[0_18px_44px_rgba(0,0,0,0.16)]";

const sidePanelClass =
  "rounded-[20px] border border-white/10 bg-[rgba(14,16,22,0.28)] p-4 sm:p-5 md:rounded-[24px] md:p-6 backdrop-blur-sm shadow-[0_12px_28px_rgba(0,0,0,0.12)]";

const mobileDetailPanelClass =
  "rounded-[22px] border border-white/12 bg-[rgba(24,26,32,0.30)] px-4 py-4 backdrop-blur-md shadow-[0_16px_36px_rgba(0,0,0,0.16)]";

const mobileDetailSidePanelClass =
  "rounded-[16px] border border-white/10 bg-[rgba(14,16,22,0.28)] px-3 py-3 backdrop-blur-sm shadow-[0_10px_24px_rgba(0,0,0,0.12)]";

type BrochureItem = {
  label: string;
  url: string;
  openUrl: string;
  mode: "viewer";
};

type MobileBrandOption = {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  highlights: string[];
  note?: string;
  manufacturerUrl?: string;
  atAGlance: {
    leadTime: string;
    priceTier: string;
    construction: string;
    styleCoverage: string;
    note?: string;
  };
  brochures: BrochureItem[];
};

function getLogoImageClass(slug: string) {
  switch (slug) {
    case "kith":
      return "max-h-[52px] max-w-[230px] md:max-h-[60px] md:max-w-[270px]";
    case "mouser":
      return "max-h-[50px] max-w-[190px] md:max-h-[58px] md:max-w-[220px]";
    case "bishop":
      return "max-h-[80px] max-w-[220px] md:max-h-[98px] md:max-w-[260px]";
    case "procraft":
      return "max-h-[72px] max-w-[210px] md:max-h-[88px] md:max-w-[245px]";
    case "adornus":
      return "max-h-[52px] max-w-[220px] md:max-h-[60px] md:max-w-[250px]";
    case "richelieu":
      return "max-h-[56px] max-w-[220px] md:max-h-[64px] md:max-w-[260px]";
    default:
      return "max-h-[44px] max-w-[210px] md:max-h-[48px] md:max-w-[240px]";
  }
}

function getLogoStageClass(slug: string) {
  switch (slug) {
    case "mouser":
      return "bg-black/60 border-white/14";
    case "kith":
    case "bishop":
    case "procraft":
    case "adornus":
    case "richelieu":
      return "bg-white/95 border-white/70";
    default:
      return "bg-white/[0.09] border-white/16";
  }
}

function getLogoGlowClass(slug: string) {
  switch (slug) {
    case "mouser":
      return "drop-shadow-[0_0_16px_rgba(255,255,255,0.18)]";
    case "kith":
    case "bishop":
    case "procraft":
    case "adornus":
      return "drop-shadow-[0_0_8px_rgba(0,0,0,0.10)]";
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
      return "px-5 py-4 md:px-7 md:py-5";
    case "bishop":
    case "procraft":
    case "adornus":
      return "px-5 py-3 md:px-7 md:py-4";
    case "richelieu":
      return "px-5 py-4 md:px-6 md:py-5";
    default:
      return "px-5 py-4 md:px-7 md:py-5";
  }
}

function LogoStage({ slug, name }: { slug: string; name: string }) {
  const logo = brandLogos[slug];
  if (!logo) return null;

  return (
    <div
      className={[
        "inline-flex min-h-[84px] w-full max-w-[320px] items-center justify-center rounded-[18px] border md:min-h-[96px] md:rounded-[20px]",
        getLogoStageClass(slug),
        getLogoWrapClass(slug),
      ].join(" ")}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={520}
        height={160}
        className={`h-auto w-auto object-contain ${getLogoImageClass(
          slug,
        )} ${getLogoGlowClass(slug)}`}
        unoptimized
      />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68 md:text-[11px] md:tracking-[0.20em]">
      {children}
    </p>
  );
}

function Fact({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "border-b border-white/8 pb-2.5 last:border-b-0 last:pb-0"
          : "border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
      }
    >
      <p
        className={
          compact
            ? "text-[10px] uppercase tracking-[0.16em] text-white/48"
            : "text-[11px] uppercase tracking-[0.18em] text-white/50"
        }
      >
        {label}
      </p>
      <p
        className={
          compact
            ? "mt-1 text-[13px] font-semibold leading-5 text-white/90"
            : "mt-1 text-sm font-semibold leading-6 text-white/92"
        }
      >
        {value}
      </p>
    </div>
  );
}

export default function CabinetryClient() {
  return (
    <Suspense fallback={null}>
      <CabinetryInner />
    </Suspense>
  );
}

function CabinetryInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeMobileSlug, setActiveMobileSlug] = useState<string | null>(null);
  const search = useSearchParams();
  const mobileDetailRef = useRef<HTMLDivElement | null>(null);
  const mobileSelectorTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  const filteredBrands = useMemo(() => {
    const allowed = new Set([
      "kith",
      "mouser",
      "bishop",
      "procraft",
      "adornus",
    ]);
    const seen = new Set<string>();

    return getAllBrands().filter((brand) => {
      if (!allowed.has(brand.slug)) return false;
      if (seen.has(brand.slug)) return false;
      seen.add(brand.slug);
      return true;
    });
  }, []);

  const orderedBrands = useMemo(() => {
    const bySlug = new Map(filteredBrands.map((brand) => [brand.slug, brand]));
    return ["kith", "mouser", "procraft", "bishop", "adornus"]
      .map((slug) => bySlug.get(slug))
      .filter(Boolean) as Brand[];
  }, [filteredBrands]);

  const mobileOptions = useMemo<MobileBrandOption[]>(() => {
    const brandOptions: MobileBrandOption[] = orderedBrands.map((brand) => ({
      slug: brand.slug,
      name: brand.name,
      badge: brand.badge,
      tagline: brand.tagline,
      highlights: brand.highlights,
      note: extraNotes[brand.slug],
      manufacturerUrl: brand.manufacturerUrl,
      atAGlance: {
        leadTime: brand.atAGlance.leadTime,
        priceTier: brand.atAGlance.priceTier,
        construction:
          constructionOverrides[brand.slug] ?? brand.atAGlance.construction,
        styleCoverage: brand.atAGlance.styleCoverage,
        note: brand.atAGlance.note,
      },
      brochures:
        brand.brochures?.map((brochure) => ({
          label: brochure.title,
          url: brochure.url,
          openUrl: brochure.url,
          mode: "viewer" as const,
        })) ?? [],
    }));

    const richelieuOption: MobileBrandOption = {
      slug: "richelieu",
      name: "Richelieu Hardware & Storage",
      badge: "Hardware + accessories",
      tagline:
        "Decorative hardware, organizational accessories, pull-outs, specialty storage, and finishing pieces that help tie the cabinetry package together cleanly.",
      highlights: [
        "Decorative hardware selections",
        "Pull-outs and storage accessories",
        "Interior organization options",
        "Finish-driven final detailing support",
      ],
      manufacturerUrl: "https://www.richelieu.com",
      atAGlance: {
        leadTime: "Varies by selection",
        priceTier: "Varies",
        construction: "Hardware · Accessories · Storage",
        styleCoverage: "Traditional · Transitional · Contemporary",
      },
      brochures: [],
    };

    return [...brandOptions, richelieuOption];
  }, [orderedBrands]);

  const activeMobileOption =
    activeMobileSlug == null
      ? null
      : (mobileOptions.find((option) => option.slug === activeMobileSlug) ??
        null);

  useEffect(() => {
    if (!activeMobileSlug) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    requestAnimationFrame(() => {
      mobileDetailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [activeMobileSlug]);

  function closeMobileDetail() {
    setActiveMobileSlug(null);

    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mobileSelectorTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  return (
    <div
      id="top"
      className="relative pb-[calc(var(--bottom-band-height,64px)+120px)] text-white md:pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio cabinetry background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[2.85] object-[04%_24%] md:scale-100 md:object-[50%_32.5%]"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.34),rgba(0,0,0,0.10)_24%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.05),transparent_38%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 md:pb-16 md:pt-28 lg:px-8">
        <section className="mx-auto max-w-5xl text-center">
          <Eyebrow>Cabinetry division</Eyebrow>

          <h1 className="mt-3 text-[2rem] font-extrabold tracking-tight leading-[1.02] sm:text-[2.5rem] md:mt-4 md:text-6xl">
            Cabinetry Sales, Design &amp; Installation
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-6 text-white/84 sm:text-base sm:leading-7 md:mt-6 md:text-lg">
            Factory-direct cabinetry access with design guidance, line
            selection, layout support, ordering coordination, delivery planning,
            and professional installation across Nashville and Middle Tennessee.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center md:hidden">
            <button
              onClick={() => setQuoteOpen(true)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get a Cabinetry Quote
            </button>
            <a
              href="#mobile-brand-selector"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Cabinet Lines
            </a>
          </div>
        </section>

        <section className="mx-auto mt-10 hidden max-w-6xl md:mt-14 md:block">
          <div className={panelClass}>
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
              <div>
                <Eyebrow>What we handle</Eyebrow>

                <h2 className="mt-3 text-[1.65rem] font-extrabold tracking-tight leading-tight md:text-[2rem]">
                  Cabinetry-first support with real project coordination
                </h2>

                <p className="mt-3 max-w-3xl text-[15px] leading-6 text-white/80 md:mt-4 md:text-base md:leading-7">
                  We help clients move from product selection into a cleaner,
                  buildable result — whether that means a straightforward
                  cabinetry package, a full kitchen remodel, or cabinet planning
                  that needs to stay aligned with the broader project.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-5 md:mt-6 md:gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-base font-bold">Lines we offer</h3>
                    <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/82">
                      <li>• Kith Kitchens</li>
                      <li>• Mouser Cabinetry</li>
                      <li>• ProCraft Cabinetry</li>
                      <li>• Bishop Cabinets</li>
                      <li>• Adornus</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold">What’s included</h3>
                    <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/82">
                      <li>• Design support and layout refinement</li>
                      <li>• Appliance planning, fillers, trim, and moldings</li>
                      <li>• Hardware and accessory planning</li>
                      <li>• Clear quoting with defined options</li>
                      <li>• Ordering coordination and delivery planning</li>
                      <li>• Professional installation and punch support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:border-l lg:border-white/10 lg:pl-8">
                <Eyebrow>Best fit for</Eyebrow>

                <div className="mt-4 space-y-4 md:space-y-5">
                  <div>
                    <h3 className="text-base font-bold">Homeowners</h3>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      Kitchens, baths, built-ins, and remodel scopes where you
                      want clean guidance and a finished result that matches the
                      plan.
                    </p>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <h3 className="text-base font-bold">Builders</h3>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      Fast takeoffs, accurate specs, and reliable coordination
                      to keep schedules moving.
                    </p>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <h3 className="text-base font-bold">Remodel / Additions</h3>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      Projects where cabinetry and construction documentation
                      need to stay aligned for fewer surprises in the field.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="mobile-brand-selector"
          className="relative mx-auto mt-10 max-w-6xl pb-[calc(env(safe-area-inset-bottom)+150px)] md:hidden"
        >
          {!activeMobileOption ? (
            <div ref={mobileSelectorTopRef}>
              <Eyebrow>Featured cabinet lines</Eyebrow>
              <h2 className="mt-3 text-[1.8rem] font-extrabold tracking-tight leading-tight">
                Choose a cabinet line
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-white/76">
                Tap a logo card to open that line’s details.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3">
                {mobileOptions.map((option) => (
                  <button
                    key={option.slug}
                    type="button"
                    onClick={() => setActiveMobileSlug(option.slug)}
                    className="rounded-[22px] border border-white/10 bg-[rgba(18,20,26,0.22)] p-3 text-left transition hover:bg-[rgba(255,255,255,0.05)]"
                    aria-label={`Open ${option.name}`}
                  >
                    <LogoStage slug={option.slug} name={option.name} />

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">
                          {option.badge}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white/92">
                          {option.name}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-white/16 px-3 py-1 text-[11px] font-semibold text-white/72">
                        Open
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div ref={mobileDetailRef}>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={closeMobileDetail}
                  className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to all lines
                </button>
              </div>

              <MobileBrandDetail
                option={activeMobileOption}
                onBack={closeMobileDetail}
              />
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+76px)] z-[2] h-24 bg-[linear-gradient(to_top,rgba(12,13,17,0.78),rgba(12,13,17,0.36),transparent)]" />
        </section>

        <section
          id="cabinet-lines"
          className="mx-auto mt-10 hidden max-w-6xl md:mt-14 md:block"
        >
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div>
              <Eyebrow>Featured cabinet lines</Eyebrow>
              <h2 className="mt-3 max-w-4xl text-[1.8rem] font-extrabold tracking-tight leading-tight md:text-4xl">
                Cabinet lines that match the pace and finish level of the job
              </h2>
            </div>

            <p className="max-w-xl text-[15px] leading-6 text-white/76 md:text-base md:leading-7 lg:ml-auto lg:text-right">
              Browse the lines we represent, compare style coverage and lead
              times, and open brochure resources without turning the page into a
              bulky parts catalog.
            </p>
          </div>

          <div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
            {orderedBrands.map((brand) => (
              <BrandRow key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>

        <section
          id={brandSectionIds.richelieu}
          className="mx-auto mt-10 hidden max-w-6xl md:mt-14 md:block"
        >
          <div className={panelClass}>
            <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-[1.06fr_.94fr] lg:items-start">
              <div>
                <Eyebrow>Hardware + accessories</Eyebrow>

                <div className="mt-4">
                  <LogoStage slug="richelieu" name="Richelieu" />
                </div>

                <h3 className="mt-4 text-[1.75rem] font-extrabold tracking-tight leading-tight md:mt-5 md:text-[1.95rem]">
                  Richelieu Hardware &amp; Storage
                </h3>

                <p className="mt-3 max-w-2xl text-[15px] leading-6 text-white/82 md:leading-7">
                  Decorative hardware, organizational accessories, pull-outs,
                  specialty storage, and finishing pieces that help tie the
                  cabinetry package together cleanly.
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm leading-6 text-white/80 sm:grid-cols-2">
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

              <div className={sidePanelClass}>
                <Eyebrow>How it fits in</Eyebrow>

                <div className="mt-4 space-y-4 text-sm leading-6 text-white/82 md:leading-7">
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
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 hidden max-w-6xl md:mt-14 md:block">
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1.02fr_.98fr] lg:items-start">
            <div>
              <Eyebrow>Process + investment</Eyebrow>
              <h2 className="mt-3 max-w-4xl text-[1.8rem] font-extrabold tracking-tight leading-tight md:text-4xl">
                Clear quoting first, deeper design when the project is ready
              </h2>
            </div>

            <p className="max-w-xl text-[15px] leading-6 text-white/76 md:text-base md:leading-7 lg:ml-auto lg:text-right">
              Cabinetry planning can begin with budgetary guidance, then move
              into design development and final ordering once selections and
              scope are ready to tighten up.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:mt-7 md:gap-6 lg:grid-cols-2">
            <div className={panelClass}>
              <h3 className="text-xl font-bold">How cabinetry design works</h3>

              <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
                <div className={sidePanelClass}>
                  <p className="text-base font-semibold text-white/92">
                    1. Budgetary quoting
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">
                    We typically begin with a preliminary range based on scope,
                    measurements, and product level.
                  </p>
                </div>

                <div className={sidePanelClass}>
                  <p className="text-base font-semibold text-white/92">
                    2. Design retainer
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">
                    When the project moves into active layout development,
                    selections, and pricing refinement, a design retainer may be
                    required.
                  </p>
                </div>

                <div className={sidePanelClass}>
                  <p className="text-base font-semibold text-white/92">
                    3. Credit with purchase
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">
                    The retainer is applied toward cabinetry purchase when the
                    project moves forward with Dezenio.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/68">
                We offer design with cabinetry purchase — not unlimited free
                design work without project commitment. Retainers vary by scope
                and help protect design time, technical development, and quoting
                accuracy.
              </p>
            </div>

            <div className={panelClass}>
              <h3 className="text-xl font-bold">
                Typical kitchen cabinetry investment
              </h3>

              <ul className="mt-5 space-y-2 text-sm leading-7 text-white/82 md:text-base">
                <li>• Small kitchen projects: $15,000 – $25,000</li>
                <li>• Mid-size kitchens: $25,000 – $50,000</li>
                <li>• Large custom kitchens: $50,000 – $120,000+</li>
              </ul>

              <p className="mt-5 text-sm leading-6 text-white/72">
                Final pricing depends on cabinet line, finishes, layout
                complexity, hardware selections, delivery planning, and
                installation requirements.
              </p>

              <div className="mt-5 rounded-[18px] border border-white/10 bg-black/14 px-4 py-4 md:mt-6 md:rounded-[20px] md:px-5">
                <h4 className="text-base font-bold">Hardware + accessories</h4>
                <p className="mt-2 text-sm leading-6 text-white/78">
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
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-5xl md:mt-14">
          <div className="rounded-[24px] border border-white/12 bg-[rgba(24,26,32,0.32)] px-5 py-7 text-center backdrop-blur-md shadow-[0_18px_42px_rgba(0,0,0,0.16)] md:rounded-[30px] md:px-10 md:py-10">
            <h2 className="text-[1.7rem] font-extrabold tracking-tight md:text-4xl">
              Need help sorting through the right cabinet line?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-6 text-white/80 md:leading-7">
              Whether the project needs speed, deeper customization, cleaner
              finish coordination, or a cabinetry package that works alongside
              broader design and documentation support, we can help point you in
              the right direction.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-7">
              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Get a Cabinetry Quote
              </button>

              <Link
                href="/services"
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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

function MobileBrandDetail({
  option,
  onBack,
}: {
  option: MobileBrandOption;
  onBack: () => void;
}) {
  return (
    <section className={mobileDetailPanelClass}>
      <Eyebrow>{option.badge}</Eyebrow>

      <div className="mt-3">
        <LogoStage slug={option.slug} name={option.name} />
      </div>

      <h3 className="mt-3 text-[1.55rem] font-extrabold tracking-tight leading-tight">
        {option.name}
      </h3>

      <p className="mt-2 text-[14px] leading-5.5 text-white/82">
        {option.tagline}
      </p>

      <div className="mt-3.5">
        <Eyebrow>Highlights</Eyebrow>
        <ul className="mt-2 grid grid-cols-1 gap-1 text-[13px] leading-5.5 text-white/82">
          {option.highlights.slice(0, 4).map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      {option.note || option.atAGlance.note ? (
        <div className="mt-3.5">
          <Eyebrow>Notes</Eyebrow>
          <div className="mt-2 space-y-2">
            {option.note ? (
              <p className="text-[13px] leading-5.5 text-white/74">
                {option.note}
              </p>
            ) : null}
            {option.atAGlance.note ? (
              <p className="text-[11px] leading-4.5 text-white/62">
                {option.atAGlance.note}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {option.manufacturerUrl ? (
        <div className="mt-3.5">
          <a
            href={option.manufacturerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Visit manufacturer
          </a>
        </div>
      ) : null}

      <div className="mt-3.5">
        <div className={mobileDetailSidePanelClass}>
          <Eyebrow>At a glance</Eyebrow>

          <div className="mt-2 space-y-2">
            <Fact label="Lead time" value={option.atAGlance.leadTime} compact />
            <Fact
              label="Price tier"
              value={option.atAGlance.priceTier}
              compact
            />
            <Fact
              label="Construction"
              value={option.atAGlance.construction}
              compact
            />
            <Fact
              label="Style coverage"
              value={option.atAGlance.styleCoverage}
              compact
            />
          </div>

          {option.brochures.length > 0 ? (
            <div className="mt-2.5 border-t border-white/10 pt-2.5">
              <BrochureShelf brochures={option.brochures} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-3.5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to Brands
        </button>
      </div>
    </section>
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
    <section id={sectionId} className={panelClass}>
      <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-[1.06fr_.94fr] lg:items-start">
        <div>
          <Eyebrow>{brand.badge}</Eyebrow>

          <div className="mt-4">
            <LogoStage slug={brand.slug} name={brand.name} />
          </div>

          <h3 className="mt-4 text-[1.8rem] font-extrabold tracking-tight leading-tight md:mt-5 md:text-[2rem]">
            {brand.name}
          </h3>

          <p className="mt-3 max-w-2xl text-[15px] leading-6 text-white/82 md:leading-7">
            {brand.tagline}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:gap-5 md:grid-cols-2">
            <div>
              <Eyebrow>Highlights</Eyebrow>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm leading-6 text-white/82 md:mt-4">
                {brand.highlights.slice(0, 4).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {extraNotes[brand.slug] || brand.atAGlance.note ? (
              <div>
                <Eyebrow>Notes</Eyebrow>
                <div className="mt-3 space-y-3 md:mt-4">
                  {extraNotes[brand.slug] ? (
                    <p className="text-sm leading-6 text-white/74">
                      {extraNotes[brand.slug]}
                    </p>
                  ) : null}
                  {brand.atAGlance.note ? (
                    <p className="text-xs leading-5 text-white/62">
                      {brand.atAGlance.note}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>

          {brand.manufacturerUrl ? (
            <div className="mt-5 md:mt-6">
              <a
                href={brand.manufacturerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Visit manufacturer
              </a>
            </div>
          ) : null}
        </div>

        <div className={sidePanelClass}>
          <Eyebrow>At a glance</Eyebrow>

          <div className="mt-4 space-y-4">
            <Fact label="Lead time" value={brand.atAGlance.leadTime} />
            <Fact label="Price tier" value={brand.atAGlance.priceTier} />
            <Fact label="Construction" value={displayConstruction} />
            <Fact
              label="Style coverage"
              value={brand.atAGlance.styleCoverage}
            />
          </div>

          {brochures.length > 0 ? (
            <div className="mt-5 border-t border-white/10 pt-5 md:mt-6">
              <BrochureShelf brochures={brochures} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
