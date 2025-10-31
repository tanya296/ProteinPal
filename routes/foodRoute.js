import express from "express";
import Food from "./models/foodModel.js";


const router = express.Router();

// Get foods under budget
router.get("/budget/:amount", async (req, res) => {
  try {
    const budget = Number(req.params.amount);
    const foods = await Food.find({ price: { $lte: budget } }).lean();
    foods.sort((a, b) => (b.protein / b.price) - (a.protein / a.price));
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
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
