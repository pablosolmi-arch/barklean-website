// tailwind.config.ts
// In Tailwind v4, color tokens and font families are defined via the
// @theme block in app/globals.css — not here. This file is retained
// only for the content glob paths used by the v4 file scanner.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
