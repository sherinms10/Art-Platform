import type { Request, Response } from "express";

import { db } from "../config/database.js";

export const createArtworkRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      name,
      email,
      phone,
      artworkId,
      style,
      size,
      quantity,
      description,
    } = req.body;

    // Uploaded reference image
    const referenceImage = req.file
      ? `/uploads/artwork-requests/${req.file.filename}`
      : null;

    // Basic validation
    if (!name || !email || !phone || !style || !size) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, style and size are required.",
      });
    }

    const requestQuantity = Number(quantity) || 1;

    // 1. Check whether customer already exists
    const [existingCustomers] = await db.execute(
      "SELECT id FROM customers WHERE email = ? LIMIT 1",
      [email],
    );

    const customers = existingCustomers as Array<{ id: number }>;

    let customerId: number;

    if (customers.length > 0) {
      customerId = customers[0].id;

      // Update customer information
      await db.execute(
        `
        UPDATE customers
        SET name = ?, phone = ?
        WHERE id = ?
        `,
        [name, phone, customerId],
      );
    } else {
      // 2. Create new customer
      const [customerResult] = await db.execute(
        `
        INSERT INTO customers (name, email, phone)
        VALUES (?, ?, ?)
        `,
        [name, email, phone],
      );

      const result = customerResult as { insertId: number };

      customerId = result.insertId;
    }

    // 3. Create artwork request
    const [requestResult] = await db.execute(
      `
      INSERT INTO artwork_requests
      (
        customer_id,
        artwork_id,
        style,
        size,
        quantity,
        description,
        reference_image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customerId,
        artworkId ? Number(artworkId) : null,
        style,
        size,
        requestQuantity,
        description || null,
        referenceImage,
      ],
    );

    const result = requestResult as { insertId: number };

    return res.status(201).json({
      success: true,
      message: "Artwork request submitted successfully.",
      data: {
        requestId: result.insertId,
        customerId,
        artworkId: artworkId ? Number(artworkId) : null,
        referenceImage,
      },
    });
  } catch (error) {
    console.error("Create artwork request error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the artwork request.",
    });
  }
};