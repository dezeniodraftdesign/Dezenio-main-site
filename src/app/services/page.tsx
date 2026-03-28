"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesInner />
    </Suspense>
  );
}

function ServicesInner() {
  const router = useRouter();

  const cards: {
    title: string;
    href: string;
    image: string;
    blurb: string;
    imageStyle?: CSSProperties;
  }[] = [
    {
      title: "Cabinetry: Sales, Design & Installation",
      href: "/cabinetry",
      image: "/backgrounds/Dezenio-HomeBG.png",
      imageStyle: { objectPosition: "50% 33.5%" },
      blurb:
        "Factory-direct cabinetry sales with design guidance, finish and product selection, ordering coordination, delivery planning, and installation support for kitchens, baths, and residential remodels.",
    },
    {
      title: "Concept Design & Construction Documents",
      href: "/design-documents",
      image: "/sections/plans.png",
      blurb:
        "Concept design, layout development, as-builts, visual planning, and permit-focused construction documents that help move a project from early ideas into clear, buildable direction.",
    },
    {
      title: "Construction & Remodeling",
      href: "/construction-remodeling",
      image: "/sections/render.png",
      imageStyle: { objectPosition: "50% 50%" },
      blurb:
        "Renovation planning, additions, framing coordination, and project support that helps move residential work from concept into execution.",
    },
  ];

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+76px)] text-white md:pb-[calc(var(--bottom-band-height,64px)+160px)]"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/sections/lakeshore.png"
          alt="Dezenio Draft Design services background"
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

      <Header />

      <main className="mx-auto max-w-7xl px-4 pt-1 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl pt-16 text-center md:pt-20">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-white/72 md:text-xs">
            CABINETRY • DESIGN • CONSTRUCTION
          </p>

          <h1 className="mt-3 text-[2.2rem] font-extrabold tracking-tight leading-[1.02] md:text-6xl">
            Services
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-white/84 md:mt-5 md:text-lg">
            Cabinetry-first services supported by concept design, construction
            documents, and remodel coordination across Nashville and Middle
            Tennessee.
          </p>

          <div className="mt-5 flex flex-col gap-3 md:hidden">
            <button
              onClick={() => router.push("/quote")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get a Quote
            </button>

            <Link
              href="/cabinetry"
              className="rounded-full border border-white/22 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
            >
              View Cabinetry
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-7 max-w-7xl md:mt-10">
          <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3">
            {cards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group overflow-hidden rounded-2xl bg-white/5 text-left ring-1 ring-white/8 backdrop-blur-sm transition hover:bg-white/7 hover:ring-white/14"
              >
                <div className="relative h-[200px] overflow-hidden md:h-[220px]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover scale-[1.08] transition duration-700 group-hover:scale-[1.11]"
                    style={c.imageStyle}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-black/8 to-transparent" />
                </div>

                <div className="flex min-h-[210px] flex-col p-5 md:min-h-[240px] md:p-6">
                  <h3 className="text-[1.02rem] font-semibold leading-snug text-white md:text-[1.08rem]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/80 md:mt-4 md:leading-7">
                    {c.blurb}
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

        <section className="mx-auto mt-10 max-w-6xl md:mt-16">
          <div className="rounded-2xl bg-white/5 px-5 py-7 ring-1 ring-white/8 text-center backdrop-blur-sm md:px-8 md:py-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-white/80 md:mt-5 md:text-lg md:leading-relaxed">
              Whether you are planning cabinetry, concept work, construction
              documents, or a remodel, we can help point you in the right
              direction.
            </p>

            <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap md:items-center md:justify-center">
              <button
                onClick={() => router.push("/quote")}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 md:py-2.5"
              >
                Get a Quote
              </button>

              <Link
                href="/cabinetry"
                className="rounded-full border border-white/22 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8 md:py-2.5"
              >
                View Cabinetry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
