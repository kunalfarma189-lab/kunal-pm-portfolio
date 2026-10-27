import { ImageResponse } from "next/og";

// iOS home-screen icon (PNG, generated at build time). Mirrors icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070c",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: 999,
            border: "3px solid rgba(255,255,255,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 92,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
            color: "#aebfff",
            paddingBottom: 8,
          }}
        >
          K
        </div>
      </div>
    ),
    size,
  );
}
