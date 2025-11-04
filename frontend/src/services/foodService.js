import axios from "axios";

const API_URL = "http://localhost:5000/api/foods";

export const getFoodsUnderBudget = async (budget) => {
  try {
    const res = await axios.get(`${API_URL}/budget/${budget}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching foods:", err);
    return [];
  }
};
