import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { handleAdminLogin, handleAdminDashboard } from "./routes/auth.js";
import { handleGetInvolved } from "./routes/get-involved.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ----------------------
// Create Express Server
// ----------------------
function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ----------------------
  // API Routes
  // ----------------------

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin authentication routes
  app.post("/api/admin/login", handleAdminLogin);
  app.get("/api/admin/dashboard", handleAdminDashboard);

  // Get Involved form submission
  app.post("/api/get-involved", handleGetInvolved);

  // Catch-all for unknown API endpoints
  app.all("/api/:splat*", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  return app;
}

// ----------------------
// Start Server
// ----------------------
const PORT = Number(process.env.PORT) || 3000;
const app = createServer();

// ----------------------
// Serve SPA
// ----------------------
// Resolve SPA path relative to the directory where node-build.mjs is running
const spaPath = path.resolve(__dirname, "../spa");
app.use(express.static(spaPath));

// SPA routing: serve index.html for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(spaPath, "index.html"), (err) => {
    if (err) {
      console.error(`Error serving index.html from ${spaPath}:`, err.message);
      res.status(500).json({ error: "Failed to serve index.html" });
    }
  });
});

// ----------------------
// Start listening
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend available at /`);
  console.log(`🔧 API available at /api/`);
});

// ----------------------
// Graceful shutdown
// ----------------------
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
