import express from "express";
import authMiddleware from "../middleware/auth.Middleware.js";
import { createBlog, getBlogs } from "../controllers/blog.Controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", authMiddleware, createBlog);

export default router;
