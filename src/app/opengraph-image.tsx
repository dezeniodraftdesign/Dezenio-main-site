import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Uses your existing background file (no changes to the site)
  const bgUrl = new URL(
    "/backgrounds/Dezenio-HomeBG.png",
    process.env.NEXT_PUBLIC_SITE_URL || "https://dezeniodraftdesign.com",
  ).toString();

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: "72px",
        color: "white",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Background */}
      <img
        src={bgUrl}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "1200px",
          height: "630px",
          objectFit: "cover",
        }}
      />

      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)",
        }}
      />

      {/* Copy block */}
      <div style={{ position: "relative", maxWidth: 760 }}>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
          DEZENIO
        </div>
        <div style={{ fontSize: 24, letterSpacing: 6, opacity: 0.9 }}>
          DRAFT | DESIGN
        </div>

        <div style={{ marginTop: 22, fontSize: 26, opacity: 0.92 }}>
          Premium Design. Unmatched Execution.
        </div>

        <div style={{ marginTop: 12, fontSize: 18, opacity: 0.82 }}>
          Cabinetry • Construction Docs • Remodel Support
        </div>
      </div>
    </div>,
    size,
  );
}
