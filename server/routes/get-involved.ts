import { RequestHandler } from "express";
import { Resend } from "resend";

const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export const handleGetInvolved: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, type, message } = req.body || {};

  // Validate input
  if (!firstName || !lastName || !email || !type || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Ensure keys exist
    if (!process.env.RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY missing. Set it in .env.");
      return res.status(500).json({ message: "Email service is not configured." });
    }

    if (!process.env.FROM_EMAIL) {
      console.warn("⚠️ FROM_EMAIL missing. Set it in .env. Must be a verified sender.");
      return res.status(500).json({ message: "Sender email not configured." });
    }

    // Send the email
    await resend.emails.send({
      from: process.env.FROM_EMAIL, // Must be verified in your Resend dashboard
      to: EMAIL_TO,
      replyTo: email,
      subject: `[LifeLine] New ${type} Submission from ${firstName} ${lastName}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `Name: ${firstName} ${lastName}
Email: ${email}
Type: ${type}
Message:
${message}`
    });

    res.status(200).json({ message: "Your message has been sent. Thank you!" });

  } catch (err: any) {
    console.error("Email send error:", err.message || err);
    res.status(500).json({
      message: "Failed to send email. Please try again later.",
      error: err.message || "Unknown error"
    });
  }
};
