// Import necessary dependencies
import { useParams } from "react-router-dom"; // Hook to get URL parameters
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import axios from "axios"; // Axios for making API requests
import RecipeCard from "../components/RecipeCard"; // Import RecipeCard component

// Function to validate if an image URL is accessible
const validateImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image(); // Create a new image object
    img.src = url; // Set the image source
    img.onload = () => resolve(true); // Resolve as valid if the image loads successfully
    img.onerror = () => resolve(false); // Resolve as invalid if the image fails to load
  });
};

// Define the CategoryPage component
const CategoryPage = () => {
  const { type } = useParams(); // Get the category type from the URL parameters
  const [recipes, setRecipes] = useState([]); // State to store fetched recipes

  // Fetch recipes when the category type changes
  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Get API key from environment variables
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&number=12&apiKey=${apiKey}`
        );

        const allRecipes = response.data.results; // Extract recipes from API response

        // Validate images before displaying recipes
        const validationResults = await Promise.all(
          allRecipes.map((recipe) =>
            validateImage(recipe.image).then((isValid) =>
              isValid ? recipe : null
            )
          )
        );

        // Filter out recipes with invalid images
        const filteredRecipes = validationResults.filter((r) => r !== null);
        setRecipes(filteredRecipes); // Update state with valid recipes
      } catch (error) {
        console.error("Error loading category recipes:", error); // Log errors
      }
    };

    fetchCategoryRecipes();
  }, [type]); // Re-run effect when category type changes

  return (
    <div className="category-page">
      {/* Display category title dynamically */}
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Recipes
      </h2>

      {/* Render recipe list */}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} /> // Render RecipeCard component
          ))
        ) : (
          <p className="no-results">No recipes found for this category.</p> // Show message if no recipes are found
        )}
      </div>
    </div>
  );
};

// Export the CategoryPage component for use in other parts of the application
export default CategoryPage;
