import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import recipes from "../pages/recipes"; // Make sure this path is correct

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Get saved recipe IDs from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(storedRecipes);
  }, []);

  // Ensure recipes is an array before filtering
  const savedRecipeDetails = (recipes || []).filter((recipe) =>
    savedRecipes.includes(recipe.id)
  );

  return (
    <div className="container">
      <h2 className="text-center my-3">❤️ Saved Recipes</h2>

      {savedRecipeDetails.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {savedRecipeDetails.map((recipe) => (
            <div className="col" key={recipe.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {recipe.name}
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      <FaHeart />
                    </span>
                  </h5>
                  <p className="card-text">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No saved recipes yet! ❤️</p>
      )}
    </div>
  );
};

export default SavedRecipes;
