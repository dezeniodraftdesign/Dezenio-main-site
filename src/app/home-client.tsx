"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./components/Header";
import QuoteModal from "./components/QuoteModal";
import ScrollOffsets from "./components/ScrollOffsets";

type ServiceCard = {
  title: string;
  href: string;
  img: string;
  body: string;
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
      img: "/sections/cabinetry.png",
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
      img: "/sections/campbell.png",
      body: "Renovation planning, additions, framing coordination, and project support that helps move residential work from concept into execution.",
    },
  ];

  return (
    <main
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+180px)] text-white"
    >
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

      <section className="mx-auto max-w-7xl px-4 pt-40 sm:px-6 md:min-h-[88vh] md:pt-44 lg:px-8">
        <div className="mx-auto max-w-5xl pb-24 text-center md:pb-32">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/72">
            CABINETRY • DESIGN • CONSTRUCTION
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Custom Kitchen Cabinets
            <br />
            &amp; Concept Design in Nashville, TN
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-white/86 md:text-lg md:leading-8">
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {serviceCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group overflow-hidden rounded-2xl bg-white/5 text-left ring-1 ring-white/8 backdrop-blur-sm transition hover:bg-white/7 hover:ring-white/14"
            >
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-black/8 to-transparent" />
              </div>

              <div className="flex min-h-[240px] flex-col p-6">
                <h3 className="text-[1.08rem] font-semibold leading-snug text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  {card.body}
                </p>
                <p className="mt-auto pt-6 text-sm font-semibold text-white/90">
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

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/5 px-6 py-8 ring-1 ring-white/8 backdrop-blur-sm md:px-8 md:py-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              A more connected approach
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/82 md:text-lg">
              Some projects only need cabinetry. Others need cabinetry plus
              clearer design direction, as-builts, permit drawings, or remodel
              coordination. Dezenio is structured to support that overlap
              without making the process feel disjointed.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-2">
            <div className="rounded-xl bg-black/12 p-5 ring-1 ring-white/7 text-left backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white/92">
                What we help with
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/74">
                <li>
                  • Cabinetry sales, layout guidance, and installation support
                </li>
                <li>
                  • Concept design and visual planning for residential projects
                </li>
                <li>• As-builts and permit-focused construction documents</li>
                <li>
                  • Remodel and addition planning with practical coordination
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-black/12 p-5 ring-1 ring-white/7 text-left backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white/92">
                Best fit for
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/74">
                <li>• Homeowners planning kitchens, remodels, or additions</li>
                <li>
                  • Builders needing clean design and documentation support
                </li>
                <li>• Projects where cabinetry and broader planning overlap</li>
                <li>
                  • Clients wanting a clearer path from concept to execution
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/5 px-6 py-10 ring-1 ring-white/8 backdrop-blur-sm md:px-8 md:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to move your project forward?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/80 md:text-lg">
              Whether you need cabinetry, design support, construction
              documents, or a combination of all three, the next step is a clear
              conversation about your scope, timing, and goals.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Get a Quote
              </button>

              <Link
                href="/cabinetry"
                className="rounded-full border border-white/22 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                View Cabinetry
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/22 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}
