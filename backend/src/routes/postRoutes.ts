import { Router } from "express";
import { getPosts, getCategories } from "../controllers/postController";

const router = Router();

router.get("/", getPosts);
router.get("/categories", getCategories);

export default router;