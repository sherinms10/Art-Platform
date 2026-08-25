import { Router } from "express";
import multer from "multer";
import path from "path";

import { createArtworkRequest } from "../controllers/artworkRequestController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/artwork-requests");
  },

  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WEBP images are allowed."));
    }
  },
});

router.post(
  "/",
  upload.single("referenceImage"),
  createArtworkRequest,
);

export default router;