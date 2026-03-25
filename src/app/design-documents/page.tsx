import { Suspense } from "react";
import type { Metadata } from "next";
import DesignDocumentsClient from "./design-documents-client";

export const metadata: Metadata = {
  title:
    "Construction Documents, As-Builts & Design Support in Nashville, TN | Dezenio Draft Design",
  description:
    "Concept development, as-builts, layout refinement, and permit-focused drawing support for residential and commercial projects across Nashville and Middle Tennessee.",
  alternates: {
    canonical: "https://dezeniodraftdesign.com/design-documents",
  },
  openGraph: {
    title:
      "Construction Documents, As-Builts & Design Support in Nashville, TN",
    description:
      "Concept development, as-builts, layout refinement, and permit-focused drawing support for residential and commercial projects across Nashville and Middle Tennessee.",
    url: "https://dezeniodraftdesign.com/design-documents",
    siteName: "Dezenio Draft Design",
    images: [
      {
        url: "https://dezeniodraftdesign.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dezenio Draft Design — Design & Documents in Nashville, TN",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Construction Documents, As-Builts & Design Support in Nashville, TN",
    description:
      "Concept development, as-builts, layout refinement, and permit-focused drawing support for residential and commercial projects across Nashville and Middle Tennessee.",
    images: ["https://dezeniodraftdesign.com/opengraph-image"],
  },
};

export const dynamic = "force-dynamic";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dezenio Draft Design, Inc.",
    url: "https://dezeniodraftdesign.com/design-documents",
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
      "Concept development, as-builts, layout refinement, and permit-focused drawing support for residential and commercial projects across Nashville and Middle Tennessee.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <DesignDocumentsClient />
      </Suspense>
    </>
  );
}
