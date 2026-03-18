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
        fontFamily: "Arial, Helvetica, sans-serif",
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
          opacity: 0.44,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.56)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0.40) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 40%)",
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
          padding: "108px 72px 78px",
          textAlign: "center",
        }}
      >
        <img
          alt="Dezenio Draft Design"
          src={logoData}
          width={380}
          height={106}
          style={{
            width: 380,
            height: 106,
            objectFit: "contain",
            marginBottom: 24,
          }}
        />

        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.76)",
            marginBottom: 18,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          CABINETRY • DESIGN • CONSTRUCTION
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            marginBottom: 24,
            textAlign: "center",
            maxWidth: 1000,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              marginBottom: 2,
              textShadow: "0 10px 24px rgba(0,0,0,0.40)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Custom Kitchen Cabinets
          </div>

          <div
            style={{
              fontSize: 68,
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              textShadow: "0 10px 24px rgba(0,0,0,0.40)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            &amp; Concept Design in Nashville, TN
          </div>
        </div>

        <div
          style={{
            maxWidth: 820,
            fontSize: 22,
            lineHeight: 1.38,
            fontWeight: 500,
            color: "rgba(255,255,255,0.88)",
            textAlign: "center",
            textShadow: "0 8px 20px rgba(0,0,0,0.30)",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Cabinetry-first execution with design support, as-builts, construction
          documents, and remodel coordination across Nashville and Middle
          Tennessee.
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
