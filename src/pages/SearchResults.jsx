// Import necessary dependencies
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import { useParams } from "react-router-dom"; // Hook to get URL parameters
import axios from "axios"; // Axios for making API requests
import RecipeCard from "../components/RecipeCard"; // Component for displaying individual recipes

// Function to validate if an image URL is accessible
const validateImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image(); // Create a new image object
    img.src = url; // Set the image source
    img.onload = () => resolve(true); // Resolve as valid if the image loads successfully
    img.onerror = () => resolve(false); // Resolve as invalid if the image fails to load
  });
};

// Define the SearchResults component
const SearchResults = () => {
  const { query } = useParams(); // Get the search query from the URL parameters
  const [recipes, setRecipes] = useState([]); // State to store search results

  // Fetch search results when the query changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Get API key from environment variables
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${apiKey}`
        );

        // Validate images before displaying recipes
        const valid = await Promise.all(
          response.data.results.map((r) =>
            validateImage(r.image).then((ok) => (ok ? r : null))
          )
        );

        // Filter out recipes with invalid images
        setRecipes(valid.filter((r) => r));
      } catch (err) {
        console.error("Search fetch error:", err); // Log errors
      }
    };

    fetchData();
  }, [query]); // Re-run effect when search query changes

  return (
    <div className="category-page">
      {" "}
      {/* Main container for search results */}
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Results for “{query}”
      </h2>
      {/* Render recipe list */}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((r) => <RecipeCard key={r.id} recipe={r} />) // Render RecipeCard component for each recipe
        ) : (
          <p className="no-results">No results found.</p> // Show message if no results exist
        )}
      </div>
    </div>
  );
};

// Export the SearchResults component for use in other parts of the application
export default SearchResults;
