import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withAuth from "./WithAuth";

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    prepTime: "",
    cookTime: "",
    servings: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/recipes", {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Recipe Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          name="prepTime"
          placeholder="Preparation Time"
          onChange={handleChange}
          required
        />
        <input
          name="cookTime"
          placeholder="Cooking Time"
          onChange={handleChange}
          required
        />
        <input
          name="servings"
          placeholder="Servings"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default withAuth(AddRecipe);
