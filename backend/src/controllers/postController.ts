import { Request, Response } from "express";
import { pool } from "../db/pool";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name, i.image_path 
      FROM posts p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN images i ON p.id = i.post_id
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas pobierania ogłoszeń" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM category ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas pobierania kategorii" });
  }
};