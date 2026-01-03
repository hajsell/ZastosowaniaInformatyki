import { pool } from "../../db/pool";

export async function listPosts() {
  const { rows } = await pool.query(
    `SELECT id, title, tag, created_at
     FROM posts
     ORDER BY created_at DESC
     LIMIT 50`
  );
  return rows;
}

export async function getPost(postId: number) {
  const { rows } = await pool.query(
    `SELECT id, title, content, tag, created_at
     FROM posts
     WHERE id = $1`,
    [postId]
  );
  return rows[0] ?? null;
}

export async function createPost(title: string, content: string, tag: string) {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, tag)
     VALUES ($1, $2, $3)
     RETURNING id, title, content, tag, created_at`,
    [title, content, tag]
  );
  return rows[0];
}
