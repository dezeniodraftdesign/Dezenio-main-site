"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

type GalleryItem = {
  title: string;
  text: string;
  image: string;
  imageClass: string;
  imageWrapClass: string;
  imageStyle?: CSSProperties;
  category: "Residential Concept" | "Commercial Concept";
  detailsTitle?: string;
  detailsBody?: string;
};

type MobileSectionKey =
  | "overview"
  | "residential"
  | "commercial"
  | "investment"
  | "notes";

const panelClass =
  "rounded-[24px] border border-white/12 bg-[rgba(24,26,32,0.30)] p-4 sm:p-5 md:rounded-[28px] md:p-7 backdrop-blur-md shadow-[0_18px_44px_rgba(0,0,0,0.16)]";

const sidePanelClass =
  "rounded-[20px] border border-white/10 bg-[rgba(14,16,22,0.28)] p-4 sm:p-5 md:rounded-[24px] md:p-6 backdrop-blur-sm shadow-[0_12px_28px_rgba(0,0,0,0.12)]";

const mobileSelectorCardClass =
  "rounded-[22px] border border-white/10 bg-[rgba(18,20,26,0.22)] p-3 text-left transition hover:bg-[rgba(255,255,255,0.05)]";

const mobileDetailPanelClass =
  "rounded-[22px] border border-white/12 bg-[rgba(24,26,32,0.30)] px-4 py-4 backdrop-blur-md shadow-[0_16px_36px_rgba(0,0,0,0.16)]";

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68 md:text-[11px] md:tracking-[0.20em]">
      {children}
    </p>
  );
}

function MobileSectionCard({
  title,
  body,
  label,
  onClick,
}: {
  title: string;
  body: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={mobileSelectorCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">
            {label}
          </p>
          <p className="mt-1 text-base font-semibold text-white/94">{title}</p>
          <p className="mt-2 text-[13px] leading-6 text-white/74">{body}</p>
        </div>

        <span className="shrink-0 rounded-full border border-white/16 px-3 py-1 text-[11px] font-semibold text-white/72">
          Open
        </span>
      </div>
    </button>
  );
}

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="overflow-hidden rounded-2xl bg-white/6 text-left ring-1 ring-white/10 backdrop-blur-md transition hover:bg-white/8 hover:ring-white/16"
    >
      <div
        className={`relative h-[210px] overflow-hidden ${item.imageWrapClass}`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={item.imageClass}
          style={item.imageStyle}
        />
        <div className="absolute inset-0 bg-black/6" />
      </div>

      <div className="p-4 md:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">
          {item.category}
        </p>
        <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {item.text}
        </p>
        <p className="mt-4 text-sm font-semibold text-white/90">
          View details →
        </p>
      </div>
    </button>
  );
}

export default function DesignDocumentsClient() {
  return (
    <Suspense fallback={null}>
      <DesignDocumentsInner />
    </Suspense>
  );
}

function DesignDocumentsInner() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeMobileSection, setActiveMobileSection] =
    useState<MobileSectionKey | null>(null);

  const mobileSelectorTopRef = useRef<HTMLDivElement | null>(null);
  const mobileDetailRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!activeMobileSection) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    requestAnimationFrame(() => {
      mobileDetailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [activeMobileSection]);

  function closeMobileSection() {
    setActiveMobileSection(null);

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

  const residentialGallery: GalleryItem[] = [
    {
      title: "Lakeshore Residence",
      text: "Preliminary residential concept study that helped establish overall form, massing, and design direction before the home moved into real-world construction.",
      image: "/sections/lakeshore.png",
      imageClass: "object-cover object-center",
      imageWrapClass: "bg-black/5",
      category: "Residential Concept",
      detailsTitle: "Residential concept context",
      detailsBody:
        "This image represents an early residential concept study used to communicate architectural intent, exterior character, and overall project direction. The home was later built with refinements and field-driven modifications made during execution. It is shown here as part of the design-development and presentation process rather than as a final as-built record.",
    },
    {
      title: "Campbell Residence",
      text: "Client-facing residential concept rendering developed to communicate scale, proportion, and exterior design character before technical development.",
      image: "/sections/campbell.png",
      imageClass: "object-cover object-center",
      imageWrapClass: "bg-black/5",
      category: "Residential Concept",
      detailsTitle: "Residential concept context",
      detailsBody:
        "This concept rendering was created to help communicate design intent clearly in the early stages of the project. Its purpose is presentation, alignment, and decision-making before the project advances into deeper drawing development, consultant coordination, or construction documentation.",
    },
    {
      title: "Modern Residence Concept",
      text: "Early-stage residential study used to explore clean modern massing, presentation quality, and the overall visual language of the project.",
      image: "/sections/modern.png",
      imageClass: "object-cover",
      imageStyle: { objectPosition: "50% 0%" },
      imageWrapClass: "bg-[#d9d4cc]",
      category: "Residential Concept",
      detailsTitle: "Residential concept context",
      detailsBody:
        "This rendering reflects an early design-direction study rather than a completed build. It was used to explore massing, proportion, and presentation clarity while helping the client understand the overall architectural direction before technical drawings and construction-phase coordination.",
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

  function renderMobileSectionDetail() {
    switch (activeMobileSection) {
      case "overview":
        return (
          <section className={mobileDetailPanelClass}>
            <Eyebrow>What this page covers</Eyebrow>
            <h3 className="mt-3 text-[1.7rem] font-extrabold tracking-tight leading-tight">
              Residential design support, commercial concept studies, and
              documentation that helps projects move forward clearly.
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-white/80">
              This work is built to help clients, builders, and project teams
              make cleaner decisions earlier — whether that means testing a
              concept, documenting existing conditions, refining a layout, or
              creating permit-support drawings for the next step in the process.
            </p>

            <div className="mt-4 space-y-3">
              <div className={sidePanelClass}>
                <h4 className="text-sm font-semibold text-white/92">
                  Typical support
                </h4>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed text-white/76">
                  <li>Concept plans and layout refinement</li>
                  <li>As-builts with design overlays</li>
                  <li>Permit-ready drawing sets when needed</li>
                  <li>Cabinetry planning integrated into the scope</li>
                  <li>Builder and trade coordination support</li>
                  <li>Commercial planning and documentation support</li>
                </ul>
              </div>

              <div className={sidePanelClass}>
                <h4 className="text-sm font-semibold text-white/92">
                  Best fit for
                </h4>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed text-white/76">
                  <li>New homes, remodels, and additions</li>
                  <li>Homeowners turning ideas into clear drawings</li>
                  <li>Builders needing fast documentation help</li>
                  <li>Tenant improvement and renovation planning</li>
                  <li>Commercial clients exploring early direction</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={closeMobileSection}
                className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back
              </button>
            </div>
          </section>
        );

      case "residential":
        return (
          <section className={mobileDetailPanelClass}>
            <Eyebrow>Residential project visuals</Eyebrow>
            <h3 className="mt-3 text-[1.7rem] font-extrabold tracking-tight leading-tight">
              Residential Project Visuals
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-white/80">
              Concept sketches, client-facing presentation visuals, and
              residential design studies used to communicate direction clearly
              before construction begins.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4">
              {residentialGallery.map((item) => (
                <GalleryCard
                  key={item.title}
                  item={item}
                  onClick={() => setActiveItem(item)}
                />
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={closeMobileSection}
                className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back
              </button>
            </div>
          </section>
        );

      case "commercial":
        return (
          <section className={mobileDetailPanelClass}>
            <Eyebrow>Commercial concepts</Eyebrow>
            <h3 className="mt-3 text-[1.7rem] font-extrabold tracking-tight leading-tight">
              Commercial Concepts
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-white/80">
              Illustrative concept studies showing capability for early
              planning, layout direction, permit-support documentation, and
              presentation visuals across commercial project types.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4">
              {commercialGallery.map((item) => (
                <GalleryCard
                  key={item.title}
                  item={item}
                  onClick={() => setActiveItem(item)}
                />
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={closeMobileSection}
                className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back
              </button>
            </div>
          </section>
        );

      case "investment":
        return (
          <section className={mobileDetailPanelClass}>
            <Eyebrow>Project investment guide</Eyebrow>
            <h3 className="mt-3 text-[1.7rem] font-extrabold tracking-tight leading-tight">
              Project Investment Guide
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-white/80">
              Transparent starting investment ranges help set expectations
              early. Final pricing depends on scope, complexity, existing
              conditions, required deliverables, and consultant coordination.
            </p>

            <div className="mt-4 space-y-3">
              <div className={sidePanelClass}>
                <h4 className="text-lg font-semibold">
                  Residential Design &amp; Construction Drawings
                </h4>
                <p className="mt-3 text-base font-semibold text-white">
                  Starting at $2.50 – $3.50 / sq ft
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/78">
                  We provide custom residential design and construction drawing
                  packages tailored to each project.
                </p>

                <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/8">
                  <p className="text-sm font-semibold text-white/92">
                    As-Built Capture (Existing Homes)
                  </p>
                  <p className="mt-2 text-sm text-white/78">
                    Starting at $1.50 / sq ft
                  </p>
                </div>

                <div className="mt-4">
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
              </div>

              <div className={sidePanelClass}>
                <h4 className="text-lg font-semibold">
                  Commercial Design &amp; Construction Documents
                </h4>
                <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/8">
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

                <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/8">
                  <p className="text-sm font-semibold text-white/92">
                    Engineering Coordination
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">
                    Structural engineering and stamped structural plans, when
                    required, are coordinated through licensed professionals.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={closeMobileSection}
                className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back
              </button>
            </div>
          </section>
        );

      case "notes":
        return (
          <section className={mobileDetailPanelClass}>
            <Eyebrow>Important project notes</Eyebrow>
            <h3 className="mt-3 text-[1.7rem] font-extrabold tracking-tight leading-tight">
              Important Project Notes
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                {
                  title: "Stamps & Engineering",
                  text: "Dezenio does not provide stamped engineering directly. When structural engineering is required, we coordinate with licensed professionals at additional cost.",
                },
                {
                  title: "Deposits & Refunds",
                  text: "Deposits are non-refundable. No refunds are provided once services have begun or been rendered.",
                },
                {
                  title: "Final Pricing",
                  text: "Final pricing depends on project scope, complexity, existing conditions, required deliverables, jurisdictional requirements, and consultant coordination.",
                },
                {
                  title: "Construction Responsibility",
                  text: "Clients and contractors are responsible for construction means, methods, execution, and field coordination.",
                },
              ].map((note) => (
                <div key={note.title} className={sidePanelClass}>
                  <h4 className="text-sm font-semibold text-white/92">
                    {note.title}
                  </h4>
                  <p className="mt-2 text-[13px] leading-6 text-white/72">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={closeMobileSection}
                className="rounded-full border border-white/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back
              </button>
            </div>
          </section>
        );

      default:
        return null;
    }
  }

  return (
    <div
      id="top"
      className="relative pb-[calc(var(--bottom-band-height,64px)+68px)] text-white md:pb-[calc(var(--bottom-band-height,64px)+110px)]"
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
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/12 to-black/44" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%)]" />
      </div>

      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 md:pb-10 md:pt-18 lg:px-8 lg:pt-20">
        <section className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/72">
            CONCEPTS • AS-BUILTS • PERMIT SETS
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight leading-[1.02] md:text-6xl">
            Design &amp; Documents
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-7 text-white/86 md:mt-5 md:text-lg md:leading-8">
            Concept development, as-builts, layout refinement, and
            permit-focused drawing support for residential and commercial
            projects across Nashville and Middle Tennessee.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center md:hidden">
            <button
              type="button"
              onClick={() => router.push("/quote")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get a Quote
            </button>
            <a
              href="#mobile-design-selector"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Sections
            </a>
          </div>
        </section>

        <section
          id="mobile-design-selector"
          className="mx-auto mt-8 max-w-6xl md:hidden"
        >
          {!activeMobileSection ? (
            <div ref={mobileSelectorTopRef}>
              <Eyebrow>Design sections</Eyebrow>
              <h2 className="mt-3 text-[1.8rem] font-extrabold tracking-tight leading-tight">
                Choose a section
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-white/76">
                Tap a section to open details without the long-scroll overload.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <MobileSectionCard
                  label="Overview"
                  title="What this page covers"
                  body="See the scope of residential design support, commercial concept studies, and documentation help."
                  onClick={() => setActiveMobileSection("overview")}
                />

                <MobileSectionCard
                  label="Residential"
                  title="Residential Project Visuals"
                  body="Open residential concept visuals and project presentation images."
                  onClick={() => setActiveMobileSection("residential")}
                />

                <MobileSectionCard
                  label="Commercial"
                  title="Commercial Concepts"
                  body="Browse flex industrial, retail, church, and other commercial concept examples."
                  onClick={() => setActiveMobileSection("commercial")}
                />

                <MobileSectionCard
                  label="Pricing"
                  title="Project Investment Guide"
                  body="Review starting ranges for residential and commercial drawing support."
                  onClick={() => setActiveMobileSection("investment")}
                />

                <MobileSectionCard
                  label="Notes"
                  title="Important Project Notes"
                  body="View engineering, deposits, pricing, and construction responsibility notes."
                  onClick={() => setActiveMobileSection("notes")}
                />
              </div>
            </div>
          ) : (
            <div ref={mobileDetailRef}>{renderMobileSectionDetail()}</div>
          )}
        </section>

        <section className="mx-auto mt-10 max-w-7xl hidden md:block md:mt-12">
          <div className={panelClass}>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold tracking-[0.20em] text-white/66">
                WHAT THIS PAGE COVERS
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Residential design support, commercial concept studies, and
                documentation that helps projects move forward clearly.
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
                This work is built to help clients, builders, and project teams
                make cleaner decisions earlier — whether that means testing a
                concept, documenting existing conditions, refining a layout, or
                creating permit-support drawings for the next step in the
                process.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-black/16 p-5 ring-1 ring-white/8">
                <h3 className="text-sm font-semibold text-white/92">
                  Typical support
                </h3>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed text-white/76">
                  <li>Concept plans and layout refinement</li>
                  <li>As-builts with design overlays</li>
                  <li>Permit-ready drawing sets when needed</li>
                  <li>Cabinetry planning integrated into the scope</li>
                  <li>Builder and trade coordination support</li>
                  <li>Commercial planning and documentation support</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-black/16 p-5 ring-1 ring-white/8">
                <h3 className="text-sm font-semibold text-white/92">
                  Best fit for
                </h3>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed text-white/76">
                  <li>New homes, remodels, and additions</li>
                  <li>Homeowners turning ideas into clear drawings</li>
                  <li>Builders needing fast documentation help</li>
                  <li>Tenant improvement and renovation planning</li>
                  <li>Commercial clients exploring early direction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 hidden md:block md:mt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Residential Project Visuals
              </h2>
              <p className="mt-3 max-w-3xl text-white/80 leading-relaxed">
                Concept sketches, client-facing presentation visuals, and
                residential design studies used to communicate direction clearly
                before construction begins.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {residentialGallery.map((item) => (
              <GalleryCard
                key={item.title}
                item={item}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 hidden rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-md md:block md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Built to communicate clearly
              </h2>
              <p className="mt-3 max-w-2xl text-white/82 leading-relaxed">
                Whether the project needs an early concept visual, a refined
                plan for client approval, or documentation that supports the
                next step in the process, the goal is clarity — visually,
                spatially, and in execution.
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

        <section className="mt-12 hidden md:block md:mt-14">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Commercial Concepts
          </h2>
          <p className="mt-3 max-w-3xl text-white/80 leading-relaxed">
            Illustrative concept studies showing capability for early planning,
            layout direction, permit-support documentation, and presentation
            visuals across commercial project types.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {commercialGallery.map((item) => (
              <GalleryCard
                key={item.title}
                item={item}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 hidden rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-md md:block md:p-6">
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

        <section className="mt-10 hidden rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-md md:block md:p-6">
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

        <section className="mt-10">
          <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10 backdrop-blur-md md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Need design support or permit-ready drawings?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/76 md:text-base">
                  We can help with concept development, existing-condition
                  capture, layout refinement, and drawing packages built for the
                  next step.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/quote")}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Get a Quote
                </button>

                <Link
                  href="/services"
                  className="rounded-full border border-white/22 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/8"
                >
                  Back to Services
                </Link>
              </div>
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
              className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-[#161616] shadow-[0_24px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/12"
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
                      onClick={() => {
                        setActiveItem(null);
                        router.push("/quote");
                      }}
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
    </div>
  );
}
