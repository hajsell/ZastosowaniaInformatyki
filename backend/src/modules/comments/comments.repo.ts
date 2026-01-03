import { pool } from "../../db/pool";

export async function listComments(postId: number) {
  const { rows } = await pool.query(
    `SELECT id, post_id, content, created_at
     FROM comments
     WHERE post_id = $1
     ORDER BY created_at ASC`,
    [postId]
  );
  return rows;
}

export async function createComment(postId: number, content: string) {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, content)
     VALUES ($1, $2)
     RETURNING id, post_id, content, created_at`,
    [postId, content]
  );
  return rows[0];
}
