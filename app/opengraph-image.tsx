import { ImageResponse } from "next/og";

export const alt = "Wicklib — open-source charting engine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0b0e14",
        color: "#d1d4dc",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "#2962ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          W
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>wicklib</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 600,
            maxWidth: 950,
          }}
        >
          The charting engine you can build a platform on.
        </div>
        <div style={{ fontSize: 28, color: "#7d8598", maxWidth: 850 }}>
          Canvas-first. Open core. Typed end to end.
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, fontSize: 20, color: "#7d8598" }}>
        <span>Canvas2D + WebGL2</span>
        <span>·</span>
        <span>Drawings + annotations</span>
        <span>·</span>
        <span>WickScript</span>
      </div>
    </div>,
    size,
  );
}
