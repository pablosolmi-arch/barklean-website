// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#5DADE2",
          dark: "#3498DB",
          hero: "#1a6ea8",
          light: "#A7DCFF",
          bg: "#ECF5FB",
          surface: "#F4FAFD",
          charcoal: "#2D2D2D",
          gray: "#54595F",
          muted: "#7A7A7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        slab: ["var(--font-roboto-slab)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
