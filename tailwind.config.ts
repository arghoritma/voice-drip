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
          primary: "#00ACEE",
          secondary: "#60CAF4",
          accent: "#FCB023",
          neutral: "#2a323c",
          "base-100": "#ffffff",
        },
        dark: {
          primary: "#00ACEE",
          secondary: "#60CAF4",
          accent: "#FCB023",
          neutral: "#191e24",
          "base-100": "#2a323c",
        },
      },
    ],
  },
} satisfies Config;
