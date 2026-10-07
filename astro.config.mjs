// Drinco International website - standalone Astro configuration.

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const site = "https://paulchai997.github.io";

export default defineConfig({
  site,
  base: "/drinco",
  output: "static",
  compressHTML: true,

  integrations: [
    react(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },

      dedupe: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
      ],
    },
  },
});