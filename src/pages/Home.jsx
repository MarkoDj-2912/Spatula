// Import necessary React hooks for state management and side effects
import { useState, useEffect } from "react";

// Import Axios for making HTTP requests
import axios from "axios";

// Import components used on the home page
import SearchBar from "../components/SearchBar"; // Component for searching recipes
import VeggieCarousel from "../components/VeggieCarousel"; // Carousel for vegetarian recipes
import TrendingCarousel from "../components/TrendingCarousel"; // Carousel for trending recipes
import RecipeCard from "../components/RecipeCard"; // Component for displaying individual recipes

// Define the Home component
const Home = () => {
  // State for search query and search results
  const [query, setQuery] = useState(""); // Stores user input for search
  const [searchResults, setSearchResults] = useState([]); // Stores search results

  // Effect that runs when the `query` value changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      // If there is no search query, do not send a request
      if (!query) return;

      try {
        // Retrieve API key from environment variables
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

        // Send a request to Spoonacular API to search for recipes
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`
        );

        // Filter results to display only recipes that have an image
        const filtered = response.data.results.filter((r) => r.image);

        // Update state with filtered results
        setSearchResults(filtered);
      } catch (error) {
        console.error("Search failed:", error); // Log error if the request fails
      }
    };

    fetchSearchResults();
  }, [query]); // Effect runs again whenever `query` changes

  return (
    <div className="home-page">
      {" "}
      {/* Main container for the home page */}
      <SearchBar query={query} onSearch={setQuery} />{" "}
      {/* Search bar component */}
      <VeggieCarousel />
      <TrendingCarousel />
      {/* If search results exist, display them */}
      {searchResults.length > 0 && (
        <div className="recipe-list">
          {searchResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

// Export the Home component so it can be used in other parts of the application
export default Home;
