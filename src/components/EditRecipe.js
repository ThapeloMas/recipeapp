import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import withAuth from "./WithAuth";

function EditRecipe() {
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
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipes/${id}`);
      setRecipe({
        ...response.data,
        ingredients: response.data.ingredients.join(", "),
      });
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/recipes/${id}`, {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      });
      navigate("/home");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          value={recipe.category}
          onChange={handleChange}
          required
        />
        <input
          name="prepTime"
          value={recipe.prepTime}
          onChange={handleChange}
          required
        />
        <input
          name="cookTime"
          value={recipe.cookTime}
          onChange={handleChange}
          required
        />
        <input
          name="servings"
          value={recipe.servings}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default withAuth(EditRecipe);
