import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0E4346",
        secondary: "#FFF2EA",
        tertiary: "#EBDAD0",
        quaternary: "#490FBD",
        quinary: "#89DB0F",
        danger: "#AF3830",
      },
      fontFamily: {
        beVietnamPro: ["var(--font-be-vietnam-pro)"],
        dmSerifText: ["var(--font-dm-serif-text)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
