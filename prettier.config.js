// prettier.config.js
module.exports = {
  tabWidth: 2,
  arrowParens: "always",
  singleQuote: false,
  trailingComma: "es5",
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js",
};
