import React from "react";
import "./ProteinTracker.css";

function ProteinTracker({ trackedFoods, removeFood, clearAll }) {
  const calculateTotals = () => {
    return trackedFoods.reduce(
      (totals, item) => ({
        protein: totals.protein + item.food.protein * item.quantity,
        calories: totals.calories + item.food.calories * item.quantity,
        carbs: totals.carbs + item.food.carbs * item.quantity,
        fat: totals.fat + item.food.fat * item.quantity,
        price: totals.price + item.food.price * item.quantity,
      }),
      { protein: 0, calories: 0, carbs: 0, fat: 0, price: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h2>🎯 Protein Tracker</h2>
        {trackedFoods.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      {trackedFoods.length === 0 ? (
        <div className="tracker-empty">
          <p>No foods added yet</p>
          <span>Click "Add to Tracker" to start tracking!</span>
        </div>
      ) : (
        <>
          <div className="tracked-items">
            {trackedFoods.map((item) => (
              <div key={item.food._id} className="tracked-item">
                <div className="tracked-item-info">
                  <div className="tracked-item-name">{item.food.name}</div>
                  <div className="tracked-item-details">
                    {item.food.protein}g protein × {item.quantity}
                  </div>
                  <div className="tracked-item-price">₹{item.food.price * item.quantity}</div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFood(item.food._id)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="tracker-summary">
            <h3>Total Summary</h3>
            <div className="summary-grid">
              <div className="summary-item highlight">
                <div className="summary-value">{totals.protein.toFixed(1)}g</div>
                <div className="summary-label">Total Protein</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{totals.calories.toFixed(0)}</div>
                <div className="summary-label">Calories</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{totals.carbs.toFixed(1)}g</div>
                <div className="summary-label">Carbs</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{totals.fat.toFixed(1)}g</div>
                <div className="summary-label">Fat</div>
              </div>
              <div className="summary-item price-item">
                <div className="summary-value">₹{totals.price.toFixed(0)}</div>
                <div className="summary-label">Total Cost</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">
                  {(totals.protein / totals.price).toFixed(2)}g
                </div>
                <div className="summary-label">Protein/₹</div>
              </div>
            </div>

            <div className="macro-percentages">
              <h4>Macro Split</h4>
              <div className="macro-split-bars">
                <div className="split-bar">
                  <div className="split-label">
                    <span>Protein</span>
                    <span>{((totals.protein * 4 / totals.calories) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="split-bar-bg">
                    <div
                      className="split-bar-fill protein-fill"
                      style={{ width: `${(totals.protein * 4 / totals.calories) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="split-bar">
                  <div className="split-label">
                    <span>Carbs</span>
                    <span>{((totals.carbs * 4 / totals.calories) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="split-bar-bg">
                    <div
                      className="split-bar-fill carbs-fill"
                      style={{ width: `${(totals.carbs * 4 / totals.calories) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="split-bar">
                  <div className="split-label">
                    <span>Fat</span>
                    <span>{((totals.fat * 9 / totals.calories) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="split-bar-bg">
                    <div
                      className="split-bar-fill fat-fill"
                      style={{ width: `${(totals.fat * 9 / totals.calories) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProteinTracker;
