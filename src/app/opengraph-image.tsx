import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/portfolio";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card LinkedIn, X and WhatsApp show when the site is shared.
export default async function OpengraphImage() {
  const photo = `data:image/jpeg;base64,${(await readFile(path.join(process.cwd(), "public", site.photo))).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0f0b1e",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(124,58,237,0.55), transparent 45%), radial-gradient(circle at 85% 30%, rgba(8,145,178,0.5), transparent 45%), radial-gradient(circle at 50% 100%, rgba(219,39,119,0.45), transparent 50%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7c3aed, #db2777, #0891b2)",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            PA
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)" }}>prateekagrawal.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div
            style={{
              marginTop: 18,
              fontSize: 46,
              fontWeight: 700,
              backgroundImage: "linear-gradient(90deg, #c4b5fd, #f9a8d4, #67e8f9)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {site.role}
          </div>
          <div style={{ marginTop: 26, fontSize: 28, color: "rgba(255,255,255,0.72)", maxWidth: 760 }}>
            Full-stack · AWS GenAI certified · Agents & RAG
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 150,
            width: 300,
            height: 300,
            borderRadius: 150,
            padding: 7,
            display: "flex",
            background: "linear-gradient(135deg, #7c3aed, #db2777, #0891b2)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={286} height={286} style={{ borderRadius: 143 }} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
