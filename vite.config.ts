import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    outDir: "dist/spa", // output goes into dist folder alongside server build
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
  },
  base: "/", // ensures correct paths for JS/CSS
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
      "@server": path.resolve(__dirname, "server"),
    },
  },
});
