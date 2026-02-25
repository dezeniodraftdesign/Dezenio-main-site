// FILE: src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import MobileMenuFab from "./components/MobileMenuFab";
import HolidayFloat from "./components/HolidayFloat";
import BottomBand from "./components/BottomBand";

export const metadata: Metadata = {
  metadataBase: new URL("https://dezeniodraftdesign.com"),

  title: {
    default: "Dezenio Draft Design | Nashville Design + Construction Docs",
    template: "%s | Dezenio Draft Design",
  },

  description:
    "Dezenio Draft Design provides premium design, cabinetry support, as-builts, and construction documents in Nashville, Middle Tennessee, and surrounding areas. Premium Design. Unmatched Execution.",

  alternates: { canonical: "/" },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

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
        // ✅ Use dynamic OG image route (src/app/opengraph-image.tsx)
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dezenio Draft Design — Premium Design. Unmatched Execution.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dezenio Draft Design",
    description:
      "Premium design, cabinetry support, as-builts, and construction documents in Nashville, Middle Tennessee, and surrounding areas.",
    // ✅ Same route for Twitter
    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
