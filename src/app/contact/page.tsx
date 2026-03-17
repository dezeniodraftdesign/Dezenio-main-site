"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    if (search.get("quote") === "1") setQuoteOpen(true);
  }, [search]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Dezenio Draft Design, Inc.",
      url: "https://dezeniodraftdesign.com/contact",
      telephone: "+16154742004",
      email: "info@dezeniodraftdesign.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashville",
        addressRegion: "TN",
        addressCountry: "US",
      },
      areaServed: [
        "Nashville, TN",
        "Franklin, TN",
        "Brentwood, TN",
        "Nolensville, TN",
        "Smyrna, TN",
        "Murfreesboro, TN",
        "Mount Juliet, TN",
        "Hendersonville, TN",
      ],
      description:
        "Contact Dezenio Draft Design for cabinetry planning, concept design, permit-ready construction documents, and remodel coordination in Nashville and Middle Tennessee.",
    }),
    [],
  );

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+180px)] text-white"
    >
      <ScrollOffsets />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Image
          src="/backgrounds/Dezenio-HomeBG.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[3.15] object-[2%_101%] md:scale-100 md:object-[50%_81%]"
        />
        <div className="absolute inset-0 bg-black/42 md:bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/18 to-black/44 md:from-black/24 md:via-black/10 md:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_34%)] md:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.12),transparent_36%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl pt-20 text-center md:pt-24">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/72">
            CONTACT
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Let&apos;s talk about your project.
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white/86 md:text-lg md:leading-8">
            Cabinetry-first execution with concept design, permit-ready
            construction documents, and remodel coordination when the scope
            needs a more complete path forward.
          </p>
        </section>

        <section className="mx-auto mt-8 max-w-6xl">
          <div className="grid gap-7 lg:grid-cols-[1.32fr_0.95fr] items-start">
            <div className="rounded-[28px] bg-white/8 p-5 ring-1 ring-white/10 backdrop-blur-md">
              <h2 className="text-[18px] font-semibold text-white md:text-[19px]">
                Service area
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/82">
                Nashville and surrounding Middle Tennessee — including Franklin,
                Brentwood, Nolensville, Smyrna, Murfreesboro, Mount Juliet, and
                Hendersonville.
              </p>

              <div className="mt-4 overflow-hidden rounded-[20px] ring-1 ring-white/12">
                <iframe
                  title="Dezenio Draft Design service area map"
                  src="https://www.google.com/maps?q=Nashville,TN&z=9&output=embed"
                  className="h-[240px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-white/72">
                Most work is centered around the greater Nashville market, but
                selected nearby projects can be reviewed based on scope.
              </p>
            </div>

            <div className="rounded-[28px] bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur-md min-h-[100%]">
              <h2 className="text-[18px] font-semibold text-white md:text-[19px]">
                Contact
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-white/82">
                <div>
                  <p className="font-semibold text-white/92">Phone:</p>
                  <a
                    href="tel:+16154742004"
                    className="text-white/82 transition hover:text-white"
                  >
                    (615) 474-2004
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white/92">Email:</p>
                  <a
                    href="mailto:info@dezeniodraftdesign.com"
                    className="text-white/82 transition hover:text-white"
                  >
                    info@dezeniodraftdesign.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white/92">
                    Based in: Nashville, Tennessee
                  </p>
                  <p className="text-white/76">
                    Remote quoting can work when plans, measurements, and
                    selections are already clear.
                  </p>
                </div>

                <div className="pt-1">
                  <p className="text-sm leading-7 text-white/72">
                    Early conversations are helpful. Even if every detail is not
                    finalized yet, we can usually help identify the clearest
                    next step for cabinetry, design scope, or permit-ready
                    direction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-[28px] bg-black/16 p-5 ring-1 ring-white/10 backdrop-blur-md">
            <h2 className="text-[18px] font-semibold text-white md:text-[19px]">
              Best way to reach us
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <p className="text-sm leading-7 text-white/80">
                For the fastest turnaround, send plans, site photos,
                inspiration, measurements, and your desired timeline.
              </p>

              <p className="text-sm leading-7 text-white/76">
                Cabinetry inquiries move fastest when we have appliance info,
                finish direction, and rough layout intent.
              </p>

              <p className="text-sm leading-7 text-white/76">
                Remodel and plan-set inquiries move fastest when we have
                existing conditions, sketches, or prior drawings.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-7 max-w-6xl">
          <div className="grid gap-7 md:grid-cols-3">
            <div className="rounded-[26px] bg-black/16 p-5 ring-1 ring-white/10 backdrop-blur-md">
              <h3 className="text-[16px] font-semibold text-white md:text-[18px]">
                Cabinetry projects
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Kitchen, bath, built-in, and cabinetry package work with
                guidance on layout, finishes, ordering coordination, delivery,
                and installation support.
              </p>
            </div>

            <div className="rounded-[26px] bg-white/8 p-5 ring-1 ring-white/10 backdrop-blur-md">
              <h3 className="text-[16px] font-semibold text-white md:text-[18px]">
                Design + documents
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Concept design, as-builts, floor plans, elevations, and
                permit-ready drawing support when a project needs buildable
                direction beyond product selection alone.
              </p>
            </div>

            <div className="rounded-[26px] bg-black/16 p-5 ring-1 ring-white/10 backdrop-blur-md">
              <h3 className="text-[16px] font-semibold text-white md:text-[18px]">
                Remodel coordination
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Residential remodel and addition support where cabinetry,
                planning, and practical field coordination need to stay aligned.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-7 max-w-6xl">
          <div className="rounded-[28px] bg-black/16 p-6 ring-1 ring-white/10 backdrop-blur-md md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Ready to start the conversation?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/76 md:text-base">
                  Send us the basics and we&apos;ll help point the project in
                  the right direction.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Get a Quote
                </button>

                <Link
                  href="/cabinetry"
                  className="rounded-full border border-white/22 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Cabinetry
                </Link>

                <Link
                  href="/services"
                  className="rounded-full border border-white/22 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
