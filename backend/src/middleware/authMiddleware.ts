import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AdminTokenPayload {
  id: number;
  email: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration is missing.",
      });
    }

    const decoded = jwt.verify(
      token,
      secret,
    ) as AdminTokenPayload;

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // Store authenticated admin information
    // for later use if needed.
    (req as Request & {
      admin?: AdminTokenPayload;
    }).admin = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};