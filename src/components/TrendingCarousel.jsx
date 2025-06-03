import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/TrendingCarousel.scss";
import RecipeCard from "./RecipeCard";

const TrendingCarousel = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const cacheKey = "trendingData";
    const cacheTimeKey = "trendingDataTime";
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    const isCacheValid = cachedData && cachedTime && now - cachedTime < oneDay;

    if (isCacheValid) {
      setRecipes(JSON.parse(cachedData));
    } else {
      const fetchTrending = async () => {
        try {
          const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=9&apiKey=${apiKey}`
          );
          const validRecipes = response.data.recipes.filter((r) => r.image);
          setRecipes(validRecipes);
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
        modules={[Navigation]}
        navigation
        spaceBetween={15}
        slidesPerView={5}
        loop={recipes.length > 5}
      >
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
