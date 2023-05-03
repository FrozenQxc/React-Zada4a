import { Router } from "express";
const router = new Router();
import { checkAuth } from "../utils/checkAuth.js";
import { createPost } from "../controllers/posts.js";

// Create Post
router.post("/", checkAuth, createPost);

// router.get("/", getAll);

export default router;
