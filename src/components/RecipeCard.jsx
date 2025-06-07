import React from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import useFavorites from "../hooks/useFavorites"; // Custom hook for managing favorites
import "../styles/RecipeCard.scss"; // Import styles for the component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome for icons
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart icon for favorite
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Regular heart icon for non-favorite

// RecipeCard component displays a recipe with an image, title, and favorite button
const RecipeCard = ({ recipe, style }) => {
  const navigate = useNavigate(); // Hook for navigating to recipe details
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // Get favorite management functions
  const favorite = isFavorite(recipe.id); // Check if the recipe is a favorite

  // Toggle favorite status when the heart button is clicked
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent triggering parent click event
    if (favorite) {
      removeFavorite(recipe.id); // Remove from favorites
    } else {
      addFavorite(recipe); // Add to favorites
    }
  };

  // Navigate to the recipe detail page when the card is clicked
  const goToDetail = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card" onClick={goToDetail} style={style}>
      <div className="image-wrapper">
        <img
          src={recipe.image} // Display recipe image
          alt={recipe.title} // Set alt text for accessibility
          loading="lazy" // Lazy load images for performance
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop on error
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; // Fallback image
          }}
        />
        <div className="title-overlay">
          <h3>{recipe.title}</h3> {/* Display recipe title */}
        </div>
        <button className="fav-btn" onClick={toggleFavorite}>
          <FontAwesomeIcon icon={favorite ? solidHeart : regularHeart} />{" "}
          {/* Show correct heart icon */}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
