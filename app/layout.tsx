import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Lora,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const spiritualDisplay = Cormorant_Garamond({
  variable: "--font-spiritual-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const spiritualItalic = Playfair_Display({
  variable: "--font-spiritual-italic",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
});

const spiritualClassic = Lora({
  variable: "--font-spiritual-classic",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA ✦ Простір духовних практик та медитацій",
  description:
    "Сучасна платформа для анонсування, пошуку та промоції каналів та подій у сфері медитацій, Рейкі, звукотерапії та енергопрактик.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spiritualDisplay.variable} ${spiritualItalic.variable} ${spiritualClassic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
