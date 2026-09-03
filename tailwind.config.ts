import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        linen: '#FAF8F5',
        sand: {
          light: '#F8F6F2',
          DEFAULT: '#F0ECE4',
          dark: '#E2DBD0',
        },
        sage: {
          light: '#EAF1ED',
          DEFAULT: '#6F9280',
          dark: '#4F6C5E',
        },
        amethyst: {
          light: '#F4F1FD',
          DEFAULT: '#8A77E2',
          dark: '#6955C2',
        },
        gold: {
          light: '#FBF5E5',
          DEFAULT: '#D4AF37',
          dark: '#B08D24',
        },
        deep: {
          DEFAULT: '#191B1F',
          soft: '#2D3139',
          muted: '#666C7A',
        }
      },
      boxShadow: {
        'zen': '0 4px 20px -2px rgba(111, 146, 128, 0.12)',
        'aura': '0 0 30px rgba(138, 119, 226, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
