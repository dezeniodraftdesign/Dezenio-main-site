"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "./components/Header";
import QuoteModal from "./components/QuoteModal";
import BottomBand from "./components/BottomBand";

const BG_SRC = "/backgrounds/Dezenio-HomeBG.png";
const BG_POS = "50% 33.7%";

export default function HomeClient() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("quote") === "1") setQuoteOpen(true);
  }, []);

  const serviceCards = useMemo(
    () => [
      {
        title: "Cabinetry",
        body: "Kith, Mouser, ProCraft (plus Bishop + Adornus on request) — design support, ordering, delivery coordination, and installation.",
        href: "/cabinetry",
        img: "/sections/cabinetry.png",
      },
      {
        title: "Design & Documents",
        body: "Plans, blueprints, as-builts, concept development, and permit-focused drawing sets for clear, buildable project direction.",
        href: "/design-documents",
        img: "/sections/plans.png",
      },
      {
        title: "Construction & Remodeling",
        body: "Renovations, additions, framing coordination, and build-phase support when your project moves beyond planning and into execution.",
        href: "/construction-remodeling",
        img: "/sections/render.png",
      },
    ],
    [],
  );

  return (
    <div className="relative min-h-dvh text-white">
      <div className="fixed inset-0 -z-20">
        <Image
          src={BG_SRC}
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: BG_POS }}
        />
        <div className="absolute inset-0 bg-black/18" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/45 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.10)_45%,rgba(0,0,0,0.00)_72%)]" />
      </div>

      <Header onQuote={() => setQuoteOpen(true)} />

      <section className="mx-auto max-w-7xl px-4 pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl leading-tight">
            Custom Kitchen Cabinets &amp; Installation
            <br />
            in Nashville, TN
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-center text-white/85 md:text-lg leading-relaxed">
            Authorized cabinetry access through Dezenio Cabinetry — including{" "}
            <b>Kith</b>, <b>Mouser</b>, and <b>ProCraft</b> (plus <b>Bishop</b>{" "}
            and <b>Adornus</b> on request). We handle <b>design</b>,{" "}
            <b>ordering</b>, and <b>turnkey installation</b> for homeowners and
            builders across Nashville and Middle Tennessee.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
            >
              Explore Services
            </Link>

            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              Get a Quote
            </button>

            <Link
              href="/referrals"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              Referral Rewards
            </Link>
          </div>
        </div>

        <div className="h-16 md:h-20" />
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/80 md:text-lg">
            Cabinetry-first delivery, with permit-ready documentation and
            buildable planning when you need it.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {card.body}
                </p>

                <div className="mt-4">
                  <Link
                    href={card.href}
                    className="text-sm font-semibold text-white/90 hover:text-white"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
          >
            View Full Services Page
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-white/70">
              ABOUT DEZENIO
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Cabinetry-first. Plans when you need them.
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              We help homeowners and builders move from concept to clean
              execution — with factory-direct cabinetry support, professional
              installation coordination, and permit-ready construction documents
              when the scope requires it.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
              >
                Read About Dezenio
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Services
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md">
            <div className="relative h-[260px] w-full">
              <Image
                src="/sections/render.png"
                alt="Design and planning visual"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-white/90">
                  What clients notice
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-white/75">
                  <li>• Fast, accurate takeoffs from plans</li>
                  <li>• Clear communication & realistic timelines</li>
                  <li>• Execution that matches the design intent</li>
                </ul>
              </div>

              <div className="flex items-end justify-start gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Start a Project
                </button>
                <Link
                  href="/cabinetry"
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                >
                  View Cabinetry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur-md">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/70">
              CONTACT
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Let’s talk about your project.
            </h2>
            <p className="mt-3 text-white/80 leading-relaxed">
              Serving Nashville and the surrounding Middle Tennessee area.
              Remote quoting available when plans + selections are clear.
            </p>

            <div className="mt-6 space-y-2 text-sm text-white/85">
              <div>
                <a
                  className="underline hover:text-white"
                  href="tel:16154742004"
                >
                  (615) 474-2004
                </a>
              </div>
              <div>
                <a
                  className="underline hover:text-white"
                  href="mailto:info@dezeniodraftdesign.com"
                >
                  info@dezeniodraftdesign.com
                </a>
              </div>
              <div className="text-white/70">Nashville, Tennessee</div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
              >
                Contact Page
              </Link>

              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Request a Quote
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white/90">
                Service area
              </h3>
              <p className="mt-2 text-sm text-white/75">
                Nashville + surrounding Middle Tennessee — Franklin, Brentwood,
                Nolensville, Smyrna, Murfreesboro, Mount Juliet, Hendersonville,
                and nearby areas.
              </p>
            </div>

            <div className="px-4 pb-4">
              <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                <iframe
                  title="Service area map"
                  src="https://www.google.com/maps?q=Nashville%20TN&z=10&output=embed"
                  className="h-[330px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className="mt-3 text-xs text-white/60">
                For fastest turnaround: send plans (PDF), inspiration, and your
                desired timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="rounded-2xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur-md">
          <div className="grid items-center gap-8 md:grid-cols-[1.25fr,1fr]">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Cabinetry
              </h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                Kith • Mouser • ProCraft — with design support, ordering,
                logistics, and install coordination.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/cabinetry"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Cabinetry Page
                </Link>
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Get a Cabinet Quote
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
              <div className="relative h-[220px] w-full">
                <Image
                  src="/sections/cabinetry.png"
                  alt="Cabinetry"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-28 pt-14 md:pt-20">
        <div className="border-t border-white/10 pt-12">
          <div className="grid items-start gap-10 md:grid-cols-[1.15fr,0.85fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-white/65">
                REFERRAL REWARDS
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Send us a friend. Get rewarded.
              </h2>

              <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">
                Share Dezenio with a neighbor, builder, or friend. When they
                book a qualifying project, you choose your reward.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/referrals"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
                >
                  View Referral Program
                </Link>

                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Start a Project
                </button>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-white/90">
                    How it works
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/72">
                    <li>• Share your referral link or QR code</li>
                    <li>
                      • When they book a qualifying project, you earn a reward
                    </li>
                    <li>
                      • Rewards are issued after contract signing and first
                      invoice
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white/90">
                    Rewards
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/72">
                    <li>• Cash or gift card for smaller projects</li>
                    <li>• Credit toward your next project</li>
                    <li>• Priority scheduling when available</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:pl-8">
              <div className="mx-auto max-w-[340px]">
                <div className="rounded-[28px] border border-white/12 bg-black/20 p-5 backdrop-blur-sm">
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
                    <img
                      src={`/api/qr?data=${encodeURIComponent("/referrals")}&v=4`}
                      alt="Referral QR"
                      width={280}
                      height={280}
                      loading="eager"
                      decoding="async"
                      className="mx-auto block"
                    />
                  </div>

                  <p className="mt-4 text-center text-xs text-white/60">
                    Scan to open the referral page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomBand hideOnId="site-footer" />
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
