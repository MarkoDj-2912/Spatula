import React from "react";
import { useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import "../styles/RecipeCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Sprečava da klik na srce otvori detaljnu stranicu
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  const goToDetail = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card" onClick={goToDetail}>
      <div className="image-wrapper">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        <div className="title-overlay">
          <h3>{recipe.title}</h3>
        </div>
        <button className="fav-btn" onClick={toggleFavorite}>
          <FontAwesomeIcon icon={favorite ? solidHeart : regularHeart} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
