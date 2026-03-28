"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Layers3,
  Plus,
  Phone,
  Menu,
  X,
  Instagram,
  Facebook,
  Music2,
  FileText,
  ShieldCheck,
  Info,
} from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/dezeniodraftdesign";
const FACEBOOK_URL = "https://www.facebook.com/dezeniodraftdesign";
const TIKTOK_URL = "https://www.tiktok.com/@dezeniodraftdesign";

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
    "inline-flex flex-1 flex-col items-center justify-center gap-[2px] rounded-[16px] px-1 py-2 text-[10px] font-medium transition";
  const navIdle = "text-white/68 hover:text-white";
  const navActive =
    "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]";

  const sectionLabel =
    "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/48";
  const primaryCard =
    "overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] ring-1 ring-white/6";
  const primaryLink =
    "flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-white/92 transition hover:bg-white/[0.04]";
  const subtleButton =
    "inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-white/84 transition hover:bg-white/10 hover:text-white";
  const metaLink =
    "inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[90] px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] md:hidden">
        <div className="mx-auto max-w-md rounded-[20px] border border-white/10 bg-[rgba(10,12,18,0.72)] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.30)] backdrop-blur-md">
          <div className="grid grid-cols-5 gap-1">
            <Link
              href="/"
              className={`${navBase} ${isActive("/") ? navActive : navIdle}`}
              aria-label="Home"
            >
              <House className="h-[16px] w-[16px]" strokeWidth={1.9} />
              <span>Home</span>
            </Link>

            <Link
              href="/services"
              className={`${navBase} ${
                isActive("/services") ||
                isActive("/design-documents") ||
                isActive("/construction-remodeling")
                  ? navActive
                  : navIdle
              }`}
              aria-label="Services"
            >
              <Layers3 className="h-[16px] w-[16px]" strokeWidth={1.9} />
              <span>Services</span>
            </Link>

            <button
              type="button"
              onClick={() => router.push("/quote")}
              className="inline-flex flex-col items-center justify-center gap-[2px] rounded-[16px] bg-white px-1 py-2 text-[10px] font-semibold text-black shadow-[0_6px_16px_rgba(255,255,255,0.12)] transition hover:bg-white/90"
              aria-label="Start a project"
            >
              <Plus className="h-[16px] w-[16px]" strokeWidth={2.2} />
              <span>Start</span>
            </button>

            <Link
              href="/contact"
              className={`${navBase} ${
                isActive("/contact") ? navActive : navIdle
              }`}
              aria-label="Contact"
            >
              <Phone className="h-[16px] w-[16px]" strokeWidth={1.9} />
              <span>Contact</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`${navBase} ${menuOpen ? navActive : navIdle}`}
              aria-label="Open menu"
            >
              <Menu className="h-[16px] w-[16px]" strokeWidth={1.9} />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <button
            type="button"
            aria-label="Close mobile menu backdrop"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/76 backdrop-blur-md"
          />

          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-0 h-[100dvh] overflow-y-auto border-b border-white/10 bg-[rgba(7,9,14,0.96)] px-5 pb-28 pt-8 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-md">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.20em] text-white/58">
                  Menu
                </p>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-11 items-center rounded-full border border-white/14 bg-white/[0.03] px-4 text-sm font-semibold text-white/92 transition hover:bg-white/10"
                >
                  <X className="mr-2 h-4 w-4" strokeWidth={2} />
                  Close
                </button>
              </div>

              <div className="space-y-4">
                <div className={primaryCard}>
                  <Link href="/" onClick={closeMenu} className={primaryLink}>
                    <span>Home</span>
                  </Link>
                  <div className="border-t border-white/8" />
                  <Link
                    href="/cabinetry"
                    onClick={closeMenu}
                    className={primaryLink}
                  >
                    <span>Cabinetry</span>
                  </Link>
                  <div className="border-t border-white/8" />
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className={primaryLink}
                  >
                    <span>Services</span>
                  </Link>
                  <div className="border-t border-white/8" />
                  <Link
                    href="/design-documents"
                    onClick={closeMenu}
                    className={primaryLink}
                  >
                    <span>Design Documents</span>
                  </Link>
                  <div className="border-t border-white/8" />
                  <Link
                    href="/construction-remodeling"
                    onClick={closeMenu}
                    className={primaryLink}
                  >
                    <span>Construction &amp; Remodeling</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:16154742004" className={subtleButton}>
                    Call
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      router.push("/quote");
                    }}
                    className={subtleButton}
                  >
                    Start Project
                  </button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 ring-1 ring-white/6">
                  <div className="mb-4 flex items-center gap-2">
                    <Info className="h-4 w-4 text-white/56" />
                    <p className={sectionLabel}>Company</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/about"
                      onClick={closeMenu}
                      className={subtleButton}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className={subtleButton}
                    >
                      Contact
                    </Link>
                    <Link
                      href="/referrals"
                      onClick={closeMenu}
                      className={subtleButton}
                    >
                      Referral Rewards
                    </Link>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 ring-1 ring-white/6">
                  <p className={sectionLabel}>Connect</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={metaLink}
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>

                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={metaLink}
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </a>

                    <a
                      href={TIKTOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={metaLink}
                    >
                      <Music2 className="h-4 w-4" />
                      TikTok
                    </a>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 ring-1 ring-white/6">
                  <div className="mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-white/56" />
                    <p className={sectionLabel}>Legal</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/licensing"
                      onClick={closeMenu}
                      className={metaLink}
                    >
                      <FileText className="h-4 w-4" />
                      Licensing
                    </Link>

                    <Link
                      href="/privacy"
                      onClick={closeMenu}
                      className={metaLink}
                    >
                      Privacy
                    </Link>

                    <Link
                      href="/terms"
                      onClick={closeMenu}
                      className={metaLink}
                    >
                      Terms
                    </Link>
                  </div>
                </div>

                <div className="pb-3 pt-1 text-center text-[11px] leading-5 text-white/38">
                  © {new Date().getFullYear()} Dezenio Draft Design, Inc. All
                  rights reserved.
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
