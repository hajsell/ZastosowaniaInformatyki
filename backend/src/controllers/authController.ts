import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone_number } = req.body;

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email jest już zajęty" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash, phone_number) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
      [name, email, hashedPassword, phone_number || null]
    );

    res.status(201).json({ 
      message: "Zarejestrowano pomyślnie", 
      user: newUser.rows[0] 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera podczas rejestracji" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Błędny email lub hasło" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Błędny email lub hasło" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string, 
      { expiresIn: "24h" }
    );

    res.json({
      message: "Zalogowano pomyślnie",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};