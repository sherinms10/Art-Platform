import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createArtworkRequest,
  getArtworkRequests,
  updateArtworkRequestStatus,
} from "../controllers/artworkRequestController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

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
      cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed.",
        ),
      );
    }
  },
});

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| Customers can submit artwork requests without admin login.
*/

router.post(
  "/",
  upload.single("referenceImage"),
  createArtworkRequest,
);

/*
|--------------------------------------------------------------------------
| ADMIN ONLY
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authMiddleware,
  getArtworkRequests,
);

router.put(
  "/:id/status",
  authMiddleware,
  updateArtworkRequestStatus,
);

export default router;