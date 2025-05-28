import React from "react";
import useFavorites from "../hooks/useFavorites";

const RecipeCard = ({ recipe }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleClick = () => {
    isFavorite(recipe.id) ? removeFavorite(recipe.id) : addFavorite(recipe);
  };

  return (
    <div className="recipe-card">
      <div className="image-wrapper">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        <div className="title-overlay">
          <h3>{recipe.title}</h3>
        </div>
        <button className="fav-btn" onClick={handleClick}>
          {isFavorite(recipe.id) ? "💛" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
