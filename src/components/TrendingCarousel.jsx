// Import necessary dependencies
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import axios from "axios"; // Axios for making API requests

// Import Swiper components for carousel functionality
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import custom styles for the trending carousel
import "../styles/TrendingCarousel.scss";

// Import RecipeCard component to display individual recipes
import RecipeCard from "./RecipeCard";

// Define the TrendingCarousel component
const TrendingCarousel = () => {
  // State to store trending recipes
  const [recipes, setRecipes] = useState([]);

  // Fetch trending recipes when the component mounts
  useEffect(() => {
    // Define cache keys and expiration time
    const cacheKey = "trendingData";
    const cacheTimeKey = "trendingDataTime";
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
      // Fetch trending recipes from API
      const fetchTrending = async () => {
        try {
          const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Get API key from environment variables
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=15&apiKey=${apiKey}`
          );

          // Filter out recipes that don't have an image
          const validRecipes = response.data.recipes.filter((r) => r.image);

          // Update state with fetched recipes
          setRecipes(validRecipes);

          // Store fetched data in localStorage for caching
          localStorage.setItem(cacheKey, JSON.stringify(validRecipes));
          localStorage.setItem(cacheTimeKey, now.toString());
        } catch (error) {
          console.error("Error loading trending recipes:", error);
        }
      };

      fetchTrending();
    }
  }, []);

  return (
    <div className="trending-carousel">
      <h2>Trending Recipes</h2>
      <Swiper
        modules={[Navigation, Autoplay]} // Enable navigation controls
        navigation // Show navigation arrows
        spaceBetween={25} // Set space between slides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={recipes.length > 9} // Enable looping if there are more than 6 recipes
        centeredSlides={false}
        style={{ width: "100%" }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
          1920: {
            slidesPerView: 7,
          },
        }}
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

// Export the TrendingCarousel component for use in other parts of the application
export default TrendingCarousel;
