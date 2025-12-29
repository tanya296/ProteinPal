import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodById } from "../services/foodService";
import "./FoodDetail.css";

function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFoodDetails();
  }, [id]);

  const loadFoodDetails = async () => {
    setLoading(true);
    try {
      const data = await getFoodById(id);
      console.log("Food data received:", data);
      setFood(data);
    } catch (error) {
      console.error("Error loading food details:", error);
      setFood(null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading food details...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="detail-error">
        <h2>Food not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const proteinPerRupee = (food.protein / food.price).toFixed(2);
  const proteinPercentage = ((food.protein * 4) / food.calories * 100).toFixed(1);

  return (
    <div className="food-detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Foods
      </button>

      <div className="detail-card">
        <div className="detail-image-section">
          <img
            src={food.image || "https://via.placeholder.com/500x400?text=No+Image"}
            alt={food.name}
            className="detail-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x400?text=No+Image";
            }}
          />
        </div>

        <div className="detail-content">
          <div className="detail-header">
            <h1>{food.name}</h1>
            <span className="detail-category">{food.category}</span>
          </div>

          <div className="detail-brand">
            <strong>Brand:</strong> {food.brand}
          </div>

          <div className="detail-price-section">
            <div className="detail-price">₹{food.price}</div>
            <div className="detail-serving">📏 {food.servingSize}</div>
          </div>

          <div className="detail-efficiency">
            <div className="efficiency-card">
              <div className="efficiency-value">💪 {proteinPerRupee}g</div>
              <div className="efficiency-label">Protein per Rupee</div>
            </div>
            <div className="efficiency-card">
              <div className="efficiency-value">🎯 {proteinPercentage}%</div>
              <div className="efficiency-label">Protein Calories</div>
            </div>
          </div>

          <div className="nutrition-details">
            <h2>Nutrition Facts</h2>
            <div className="nutrition-table">
              <div className="nutrition-row">
                <span className="nutrition-name">Protein</span>
                <span className="nutrition-value-detail">{food.protein}g</span>
              </div>
              <div className="nutrition-row">
                <span className="nutrition-name">Calories</span>
                <span className="nutrition-value-detail">{food.calories} kcal</span>
              </div>
              <div className="nutrition-row">
                <span className="nutrition-name">Carbohydrates</span>
                <span className="nutrition-value-detail">{food.carbs}g</span>
              </div>
              <div className="nutrition-row">
                <span className="nutrition-name">Fat</span>
                <span className="nutrition-value-detail">{food.fat}g</span>
              </div>
              <div className="nutrition-row">
                <span className="nutrition-name">Fiber</span>
                <span className="nutrition-value-detail">{food.fiber}g</span>
              </div>
            </div>
          </div>

          <div className="macros-breakdown">
            <h3>Macronutrient Breakdown</h3>
            <div className="macro-bars">
              <div className="macro-bar">
                <div className="macro-label">
                  <span>Protein</span>
                  <span>{((food.protein * 4) / food.calories * 100).toFixed(0)}%</span>
                </div>
                <div className="bar">
                  <div 
                    className="bar-fill protein-bar"
                    style={{ width: `${(food.protein * 4) / food.calories * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="macro-bar">
                <div className="macro-label">
                  <span>Carbs</span>
                  <span>{((food.carbs * 4) / food.calories * 100).toFixed(0)}%</span>
                </div>
                <div className="bar">
                  <div 
                    className="bar-fill carbs-bar"
                    style={{ width: `${(food.carbs * 4) / food.calories * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="macro-bar">
                <div className="macro-label">
                  <span>Fat</span>
                  <span>{((food.fat * 9) / food.calories * 100).toFixed(0)}%</span>
                </div>
                <div className="bar">
                  <div 
                    className="bar-fill fat-bar"
                    style={{ width: `${(food.fat * 9) / food.calories * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
