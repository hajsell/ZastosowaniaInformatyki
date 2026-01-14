import { Request, Response } from "express";
import { pool } from "../db/pool";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(__dirname, "../../public/uploads");

const deleteFiles = (filenames: string[]) => {
  filenames.forEach((filename) => {
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Błąd usuwania pliku ${filename}:`, err);
      });
    }
  });
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM category ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas pobierania kategorii" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT 
        p.*, 
        c.name as category_name,
        (SELECT json_agg(image_path) FROM images WHERE post_id = p.id) as images
      FROM posts p
      LEFT JOIN category c ON p.category_id = c.id
    `;
    
    const values: any[] = [];
    if (category) {
      query += ` WHERE c.slug = $1`;
      values.push(category);
    }

    query += ` ORDER BY p.created_at DESC`;
    
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

export const getUserPosts = async (req: any, res: Response) => {
  try {
    const userId = req.user.id || req.user.userId;
    const result = await pool.query(`
      SELECT p.*, c.name as category_name,
      (SELECT json_agg(image_path) FROM images WHERE post_id = p.id) as images
      FROM posts p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC
    `, [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Błąd pobierania Twoich ogłoszeń" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.name as category_name, u.name as author_name, 
      u.email as author_email, u.phone_number as author_phone,
      (SELECT json_agg(image_path) FROM images WHERE post_id = p.id) as images
      FROM posts p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Błąd" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, price, city, category_id } = req.body;
  const userId = (req as any).user?.id || (req as any).user?.userId;
  const files = req.files as Express.Multer.File[];

  if (!userId) return res.status(401).json({ message: "Brak autoryzacji" });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const postResult = await client.query(
      `INSERT INTO posts (title, content, price, city, category_id, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [title, content, price, city, category_id, userId]
    );
    const postId = postResult.rows[0].id;

    if (files && files.length > 0) {
      for (const file of files) {
        await client.query("INSERT INTO images (post_id, image_path) VALUES ($1, $2)", [postId, file.filename]);
      }
    }
    await client.query("COMMIT");
    res.status(201).json({ message: "Dodano", postId });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Błąd serwera" });
  } finally {
    client.release();
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, price, city, category_id, existingImages } = req.body;
  const files = req.files as Express.Multer.File[];
  const userId = (req as any).user?.id || (req as any).user?.userId;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const keptImages = JSON.parse(existingImages || "[]");
    const oldImagesResult = await client.query("SELECT image_path FROM images WHERE post_id = $1", [id]);
    const imagesToDelete = oldImagesResult.rows
      .map(r => r.image_path)
      .filter(path => !keptImages.includes(path));

    const updateResult = await client.query(
      `UPDATE posts SET title = $1, content = $2, price = $3, city = $4, category_id = $5 
       WHERE id = $6 AND user_id = $7`,
      [title, content, price, city, category_id, id, userId]
    );

    if (updateResult.rowCount === 0) throw new Error("Brak uprawnień");

    await client.query("DELETE FROM images WHERE post_id = $1 AND NOT (image_path = ANY($2))", [id, keptImages]);

    if (files && files.length > 0) {
      for (const file of files) {
        await client.query("INSERT INTO images (post_id, image_path) VALUES ($1, $2)", [id, file.filename]);
      }
    }

    deleteFiles(imagesToDelete);
    await client.query("COMMIT");
    res.json({ message: "Zaktualizowano" });
  } catch (err: any) {
    await client.query("ROLLBACK");
    res.status(500).json({ message: err.message });
  } finally {
    client.release();
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user?.id || (req as any).user?.userId;

  try {
    const checkPost = await pool.query("SELECT user_id FROM posts WHERE id = $1", [id]);
    if (checkPost.rows.length === 0) return res.status(404).json({ message: "Błąd" });
    if (checkPost.rows[0].user_id !== userId) return res.status(403).json({ message: "Brak uprawnień" });

    const imagesResult = await pool.query("SELECT image_path FROM images WHERE post_id = $1", [id]);
    const filenames = imagesResult.rows.map(r => r.image_path);

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    
    deleteFiles(filenames);
    res.json({ message: "Usunięto" });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};