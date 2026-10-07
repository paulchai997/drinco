// Drinco International website - standalone Astro configuration.
//
// This project was originally exported with a set of private Kleap build
// compatibility files that were not included in the ZIP. The original config
// also had a .json extension even though it contained JavaScript. This version
// is a normal Astro config and does not depend on those private files.

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const site = process.env.PUBLIC_SITE_URL || "http://localhost:4321";

export default defineConfig({
  site,
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
      dedupe: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
    },
  },
});
