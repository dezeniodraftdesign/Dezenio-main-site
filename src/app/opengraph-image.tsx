import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function siteOrigin() {
  if (process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:3000";
  }

  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromPublic) return fromPublic.replace(/\/+$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "https://dezeniodraftdesign.com";
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

  if (!res.ok) {
    throw new Error(`Failed to fetch OG asset: ${absUrl}`);
  }

  const ab = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(ab);
  const mime = mimeFromUrl(absUrl);

  return `data:${mime};base64,${base64}`;
}

export default async function OpenGraphImage() {
  const origin = siteOrigin();

  const bgUrl = new URL("/sections/lakeshore.png", origin).toString();
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
        backgroundColor: "#000",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
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
          objectPosition: "50% 50%",
          opacity: 0.92,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.58) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 34%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.18) 28%, rgba(0,0,0,0.06) 52%, rgba(0,0,0,0.00) 72%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "54px 62px",
          transform: "translateY(-32px)",
        }}
      >
        <img
          alt="Dezenio Draft Design"
          src={logoData}
          width={430}
          height={120}
          style={{
            width: 430,
            height: 120,
            objectFit: "contain",
            marginBottom: 20,
            filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.52))",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 650,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.84)",
              marginBottom: 10,
              textShadow: "0 8px 20px rgba(0,0,0,0.50)",
            }}
          >
            Cabinetry • Design • Construction
          </div>

          <div
            style={{
              fontSize: 46,
              lineHeight: 1.05,
              fontWeight: 800,
              color: "rgba(255,255,255,0.98)",
              marginBottom: 12,
              maxWidth: 980,
              textShadow: "0 10px 24px rgba(0,0,0,0.60)",
            }}
          >
            Custom Kitchen Cabinets & Concept Design in Nashville, TN
          </div>

          <div
            style={{
              fontSize: 22,
              lineHeight: 1.3,
              fontWeight: 520,
              color: "rgba(255,255,255,0.90)",
              maxWidth: 760,
              textShadow: "0 10px 24px rgba(0,0,0,0.58)",
            }}
          >
            Cabinetry-first execution with design support, construction
            documents, and remodel coordination across Nashville and Middle
            Tennessee.
          </div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
