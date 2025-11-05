import axios from "axios";

const API_URL = "http://localhost:5000/api/foods";

export const getAllFoods = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching foods:", err);
    return [];
  }
};

export const getFoodsUnderBudget = async (budget) => {
  try {
    const res = await axios.get(`${API_URL}/budget/${budget}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching foods:", err);
    return [];
  }
};

export const getFoodsByCategory = async (category) => {
  try {
    const res = await axios.get(`${API_URL}/category/${category}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching foods by category:", err);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories/all`);
    return res.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
};

export const searchFoods = async (query) => {
  try {
    const res = await axios.get(`${API_URL}/search/${query}`);
    return res.data;
  } catch (err) {
    console.error("Error searching foods:", err);
    return [];
  }
};

export const addFood = async (foodData) => {
  try {
    const res = await axios.post(API_URL, foodData);
    return res.data;
  } catch (err) {
    console.error("Error adding food:", err);
    throw err;
  }
};
