// Import necessary dependencies
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import axios from "axios"; // Axios for making API requests

// Import Swiper components for carousel functionality
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import custom styles for the vegetarian carousel
import "../styles/VeggieCarousel.scss";

// Import RecipeCard component to display individual recipes
import RecipeCard from "./RecipeCard";

// Define the VeggieCarousel component
const VeggieCarousel = () => {
  // State to store vegetarian recipes
  const [recipes, setRecipes] = useState([]);

  // Fetch vegetarian recipes when the component mounts
  useEffect(() => {
    // Define cache keys and expiration time
    const cacheKey = "veggieData";
    const cacheTimeKey = "veggieDataTime";
    const oneDay = 24 * 60 * 60 * 1000; // Cache expiration time (1 day)
    const now = Date.now();

    // Retrieve cached data from localStorage
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    // Check if cached data is still valid
    const isCacheValid = cachedData && cachedTime && now - cachedTime < oneDay;

    if (isCacheValid) {
      // Use cached data if valid
      setRecipes(JSON.parse(cachedData));
    } else {
      // Fetch vegetarian recipes from API
      const fetchVeggie = async () => {
        try {
          const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Get API key from environment variables
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=${apiKey}`
          );

          // Filter out recipes that don't have an image
          const validRecipes = response.data.recipes.filter((r) => r.image);

          // Update state with fetched recipes
          setRecipes(validRecipes);

          // Store fetched data in localStorage for caching
          localStorage.setItem(cacheKey, JSON.stringify(validRecipes));
          localStorage.setItem(cacheTimeKey, now.toString());
        } catch (error) {
          console.error("Error loading vegetarian recipes:", error);
        }
      };

      fetchVeggie();
    }
  }, []);

  return (
    <div className="carousel-section">
      <h2>Vegetarian Recipes</h2>
      <Swiper
        modules={[Navigation]} // Enable navigation controls
        navigation // Show navigation arrows
        spaceBetween={15} // Set space between slides
        slidesPerView={5} // Display 5 slides at a time
        loop={recipes.length > 5} // Enable looping if there are more than 5 recipes
      >
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            {" "}
            {/* Unique key for React optimization */}
            <RecipeCard recipe={recipe} /> {/* Render RecipeCard component */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Export the VeggieCarousel component for use in other parts of the application
export default VeggieCarousel;
