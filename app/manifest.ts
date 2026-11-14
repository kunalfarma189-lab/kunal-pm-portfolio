import type { MetadataRoute } from "next";

// Web app manifest: lets phones "Add to Home Screen" with the right name,
// colours and icon, and opens the site full-screen like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kunal Farma — Growth Marketer",
    short_name: "Kunal Farma",
    description: "Growth Marketer portfolio: how I work, case studies, experience and toolkit.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070c",
    theme_color: "#05070c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  };
}
