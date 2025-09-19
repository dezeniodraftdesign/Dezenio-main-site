import "./globals.css";
import type { Metadata } from "next";
import MobileMenuFab from "./components/MobileMenuFab";
import HolidayFloat from "./components/HolidayFloat";
import BottomBand from "./components/BottomBand"; // ⬅️ add this

export const metadata: Metadata = {
  /* … */
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
        <BottomBand /> {/* ⬅️ mount the ribbon here */}
        <HolidayFloat /> {/* stays offset by the ribbon height */}
      </body>
    </html>
  );
}
