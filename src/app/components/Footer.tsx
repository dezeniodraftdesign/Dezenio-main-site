"use client";

import Link from "next/link";

const CABINET_URL =
  process.env.NEXT_PUBLIC_CABINET_URL || "https://dezeniocabinetry.com";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="mt-auto border-t border-white/10 bg-black/45 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-white">
              Dezenio Draft Design, Inc.
            </h4>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
              Cabinetry-first execution — with permit-focused construction
              documents and design support when you need it.
            </p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
              Custom kitchen cabinetry, installation, as-built surveys, and
              permit-ready construction documents in Nashville, TN and
              surrounding Middle Tennessee.
            </p>

            <p className="mt-1 text-xs text-white/60">
              Serving Nashville • Franklin • Brentwood • Nolensville • Smyrna •
              Murfreesboro • Mount Juliet • Hendersonville
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/85">
                  Cabinetry Division
                </p>
                <p className="mt-1 text-sm text-white/75">
                  Design • ordering coordination • delivery planning • install
                </p>
                <p className="mt-1 text-sm text-white/75">
                  <span className="font-semibold text-white/90">Lines:</span>{" "}
                  Kith • Mouser • ProCraft • Bishop • Adornus (by request)
                </p>
                <p className="mt-1 text-sm text-white/75">
                  <span className="font-semibold text-white/90">
                    Accessories:
                  </span>{" "}
                  Richelieu • Rev-A-Shelf
                </p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/85">
                  Design + Construction Docs
                </p>
                <p className="mt-1 text-sm text-white/75">
                  As-builts • site planning • permit sets • builder support
                </p>
                <p className="mt-1 text-sm text-white/75">
                  Built for approvals and buildable results across Middle TN.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/75">
              <a className="hover:text-white" href="tel:16154742004">
                (615) 474-2004
              </a>
              <span className="mx-2 text-white/35">•</span>
              <a
                className="hover:text-white"
                href="mailto:info@dezeniodraftdesign.com"
              >
                info@dezeniodraftdesign.com
              </a>
              <span className="mx-2 text-white/35">•</span>
              Nashville, TN
            </p>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-white/85">
              Quick Links
            </h5>

            <ul className="mt-2 space-y-2 text-sm text-white/75">
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cabinetry" className="hover:text-white">
                  Cabinetry
                </Link>
              </li>
              <li>
                <Link href="/design-documents" className="hover:text-white">
                  Design &amp; Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/construction-remodeling"
                  className="hover:text-white"
                >
                  Construction &amp; Remodeling
                </Link>
              </li>
              <li>
                <Link href="/referrals" className="hover:text-white">
                  Referral Rewards
                </Link>
              </li>
              <li>
                <a
                  href={CABINET_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-white"
                >
                  DezenioCabinetry.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-white/85">
              Social
            </h5>

            <div className="mt-2 flex items-center gap-5">
              <a
                href="https://www.facebook.com/dezeniodraftdesign"
                target="_blank"
                rel="noreferrer"
                className="text-white/75 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.8c1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.4.7-1.4 1.3V12H16l-.5 3h-2.2v7A10 10 0 0022 12z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/dezeniodraftdesign"
                target="_blank"
                rel="noreferrer"
                className="text-white/75 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.3A4.7 4.7 0 107 12a4.7 4.7 0 005-4.7zm0 7.7A3 3 0 1115 12a3 3 0 01-3 3zm4.8-8.8a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@dezenio.draft.design"
                target="_blank"
                rel="noreferrer"
                className="text-white/75 hover:text-white"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 3c.6 3.6 2.8 5.8 6 6v3.2c-2.1.1-4-.6-6-1.9V16c0 4.1-3.3 7.5-7.4 7.5S2 20.1 2 16s3.3-7.5 7.4-7.5c.6 0 1.1.1 1.6.2v3.6c-.5-.2-1-.3-1.6-.3-2.1 0-3.8 1.8-3.8 4s1.7 4 3.8 4 3.8-1.8 3.8-4V3h3.3z" />
                </svg>
              </a>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/60">
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <span className="mx-2 text-white/30">•</span>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <span className="mx-2 text-white/30">•</span>
              <Link href="/licensing" className="hover:text-white">
                Licensing
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-3 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Dezenio Draft Design, Inc. All rights
        reserved.
      </div>
    </footer>
  );
}
