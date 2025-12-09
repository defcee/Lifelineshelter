import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";

export const handleGetInvolved: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, type, message } = req.body || {};

  if (!firstName || !lastName || !email || !type || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Ensure SES credentials exist
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️ SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, SMTP_PASS.");
      return res.status(200).json({ message: "Your submission has been received. We will contact you soon." });
    }

    // Amazon SES transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // email-smtp.us-east-1.amazonaws.com
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // STARTTLS (SES preferred, Render compatible)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP VERIFY ERROR:", error);
      } else {
        console.log("SMTP Connection Successful:", success);
      }
    });

    const mailOptions = {
      from: `LifeLine Shelter <${process.env.FROM_EMAIL}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `[LifeLine] New ${type} Submission from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}
Email: ${email}
Type: ${type}
Message:
${message}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Your message has been sent. Thank you!" });

  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({
      message: "Failed to send email. Please try again later.",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
