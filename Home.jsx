import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import recipesData from "../pages/recipes"; // Ensure this file exists
import "../pages/style/Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("recipes")) || recipesData;
  });
  const [search, setSearch] = useState("");
  const [savedRecipes, setSavedRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("savedRecipes")) || [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    method: "",
    image: null,
  });

  // Save to localStorage when recipes change
  useEffect(() => {
    if (recipes.length) localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Save saved recipes to localStorage
  useEffect(() => {
    if (savedRecipes.length) localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(search.toLowerCase()))
  );

  // Toggle save/unsave recipe
  const toggleSaveRecipe = (id) => {
    setSavedRecipes((prev) => 
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecipe((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save or update recipe
  const handleSaveRecipe = () => {
    if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.method || !newRecipe.image) {
      alert("Please fill out all fields and upload an image before saving!");
      return;
    }

    const updatedRecipes = [...recipes];

    if (editIndex !== null) {
      updatedRecipes[editIndex] = {
        ...newRecipe,
        ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
        id: recipes[editIndex].id,
      };
      setEditIndex(null);
    } else {
      updatedRecipes.push({
        id: recipes.length + 1,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
        method: newRecipe.method,
        image: newRecipe.image,
      });
    }

    setRecipes(updatedRecipes);
    setNewRecipe({ name: "", ingredients: "", method: "", image: null });
    setShowForm(false);
  };

  // Delete recipe
  const handleDeleteRecipe = (index) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setRecipes(recipes.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="container">
      <button className="add-recipe-btn" onClick={() => setShowForm(!showForm)}>
        <FaPlus /> {showForm ? "Close" : "Add Recipe"}
      </button>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search recipes by name or ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {showForm && (
        <div className="card p-3 mb-4">
          <h4>{editIndex !== null ? "Edit Recipe" : "Add a New Recipe"}</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Dish Name"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingredients (comma separated)"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Method"
            value={newRecipe.method}
            onChange={(e) => setNewRecipe({ ...newRecipe, method: e.target.value })}
          />
          <input type="file" className="form-control mb-2" onChange={handleImageUpload} accept="image/*" />
          {newRecipe.image && <img src={newRecipe.image} alt="Preview" className="img-thumbnail mb-2" />}
          <button className="btn btn-success" onClick={handleSaveRecipe}>
            {editIndex !== null ? "Update" : "Add"} Recipe
          </button>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div className="col" key={recipe.id}>
              <div className="card h-100 shadow-sm">
                <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {recipe.name}
                    <span onClick={() => toggleSaveRecipe(recipe.id)} style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }}>
                      {savedRecipes.includes(recipe.id) ? <FaHeart /> : <FaRegHeart />}
                    </span>
                  </h5>
                  <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                  <p><strong>Method:</strong> {recipe.method}</p>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => { 
                    setNewRecipe({ ...recipe, ingredients: recipe.ingredients.join(", ") }); 
                    setEditIndex(index); 
                    setShowForm(true); 
                  }}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRecipe(index)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No matching recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
