import path from "path";
import { fileURLToPath } from "url";
import express, { Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ----------------------
// Environment variables
// ----------------------
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lifelineshelter.com";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";
const SMTP_HOST = process.env.SMTP_HOST || "mail.lifelineshelter.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER || "customerrepresentative@lifelineshelter.com";
const SMTP_PASS = process.env.SMTP_PASS || "your_email_password_here";
const PORT = Number(process.env.PORT) || 3000;
const PING_MESSAGE = process.env.PING_MESSAGE || "ping pong";

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
  app.get("/api/ping", (_req: Request, res: Response) => {
    res.json({ message: PING_MESSAGE });
  });

  // Demo endpoint
  app.get("/api/demo", (_req: Request, res: Response) => {
    res.json({ message: "Hello from Express server" });
  });

  // Admin login
  function generateToken(username: string) {
    return Buffer.from(`${username}:${Date.now()}`).toString("base64");
  }

  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password required" });
    }
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken(username);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        admin: { username, email: ADMIN_EMAIL }
      });
    }
    res.status(401).json({ success: false, message: "Invalid username or password" });
  });

  // Contact / Get Involved
  app.post("/api/get-involved", async (req: Request, res: Response) => {
    const { firstName, lastName, email, type, message } = req.body || {};
    if (!firstName || !lastName || !email || !type || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.warn("⚠️ SMTP not configured. Email may not be sent.");
        return res.status(200).json({ message: "Your submission has been received. We will contact you soon." });
      }

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });

      const mailOptions = {
        from: `LifeLine Shelter <${SMTP_USER}>`,
        to: CONTACT_EMAIL,
        subject: `[LifeLine] New ${type} Submission from ${firstName} ${lastName}`,
        replyTo: email,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nType: ${type}\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Type:</strong> ${type}</p>
               <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Your message has been sent. Thank you!" });
    } catch (err) {
      console.error("Failed to send email:", err);
      res.status(500).json({ message: "Failed to send email. Please try again later." });
    }
  });

  // Catch-all for unknown API endpoints
  app.all("/api/:splat*", (_req: Request, res: Response) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  return app;
}

// ----------------------
// Start Server
// ----------------------
const app = createServer();

// ----------------------
// Serve SPA
// ----------------------
// Resolve SPA path relative to the directory where node-build.mjs is running
const spaPath = path.resolve(__dirname, "../spa");
app.use(express.static(spaPath));

// SPA routing: serve index.html for all non-API routes
app.get("*", (req: Request, res: Response) => {
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
  console.log(`📱 Frontend available at /server/spa/`);
  console.log(`🔧 API available at /api/`);
});

// ----------------------
// Graceful shutdown
// ----------------------
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
