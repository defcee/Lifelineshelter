import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const EMAIL_TO = process.env.CONTACT_EMAIL || "customerrepresentative@lifelineshelter.com";

export const handleGetInvolved: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, type, message } = req.body || {};
  if (!firstName || !lastName || !email || !type || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
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
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
};
