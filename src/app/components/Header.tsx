/* FILE: src/app/components/Header.tsx */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type HeaderProps = {
  onQuote?: () => void; // optional
};

export default function Header({ onQuote }: HeaderProps) {
  const router = useRouter();

  const handleQuote = () => {
    if (onQuote) return onQuote();
    router.push("/#contact");
  };

  // ✅ Canonical navigation (works from ANY page)
  const nav = [
    { label: "Services", href: "/#services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
    { label: "Cabinetry", href: "/cabinetry" },
    { label: "Referral Rewards", href: "/referrals" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Brand */}
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

        {/* Right (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="tel:16154742004"
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            (615) 474-2004
          </a>

          <button
            type="button"
            onClick={handleQuote}
            className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get a Quote
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="mx-auto hidden max-w-7xl items-center justify-center gap-8 px-4 pt-2 text-sm font-semibold text-white/90 md:flex">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
