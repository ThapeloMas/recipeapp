
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";
import withAuth from "./WithAuth";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        const response = await axios.get(
          `http://localhost:5000/recipes?userId=${user.id}`
        );
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (keyword) => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/add-recipe">Add New Recipe</Link>
      <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={filteredRecipes} onDelete={fetchRecipes} />
    </div>
  );
}

export default withAuth(Home);