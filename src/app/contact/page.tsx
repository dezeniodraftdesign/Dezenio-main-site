"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

type MobileContactSectionKey =
  | "area"
  | "contact"
  | "best-way"
  | "project-types";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const router = useRouter();
  const [openMobileSection, setOpenMobileSection] =
    useState<MobileContactSectionKey | null>(null);

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

  const glassCard =
    "rounded-[22px] border border-white/12 bg-[rgba(12,14,20,0.40)] p-4 ring-1 ring-white/6 backdrop-blur-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.18)] md:rounded-[24px] md:p-6";

  const sectionPanel =
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
          className="object-cover scale-[2.75] object-[10%_128%] md:scale-100 md:object-[50%_99%]"
        />
        <div className="absolute inset-0 bg-black/50 md:bg-black/32" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/16 to-black/46 md:from-black/24 md:via-black/10 md:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_34%)] md:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.12),transparent_36%)]" />
      </div>

      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl pt-12 text-center md:pt-20">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] text-white/78 md:text-xs"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.28)" }}
          >
            CONTACT
          </p>

          <h1
            className="mt-4 text-[2.15rem] font-extrabold tracking-tight leading-[1.02] text-white md:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.34)" }}
          >
            Let&apos;s talk about your
            <br />
            project.
          </h1>

          <p
            className="mx-auto mt-4 max-w-4xl text-[15px] leading-7 text-white/88 md:mt-8 md:text-lg md:leading-8"
            style={{ textShadow: "0 6px 24px rgba(0,0,0,0.22)" }}
          >
            Cabinetry-first execution with concept design, permit-ready
            construction documents, and remodel coordination when the scope
            needs a more complete path forward.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:hidden">
            <button
              onClick={() => router.push("/quote")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a Project
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+16154742004"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Call
              </a>
              <a
                href="mailto:info@dezeniodraftdesign.com"
                className="rounded-full border border-white/22 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Email
              </a>
            </div>
          </div>
        </section>

        {/* MOBILE ACCORDION */}
        <section className="mx-auto mt-8 max-w-5xl md:hidden">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
            Contact sections
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
              <div className="space-y-4">
                <p className="text-[14px] leading-7 text-white/80">
                  Nashville and surrounding Middle Tennessee — including
                  Franklin, Brentwood, Nolensville, Smyrna, Murfreesboro, Mount
                  Juliet, and Hendersonville.
                </p>

                <div className="overflow-hidden rounded-[18px] border border-white/10 ring-1 ring-white/8">
                  <iframe
                    title="Dezenio Draft Design service area map"
                    src="https://www.google.com/maps?q=Nashville,TN&z=9&output=embed"
                    className="h-[220px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="text-[14px] leading-7 text-white/72">
                  Most work is centered around the greater Nashville market, but
                  selected nearby projects can be reviewed based on scope.
                </p>

                <a
                  href="https://maps.google.com/?q=Nashville,TN"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Open in Maps
                </a>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Reach us"
              title="Phone + email"
              body="Best direct ways to start the conversation."
              open={openMobileSection === "contact"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "contact" ? null : "contact",
                )
              }
            >
              <div className="space-y-5 text-[14px] leading-7 text-white/80">
                <div>
                  <p className="font-semibold text-white/92">Phone</p>
                  <a
                    href="tel:+16154742004"
                    className="mt-1 block text-white/82 transition hover:text-white"
                  >
                    (615) 474-2004
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white/92">Email</p>
                  <a
                    href="mailto:info@dezeniodraftdesign.com"
                    className="mt-1 block break-words text-white/82 transition hover:text-white"
                  >
                    info@dezeniodraftdesign.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white/92">
                    Based in: Nashville, Tennessee
                  </p>
                  <p className="mt-2 text-white/72">
                    Remote quoting can work when plans, measurements, and
                    selections are already clear.
                  </p>
                </div>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Best way"
              title="Best way to reach us"
              body="What helps us respond faster and more clearly."
              open={openMobileSection === "best-way"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "best-way" ? null : "best-way",
                )
              }
            >
              <div className="space-y-4 text-[14px] leading-7 text-white/80">
                <p>
                  For the fastest turnaround, send plans, site photos,
                  inspiration, measurements, and your desired timeline.
                </p>

                <p>
                  Cabinetry inquiries move fastest when we have appliance info,
                  finish direction, and rough layout intent.
                </p>

                <p>
                  Remodel and plan-set inquiries move fastest when we have
                  existing conditions, sketches, or prior drawings.
                </p>
              </div>
            </MobileAccordionCard>

            <MobileAccordionCard
              label="Projects"
              title="What we can help with"
              body="Cabinetry, design + documents, and remodel coordination."
              open={openMobileSection === "project-types"}
              onToggle={() =>
                setOpenMobileSection((prev) =>
                  prev === "project-types" ? null : "project-types",
                )
              }
            >
              <div className="space-y-3">
                <div className={glassCard}>
                  <h3 className="text-lg font-semibold text-white">
                    Cabinetry projects
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-white/80">
                    Kitchen, bath, built-in, and cabinetry package work with
                    guidance on layout, finishes, ordering coordination,
                    delivery, and installation support.
                  </p>
                </div>

                <div className={glassCard}>
                  <h3 className="text-lg font-semibold text-white">
                    Design + documents
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-white/80">
                    Concept design, as-builts, floor plans, elevations, and
                    permit-ready drawing support when a project needs buildable
                    direction beyond product selection alone.
                  </p>
                </div>

                <div className={glassCard}>
                  <h3 className="text-lg font-semibold text-white">
                    Remodel coordination
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-white/80">
                    Residential remodel and addition support where cabinetry,
                    planning, and practical field coordination need to stay
                    aligned.
                  </p>
                </div>
              </div>
            </MobileAccordionCard>
          </div>
        </section>

        {/* DESKTOP */}
        <section className="mx-auto mt-8 hidden max-w-6xl md:block">
          <div className="grid items-start gap-7 lg:grid-cols-[1.32fr_0.95fr]">
            <div className={sectionPanel}>
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

            <div className={sectionPanel}>
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

        <section className="mx-auto mt-7 hidden max-w-6xl md:block">
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

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={() => router.push("/quote")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 md:py-2.5"
                >
                  Get a Quote
                </button>

                <Link
                  href="/cabinetry"
                  className="rounded-full border border-white/22 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/8 md:py-2.5"
                >
                  Cabinetry
                </Link>

                <Link
                  href="/services"
                  className="rounded-full border border-white/22 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/8 md:py-2.5"
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
