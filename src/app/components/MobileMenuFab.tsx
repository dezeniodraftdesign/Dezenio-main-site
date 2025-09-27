"use client";

import { useEffect, useState } from "react";

export default function MobileMenuFab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Floating button (mobile only) */}
      <button
        aria-label="Open mobile menu"
        onClick={() => setOpen(true)}
        className="md:hidden fixed left-4 bottom-20 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-xl ring-1 ring-white/10 backdrop-blur"
      >
        <span
          className="relative block h-0.5 w-6 bg-white
          before:absolute before:-top-2 before:block before:h-0.5 before:w-6 before:bg-white before:content-['']
          after:absolute after:top-2 after:block after:h-0.5 after:w-6 after:bg-white after:content-['']"
        />
      </button>

      {/* Sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[80]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute bottom-0 left-0 right-0 mx-3 mb-3 rounded-2xl border border-white/10 bg-black/80 p-4 text-white shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <ul className="divide-y divide-white/10 text-base">
              <li>
                <a
                  href="#services"
                  onClick={() => setOpen(false)}
                  className="block px-1 py-3"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => setOpen(false)}
                  className="block px-1 py-3"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block px-1 py-3"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://dezeniocabinetry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-1 py-3"
                >
                  Cabinetry
                </a>
              </li>
              <li>
                <a
                  href="/referrals"
                  onClick={() => setOpen(false)}
                  className="block px-1 py-3"
                >
                  Referral Rewards
                </a>
              </li>
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:16154742004"
                className="inline-flex items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Call
              </a>
              <a
                href="mailto:info@dezeniodraftdesign.com"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Email
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
