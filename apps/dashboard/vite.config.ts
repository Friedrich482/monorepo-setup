import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(),
    commonjs(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    visualizer({
      open: true,
      filename: "dist/deps.html",
    }),
  ],
  server: {
    port: 5175,
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/]react/,
            },
            {
              name: "zod-vendor",
              test: /node_modules[\\/]zod/,
            },
          ],
        },
      },
    },
  },
});
