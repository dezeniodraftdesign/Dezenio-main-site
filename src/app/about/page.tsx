"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

type MobileAboutSectionKey =
  | "packages"
  | "documents"
  | "area"
  | "owner"
  | "process";

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <AboutInner />
    </Suspense>
  );
}

function AboutInner() {
  const router = useRouter();
  const [openMobileSection, setOpenMobileSection] =
    useState<MobileAboutSectionKey | null>(null);

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

  const glassCard =
    "rounded-[22px] border border-white/12 bg-[rgba(12,14,20,0.40)] p-4 ring-1 ring-white/6 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.18)] md:rounded-[24px] md:p-6";

  const softPanel =
    "rounded-[24px] border border-white/10 bg-[rgba(10,12,18,0.28)] p-5 ring-1 ring-white/8 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] md:rounded-[28px] md:p-7";

  return (
    <div
      id="top"
      className="relative min-h-screen pb-[calc(var(--bottom-band-height,64px)+76px)] text-white md:pb-[calc(var(--bottom-band-height,64px)+110px)]"
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
          className="object-cover scale-[2.85] object-[8%_126%] md:scale-100 md:object-[50%_99%]"
        />
        <div className="absolute inset-0 bg-black/50 md:bg-black/32" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/16 to-black/46 md:from-black/24 md:via-black/10 md:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.20),transparent_34%)] md:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.12),transparent_36%)]" />
      </div>

      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl pt-12 text-center md:pt-20">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] text-white/78 md:text-xs"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.28)" }}
          >
            ABOUT • NASHVILLE, TN
          </p>

          <h1
            className="mt-4 text-[2.15rem] font-extrabold tracking-tight leading-[1.02] text-white md:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.34)" }}
          >
            Cabinetry-first.
            <br />
            Plans when you need them.
          </h1>

          <p
            className="mx-auto mt-4 max-w-4xl text-[15px] leading-7 text-white/88 md:mt-8 md:text-lg md:leading-8"
            style={{ textShadow: "0 6px 24px rgba(0,0,0,0.22)" }}
          >
            Dezenio Draft Design is built around clean execution — cabinetry
            planning, ordering coordination, and installation support first,
            with concept design and permit-ready construction documents when the
            project needs a more complete path forward.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:hidden">
            <button
              onClick={() => router.push("/quote")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a Project
            </button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cabinetry"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Cabinetry
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Services
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-5xl md:hidden">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
            About sections
          </p>
          <h2 className="mt-3 text-[1.85rem] font-extrabold tracking-tight leading-tight text-white">
            Choose a section
          </h2>
          <p className="mt-3 text-[15px] leading-6 text-white/76">
            Tap a section to keep the mobile experience tighter and easier to
            move through.
          </p>

          <div className="mt-4 space-y-3">
            <MobileAccordionCard
              label="Overview"
              title="Cabinetry packages"
              body="Design guidance, ordering coordination, delivery planning, and installation support."
              open={openMobileSection === "packages"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "packages" ? null : "packages",
                )
              }
            >
              <div className="space-y-3 text-[14px] leading-7 text-white/80">
                <p>
                  Design guidance, quoting, ordering coordination, delivery
                  planning, and professional installation built for cleaner
                  timelines and fewer surprises.
                </p>
                <ul className="space-y-2 text-[14px] leading-6 text-white/76">
                  <li>• Appliance planning and panels</li>
                  <li>• Trim, fillers, moldings, and hardware</li>
                  <li>• Builder coordination and punch support</li>
                </ul>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Documents"
              title="Construction documents"
              body="Permit-ready drawings for remodels, additions, and scope clarification."
              open={openMobileSection === "documents"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "documents" ? null : "documents",
                )
              }
            >
              <div className="space-y-3 text-[14px] leading-7 text-white/80">
                <p>
                  Permit-ready drawings for remodel and addition scope — clear,
                  buildable plans that help approvals move faster and reduce
                  field confusion.
                </p>
                <ul className="space-y-2 text-[14px] leading-6 text-white/76">
                  <li>• As-builts when needed</li>
                  <li>• Floor plans, elevations, and sections</li>
                  <li>• Site planning and basic coordination</li>
                </ul>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Area"
              title="Service area"
              body="Nashville and surrounding Middle Tennessee."
              open={openMobileSection === "area"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "area" ? null : "area",
                )
              }
            >
              <div className="space-y-3 text-[14px] leading-7 text-white/80">
                <p>
                  Nashville and surrounding Middle Tennessee — including
                  Franklin, Brentwood, Nolensville, Smyrna, Murfreesboro, Mount
                  Juliet, and Hendersonville.
                </p>
                <p className="text-white/72">
                  Remote quoting can work when plans, measurements, and
                  selections are already clear.
                </p>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Owner"
              title="Meet Pime Hernandez"
              body="Owner-led, cabinetry-first experience shaped by decades in construction, design, and execution."
              open={openMobileSection === "owner"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "owner" ? null : "owner",
                )
              }
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="overflow-hidden rounded-[18px] bg-black/12 p-2 ring-1 ring-white/8">
                    <Image
                      src="/about/pime.png"
                      alt="Pime Hernandez"
                      width={900}
                      height={1400}
                      priority
                      className="h-auto max-h-[210px] w-auto max-w-[148px] rounded-[14px] object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-4 text-[14px] leading-7 text-white/80">
                  <p className="text-white/86">
                    Pime Hernandez leads Dezenio with a cabinetry-first standard
                    shaped by decades of experience across construction, design,
                    sales, and project coordination.
                  </p>

                  <p>
                    After relocating to Middle Tennessee in 2013, he built years
                    of local experience in kitchen and bath design, cabinetry
                    execution, remodel-related planning, and the practical side
                    of how projects move from concept to completion.
                  </p>

                  <p>
                    His background began in construction in his late teens and
                    now spans nearly three decades across framing, interior
                    millwork, finish work, flooring, tile, countertops,
                    cabinetry, design, sales, project management, and showroom
                    leadership.
                  </p>

                  <p>
                    Dezenio is owner-led, hands-on, and built for clients who
                    value clarity, communication, and direct involvement
                    throughout the process.
                  </p>
                </div>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Process"
              title="Process + cabinet lines"
              body="Discovery, design, quote, order, delivery, installation, and the cabinet lines we help guide."
              open={openMobileSection === "process"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "process" ? null : "process",
                )
              }
            >
              <div className="space-y-5 text-[14px] leading-7 text-white/80">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                    Our process
                  </p>
                  <ol className="mt-3 space-y-3">
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
                      layout, selections, appliance planning, trim, and
                      hardware.
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                    Cabinetry lines
                  </p>
                  <p className="mt-3">
                    We help guide clients toward the right line based on budget,
                    lead time, finish level, and how custom the project really
                    needs to be.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <span className="font-semibold text-white/92">
                        Kith Kitchens
                      </span>{" "}
                      — primary line
                    </li>
                    <li>
                      <span className="font-semibold text-white/92">
                        Mouser
                      </span>{" "}
                      — premium / custom
                    </li>
                    <li>
                      <span className="font-semibold text-white/92">
                        ProCraft
                      </span>{" "}
                      — quick-ship options
                    </li>
                    <li>
                      <span className="font-semibold text-white/92">
                        Bishop
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-white/92">
                        Adornus
                      </span>{" "}
                      — available on request
                    </li>
                  </ul>

                  <p className="mt-3 text-white/72">
                    Hardware and storage support includes Richelieu and
                    Rev-A-Shelf.
                  </p>
                </div>
              </div>
            </MobileAccordionCard>
          </div>
        </section>

        <section className="mx-auto mt-8 hidden max-w-7xl md:block md:mt-12">
          <div className="grid gap-3 md:gap-6 lg:grid-cols-3">
            <div className={glassCard}>
              <h2 className="text-[1.02rem] font-semibold text-white md:text-xl">
                Cabinetry packages
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-white/84 md:text-sm md:leading-7">
                Design guidance, quoting, ordering coordination, delivery
                planning, and professional installation built for cleaner
                timelines and fewer surprises.
              </p>
              <ul className="mt-4 space-y-1.5 text-[13px] leading-6 text-white/76 md:text-sm">
                <li>• Appliance planning and panels</li>
                <li>• Trim, fillers, moldings, and hardware</li>
                <li>• Builder coordination and punch support</li>
              </ul>
            </div>

            <div className={glassCard}>
              <h2 className="text-[1.02rem] font-semibold text-white md:text-xl">
                Construction documents
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-white/84 md:text-sm md:leading-7">
                Permit-ready drawings for remodel and addition scope — clear,
                buildable plans that help approvals move faster and reduce field
                confusion.
              </p>
              <ul className="mt-4 space-y-1.5 text-[13px] leading-6 text-white/76 md:text-sm">
                <li>• As-builts when needed</li>
                <li>• Floor plans, elevations, and sections</li>
                <li>• Site planning and basic coordination</li>
              </ul>
            </div>

            <div className={glassCard}>
              <h2 className="text-[1.02rem] font-semibold text-white md:text-xl">
                Service area
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-white/84 md:text-sm md:leading-7">
                Nashville and surrounding Middle Tennessee — including Franklin,
                Brentwood, Nolensville, Smyrna, Murfreesboro, Mount Juliet, and
                Hendersonville.
              </p>
              <p className="mt-4 text-[13px] leading-6 text-white/72 md:text-sm md:leading-7">
                Remote quoting can work when plans, measurements, and selections
                are already clear.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 hidden max-w-7xl md:block md:mt-24 lg:mt-28">
          <div className={softPanel}>
            <div className="rounded-[20px] bg-white/[0.04] p-5 ring-1 ring-white/8 md:rounded-[22px] md:p-7">
              <p className="text-[11px] font-semibold tracking-[0.20em] text-white/62 md:text-xs">
                MEET THE OWNER
              </p>

              <h2 className="mt-3 text-[1.95rem] font-extrabold tracking-tight leading-[1.02] md:text-[3rem]">
                Pime Hernandez
              </h2>

              <div className="mt-6">
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

        <section className="mx-auto mt-12 hidden max-w-7xl md:block md:mt-24 lg:mt-28">
          <div className={softPanel}>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.20em] text-white/62 md:text-xs">
                  OUR PROCESS
                </p>

                <ol className="mt-4 space-y-3 text-[14px] leading-7 text-white/80 md:text-base md:leading-relaxed">
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
                <p className="text-[11px] font-semibold tracking-[0.20em] text-white/62 md:text-xs">
                  CABINETRY LINES
                </p>

                <p className="mt-4 text-[14px] leading-7 text-white/80 md:text-base md:leading-relaxed">
                  We help guide clients toward the right line based on budget,
                  lead time, finish level, and how custom the project really
                  needs to be.
                </p>

                <ul className="mt-4 space-y-3 text-[14px] leading-7 text-white/80 md:text-base md:leading-relaxed">
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

                <p className="mt-4 text-[14px] leading-7 text-white/70">
                  Hardware and storage support includes Richelieu and
                  Rev-A-Shelf.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl md:mt-16">
          <div className="rounded-[24px] border border-white/10 bg-[rgba(10,12,18,0.26)] p-5 ring-1 ring-white/8 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-[1.7rem] font-bold tracking-tight md:text-3xl">
                  Ready to price a project?
                </h2>
                <p className="mt-2 text-[14px] leading-7 text-white/76 md:text-base md:leading-relaxed">
                  Fast quotes when plans are clear. We can also help define
                  scope when they are not.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={() => router.push("/quote")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 md:py-2.5"
                >
                  Get a Quote
                </button>

                <Link
                  href="/cabinetry"
                  className="rounded-full border border-white/22 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 md:py-2.5"
                >
                  Cabinetry
                </Link>

                <Link
                  href="/services"
                  className="rounded-full border border-white/22 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 md:py-2.5"
                >
                  Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MobileAccordionCard({
  label,
  title,
  body,
  open,
  onToggle,
  children,
}: {
  label: string;
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/12 bg-[rgba(12,14,20,0.38)] ring-1 ring-white/6 backdrop-blur-[10px] shadow-[0_16px_32px_rgba(0,0,0,0.16)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left"
      >
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">
            {label}
          </p>
          <h3 className="mt-1 text-[1.1rem] font-semibold leading-snug text-white">
            {title}
          </h3>
          <p className="mt-2 text-[14px] leading-6 text-white/74">{body}</p>
        </div>

        <div className="shrink-0 rounded-full border border-white/16 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/76">
          {open ? "Close" : "Open"}
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-4 pb-4 pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
