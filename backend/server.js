import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import foodRoutes from "./routes/foodRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Make __dirname available (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images from backend/images when running this server
app.use("/images", express.static(path.join(__dirname, "images")));

connectDB();

app.use("/api/foods", foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
