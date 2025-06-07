// Import necessary dependencies
import React from "react"; // React library for building components
import useFavorites from "../hooks/useFavorites"; // Custom hook to manage favorite recipes
import RecipeCard from "../components/RecipeCard"; // Import RecipeCard component

// Define the Favorites component
const Favorites = () => {
  const { favorites } = useFavorites(); // Retrieve favorite recipes from the custom hook

  return (
    <div className="category-page">
      {" "}
      {/* Main container for the favorites page */}
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        My Favorites
      </h2>{" "}
      {/* Page title */}
      {/* Render favorite recipes */}
      <div className="recipe-list">
        {favorites.length > 0 ? ( // Check if there are favorite recipes
          favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} /> // Render RecipeCard component for each favorite recipe
          ))
        ) : (
          <p className="no-results">No favorites yet.</p> // Show message if no favorites exist
        )}
      </div>
    </div>
  );
};

// Export the Favorites component for use in other parts of the application
export default Favorites;
