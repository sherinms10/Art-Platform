import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import artworkRequestRoutes from "./routes/artworkRequestRoutes";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/artwork-requests", artworkRequestRoutes);
app.use("/api/contact", contactRoutes);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads")),
);
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Art Platform API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});