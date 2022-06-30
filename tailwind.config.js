/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
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
    },
  },
  plugins: [],
};
