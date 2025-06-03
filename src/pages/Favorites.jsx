import React from "react";
import useFavorites from "../hooks/useFavorites";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="category-page">
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>My Favorites</h2>

      <div className="recipe-list">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="no-results">No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
