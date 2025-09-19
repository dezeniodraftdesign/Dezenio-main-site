"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import ScrollOffsets from "./components/ScrollOffsets";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  // Auto-open the modal if we arrive with ?quote=1
  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  return (
    <div
      id="top"
      className="relative text-white
                 pb-[calc(var(--bottom-band-height,64px)+140px)]" /* keep content above float */
    >
      <ScrollOffsets />

      {/* Static background image; replace file to change the look */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      {/* HERO: slightly shorter so bottom isn't under the float */}
      <section className="min-h-[86vh] px-4 pt-24 md:pt-28 text-center flex items-center">
        <div className="mx-auto max-w-5xl -translate-y-[4vh] md:-translate-y-[6vh]">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Premium Design.
            <br />
            Unmatched Execution.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-white/80 md:text-xl">
            Permit-focused construction documents, site planning, and full house
            designs — partnered with Dezenio Cabinetry. We also handle{" "}
            <strong className="text-white">structural framing</strong>,
            <strong className="text-white"> carpentry</strong>, and{" "}
            <strong className="text-white">
              turnkey cabinetry installation
            </strong>
            for a buildable, end-to-end result.
          </p>
          <div className="mt-8 flex justify-center gap-3">
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
              Contact Us
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
            We serve residential and small commercial projects with precision
            docs and turnkey delivery.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Construction Documents",
                image: "/sections/plans.png",
                blurb:
                  "Site plans, foundations, roof & framing, elevations, 3D renderings.",
              },
              {
                title: "Design & Remodeling",
                image: "/sections/render.png",
                blurb:
                  "Concepts to permit-ready details. As-builts, renovations, full house design.",
              },
              {
                title: "Cabinetry: Design & Install",
                image: "/sections/cabinetry.png",
                blurb:
                  "Factory-direct supply, professional design, expert installation.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-white">
                    {c.title}
                  </h4>
                  <p className="mt-3 text-sm text-white/80">{c.blurb}</p>
                </div>
              </article>
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
              Boutique Design Firm in Nashville, TN
            </h3>
            <p className="mt-4 text-white/80">
              We specialize in permit-focused construction documents and
              collaborate with clients, builders, and inspectors to create
              clear, buildable plans. Through Dezenio Cabinetry, we deliver
              premium kitchen & bath cabinetry with the same precision.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src="/about/house-elevation.png"
              alt="Design elevation"
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
              <p>Mailing: 4235 Hillsboro Pike, Ste 300, Nashville, TN 37215</p>
            </div>
            <button
              onClick={() => setQuoteOpen(true)}
              className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Open Quote Form
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

      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
