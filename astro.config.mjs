import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [mdx(), react(), sitemap()],
  site: "https://shrirambalaji.com",

  vite: {
    plugins: [tailwindcss()],
  },
});
