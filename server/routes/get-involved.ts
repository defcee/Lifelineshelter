import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";

export const handleGetInvolved: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, type, message } = req.body || {};
  if (!firstName || !lastName || !email || !type || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️  SMTP not configured. Email may not be sent. Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env");
      return res.status(200).json({ message: "Your submission has been received. We will contact you soon." });
    }

    const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465, 
  secure: true,
  auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `LifeLine Shelter <${process.env.SMTP_USER}>`,
      to: EMAIL_TO,
      subject: `[LifeLine] New ${type} Submission from ${firstName} ${lastName}`,
      replyTo: email,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nType: ${type}\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Type:</strong> ${type}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Your message has been sent. Thank you!" });
  } catch (err) {
    console.error("Email send error:", err instanceof Error ? err.message : err);
    res.status(500).json({
      message: "Failed to send email. Please try again later.",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
