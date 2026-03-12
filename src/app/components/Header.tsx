"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  onQuote?: () => void;
};

export default function Header({ onQuote }: HeaderProps) {
  const router = useRouter();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [cabinetryOpen, setCabinetryOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement | null>(null);
  const cabinetryRef = useRef<HTMLDivElement | null>(null);

  const handleQuote = () => {
    if (onQuote) {
      onQuote();
      return;
    }
    router.push("/quote");
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesOpen(false);
      }

      if (cabinetryRef.current && !cabinetryRef.current.contains(target)) {
        setCabinetryOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const navItemClass =
    "inline-flex h-10 items-center text-sm font-semibold text-white/90 transition hover:text-white";

  const triggerClass =
    "inline-flex h-10 items-center gap-1 text-sm font-semibold text-white/90 transition hover:text-white";

  const dropdownBase =
    "absolute left-0 top-full z-[70] mt-1 w-[320px] rounded-2xl border border-white/15 bg-black/82 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl ring-1 ring-white/10";

  const dropdownItem = "block rounded-xl px-3 py-3 transition hover:bg-white/8";

  const dropdownTitle = "text-sm font-semibold text-white";
  const dropdownText = "mt-1 text-xs leading-5 text-white/68";

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/75 via-black/35 to-transparent backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="inline-flex items-center" aria-label="Home">
            <Image
              src="/logos/ddd-logo-wht-trans-crop.png"
              alt="Dezenio Draft Design"
              width={156}
              height={28}
              priority
              className="h-auto w-[156px]"
            />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:16154742004"
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              (615) 474-2004
            </a>

            <button
              type="button"
              onClick={handleQuote}
              className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-black hover:bg-white/90"
            >
              Get a Quote
            </button>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-8 border-t border-white/10 py-2 md:flex">
          <Link href="/" className={navItemClass}>
            Home
          </Link>

          <div
            ref={cabinetryRef}
            className="relative"
            onMouseEnter={() => setCabinetryOpen(true)}
            onMouseLeave={() => setCabinetryOpen(false)}
          >
            <button
              type="button"
              className={triggerClass}
              onClick={() => setCabinetryOpen((v) => !v)}
              aria-expanded={cabinetryOpen}
              aria-haspopup="true"
            >
              Cabinetry
              <span className="text-white/50">▼</span>
            </button>

            <div className="absolute left-0 top-full h-5 w-full bg-transparent" />

            {cabinetryOpen && (
              <div className={dropdownBase}>
                <Link href="/cabinetry" className={dropdownItem}>
                  <div className={dropdownTitle}>Cabinetry</div>
                  <div className={dropdownText}>
                    Design, supply, and installation support.
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={triggerClass}
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <span className="text-white/50">▼</span>
            </button>

            <div className="absolute left-0 top-full h-5 w-full bg-transparent" />

            {servicesOpen && (
              <div className={dropdownBase}>
                <Link href="/services" className={dropdownItem}>
                  <div className={dropdownTitle}>Services Overview</div>
                  <div className={dropdownText}>
                    Explore all Dezenio service categories.
                  </div>
                </Link>

                <Link href="/design-documents" className={dropdownItem}>
                  <div className={dropdownTitle}>Design &amp; Documents</div>
                  <div className={dropdownText}>
                    Plans, as-builts, blueprints, and permit-focused drawings.
                  </div>
                </Link>

                <Link href="/construction-remodeling" className={dropdownItem}>
                  <div className={dropdownTitle}>
                    Construction &amp; Remodeling
                  </div>
                  <div className={dropdownText}>
                    Renovations, additions, framing, and build-phase support.
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className={navItemClass}>
            About
          </Link>

          <Link href="/contact" className={navItemClass}>
            Contact
          </Link>

          <Link href="/referrals" className={navItemClass}>
            Referral Rewards
          </Link>
        </nav>
      </div>
    </header>
  );
}
