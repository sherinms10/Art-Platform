import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AdminTokenPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  admin?: AdminTokenPayload;
}

export const requireAdminAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
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

    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Your session is invalid or has expired. Please log in again.",
    });
  }
};