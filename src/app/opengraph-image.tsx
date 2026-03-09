// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function siteOrigin() {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromPublic) return fromPublic.replace(/\/+$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  // dev fallback
  return "http://127.0.0.1:3000";
}

function mimeFromUrl(absUrl: string) {
  const u = absUrl.toLowerCase();
  if (u.endsWith(".png")) return "image/png";
  if (u.endsWith(".jpg") || u.endsWith(".jpeg")) return "image/jpeg";
  if (u.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

function arrayBufferToBase64(ab: ArrayBuffer) {
  const bytes = new Uint8Array(ab);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function toDataUrl(absUrl: string) {
  const res = await fetch(absUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch OG asset: ${absUrl}`);

  const ab = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(ab);
  const mime = mimeFromUrl(absUrl);
  return `data:${mime};base64,${base64}`;
}

export default async function OpenGraphImage() {
  const origin = siteOrigin();

  const bgUrl = new URL("/backgrounds/Dezenio-HomeBG.png", origin).toString();
  const logoUrl = new URL(
    "/logos/ddd-logo-wht-trans-crop.png",
    origin,
  ).toString();

  const [bgData, logoData] = await Promise.all([
    toDataUrl(bgUrl),
    toDataUrl(logoUrl),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#000",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
      }}
    >
      {/* Background (less dark) */}
      <img
        alt="Dezenio Draft Design background"
        src={bgData}
        width={1200}
        height={630}
        style={{
          position: "absolute",
          inset: 0,
          width: 1200,
          height: 630,
          objectFit: "cover",
          opacity: 0.78, // ✅ was 0.55 (too dark)
        }}
      />

      {/* Light vignette (NOT heavy side bars) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Bottom fade so text reads cleanly */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.00) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          padding: 64,
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <img
            alt="Dezenio Draft Design"
            src={logoData}
            width={520}
            height={150}
            style={{
              width: 520,
              height: 150,
              objectFit: "contain",
              filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.60))",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            maxWidth: 820,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.1,
              fontWeight: 750,
              color: "rgba(255,255,255,0.96)",
              textShadow: "0 10px 24px rgba(0,0,0,0.70)",
            }}
          >
            Premium Design. Unmatched Execution.
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 20,
              lineHeight: 1.25,
              fontWeight: 520,
              color: "rgba(255,255,255,0.86)",
              textShadow: "0 10px 24px rgba(0,0,0,0.70)",
            }}
          >
            Cabinetry • Construction Docs • Remodel Support
          </div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
