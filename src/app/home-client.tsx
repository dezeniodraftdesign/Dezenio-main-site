"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./components/Header";

import QuoteModal from "./components/QuoteModal";
import ScrollOffsets from "./components/ScrollOffsets";

export default function HomeClient() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  // Auto-open the modal if we arrive with ?quote=1
  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      {/* Static background image */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* ✅ LIGHTER overlay (was bg-black/55). Keep it simple. */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      {/* HERO */}
      <section className="min-h-[88vh] px-4 pt-24 md:pt-28 flex items-center">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Custom Kitchen Cabinets &amp; Installation
            <br />
            in Nashville, TN
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-white/85 md:text-xl">
            Authorized cabinetry access through Dezenio Cabinetry — including{" "}
            <strong className="text-white">Kith</strong>,{" "}
            <strong className="text-white">Mouser</strong>, and{" "}
            <strong className="text-white">ProCraft</strong> (plus{" "}
            <strong className="text-white">Bishop</strong> and{" "}
            <strong className="text-white">Adornus</strong> on request). We
            handle <strong className="text-white">design</strong>,{" "}
            <strong className="text-white">ordering</strong>, and{" "}
            <strong className="text-white">turnkey installation</strong> for
            homeowners and builders across Nashville and Middle Tennessee.
            <br className="hidden md:block" /> Hardware &amp; storage:{" "}
            <strong className="text-white">Richelieu</strong> and{" "}
            <strong className="text-white">Rev-A-Shelf</strong>. Need plans too?
            We also provide{" "}
            <strong className="text-white">
              permit-focused construction documents
            </strong>{" "}
            and site planning for a clean, buildable result.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#services"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Explore Services
            </a>
            <button
              onClick={() => setQuoteOpen(true)}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="section-anchor isolate-lg py-16 md:py-20 scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-white/80">
            Cabinetry-first delivery, with permit-ready documentation and
            buildable planning when you need it.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Cabinetry: Design & Install",
                href: "/cabinetry",
                image: "/sections/cabinetry.png",
                blurb:
                  "Kith, Mouser, ProCraft (plus Bishop + Adornus on request) — design support, ordering, delivery, and full installation. Hardware: Richelieu + Rev-A-Shelf.",
              },
              {
                title: "Construction Documents",
                href: "/construction-documents",
                image: "/sections/plans.png",
                blurb:
                  "Permit-focused plans: site, foundation, framing, roof, elevations, and details for buildable results.",
              },
              {
                title: "Design & Remodeling Support",
                href: "/design-remodeling",
                image: "/sections/render.png",
                blurb:
                  "Concepts to permit-ready details — renovations, additions, as-builts, and coordination support.",
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/7.5 hover:ring-white/20"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-white">
                    {c.title}
                  </h4>
                  <p className="mt-3 text-sm text-white/80">{c.blurb}</p>
                  <p className="mt-4 text-sm font-semibold text-white/90">
                    Learn more{" "}
                    <span className="inline-block transition group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-anchor isolate-xl py-16 md:py-20 scroll-mt-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h3 className="text-3xl font-bold md:text-4xl text-white">
              Cabinetry-first. Plans when you need them.
            </h3>
            <p className="mt-4 text-white/80">
              Dezenio Draft Design delivers permit-focused construction
              documents and site planning — and through Dezenio Cabinetry, we
              provide premium kitchen &amp; bath cabinetry with full
              installation.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src="/about/house-elevation.png"
              alt="Residential elevation example"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="section-anchor isolate-xl py-16 md:py-20 scroll-mt-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h3 className="text-3xl font-bold md:text-4xl text-white">
              Contact
            </h3>
            <p className="mt-3 text-white/80">
              Serving Nashville and the surrounding Middle Tennessee area.
            </p>

            <div className="mt-6 space-y-3 text-white/90">
              <p>(615) 474-2004</p>
              <p>info@dezeniodraftdesign.com</p>
              <p>Nashville, Tennessee</p>
            </div>

            <button
              onClick={() => setQuoteOpen(true)}
              className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Get a Quote
            </button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <iframe
              title="Service Area"
              src="https://www.google.com/maps?q=Nashville%20TN&z=10&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
