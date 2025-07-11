import express from "express";
import cors from "cors";
import { MemStorage } from "./storage.js";
import { createRoutes } from "./routes.js";

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Initialize storage
const storage = new MemStorage();

// Routes
app.use(createRoutes(storage));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

export default app;