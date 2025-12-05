import path from "path";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lifelineshelter.com";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";
const SMTP_HOST = process.env.SMTP_HOST || "mail.lifelineshelter.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER || "customerrepresentative@lifelineshelter.com";
const SMTP_PASS = process.env.SMTP_PASS || "your_email_password_here";
const PORT = Number(process.env.PORT) || 3e3;
const PING_MESSAGE = process.env.PING_MESSAGE || "ping pong";
function createServer() {
  const app2 = express();
  app2.use(cors());
  app2.use(express.json());
  app2.use(express.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    res.json({ message: PING_MESSAGE });
  });
  app2.get("/api/demo", (_req, res) => {
    res.json({ message: "Hello from Express server" });
  });
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
        admin: { username, email: ADMIN_EMAIL }
      });
    }
    res.status(401).json({ success: false, message: "Invalid username or password" });
  });
  app2.post("/api/get-involved", async (req, res) => {
    const { firstName, lastName, email, type, message } = req.body || {};
    if (!firstName || !lastName || !email || !type || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    try {
      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) ;
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
  app2.all("/api/:splat*", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });
  return app2;
}
const app = createServer();
const spaPath = "/home/lifelin2/server/spa";
app.use(express.static(spaPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(spaPath, "index.html"));
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend available at /server/spa/`);
  console.log(`🔧 API available at /api/`);
});
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
//# sourceMappingURL=node-build.mjs.map
