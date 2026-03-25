import { Suspense } from "react";
import type { Metadata } from "next";
import CabinetryClient from "./cabinetry-client";

export const metadata: Metadata = {
  title:
    "Kitchen Cabinets in Nashville, TN | Cabinetry Sales, Design & Installation | Dezenio Draft Design",
  description:
    "Factory-direct cabinetry with design guidance, layout support, ordering coordination, delivery planning, and professional installation across Nashville and Middle Tennessee.",
  alternates: {
    canonical: "https://dezeniodraftdesign.com/cabinetry",
  },
  openGraph: {
    title:
      "Kitchen Cabinets in Nashville, TN | Cabinetry Sales, Design & Installation",
    description:
      "Factory-direct cabinetry with design guidance, layout support, ordering coordination, delivery planning, and professional installation across Nashville and Middle Tennessee.",
    url: "https://dezeniodraftdesign.com/cabinetry",
    siteName: "Dezenio Draft Design",
    images: [
      {
        url: "https://dezeniodraftdesign.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dezenio Draft Design — Cabinetry Sales, Design & Installation in Nashville, TN",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Kitchen Cabinets in Nashville, TN | Cabinetry Sales, Design & Installation",
    description:
      "Factory-direct cabinetry with design guidance, layout support, ordering coordination, delivery planning, and professional installation across Nashville and Middle Tennessee.",
    images: ["https://dezeniodraftdesign.com/opengraph-image"],
  },
};

export const dynamic = "force-dynamic";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dezenio Draft Design, Inc.",
    url: "https://dezeniodraftdesign.com/cabinetry",
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
      "Cabinetry sales, design support, ordering coordination, delivery planning, and installation across Nashville and Middle Tennessee.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <CabinetryClient />
      </Suspense>
    </>
  );
}
