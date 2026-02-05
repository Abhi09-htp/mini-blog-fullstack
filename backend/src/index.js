import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";


const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
