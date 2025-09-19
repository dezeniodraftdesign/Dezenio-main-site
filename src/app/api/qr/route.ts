// src/app/api/qr/route.ts
import { NextRequest } from "next/server";
import * as QRCode from "qrcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data =
      searchParams.get("data") ??
      process.env.NEXT_PUBLIC_REF_URL ??
      "https://dezeniodraftdesign.com/referrals";

    const png = await QRCode.toBuffer(data, {
      width: 320,
      margin: 1,
      color: { dark: "#000000", light: "#ffffff" },
    });

    // 👇 Silence the BodyInit typing confusion (Buffer is valid at runtime)
    return new Response(png as unknown as BodyInit, {
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("QR error:", e);
    return new Response("qr_failed", { status: 500 });
  }
}
