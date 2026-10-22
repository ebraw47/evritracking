/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Evri-inspired blue brand */
        brand: {
          DEFAULT: "#0072BC",
          dark: "#005A96",
          soft: "#E8F4FC",
        },
        navy: {
          950: "#000033",
          900: "#00004D",
          800: "#001A66",
          700: "#003380",
          600: "#0072BC",
          500: "#1A8AD4",
          200: "#A8D4F0",
          100: "#D6ECF8",
          50: "#F0F8FC",
        },
        teal: {
          950: "#000033",
          900: "#00004D",
          800: "#001A66",
          700: "#003380",
          600: "#0072BC",
          500: "#1A8AD4",
          100: "#D6ECF8",
        },
        coral: {
          DEFAULT: "#0072BC",
          dark: "#005A96",
        },
        ink: {
          DEFAULT: "#00004D",
          soft: "#2A2A5A",
          mute: "#5A5A7A",
        },
        paper: {
          DEFAULT: "#F5F8FB",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0, 114, 188, 0.35)",
        lift: "0 18px 50px -18px rgba(0, 0, 77, 0.28)",
      },
    },
  },
  plugins: [],
};
