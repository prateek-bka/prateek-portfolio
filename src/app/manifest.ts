import type { MetadataRoute } from "next";
import { site } from "@/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f0b1e",
    theme_color: "#7c3aed",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
