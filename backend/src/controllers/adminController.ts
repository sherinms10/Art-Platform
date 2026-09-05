import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/database";

export const adminLogin = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const [rows]: any = await db.query(
      "SELECT id, name, email, password FROM admins WHERE email = ? LIMIT 1",
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const admin = rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      secret,
      {
        expiresIn: "1d",
      },
    );

    return res.json({
      success: true,
      message: "Admin login successful.",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during admin login.",
    });
  }
};