"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { House, Layers3, Plus, Phone, Menu, X } from "lucide-react";

export default function MobileMenuFab() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const navBase =
    "inline-flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition";
  const navIdle = "text-white/70 hover:text-white";
  const navActive =
    "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]";

  return (
    <>
      <div className="md:hidden fixed inset-x-0 bottom-0 z-[90] px-3 pb-[calc(env(safe-area-inset-bottom)+10px)]">
        <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-[rgba(10,12,18,0.72)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="grid grid-cols-5 gap-2">
            <Link
              href="/"
              className={`${navBase} ${isActive("/") ? navActive : navIdle}`}
              aria-label="Home"
            >
              <House className="h-4 w-4" strokeWidth={1.9} />
              <span>Home</span>
            </Link>

            <Link
              href="/services"
              className={`${navBase} ${isActive("/services") || isActive("/design-documents") || isActive("/construction-remodeling") ? navActive : navIdle}`}
              aria-label="Services"
            >
              <Layers3 className="h-4 w-4" strokeWidth={1.9} />
              <span>Services</span>
            </Link>

            <button
              type="button"
              onClick={() => router.push("/quote?quote=1")}
              className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl bg-white px-2 py-2 text-[11px] font-semibold text-black shadow-[0_8px_24px_rgba(255,255,255,0.15)] transition hover:bg-white/90"
              aria-label="Start a project"
            >
              <Plus className="h-4 w-4" strokeWidth={2.2} />
              <span>Start</span>
            </button>

            <Link
              href="/contact"
              className={`${navBase} ${isActive("/contact") ? navActive : navIdle}`}
              aria-label="Contact"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} />
              <span>Contact</span>
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`${navBase} ${menuOpen ? navActive : navIdle}`}
            >
              {menuOpen ? (
                <X className="h-4 w-4" strokeWidth={1.9} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.9} />
              )}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Close mobile menu backdrop"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-0 h-[100dvh] overflow-y-auto border-b border-white/10 bg-[rgba(8,10,14,0.94)] px-5 pb-32 pt-20 text-white shadow-2xl backdrop-blur-2xl"
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
                    href="/cabinetry"
                    onClick={closeMenu}
                    className="block px-4 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/5"
                  >
                    Cabinetry
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

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    router.push("/quote?quote=1");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Start Project
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
