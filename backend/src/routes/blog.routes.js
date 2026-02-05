import express from "express";
import authMiddleware from "../middleware/auth.Middleware.js";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// Public
router.get("/", getBlogs);

// Protected
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
