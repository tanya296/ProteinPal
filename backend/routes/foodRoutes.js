import express from "express";
import fs from "fs";
import path from "path";
import Food from "../models/foodModel.js";

const router = express.Router();

// Helper function to calculate protein per rupee
const calculateProteinPerRupee = (food) => {
  return food.protein / food.price;
};

// Helper function to sort foods by protein efficiency
const sortByProteinEfficiency = (foods) => {
  return foods.sort((a, b) => calculateProteinPerRupee(b) - calculateProteinPerRupee(a));
};

// Get all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().lean();
    const sortedFoods = sortByProteinEfficiency(foods);
    // Map images to absolute URLs
    const host = `${req.protocol}://${req.get("host")}`;
    const imagesDir = path.join(process.cwd(), "backend", "images");

    const normalizeImage = (img) => {
      if (!img || typeof img !== "string") return null;
      if (img.startsWith("http")) return img;
      // get filename part
      let filename = img.split("/").pop();
      // if filename has no extension, try common ones
      if (!path.extname(filename)) {
        const exts = [".png", ".jpg", ".jpeg"];
        for (const ext of exts) {
          const candidate = path.join(imagesDir, filename + ext);
          if (fs.existsSync(candidate)) {
            filename = filename + ext;
            break;
          }
        }
      }
      return `${host}/images/${filename}`;
    };

    const mapped = sortedFoods.map((f) => ({ ...f, image: normalizeImage(f.image) }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get foods under budget
router.get("/budget/:amount", async (req, res) => {
  try {
    const budget = Number(req.params.amount);
    const foods = await Food.find({ price: { $lte: budget } }).lean();
    const sortedFoods = sortByProteinEfficiency(foods);
    const host = `${req.protocol}://${req.get("host")}`;
    const imagesDir = path.join(process.cwd(), "backend", "images");
    const normalizeImage = (img) => {
      if (!img || typeof img !== "string") return null;
      if (img.startsWith("http")) return img;
      let filename = img.split("/").pop();
      if (!path.extname(filename)) {
        const exts = [".png", ".jpg", ".jpeg"];
        for (const ext of exts) {
          const candidate = path.join(imagesDir, filename + ext);
          if (fs.existsSync(candidate)) {
            filename = filename + ext;
            break;
          }
        }
      }
      return `${host}/images/${filename}`;
    };
    const mapped = sortedFoods.map((f) => ({ ...f, image: normalizeImage(f.image) }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get foods by category
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const foods = await Food.find({ category }).lean();
    const sortedFoods = sortByProteinEfficiency(foods);
    const host = `${req.protocol}://${req.get("host")}`;
    const imagesDir = path.join(process.cwd(), "backend", "images");
    const normalizeImage = (img) => {
      if (!img || typeof img !== "string") return null;
      if (img.startsWith("http")) return img;
      let filename = img.split("/").pop();
      if (!path.extname(filename)) {
        const exts = [".png", ".jpg", ".jpeg"];
        for (const ext of exts) {
          const candidate = path.join(imagesDir, filename + ext);
          if (fs.existsSync(candidate)) {
            filename = filename + ext;
            break;
          }
        }
      }
      return `${host}/images/${filename}`;
    };
    const mapped = sortedFoods.map((f) => ({ ...f, image: normalizeImage(f.image) }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get all unique categories
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await Food.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Search foods by name
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const foods = await Food.find({ 
      name: { $regex: query, $options: "i" } 
    }).lean();
    const sortedFoods = sortByProteinEfficiency(foods);
    const host = `${req.protocol}://${req.get("host")}`;
    const imagesDir = path.join(process.cwd(), "backend", "images");
    const normalizeImage = (img) => {
      if (!img || typeof img !== "string") return null;
      if (img.startsWith("http")) return img;
      let filename = img.split("/").pop();
      if (!path.extname(filename)) {
        const exts = [".png", ".jpg", ".jpeg"];
        for (const ext of exts) {
          const candidate = path.join(imagesDir, filename + ext);
          if (fs.existsSync(candidate)) {
            filename = filename + ext;
            break;
          }
        }
      }
      return `${host}/images/${filename}`;
    };
    const mapped = sortedFoods.map((f) => ({ ...f, image: normalizeImage(f.image) }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Add a food
router.post("/", async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
