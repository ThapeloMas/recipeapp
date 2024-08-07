import React from "react";
import RecipeItem from "./RecipeItem";

function RecipeList({ recipes, onDelete }) {
  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default RecipeList;
