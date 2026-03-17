"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../components/Header";
import QuoteModal from "../components/QuoteModal";
import ScrollOffsets from "../components/ScrollOffsets";

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <AboutInner />
    </Suspense>
  );
}

function AboutInner() {
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
      url: "https://dezeniodraftdesign.com/about",
      telephone: "+16154742004",
      founder: { "@type": "Person", name: "Pime Hernandez" },
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
        "Cabinetry-first execution with permit-ready construction documents serving Nashville and surrounding Middle Tennessee.",
    }),
    [],
  );

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+110px)] text-white"
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
          className="object-cover scale-[3.15] object-[2%_128%] md:scale-100 md:object-[50%_99%]"
        />
        <div className="absolute inset-0 bg-black/42 md:bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/18 to-black/44 md:from-black/24 md:via-black/10 md:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_34%)] md:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.12),transparent_36%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl pt-14 text-center md:pt-20">
          <p
            className="text-xs font-semibold tracking-[0.22em] text-white/82"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.28)" }}
          >
            ABOUT • NASHVILLE, TN
          </p>

          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight leading-[1.04] text-white md:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.34)" }}
          >
            Cabinetry-first.
            <br />
            Plans when you need them.
          </h1>

          <p
            className="mx-auto mt-6 max-w-4xl text-base leading-7 text-white/92 md:mt-8 md:text-lg md:leading-8"
            style={{ textShadow: "0 6px 24px rgba(0,0,0,0.22)" }}
          >
            Dezenio Draft Design is built around clean execution — cabinetry
            planning, ordering coordination, and installation support first,
            with concept design and permit-ready construction documents when the
            project needs a more complete path forward.
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-7xl md:mt-12">
          <div className="grid gap-5 md:gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-black/28 p-5 ring-1 ring-white/12 backdrop-blur-md md:p-6">
              <h2 className="text-xl font-semibold text-white">
                Cabinetry packages
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/88">
                Design guidance, quoting, ordering coordination, delivery
                planning, and professional installation built for cleaner
                timelines and fewer surprises.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                <li>• Appliance planning and panels</li>
                <li>• Trim, fillers, moldings, and hardware</li>
                <li>• Builder coordination and punch support</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-black/28 p-5 ring-1 ring-white/12 backdrop-blur-md md:p-6">
              <h2 className="text-xl font-semibold text-white">
                Construction documents
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/88">
                Permit-ready drawings for remodel and addition scope — clear,
                buildable plans that help approvals move faster and reduce field
                confusion.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                <li>• As-builts when needed</li>
                <li>• Floor plans, elevations, and sections</li>
                <li>• Site planning and basic coordination</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-black/28 p-5 ring-1 ring-white/12 backdrop-blur-md md:p-6">
              <h2 className="text-xl font-semibold text-white">Service area</h2>
              <p className="mt-3 text-sm leading-7 text-white/88">
                Nashville and surrounding Middle Tennessee — including Franklin,
                Brentwood, Nolensville, Smyrna, Murfreesboro, Mount Juliet, and
                Hendersonville.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/80">
                Remote quoting can work when plans, measurements, and selections
                are already clear.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl md:mt-24 lg:mt-28">
          <div className="rounded-[28px] bg-black/18 p-4 ring-1 ring-white/10 backdrop-blur-md md:p-6">
            <div className="rounded-[22px] bg-white/[0.03] p-5 ring-1 ring-white/8 md:p-6 lg:p-7">
              <p className="text-xs font-semibold tracking-[0.20em] text-white/66">
                MEET THE OWNER
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight leading-[1.04] md:text-[3rem] md:leading-[1.02]">
                Pime Hernandez
              </h2>

              <div className="mt-5 md:hidden">
                <div className="overflow-hidden">
                  <p className="text-[14px] leading-7 text-white/84">
                    Pime Hernandez leads Dezenio with a cabinetry-first standard
                    shaped by decades of experience across construction, design,
                    sales, and project coordination.
                  </p>

                  <p className="mt-4 text-[14px] leading-7 text-white/80">
                    After relocating to Middle Tennessee in 2013, he built years
                    of local experience in kitchen and bath design, cabinetry
                    execution, remodel-related planning, and the practical side
                    of how projects move from concept to completion.
                  </p>

                  <div className="float-left mr-4 mt-5 mb-3">
                    <div className="overflow-hidden rounded-[16px] bg-black/10 p-2 ring-1 ring-white/8">
                      <Image
                        src="/about/pime.png"
                        alt="Pime Hernandez"
                        width={900}
                        height={1400}
                        priority
                        className="h-auto max-h-[184px] w-auto max-w-[132px] rounded-[12px] object-contain"
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-[14px] leading-7 text-white/80">
                    His background began in construction in his late teens and
                    now spans nearly three decades across framing, interior
                    millwork, finish work, flooring, tile, countertops,
                    cabinetry, design, sales, project management, and showroom
                    leadership.
                  </p>

                  <p className="mt-4 text-[14px] leading-7 text-white/80">
                    That broader range of experience gives Dezenio a stronger
                    perspective — one shaped not only by how a project looks on
                    paper, but by how it comes together in the field. It
                    continues to influence the company’s approach today, with
                    careful attention to planning, product selection,
                    coordination, installation awareness, and the belief that
                    better decisions early in the process lead to better results
                    at installation and completion.
                  </p>

                  <p className="mt-4 text-[14px] leading-7 text-white/80">
                    Dezenio is owner-led, hands-on, and built for clients who
                    value clarity, communication, and direct involvement
                    throughout the process. The work is grounded in practical
                    understanding, cabinetry-forward thinking, and a commitment
                    to delivering results that stay aligned with the original
                    design intent.
                  </p>

                  <div className="clear-both" />
                </div>
              </div>

              <div className="mt-6 hidden md:block">
                <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[168px_minmax(0,1fr)]">
                  <div className="self-start justify-self-start">
                    <div className="overflow-hidden rounded-[18px] bg-black/10 p-2 ring-1 ring-white/8">
                      <Image
                        src="/about/pime.png"
                        alt="Pime Hernandez"
                        width={900}
                        height={1400}
                        priority
                        className="h-auto max-h-[210px] w-auto max-w-[132px] rounded-[14px] object-contain lg:max-h-[220px] lg:max-w-[138px] xl:max-h-[228px] xl:max-w-[144px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-[14px] leading-8 text-white/80 lg:text-[15px]">
                    <p className="text-white/84">
                      Pime Hernandez leads Dezenio with a cabinetry-first
                      standard shaped by decades of experience across
                      construction, design, sales, and project coordination.
                    </p>

                    <p>
                      After relocating to Middle Tennessee in 2013, he built
                      years of local experience in kitchen and bath design,
                      cabinetry execution, remodel-related planning, and the
                      practical side of how projects move from concept to
                      completion.
                    </p>

                    <p>
                      His background began in construction in his late teens and
                      now spans nearly three decades across framing, interior
                      millwork, finish work, flooring, tile, countertops,
                      cabinetry, design, sales, project management, and showroom
                      leadership.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-[14px] leading-8 text-white/80 lg:text-[15px]">
                  <p>
                    That broader range of experience gives Dezenio a stronger
                    perspective — one shaped not only by how a project looks on
                    paper, but by how it comes together in the field. It
                    continues to influence the company’s approach today, with
                    careful attention to planning, product selection,
                    coordination, installation awareness, and the belief that
                    better decisions early in the process lead to better results
                    at installation and completion.
                  </p>

                  <p>
                    Dezenio is owner-led, hands-on, and built for clients who
                    value clarity, communication, and direct involvement
                    throughout the process. The work is grounded in practical
                    understanding, cabinetry-forward thinking, and a commitment
                    to delivering results that stay aligned with the original
                    design intent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl md:mt-24 lg:mt-28">
          <div className="rounded-2xl bg-black/18 p-6 ring-1 ring-white/10 backdrop-blur-md md:p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-[0.20em] text-white/66">
                  OUR PROCESS
                </p>

                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-white/80 md:text-base">
                  <li>
                    <span className="font-semibold text-white/92">
                      1. Discovery:
                    </span>{" "}
                    goals, budget range, timeline, and site conditions.
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">
                      2. Design + Specs:
                    </span>{" "}
                    layout, selections, appliance planning, trim, and hardware.
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">
                      3. Quote + Order:
                    </span>{" "}
                    confirm scope, finalize lead times, and place orders.
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">
                      4. Delivery + Install:
                    </span>{" "}
                    coordinate delivery, stage materials, install, and punch.
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">
                      5. Docs if needed:
                    </span>{" "}
                    produce permit-ready plans for remodel or addition scope.
                  </li>
                </ol>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.20em] text-white/66">
                  CABINETRY LINES
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
                  We help guide clients toward the right line based on budget,
                  lead time, finish level, and how custom the project really
                  needs to be.
                </p>

                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/80 md:text-base">
                  <li>
                    <span className="font-semibold text-white/92">
                      Kith Kitchens
                    </span>{" "}
                    — primary line
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">Mouser</span>{" "}
                    — premium / custom
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">
                      ProCraft
                    </span>{" "}
                    — quick-ship options
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">Bishop</span>
                  </li>
                  <li>
                    <span className="font-semibold text-white/92">Adornus</span>{" "}
                    — available on request
                  </li>
                </ul>

                <p className="mt-4 text-sm text-white/70">
                  Hardware and storage support includes Richelieu and
                  Rev-A-Shelf.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl md:mt-16">
          <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10 backdrop-blur-md md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Ready to price a project?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/76 md:text-base">
                  Fast quotes when plans are clear. We can also help define
                  scope when they are not.
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
