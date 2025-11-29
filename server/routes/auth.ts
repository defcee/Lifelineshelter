import { RequestHandler } from "express";
import { AdminLoginRequest, AdminLoginResponse } from "@shared/api";

// In production, use proper password hashing with bcrypt
// For now, using environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Simple token generation (in production, use JWT)
function generateToken(username: string): string {
  return Buffer.from(`${username}:${Date.now()}`).toString("base64");
}

export const handleAdminLogin: RequestHandler = (req, res) => {
  const { username, password } = req.body as AdminLoginRequest;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    } as AdminLoginResponse);
  }

  // Check credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken(username);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        username,
        email: process.env.ADMIN_EMAIL,
      },
    } as AdminLoginResponse);
  }

  // Invalid credentials
  res.status(401).json({
    success: false,
    message: "Invalid username or password",
  } as AdminLoginResponse);
};

export const handleAdminDashboard: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "No authorization token provided",
    });
  }

  // Simple token validation (in production, verify JWT)
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username] = decoded.split(":");

    res.status(200).json({
      authenticated: true,
      message: "Authenticated",
      user: { username },
    });
  } catch {
    res.status(401).json({
      authenticated: false,
      message: "Invalid or expired token",
    });
  }
};
