import { Router } from "express";
import { db } from "../config/database";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const sql = `
      INSERT INTO contact_messages
      (name, email, phone, message)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name,
      email,
      phone || null,
      message,
    ]);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
});

export default router;