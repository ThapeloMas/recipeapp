import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RecipeItem({ recipe, onDelete }) {
  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (recipe.userId !== user.id) {
        alert("You don't have permission to delete this recipe");
        return;
      }
      await axios.delete(`http://localhost:5000/recipes/${recipe.id}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>Category: {recipe.category}</p>
      <p>Preparation Time: {recipe.prepTime}</p>
      <p>Cooking Time: {recipe.cookTime}</p>
      <p>Servings: {recipe.servings}</p>
      <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default RecipeItem;
