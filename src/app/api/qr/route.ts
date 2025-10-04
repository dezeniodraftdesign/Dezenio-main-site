// src/app/api/qr/route.ts
import type { NextRequest } from "next/server";
import QRCode from "qrcode"; // ✅ default import avoids "toBuffer is not a function"

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROD_HOST = "dezeniodraftdesign.com";
const PROD_REF = `https://${PROD_HOST}/referrals`;

function normalizeTarget(raw?: string | null): string {
  // No input => production referrals
  if (!raw) return PROD_REF;

  // If it's a relative path like "/referrals" -> force prod domain
  if (raw.startsWith("/")) {
    return `https://${PROD_HOST}${raw}`;
  }

  // If it's an absolute URL, rewrite localhost/LAN hosts to prod
  try {
    const u = new URL(raw);
    const host = u.hostname;

    // localhost, loopback, or typical LAN ranges -> rewrite to prod
    const isLocal =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host === "[::1]" ||
      host === "0.0.0.0" ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);

    if (isLocal) {
      u.protocol = "https:";
      u.hostname = PROD_HOST;
      u.port = "";
      if (!u.pathname || u.pathname === "/") u.pathname = "/referrals";
      return u.toString();
    }

    // Already a public host -> allow it (but if you want to force prod always, return PROD_REF here)
    return u.toString();
  } catch {
    // If it wasn't a valid URL string, just use prod
    return PROD_REF;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // data param (optional). If missing, we fall back to env or PROD.
    const raw =
      searchParams.get("data") ?? process.env.NEXT_PUBLIC_REF_URL ?? PROD_REF;

    // ✅ Normalize to guarantee NO localhost/relative targets
    const data = normalizeTarget(raw);

    // Optional size override, clamped
    const size = Math.max(
      96,
      Math.min(640, Number(searchParams.get("size") || 320))
    );

    const png = await QRCode.toBuffer(data, {
      width: size,
      margin: 1,
      color: { dark: "#000000", light: "#ffffff" },
    });

    const isDev = process.env.NODE_ENV !== "production";
    return new Response(png as unknown as BodyInit, {
      headers: {
        "content-type": "image/png",
        "cache-control": isDev
          ? "no-store"
          : "public, max-age=86400, immutable",
      },
    });
  } catch (e) {
    console.error("QR error:", e);
    return new Response("qr_failed", { status: 500 });
  }
}
