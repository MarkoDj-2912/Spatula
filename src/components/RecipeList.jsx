// Import React library for building components
import React from "react";

// Import the RecipeCard component to display individual recipes
import RecipeCard from "./RecipeCard";

// Define the RecipeList component, which receives a list of recipes as a prop
const RecipeList = ({ recipes }) => {
  // If there are no recipes, display a message
  if (!recipes.length) {
    return <p className="no-results">No recipes found.</p>;
  }

  return (
    <div className="recipe-list">
      {" "}
      {/* Container for the list of recipe cards */}
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id} // Unique key for React's rendering optimization
          recipe={recipe} // Pass recipe data to the RecipeCard component
          style={{ "--delay": `${index * 100}ms` }} // Apply staggered animation delay
        />
      ))}
    </div>
  );
};

// Export the RecipeList component for use in other parts of the application
export default RecipeList;
