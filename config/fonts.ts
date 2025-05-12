import { Be_Vietnam_Pro, DM_Serif_Text } from "next/font/google";

export const fontBeVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  weight: ["400", "500", "700", "900"],
});

export const fontDMSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  weight: ["400"],
});
