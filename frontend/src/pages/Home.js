import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllFoods,
  getFoodsUnderBudget,
  getFoodsByCategory,
  getAllCategories,
  searchFoods,
} from "../services/foodService";
import ProteinTracker from "../components/ProteinTracker";

function Home() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("efficiency");
  const [trackedFoods, setTrackedFoods] = useState([]);

  // Load all foods and categories on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    const [foodsData, categoriesData] = await Promise.all([
      getAllFoods(),
      getAllCategories(),
    ]);
    setFoods(foodsData);
    setCategories(["All", ...categoriesData]);
    setLoading(false);
  };

  // Handle budget search
  const handleBudgetSearch = async () => {
    if (!budget) {
      loadInitialData();
      return;
    }
    setLoading(true);
    const data = await getFoodsUnderBudget(budget);
    setFoods(data);
    setSelectedCategory("All");
    setLoading(false);
  };

  // Handle category filter
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    if (category === "All") {
      const data = await getAllFoods();
      setFoods(data);
    } else {
      const data = await getFoodsByCategory(category);
      setFoods(data);
    }
    setBudget("");
    setLoading(false);
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery) {
      loadInitialData();
      return;
    }
    setLoading(true);
    const data = await searchFoods(searchQuery);
    setFoods(data);
    setSelectedCategory("All");
    setLoading(false);
  };

  // Handle reset
  const handleReset = () => {
    setBudget("");
    setSearchQuery("");
    setSelectedCategory("All");
    loadInitialData();
  };

  // Calculate stats
  const calculateStats = () => {
    if (foods.length === 0) return { totalItems: 0, avgProtein: 0, avgPrice: 0 };
    const totalProtein = foods.reduce((sum, f) => sum + f.protein, 0);
    const totalPrice = foods.reduce((sum, f) => sum + f.price, 0);
    return {
      totalItems: foods.length,
      avgProtein: (totalProtein / foods.length).toFixed(1),
      avgPrice: (totalPrice / foods.length).toFixed(0),
    };
  };

  const stats = calculateStats();

  // Protein tracker functions
  const addToTracker = (food) => {
    setTrackedFoods((prev) => {
      const existing = prev.find((item) => item.food._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { food, quantity: 1 }];
    });
  };

  const removeFromTracker = (foodId) => {
    setTrackedFoods((prev) => prev.filter((item) => item.food._id !== foodId));
  };

  const clearTracker = () => {
    setTrackedFoods([]);
  };

  // Sort foods
  const sortedFoods = [...foods].sort((a, b) => {
    if (sortBy === "efficiency") {
      return b.protein / b.price - a.protein / a.price;
    } else if (sortBy === "protein") {
      return b.protein - a.protein;
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* Header */}
        <div className="header">
          <h1>🍽️ ProteinPal</h1>
          <p>Find the best high-protein foods that fit your budget!</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-controls">
            <div className="input-group">
              <label>💰 Budget (₹)</label>
              <input
                type="number"
                placeholder="Enter your budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleBudgetSearch()}
              />
            </div>

            <div className="input-group">
              <label>🔍 Search Food</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="input-group">
              <label>📊 Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="efficiency">Protein Efficiency</option>
                <option value="protein">Highest Protein</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>
          </div>

          <div>
            <button className="btn btn-primary" onClick={handleBudgetSearch}>
              🔎 Search by Budget
            </button>
            <button className="btn btn-primary" onClick={handleSearch}>
              🔎 Search by Name
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>

          {/* Category Filters */}
          <div className="filter-chips">
            {categories.map((category) => (
              <div
                key={category}
                className={`chip ${selectedCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        {foods.length > 0 && (
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-value">{stats.totalItems}</span>
              <span className="stat-label">Food Items</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.avgProtein}g</span>
              <span className="stat-label">Avg Protein</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">₹{stats.avgPrice}</span>
              <span className="stat-label">Avg Price</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading delicious options...</p>
          </div>
        )}

        {/* Food Grid */}
        {!loading && sortedFoods.length > 0 && (
          <div className="food-grid">
            {sortedFoods.map((food) => (
              <div key={food._id} className="food-card">
                <div 
                  className="food-card-clickable"
                  onClick={() => navigate(`/food/${food._id}`)}
                >
                  <img
                    src={food.image || "https://via.placeholder.com/320x200?text=No+Image"}
                    alt={food.name}
                    className="food-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/320x200?text=No+Image";
                    }}
                  />
                  <div className="food-content">
                    <div className="food-header">
                      <div className="food-name">{food.name}</div>
                      <div className="food-brand">{food.brand}</div>
                      <span className="food-category">{food.category}</span>
                    </div>

                    <div className="food-price">₹{food.price}</div>

                    <div className="nutrition-grid">
                      <div className="nutrition-item">
                        <div className="nutrition-value">{food.protein}g</div>
                        <div className="nutrition-label">Protein</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{food.calories}</div>
                        <div className="nutrition-label">Calories</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{food.carbs}g</div>
                        <div className="nutrition-label">Carbs</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{food.fat}g</div>
                        <div className="nutrition-label">Fat</div>
                      </div>
                    </div>

                    <div className="protein-efficiency">
                      💪 {(food.protein / food.price).toFixed(2)}g protein per ₹
                    </div>

                    <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "10px" }}>
                      📏 Serving: {food.servingSize}
                    </div>
                  </div>
                </div>

                <button
                  className="add-to-tracker-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToTracker(food);
                  }}
                >
                  + Add to Tracker
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && sortedFoods.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>No foods found</h2>
            <p>Try adjusting your search criteria or budget</p>
          </div>
        )}
      </div>

      {/* Protein Tracker Sidebar */}
      <div className="tracker-sidebar">
        <ProteinTracker
          trackedFoods={trackedFoods}
          removeFood={removeFromTracker}
          clearAll={clearTracker}
        />
      </div>
    </div>
  );
}

export default Home;
