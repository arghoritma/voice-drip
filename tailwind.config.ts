import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FF3366", // Warna gradasi pink-merah
          secondary: "#2E1A47", // Background gelap
          accent: "#FF647F",
          neutral: "#1C1C1E",
          "base-100": "#2E1A47",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
} satisfies Config;
