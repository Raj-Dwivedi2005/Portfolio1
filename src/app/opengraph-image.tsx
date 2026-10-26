import { ImageResponse } from "next/og";

export const alt = "Raj Dwivedi | AI/ML Engineer & Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, #0c1a3b 0%, #030712 70%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#f8fafc",
          border: "4px solid rgba(56, 189, 248, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            color: "#00f0ff",
            letterSpacing: "4px",
          }}
        >
          <span>FLIGHT TELEMETRY: RD-AI-2027</span>
          <span style={{ color: "#38bdf8" }}>// SRM IST CHENNAI</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Raj Dwivedi
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#38bdf8",
              fontWeight: 500,
            }}
          >
            AI/ML Engineer &bull; Full-Stack Developer &bull; Problem Solver
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Predictive AI/ML Systems &bull; High-Performance FastAPI Backends &bull;
            Next.js Distributed Dashboards &bull; CGPA 9.20
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "18px",
            color: "#64748b",
            borderTop: "1px solid rgba(56, 189, 248, 0.2)",
            paddingTop: "24px",
          }}
        >
          <span>github.com/Raj-Dwivedi2005</span>
          <span>linkedin.com/in/raj-dwivedi-9935952a2</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
