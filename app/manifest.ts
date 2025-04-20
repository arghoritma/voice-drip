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
        sizes: "192x192",
        src: "android-chrome-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "android-chrome-512x512.png",
        type: "image/png",
      },
    ],
  };
}
