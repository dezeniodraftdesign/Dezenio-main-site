"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileMenuFab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open mobile menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden fixed right-4 top-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-xl ring-1 ring-white/10 backdrop-blur"
      >
        <span
          className="relative block h-0.5 w-6 bg-white
          before:absolute before:-top-2 before:block before:h-0.5 before:w-6 before:bg-white before:content-['']
          after:absolute after:top-2 after:block after:h-0.5 after:w-6 after:bg-white after:content-['']"
        />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Close mobile menu backdrop"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-0 h-[100dvh] overflow-y-auto border-b border-white/10 bg-[rgba(8,10,14,0.94)] px-5 pb-8 pt-20 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  Menu
                </h2>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-xs font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    href="/design-documents"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Design &amp; Documents
                  </Link>
                </li>

                <li>
                  <Link
                    href="/construction-remodeling"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Construction &amp; Remodeling
                  </Link>
                </li>

                <li>
                  <Link
                    href="/cabinetry"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Cabinetry
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    href="/referrals"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Referral Rewards
                  </Link>
                </li>
              </ul>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href="tel:16154742004"
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Call
                </a>

                <a
                  href="mailto:info@dezeniodraftdesign.com"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Email
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
