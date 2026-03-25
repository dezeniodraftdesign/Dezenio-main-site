import "./globals.css";
import type { Metadata } from "next";

import MobileMenuFab from "./components/MobileMenuFab";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://dezeniodraftdesign.com"),

  title: {
    default: "Dezenio Draft Design | Cabinetry, Design & Construction Support",
    template: "%s | Dezenio Draft Design",
  },

  description:
    "Cabinetry-first execution with design support, as-builts, construction documents, and remodel coordination across Nashville and Middle Tennessee.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Dezenio Draft Design",
    description:
      "Cabinetry-first execution with design support, as-builts, construction documents, and remodel coordination across Nashville and Middle Tennessee.",
    url: "https://dezeniodraftdesign.com",
    siteName: "Dezenio Draft Design",
    type: "website",
    locale: "en_US",
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
    title: "Dezenio Draft Design",
    description:
      "Cabinetry-first execution with design support, as-builts, construction documents, and remodel coordination across Nashville and Middle Tennessee.",
    images: ["https://dezeniodraftdesign.com/opengraph-image"],
  },

  verification: {
    google: "zmdRj6GBjh9LspTOjOzH1cWEdYWabjBIKwD-Vfmsnjc",
  },

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white">
        <div className="min-h-dvh flex flex-col">
          <MobileMenuFab />
          <main className="flex-1">{children}</main>

          {/* Desktop footer only */}
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
