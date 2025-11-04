import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: "Generic" },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  protein: { type: Number, required: true },
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, default: 0 },
  servingSize: { type: String, required: true },
  image: { type: String },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
