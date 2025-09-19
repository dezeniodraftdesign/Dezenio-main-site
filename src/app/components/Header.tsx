"use client";

import Image from "next/image";
import Link from "next/link";

const CABINET_URL =
  process.env.NEXT_PUBLIC_CABINET_URL || "https://dezeniocabinetry.com";

export default function Header({ onQuote }: { onQuote: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <a href="#top" className="inline-flex items-center">
          <Image
            src="/logos/ddd-logo-wht-trans-crop.png"
            alt="Dezenio Draft Design"
            width={156}
            height={28}
            priority
            className="h-auto w-[156px]"
          />
        </a>

        {/* Right (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="tel:16154742004"
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            (615) 474-2004
          </a>
          <button
            onClick={onQuote}
            className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Quote
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="mx-auto hidden max-w-7xl items-center justify-center gap-8 px-4 pt-2 text-sm font-semibold text-white/90 md:flex">
        <a href="#services" className="hover:text-white">
          Services
        </a>
        <a href="#about" className="hover:text-white">
          About
        </a>
        <a href="#contact" className="hover:text-white">
          Contact
        </a>

        {/* external site in new tab */}
        <a
          href={CABINET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          Cabinetry
        </a>

        {/* go to the /referrals page (no custom events) */}
        <Link href="/referrals" className="hover:text-white">
          Referral Rewards
        </Link>
      </nav>
    </header>
  );
}
