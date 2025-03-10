import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Drip Voice",
    short_name: "drip voice",
    description:
      "Drip Voice is a platform for sharing your thoughts and ideas.",
    start_url: "/",
    display: "standalone",
    background_color: "#2E1A47",
    theme_color: "#000000",
    icons: [
      {
        purpose: "maskable",
        sizes: "48x48",
        src: "maskable_icon_x48.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "72x72",
        src: "maskable_icon_x72.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "96x96",
        src: "maskable_icon_x96.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "128x128",
        src: "maskable_icon_x128.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "maskable_icon_x192.png",
        type: "image/png",
      },
    ],
  };
}
