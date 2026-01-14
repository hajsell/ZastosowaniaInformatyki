import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes"; 
import postRoutes from "./routes/postRoutes";

const app = express(); 

app.use(cors());
app.use(express.json());

const uploadsPath = path.join(__dirname, "../public/uploads");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(uploadsPath));

console.log("Folder z obrazkami to:", uploadsPath);

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});