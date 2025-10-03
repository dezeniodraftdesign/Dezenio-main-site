// src/app/api/qr/route.ts
import { NextRequest } from "next/server";
import * as QRCode from "qrcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROD_REF = "https://dezeniodraftdesign.com/referrals";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Build the raw target URL
    const raw =
      searchParams.get("data") ?? process.env.NEXT_PUBLIC_REF_URL ?? PROD_REF;

    // HARD GUARD: never allow localhost in QR (force prod)
    const data = raw.replace(
      /^https?:\/\/localhost(?::\d+)?(\/.*)?$/i,
      (_, path = "/referrals") => `https://dezeniodraftdesign.com${path}`
    );

    // Optional: size override /api/qr?data=...&size=320
    const size = Math.max(
      96,
      Math.min(640, Number(searchParams.get("size") || 320))
    );

    const png = await QRCode.toBuffer(data, {
      width: size,
      margin: 1,
      color: { dark: "#000000", light: "#ffffff" },
    });

    // Cache: no-store in dev, 1 day in prod
    const isDev = process.env.NODE_ENV !== "production";
    const headers: Record<string, string> = {
      "content-type": "image/png",
      "cache-control": isDev ? "no-store" : "public, max-age=86400, immutable",
    };

    return new Response(png as unknown as BodyInit, { headers });
  } catch (e) {
    console.error("QR error:", e);
    return new Response("qr_failed", { status: 500 });
  }
}
