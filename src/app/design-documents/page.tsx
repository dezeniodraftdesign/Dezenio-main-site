"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

type GalleryItem = {
  title: string;
  text: string;
  image: string;
  imageClass: string;
  imageWrapClass: string;
  imageStyle?: React.CSSProperties;
  category: "Residential Concept" | "Commercial Concept";
  detailsTitle?: string;
  detailsBody?: string;
};

export default function DesignDocumentsPage() {
  return (
    <Suspense fallback={null}>
      <DesignDocumentsInner />
    </Suspense>
  );
}

function DesignDocumentsInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  const residentialGallery: GalleryItem[] = [
    {
      title: "Lakeshore Residence",
      text: "Preliminary concept study that informed a completed residential build, with refinements and field changes made during execution.",
      image: "/sections/lakeshore.png",
      imageClass: "object-cover object-center",
      imageWrapClass: "bg-black/5",
      category: "Residential Concept",
      detailsTitle: "Project context",
      detailsBody:
        "This concept study helped communicate the initial residential design direction and overall architectural intent. The home was later built with modifications made during the real-world execution process.",
    },
    {
      title: "Campbell Residence",
      text: "Client-facing concept sketch developed to communicate architectural direction, exterior character, and overall design intent.",
      image: "/sections/campbell.png",
      imageClass: "object-cover object-center",
      imageWrapClass: "bg-black/5",
      category: "Residential Concept",
      detailsTitle: "Concept note",
      detailsBody:
        "This image is presented as a design concept study rather than a completed built project. It is intended to show presentation quality, atmosphere, and early architectural communication.",
    },
    {
      title: "Modern Residence Concept",
      text: "Early-stage residential concept visual created to explore massing, form, and presentation-ready design direction.",
      image: "/sections/modern.png",
      imageClass: "object-cover",
      imageStyle: { objectPosition: "50% 0%" },
      imageWrapClass: "bg-[#d9d4cc]",
      category: "Residential Concept",
      detailsTitle: "Concept note",
      detailsBody:
        "This concept rendering represents an early design-direction study focused on clean massing, modern proportion, and presentation clarity before technical development.",
    },
  ];

  const commercialGallery: GalleryItem[] = [
    {
      title: "Modern Retail Concept",
      text: "Illustrative multi-tenant neighborhood retail strip concept with strong anchor presence, storefront glazing, and clean commercial façade rhythm.",
      image: "/sections/retail.png",
      imageClass: "object-cover object-center",
      imageWrapClass: "bg-black/5",
      category: "Commercial Concept",
      detailsTitle: "Concept specifications",
      detailsBody:
        "Neighborhood retail / boutique storefront concept. Approx. 10,000–14,000 SF total, roughly 60–70 ft deep and 160–200 ft long. Example tenant mix may include 3,000 SF endcaps with 2,000 SF inline spaces. Key features include a strong corner anchor volume, large storefront glazing, stone and metal panel façade, canopy coverage, and organized tenant frontage.",
    },
    {
      title: "Flex Industrial / Warehouse Concept",
      text: "Illustrative light-industrial flex park concept for showroom, contractor, light manufacturing, and warehouse business use.",
      image: "/sections/warehouse.png",
      imageClass: "object-cover object-center",
      imageWrapClass: "bg-black/5",
      category: "Commercial Concept",
      detailsTitle: "Concept specifications",
      detailsBody:
        "Flex industrial / warehouse concept. Approx. 18,000–24,000 SF total with office/showroom and warehouse use combined. Intended for contractor shops, showroom + warehouse businesses, light manufacturing, or distribution-style users, with loading and circulation considered as part of the site layout.",
    },
    {
      title: "Urban Church / Community Campus",
      text: "Illustrative civic / church concept centered on community gathering, sanctuary space, and a signature lantern tower element.",
      image: "/sections/church.png",
      imageClass: "object-cover",
      imageStyle: { objectPosition: "50% 14%" },
      imageWrapClass: "bg-black/5",
      category: "Commercial Concept",
      detailsTitle: "Concept specifications",
      detailsBody:
        "Church and community facility concept. Approx. 22,000–30,000 SF total, potentially including lobby/gathering space, sanctuary, children’s areas, offices, and support spaces. The design centers on a stronger civic identity, warm materiality, and a vertical lantern tower element.",
    },
  ];

  const openItem = (item: GalleryItem) => setActiveItem(item);

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+110px)]"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/sections/lakeshore.png"
          alt="Design and documents background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/14 to-black/42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10">
        <section className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/72">
            CONCEPTS • AS-BUILTS • PERMIT SETS
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Design &amp; Documents
          </h1>

          <p className="mt-4 max-w-3xl text-white/86 md:text-lg leading-relaxed">
            Concept development, as-builts, layout refinement, and
            permit-focused drawing support for residential and commercial
            projects across Nashville and Middle Tennessee.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Get a Quote
            </button>

            <Link
              href="/services"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Back to Services
            </Link>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/6 p-6 ring-1 ring-white/10 backdrop-blur-md">
            <h2 className="text-lg font-semibold">What we help with</h2>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-sm leading-relaxed text-white/82">
              <li>Concept plans and layout refinement</li>
              <li>As-builts with design overlays</li>
              <li>Permit-ready drawing sets when needed</li>
              <li>Cabinetry planning integrated into the design scope</li>
              <li>Builder and trade coordination support</li>
              <li>Commercial design, planning, and documentation support</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/6 p-6 ring-1 ring-white/10 backdrop-blur-md">
            <h2 className="text-lg font-semibold">Best fit for</h2>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-sm leading-relaxed text-white/82">
              <li>New homes, remodels, and additions</li>
              <li>Homeowners needing help turning ideas into clear drawings</li>
              <li>Builders who need fast, usable documentation support</li>
              <li>Tenant improvement and renovation planning</li>
              <li>Commercial clients exploring early design direction</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight">
            Residential Project Visuals
          </h2>
          <p className="mt-3 max-w-3xl text-white/80 leading-relaxed">
            Concept sketches, presentation visuals, and residential design
            studies that help communicate direction clearly before construction
            begins.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            {residentialGallery.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => openItem(item)}
                className="overflow-hidden rounded-2xl bg-white/6 text-left ring-1 ring-white/10 backdrop-blur-md transition hover:bg-white/8 hover:ring-white/16"
              >
                <div
                  className={`relative h-[195px] overflow-hidden ${item.imageWrapClass}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={item.imageClass}
                    style={item.imageStyle}
                  />
                  <div className="absolute inset-0 bg-black/4" />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {item.text}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-white/90">
                    View larger →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-md md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Built to communicate clearly
              </h2>
              <p className="mt-3 max-w-2xl text-white/82 leading-relaxed">
                Whether you need early-stage concept visuals, a refined plan for
                client approval, or documentation that supports the next step in
                the project, the goal is clarity — visually, spatially, and in
                execution.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-black/16 p-4 ring-1 ring-white/8">
                <h3 className="text-sm font-semibold text-white/92">
                  Typical outputs
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Concept sketches, rendered visuals, as-builts, floor plans,
                  layout studies, and permit-support documentation.
                </p>
              </div>

              <div className="rounded-xl bg-black/16 p-4 ring-1 ring-white/8">
                <h3 className="text-sm font-semibold text-white/92">
                  Ideal clients
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Homeowners, builders, developers, and commercial clients who
                  want thoughtful design guidance before construction moves
                  forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight">
            Commercial Concepts
          </h2>
          <p className="mt-3 max-w-3xl text-white/80 leading-relaxed">
            Illustrative concept studies showing capability for early planning,
            layout direction, permit-support documentation, and presentation
            visuals across commercial project types.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            {commercialGallery.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => openItem(item)}
                className="overflow-hidden rounded-2xl bg-white/6 text-left ring-1 ring-white/10 backdrop-blur-md transition hover:bg-white/8 hover:ring-white/16"
              >
                <div
                  className={`relative h-[195px] overflow-hidden ${item.imageWrapClass}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={item.imageClass}
                    style={item.imageStyle}
                  />
                  <div className="absolute inset-0 bg-black/4" />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {item.text}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-white/90">
                    View concept details →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-md md:p-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Project Investment Guide
          </h2>
          <p className="mt-3 max-w-3xl text-white/80 leading-relaxed">
            Transparent starting investment ranges help set expectations early.
            Final pricing depends on scope, complexity, existing conditions,
            required deliverables, and consultant coordination.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-black/16 p-5 ring-1 ring-white/8">
              <h3 className="text-xl font-semibold">
                Residential Design &amp; Construction Drawings
              </h3>
              <p className="mt-3 text-lg font-semibold text-white">
                Starting at $2.50 – $3.50 / sq ft
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/78">
                We provide custom residential design and construction drawing
                packages tailored to each project. Our process focuses on
                creating clear, buildable plans that help homeowners, builders,
                and contractors move efficiently from concept to construction.
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-white/92">
                  Typical plan sets may include:
                </p>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm text-white/80">
                  <li>Cover page</li>
                  <li>Site plan</li>
                  <li>Proposed floor plans</li>
                  <li>Exterior elevations</li>
                  <li>Roof plan</li>
                  <li>Basic construction coordination notes</li>
                </ul>
              </div>

              <div className="mt-5 rounded-xl bg-white/5 p-4 ring-1 ring-white/8">
                <p className="text-sm font-semibold text-white/92">
                  As-Built Capture (Existing Homes)
                </p>
                <p className="mt-2 text-sm text-white/78">
                  Starting at $1.50 / sq ft
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Existing homes, remodels, and additions may require field
                  measurement and existing-condition documentation before design
                  work begins.
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-white/92">
                  Common add-ons:
                </p>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm text-white/80">
                  <li>Electrical Plan — $0.50 / sq ft</li>
                  <li>Interior Elevations — $150 – $300 per room</li>
                  <li>Architectural Details — $250 – $400 per sheet</li>
                  <li>3D Renderings — $600 – $1,200 per view</li>
                  <li>Site Analysis (Nashville area) — $250</li>
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-white/92">
                  Typical timeline:
                </p>
                <p className="mt-2 text-sm text-white/78">
                  3–5 weeks depending on project size and complexity. Rush
                  services may be available.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-black/16 p-5 ring-1 ring-white/8">
              <h3 className="text-xl font-semibold">
                Commercial Design &amp; Construction Documents
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78">
                Starting investment typically varies based on size, complexity,
                existing conditions, deliverable scope, and consultant
                coordination.
              </p>

              <div className="mt-5 rounded-xl bg-white/5 p-4 ring-1 ring-white/8">
                <ul className="space-y-3 text-sm text-white/82">
                  <li>
                    <span className="font-semibold text-white">
                      Under 5,000 sq ft
                    </span>{" "}
                    — starting around $3.00 – $4.00 / sq ft
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      5,000–10,000 sq ft
                    </span>{" "}
                    — starting around $2.25 – $3.25 / sq ft
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      10,000+ sq ft
                    </span>{" "}
                    — quoted by scope
                  </li>
                </ul>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-white/78">
                Commercial design support may include tenant improvement,
                renovation, adaptive reuse, and ground-up planning support,
                depending on project type and coordination needs.
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-white/92">
                  Typical commercial deliverables may include:
                </p>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm text-white/80">
                  <li>Site and planning support</li>
                  <li>Existing and proposed floor plans</li>
                  <li>Exterior elevations</li>
                  <li>Interior planning and selected elevations</li>
                  <li>Code-related coordination sheets as required</li>
                  <li>Consultant coordination support</li>
                </ul>
              </div>

              <div className="mt-5 rounded-xl bg-white/5 p-4 ring-1 ring-white/8">
                <p className="text-sm font-semibold text-white/92">
                  Engineering Coordination
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Structural engineering and stamped structural plans, when
                  required, are coordinated through licensed professionals in
                  support of the design concept. Additional engineering and
                  consultant fees apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-md md:p-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Important Project Notes
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-black/16 p-4 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold text-white/92">
                Stamps & Engineering
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/72">
                Dezenio does not provide stamped engineering directly. When
                structural engineering is required, we coordinate with licensed
                professionals at additional cost.
              </p>
            </div>

            <div className="rounded-xl bg-black/16 p-4 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold text-white/92">
                Deposits & Refunds
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/72">
                Deposits are non-refundable. No refunds are provided once
                services have begun or been rendered.
              </p>
            </div>

            <div className="rounded-xl bg-black/16 p-4 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold text-white/92">
                Final Pricing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/72">
                Final pricing depends on project scope, complexity, existing
                conditions, required deliverables, jurisdictional requirements,
                and consultant coordination.
              </p>
            </div>

            <div className="rounded-xl bg-black/16 p-4 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold text-white/92">
                Construction Responsibility
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/72">
                Clients and contractors are responsible for construction means,
                methods, execution, and field coordination.
              </p>
            </div>
          </div>
        </section>
      </main>

      {activeItem && (
        <div
          className="fixed inset-0 z-[120] bg-black/78 backdrop-blur-md"
          onClick={() => setActiveItem(null)}
        >
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-10">
            <div
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#161616] ring-1 ring-white/12 shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="sticky right-4 top-4 z-20 ml-auto mr-4 mt-4 block rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black/60"
              >
                Close
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[1.35fr,0.65fr]">
                <div className="flex items-center justify-center bg-black p-6 sm:p-8 lg:min-h-[420px] lg:p-10">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    width={1600}
                    height={1200}
                    className="h-auto max-h-[70vh] w-auto max-w-full rounded-sm object-contain"
                    priority
                  />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.22em] text-white/55">
                      {activeItem.category.toUpperCase()}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      {activeItem.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-white/76 sm:text-base">
                      {activeItem.text}
                    </p>

                    {activeItem.detailsTitle && activeItem.detailsBody && (
                      <div className="mt-8 rounded-2xl bg-white/6 p-5 ring-1 ring-white/8">
                        <h4 className="text-sm font-semibold text-white/92">
                          {activeItem.detailsTitle}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          {activeItem.detailsBody}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 pb-2">
                    <button
                      type="button"
                      onClick={() => setActiveItem(null)}
                      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
                    >
                      Done
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuoteOpen(true)}
                      className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Ask About Similar Work
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
