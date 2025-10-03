// src/app/api/qr/route.ts
import { NextRequest } from "next/server";
import * as QRCode from "qrcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Data to encode — query string wins, then env, then default
    const data =
      searchParams.get("data") ??
      process.env.NEXT_PUBLIC_REF_URL ??
      "https://dezeniodraftdesign.com/referrals";

    // Optional: allow size override e.g. /api/qr?data=...&size=320
    const size = Math.max(
      96,
      Math.min(640, Number(searchParams.get("size") || 320))
    );

    const png = await QRCode.toBuffer(data, {
      width: size,
      margin: 1,
      color: { dark: "#000000", light: "#ffffff" },
    });

    // Cache policy: no-store in dev, modest cache in prod
    const isDev = process.env.NODE_ENV !== "production";
    const headers: Record<string, string> = {
      "content-type": "image/png",
      "cache-control": isDev ? "no-store" : "public, max-age=86400, immutable", // 1 day instead of 1 year
    };

    return new Response(png as unknown as BodyInit, { headers });
  } catch (e) {
    console.error("QR error:", e);
    return new Response("qr_failed", { status: 500 });
  }
}
