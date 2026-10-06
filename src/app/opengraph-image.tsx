import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Onash Maharjan — Flutter Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#f7f8f9",
          color: "#22272b",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 500 }}>Onash Maharjan</div>
        <div style={{ fontSize: 36, marginTop: 16, color: "#596773" }}>
          Flutter Developer at Geofinity Solutions
        </div>
      </div>
    ),
    size
  );
}
