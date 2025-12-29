import express from "express";
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
    res.json(sortedFoods);
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
    res.json(sortedFoods);
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
    res.json(sortedFoods);
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
    res.json(sortedFoods);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get a single food by ID
router.get("/:id", async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid food ID format" });
    }
    
    const food = await Food.findById(req.params.id).lean();
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(food);
  } catch (err) {
    console.error("Error fetching food by ID:", err);
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
