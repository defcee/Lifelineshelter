import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"], // prevent backend access
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressDevMiddleware()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

/**
 * Express middleware for Vite dev server.
 * Only used in development mode.
 * Import backend code lazily to avoid Vite trying to bundle server-only packages.
 */
function expressDevMiddleware(): Plugin {
  return {
    name: "vite:express-dev-middleware",
    apply: "serve",
    configureServer(server) {
      // Lazy import to prevent Vite from parsing backend dependencies
      import("./server").then(({ createServer }) => {
        const app = createServer();
        server.middlewares.use(app);
      });
    },
  };
}
