import path from "path";
import express from "express";
import "dotenv/config";
import cors from "cors";
import nodemailer from "nodemailer";

// ---------- Utils ----------
function generateToken(username) {
  return Buffer.from(`${username}:${Date.now()}`).toString("base64");
}

// ---------- Handlers ----------
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";

// Demo
const handleDemo = (_req, res) => {
  res.status(200).json({ message: "Hello from Express server" });
};

// Admin login
const handleAdminLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken(username);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: { username, email: process.env.ADMIN_EMAIL },
    });
  }
  res.status(401).json({ success: false, message: "Invalid username or password" });
};

// Admin dashboard
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

// Contact form
const handleGetInvolved = async (req, res) => {
  const { firstName, lastName, email, type, message } = req.body || {};
  if (!firstName || !lastName || !email || !type || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️ SMTP not configured. Email may not be sent.");
      return res.status(200).json({ message: "Your submission has been received. We will contact you soon." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `LifeLine Shelter <${process.env.SMTP_USER}>`,
      to: EMAIL_TO,
      subject: `[LifeLine] New ${type} Submission from ${firstName} ${lastName}`,
      replyTo: email,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nType: ${type}\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Type:</strong> ${type}</p>
             <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    res.status(200).json({ message: "Your message has been sent. Thank you!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
};

// ---------- Routers ----------
const apiRouter = express.Router();
apiRouter.get("/ping", (_req, res) => res.json({ message: process.env.PING_MESSAGE ?? "ping" }));
apiRouter.get("/demo", handleDemo);
apiRouter.post("/admin/login", handleAdminLogin);
apiRouter.get("/admin/dashboard", handleAdminDashboard);
apiRouter.post("/get-involved", handleGetInvolved);

// Fallback for unknown API routes
apiRouter.all("*", (_req, res) => res.status(404).json({ error: "API endpoint not found" }));

// ---------- Server ----------
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

// Serve SPA
const port = process.env.PORT || 3000;
const distPath = path.resolve(process.cwd(), "dist/spa");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down gracefully");
  process.exit(0);
});
