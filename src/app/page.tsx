import { Suspense } from "react";
import type { Metadata } from "next";
import HomeClient from "./home-client"; // client component below

// ✅ SEO metadata for "/" (safe: does not affect runtime rendering)
export const metadata: Metadata = {
  title:
    "Custom Kitchen Cabinets & Installation in Nashville, TN | Dezenio Draft Design",
  description:
    "Custom kitchen cabinets and turnkey installation in Nashville, TN. Authorized dealer for Kith, Mouser, and ProCraft. Also offering permit-focused construction documents and site planning.",
  alternates: {
    canonical: "https://dezeniodraftdesign.com/",
  },
  openGraph: {
    title: "Custom Kitchen Cabinets & Installation in Nashville, TN",
    description:
      "Authorized dealer for Kith, Mouser, and ProCraft — design, ordering, and turnkey installation.",
    url: "https://dezeniodraftdesign.com/",
    siteName: "Dezenio Draft Design",
    images: [{ url: "/opengraph-image" }],
    type: "website",
  },
};

// Avoid static prerender of "/" since we read search params
export const dynamic = "force-dynamic";

export default function Page() {
  // ✅ JSON-LD goes HERE (page-level). Do NOT put this in layout.tsx.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dezenio Draft Design, Inc.",
    url: "https://dezeniodraftdesign.com",
    telephone: "+16154742004",
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
    sameAs: [
      "https://www.facebook.com/dezeniodraftdesign",
      "https://www.instagram.com/dezeniodraftdesign",
      "https://www.tiktok.com/@dezenio.draft.design",
    ],
    description:
      "Custom kitchen cabinetry, installation, as-built surveys, and permit-ready construction documents in Nashville, TN and surrounding Middle Tennessee.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <HomeClient />
      </Suspense>
    </>
  );
}
