import React, { useState } from "react";
import { getFoodsUnderBudget } from "./services/foodService";

function App() {
  const [budget, setBudget] = useState("");
  const [foods, setFoods] = useState([]);

  const handleSearch = async () => {
    const data = await getFoodsUnderBudget(budget);
    setFoods(data);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🍽️ ProteinPal</h1>
      <p>Find high-protein foods under your budget!</p>

      <input
        type="number"
        placeholder="Enter your budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        {foods.length > 0 ? (
          foods.map((f) => (
            <div key={f._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <strong>{f.name}</strong> — ₹{f.price} | Protein: {f.protein}g
            </div>
          ))
        ) : (
          <p>No results yet. Try entering a budget.</p>
        )}
      </div>
    </div>
  );
}

export default App;
