import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        merriweather: [
          "Merriweather",
          "serif",
        ],
        'source-sans-pro': [
          "Source Sans Pro",
          "sans-serif",
        ],
        montserrat: [
          "Montserrat",
          "sans-serif",
        ],
      },
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'law-gold': '#B8860B',
        'law-dark': '#2c2a23',
        'law-cream': '#fffaea',
      },
      backgroundImage: {
        'gold-texture': "url('/gold.jpg')",
        'gold2-texture': "url('/gold2.png')",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;
