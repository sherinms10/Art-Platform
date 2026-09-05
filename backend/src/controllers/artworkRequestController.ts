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
    const referenceImageUrl = req.file
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
    reference_image_url
  )
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  [
    customerId,
    artworkId || null,
    style,
    size,
    requestQuantity,
    description || null,
    referenceImageUrl,
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
        referenceImageUrl,
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

export const getArtworkRequests = async (
  req: Request,
  res: Response,
) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        ar.id,
        ar.customer_id,
        ar.artwork_id,
        ar.style,
        ar.size,
        ar.quantity,
        ar.description,
        ar.reference_image_url,
        ar.status,
        ar.created_at,
        c.name,
        c.email,
        c.phone,
        a.title AS artwork_title,
        a.image_url AS artwork_image
      FROM artwork_requests ar
      LEFT JOIN customers c
        ON ar.customer_id = c.id
      LEFT JOIN artworks a
        ON ar.artwork_id = a.id
      ORDER BY ar.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Get artwork requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch artwork requests.",
    });
  }
};

export const updateArtworkRequestStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "reviewing",
      "quoted",
      "approved",
      "completed",
      "cancelled",
    ];

    if (!requestId || Number.isNaN(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid artwork request ID.",
      });
    }

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid artwork request status.",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE artwork_requests
      SET status = ?
      WHERE id = ?
      `,
      [status, requestId],
    );

    const updateResult = result as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Artwork request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Artwork request status updated successfully.",
      data: {
        id: requestId,
        status,
      },
    });
  } catch (error) {
    console.error("Update artwork request status error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the status.",
    });
  }
};