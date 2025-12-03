import path from "path";
import express from "express";
import "dotenv/config";
import cors from "cors";
import nodemailer from "nodemailer";

// ---------------- API HANDLERS ---------------- //

const handleDemo = (req, res) => {
  res.status(200).json({ message: "Hello from Express server" });
};

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function generateToken(username) {
  return Buffer.from(`${username}:${Date.now()}`).toString("base64");
}

const handleAdminLogin = (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ success: false, message: "Username and password required" });

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken(username);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: { username, email: process.env.ADMIN_EMAIL }
    });
  }

  res.status(401).json({ success: false, message: "Invalid username or password" });
};

const handleAdminDashboard = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ authenticated: false, message: "No authorization token provided" });

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username] = decoded.split(":");
    res.status(200).json({ authenticated: true, message: "Authenticated", user: { username } });
  } catch {
    res.status(401).json({ authenticated: false, message: "Invalid or expired token" });
  }
};

const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";

const handleGetInvolved = async (req, res) => {
  const { firstName, lastName, email, type, message } = req.body || {};
  if (!firstName || !lastName || !email || !type || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️ SMTP not configured. Email not sent.");
      return res.status(200).json({ message: "Your submission has been received. We will contact you soon." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const mailOptions = {
      from: `LifeLine Shelter <${process.env.SMTP_USER}>`,
      to: EMAIL_TO,
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
  } catch {
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
};

// ---------------- SERVER ---------------- //

function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/ping", (_req, res) => res.json({ message: process.env.PING_MESSAGE ?? "ping" }));
  app.get("/api/demo", handleDemo);
  app.post("/api/admin/login", handleAdminLogin);
  app.get("/api/admin/dashboard", handleAdminDashboard);
  app.post("/api/get-involved", handleGetInvolved);

  // Catch-all for API routes that don't exist
  app.all("/api/*", (_req, res) => res.status(404).json({ error: "API endpoint not found" }));

  return app;
}

const app = createServer();
const port = process.env.PORT || 3000;

// Serve static frontend
const distPath = path.resolve("./dist/spa"); // use relative path for Render
app.use(express.static(distPath));

// Catch-all route for frontend
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "API endpoint not found" });
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
["SIGTERM", "SIGINT"].forEach(sig => process.on(sig, () => {
  console.log(`🛑 Received ${sig}, shutting down gracefully`);
  process.exit(0);
}));
