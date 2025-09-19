// src/app/api/qr/route.ts
import { NextRequest } from "next/server";
// Import as * to dodge ESM/CJS dts headaches safely
// (we provide a tiny local d.ts below so TS is happy)
import * as QRCode from "qrcode";

/**
 * GET /api/qr?data=<url or text>
 * Returns a PNG image (generated as a Uint8Array).
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const data =
      url.searchParams.get("data") ||
      "https://dezeniodraftdesign.com/referrals";

    // Generate PNG as a Buffer, then normalize to Uint8Array
    const buf = (await QRCode.toBuffer(data, {
      width: 320,
      margin: 1,
      color: { dark: "#000000", light: "#FFFFFFFF" },
    })) as unknown as ArrayBuffer | Uint8Array | Buffer;

    // Convert anything-ish to Uint8Array (satisfies Response body types)
    const body =
      buf instanceof Uint8Array
        ? buf
        : buf instanceof ArrayBuffer
        ? new Uint8Array(buf)
        : // Node Buffer case
          new Uint8Array(
            (buf as Buffer).buffer,
            (buf as Buffer).byteOffset,
            (buf as Buffer).byteLength
          );

    return new Response(body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return Response.json({ error: "qr_failed" }, { status: 400 });
  }
}
