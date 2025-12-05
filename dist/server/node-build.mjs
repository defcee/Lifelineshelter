import path from "path";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
function createServer() {
  const app2 = express();
  app2.use(cors());
  app2.use(express.json());
  app2.use(express.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", (_req, res) => {
    res.json({ message: "Hello from Express server" });
  });
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  function generateToken(username) {
    return Buffer.from(`${username}:${Date.now()}`).toString("base64");
  }
  app2.post("/api/admin/login", (req, res) => {
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
        admin: {
          username,
          email: process.env.ADMIN_EMAIL
        }
      });
    }
    res.status(401).json({ success: false, message: "Invalid username or password" });
  });
  const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";
  app2.post("/api/get-involved", async (req, res) => {
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
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      const mailOptions = {
        from: `LifeLine Shelter <${process.env.SMTP_USER}>`,
        to: EMAIL_TO,
        subject: `[LifeLine] New ${type} Submission from ${firstName} ${lastName}`,
        replyTo: email,
        text: `Name: ${firstName} ${lastName}
Email: ${email}
Type: ${type}
Message:
${message}`,
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
  app2.all("/api/:splat*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname$1 = import.meta.dirname;
const distPath = path.join(__dirname$1, "../spa");
app.use(express.static(distPath));
app.all("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
