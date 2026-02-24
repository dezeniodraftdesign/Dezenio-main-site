import "./globals.css";
import type { Metadata } from "next";
import MobileMenuFab from "./components/MobileMenuFab";
import HolidayFloat from "./components/HolidayFloat";
import BottomBand from "./components/BottomBand";

export const metadata: Metadata = {
  // ✅ Base URL so OG/Twitter images resolve correctly
  metadataBase: new URL("https://dezeniodraftdesign.com"),

  // ✅ Broad SEO title + per-page template support
  title: {
    default: "Dezenio Draft Design | Nashville Design + Construction Docs",
    template: "%s | Dezenio Draft Design",
  },

  // ✅ Broad description with location coverage
  description:
    "Dezenio Draft Design provides premium design, cabinetry support, as-builts, and construction documents in Nashville, Middle Tennessee, and surrounding areas. Premium Design. Unmatched Execution.",

  // ✅ Canonical root default (pages can override if needed)
  alternates: {
    canonical: "/",
  },

  // ✅ Indexing controls
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // ✅ Social preview (Facebook/iMessage/LinkedIn)
  openGraph: {
    title: "Dezenio Draft Design",
    description:
      "Premium design, cabinetry support, as-builts, and construction documents in Nashville, Middle Tennessee, and surrounding areas.",
    url: "https://dezeniodraftdesign.com",
    siteName: "Dezenio Draft Design",
    type: "website",
    locale: "en_US",
    images: [
      {
        // Put a 1200x630 image at /public/og.jpg (recommended)
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dezenio Draft Design — Premium Design. Unmatched Execution.",
      },
    ],
  },

  // ✅ Twitter/X preview
  twitter: {
    card: "summary_large_image",
    title: "Dezenio Draft Design",
    description:
      "Premium design, cabinetry support, as-builts, and construction documents in Nashville, Middle Tennessee, and surrounding areas.",
    images: ["/og.jpg"],
  },

  icons: {
    icon: "/icon.png", // ✅ ensure this points to app/icon.png
    apple: "/icon.png", // ✅ doubles as Apple touch icon
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
        <MobileMenuFab />
        {children}
        <BottomBand />
        <HolidayFloat />
      </body>
    </html>
  );
}
