import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
