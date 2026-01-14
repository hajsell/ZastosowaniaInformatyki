import { Router } from "express";
import { getPosts, getCategories, getUserPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getPosts);
router.get("/categories", getCategories);
router.get("/my-posts", authenticateToken, getUserPosts);
router.get("/:id", getPostById);

router.post("/", authenticateToken, upload.array("images", 5), createPost);

router.put("/:id", authenticateToken, upload.array("images", 5), updatePost);

router.delete("/:id", authenticateToken, deletePost);

export default router;