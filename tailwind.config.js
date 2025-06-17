const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        "2.5xl": "0px 0px 16px -10px #111118",
        "3xl": "0px 0px 16px 0px #111118",
      },
      colors: {
        // generated using tailwindshades.com
        ghostindigo: {
          DEFAULT: "#111118",
          50: "#EAEAF0",
          100: "#DBDBE6",
          200: "#BDBDD1",
          300: "#A0A0BB",
          400: "#8282A6",
          500: "#66668F",
          600: "#505072",
          700: "#3B3B54",
          800: "#262636",
          900: "#111118",
        },
      },
      screens: {
        /* High‑DPI breakpoints (useful for detecting browser zoom on Retina) */
        retina: { raw: "(min-resolution: 2dppx)" }, // ≈125 %–149 % zoom
        dpr3: { raw: "(min-resolution: 3dppx)" }, // ≈150 %–174 % zoom
        dpr35: { raw: "(min-resolution: 3.5dppx)" }, // ≥175 % zoom
        dpr4: { raw: "(min-resolution: 4dppx)" }, // >199 % zoom on Retina (~4× DPR)
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
    require("@tailwindcss/typography"),
  ],
};
