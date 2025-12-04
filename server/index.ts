import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAdminLogin, handleAdminDashboard } from "./routes/auth";
import { handleGetInvolved } from "./routes/get-involved";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);


  // Admin authentication routes
  app.post("/api/admin/login", handleAdminLogin);
  app.get("/api/admin/dashboard", handleAdminDashboard);

  // Get Involved form submission
  app.post("/api/get-involved", handleGetInvolved);

  // Ensure any unmatched API route returns JSON (prevents HTML index being returned for API requests)
 app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

  return app;
}
