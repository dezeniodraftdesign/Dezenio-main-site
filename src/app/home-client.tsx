"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Hammer, House, PencilRuler } from "lucide-react";

import Header from "./components/Header";
import QuoteModal from "./components/QuoteModal";
import ScrollOffsets from "./components/ScrollOffsets";

type ServiceCard = {
  title: string;
  href: string;
  img: string;
  body: string;
  imageStyle?: CSSProperties;
};

export default function HomeClient() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  const serviceCards: ServiceCard[] = [
    {
      title: "Cabinetry: Sales, Design & Installation",
      href: "/cabinetry",
      img: "/backgrounds/Dezenio-HomeBG.png",
      imageStyle: { objectPosition: "50% 33.3%" },
      body: "Factory-direct cabinetry sales with design guidance, finish and product selection, ordering coordination, delivery planning, and installation support for kitchens, baths, and residential remodels.",
    },
    {
      title: "Concept Design & Construction Documents",
      href: "/design-documents",
      img: "/sections/plans.png",
      body: "Concept design, layout development, as-builts, visual planning, and permit-focused construction documents that help move a project from early ideas into clear, buildable direction.",
    },
    {
      title: "Construction & Remodeling",
      href: "/construction-remodeling",
      img: "/sections/render.png",
      imageStyle: { objectPosition: "50% 50%" },
      body: "Renovation planning, additions, framing coordination, and project support that helps move residential work from concept into execution.",
    },
  ];

  return (
    <main id="top" className="relative min-h-screen pb-28 text-white md:pb-24">
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/sections/lakeshore.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/34" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_40%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      {/* MOBILE */}
      <div className="md:hidden px-5 pt-6 pb-28">
        <section className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-white/72">
            CABINETRY • DESIGN • CONSTRUCTION
          </p>

          <h1 className="mt-4 text-[2.35rem] font-extrabold leading-[1.04] tracking-tight">
            Custom Kitchen Cabinets
            <br />
            &amp; Concept Design in Nashville, TN
          </h1>

          <p className="mt-5 text-[15px] leading-7 text-white/84">
            Cabinetry-first execution with design support, as-builts,
            permit-ready construction documents, and remodel coordination.
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a Project
            </button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cabinetry"
                className="rounded-full border border-white/20 bg-white/6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Cabinetry
              </Link>

              <Link
                href="/design-documents"
                className="rounded-full border border-white/20 bg-white/6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Design
              </Link>
            </div>
          </div>
        </section>

        {/* CONDENSED MOBILE SERVICE SELECTOR */}
        <section className="mt-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Core Services</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-white/80">
              Three focused paths to keep projects clear, aligned, and easier to
              move forward.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <Link
              href="/cabinetry"
              className="group flex items-center gap-4 rounded-[24px] bg-[rgba(20,22,28,0.65)] px-4 py-4 ring-1 ring-white/8 backdrop-blur-md transition hover:bg-white/8 hover:ring-white/14"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                <House className="h-5 w-5 text-white/88" strokeWidth={2} />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-[15px] font-semibold text-white">
                  Cabinetry
                </p>
                <p className="mt-1 text-[13px] leading-5 text-white/70">
                  Layouts, selections, ordering, and install support.
                </p>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" />
            </Link>

            <Link
              href="/design-documents"
              className="group flex items-center gap-4 rounded-[24px] bg-[rgba(20,22,28,0.65)] px-4 py-4 ring-1 ring-white/8 backdrop-blur-md transition hover:bg-white/8 hover:ring-white/14"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                <PencilRuler
                  className="h-5 w-5 text-white/88"
                  strokeWidth={2}
                />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-[15px] font-semibold text-white">
                  Design Documents
                </p>
                <p className="mt-1 text-[13px] leading-5 text-white/70">
                  Concepts, as-builts, and permit-ready drawing sets.
                </p>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" />
            </Link>

            <Link
              href="/construction-remodeling"
              className="group flex items-center gap-4 rounded-[24px] bg-[rgba(20,22,28,0.65)] px-4 py-4 ring-1 ring-white/8 backdrop-blur-md transition hover:bg-white/8 hover:ring-white/14"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                <Hammer className="h-5 w-5 text-white/88" strokeWidth={2} />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-[15px] font-semibold text-white">
                  Remodeling
                </p>
                <p className="mt-1 text-[13px] leading-5 text-white/70">
                  Additions, planning, framing coordination, and scope support.
                </p>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-[28px] bg-[rgba(20,22,28,0.65)] px-5 py-6 text-center ring-1 ring-white/8 backdrop-blur-md">
          <h2 className="text-[2rem] font-bold tracking-tight leading-tight">
            Ready to move your project forward?
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-white/82">
            Whether you need cabinetry, design support, construction documents,
            or a combination of all three, the next step is a clear conversation
            about your scope, timing, and goals.
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get a Quote
            </button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cabinetry"
                className="rounded-full border border-white/20 bg-white/6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                View Cabinetry
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 bg-white/6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 md:min-h-[88vh] md:pt-40 lg:px-8">
          <div className="mx-auto max-w-5xl pb-14 text-center md:pb-28">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-white/72 sm:text-xs">
              CABINETRY • DESIGN • CONSTRUCTION
            </p>

            <h1 className="mt-4 text-[2.55rem] font-extrabold leading-[0.98] tracking-tight sm:text-5xl md:text-6xl">
              Custom Kitchen Cabinets
              <br />
              &amp; Concept Design in Nashville, TN
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-white/86 sm:text-base md:mt-8 md:max-w-4xl md:text-lg md:leading-8">
              Dezenio Draft Design is cabinetry-first, while also supporting
              residential remodels, additions, and selected commercial projects
              across Nashville and Middle Tennessee with concept design,
              as-builts, permit-ready construction documents, and remodel
              coordination.
            </p>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Core Services
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/80 md:text-lg">
              Three focused service paths built to keep projects clear, aligned,
              and easier to move forward.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:gap-8 md:grid-cols-3">
            {serviceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group overflow-hidden rounded-2xl bg-white/5 text-left ring-1 ring-white/8 backdrop-blur-sm transition hover:bg-white/7 hover:ring-white/14"
              >
                <div className="relative h-[200px] overflow-hidden md:h-[220px]">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover scale-[1.08] transition duration-700 group-hover:scale-[1.11]"
                    style={card.imageStyle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-black/8 to-transparent" />
                </div>

                <div className="flex min-h-[206px] flex-col p-5 md:min-h-[240px] md:p-6">
                  <h3 className="text-[1.05rem] font-semibold leading-snug text-white md:text-[1.08rem]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/80 md:mt-4 md:leading-7">
                    {card.body}
                  </p>
                  <p className="mt-auto pt-5 text-sm font-semibold text-white/90 md:pt-6">
                    Explore service{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 md:mt-20">
          <div className="rounded-2xl bg-white/5 px-5 py-7 ring-1 ring-white/8 backdrop-blur-sm md:px-8 md:py-10">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                A more connected approach
              </h2>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/82 md:mt-5 md:text-lg">
                Some projects only need cabinetry. Others need cabinetry plus
                clearer design direction, as-builts, permit drawings, or remodel
                coordination. Dezenio is structured to support that overlap
                without making the process feel disjointed.
              </p>
            </div>

            <div className="mx-auto mt-7 grid max-w-5xl gap-4 sm:grid-cols-2 md:mt-8 md:gap-5">
              <div className="rounded-xl bg-black/12 p-4 ring-1 ring-white/7 text-left backdrop-blur-sm md:p-5">
                <h3 className="text-sm font-semibold text-white/92">
                  What we help with
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/74">
                  <li>
                    • Cabinetry sales, layout guidance, and installation support
                  </li>
                  <li>
                    • Concept design and visual planning for residential
                    projects
                  </li>
                  <li>• As-builts and permit-focused construction documents</li>
                  <li>
                    • Remodel and addition planning with practical coordination
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-black/12 p-4 ring-1 ring-white/7 text-left backdrop-blur-sm md:p-5">
                <h3 className="text-sm font-semibold text-white/92">
                  Best fit for
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/74">
                  <li>
                    • Homeowners planning kitchens, remodels, or additions
                  </li>
                  <li>
                    • Builders needing clean design and documentation support
                  </li>
                  <li>
                    • Projects where cabinetry and broader planning overlap
                  </li>
                  <li>
                    • Clients wanting a clearer path from concept to execution
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 md:mt-20">
          <div className="rounded-2xl bg-white/5 px-5 py-8 ring-1 ring-white/8 backdrop-blur-sm md:px-8 md:py-12">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Ready to move your project forward?
              </h2>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/80 md:mt-5 md:text-lg">
                Whether you need cabinetry, design support, construction
                documents, or a combination of all three, the next step is a
                clear conversation about your scope, timing, and goals.
              </p>

              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Get a Quote
                </button>

                <Link
                  href="/cabinetry"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/22 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  View Cabinetry
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/22 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}
