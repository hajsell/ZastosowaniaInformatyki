import express from "express";
import cors from "cors";
import { pool } from "./db/pool";
import { listPosts, getPost, createPost } from "./modules/posts/posts.repo";
import { listComments, createComment } from "./modules/comments/comments.repo";
import { getSidebar } from "./modules/sidebar/sidebar.repo";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/db-test", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW() as now");
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.get("/api/posts", async (_req, res, next) => {
  try { res.json(await listPosts()); } catch (e) { next(e); }
});

app.get("/api/posts/:id", async (req, res, next) => {
  try {
    const post = await getPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (e) { next(e); }
});

app.get("/api/posts/:id/comments", async (req, res, next) => {
  try { res.json(await listComments(Number(req.params.id))); } catch (e) { next(e); }
});

app.post("/api/posts", async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;
    const created = await createPost(title, content, tag);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

app.post("/api/posts/:id/comments", async (req, res, next) => {
  try {
    const { content } = req.body;
    const created = await createComment(Number(req.params.id), content);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

app.get("/api/sidebar", async (_req, res, next) => {
  try { res.json(await getSidebar()); } catch (e) { next(e); }
});

export default app;
