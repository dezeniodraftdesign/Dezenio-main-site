import "./globals.css";
import type { Metadata } from "next";
import MobileMenuFab from "./components/MobileMenuFab";
import HolidayFloat from "./components/HolidayFloat";
import BottomBand from "./components/BottomBand";

export const metadata: Metadata = {
  title: "Dezenio Draft Design",
  description: "Premium Design. Unmatched Execution.",
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
