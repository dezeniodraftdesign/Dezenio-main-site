import { Suspense } from "react";
import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title:
    "Custom Kitchen Cabinets & Concept Design in Nashville, TN | Dezenio Draft Design",
  description:
    "Cabinetry-first execution with design support, construction documents, and remodel coordination across Nashville and Middle Tennessee.",
  alternates: {
    canonical: "https://dezeniodraftdesign.com/",
  },
  openGraph: {
    title: "Custom Kitchen Cabinets & Concept Design in Nashville, TN",
    description:
      "Cabinetry-first execution with design support, construction documents, and remodel coordination across Nashville and Middle Tennessee.",
    url: "https://dezeniodraftdesign.com/",
    siteName: "Dezenio Draft Design",
    type: "website",
    images: [
      {
        url: "https://dezeniodraftdesign.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dezenio Draft Design — Custom Kitchen Cabinets & Concept Design in Nashville, TN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Kitchen Cabinets & Concept Design in Nashville, TN",
    description:
      "Cabinetry-first execution with design support, construction documents, and remodel coordination across Nashville and Middle Tennessee.",
    images: ["https://dezeniodraftdesign.com/opengraph-image"],
  },
};

export const dynamic = "force-dynamic";

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
    "Cabinetry-first execution with design support, as-builts, construction documents, and remodel coordination across Nashville and Middle Tennessee.",
};

export default function Page() {
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
