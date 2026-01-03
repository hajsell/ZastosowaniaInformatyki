import { pool } from "../../db/pool";

export async function getSidebar() {
  const { rows } = await pool.query(
    `SELECT id, type, label, value, sort_order
     FROM sidebar_items
     ORDER BY type, sort_order`
  );
  return rows;
}
