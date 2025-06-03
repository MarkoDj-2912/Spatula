import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/VeggieCarousel.scss";
import RecipeCard from "./RecipeCard";

const VeggieCarousel = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const cacheKey = "veggieData";
    const cacheTimeKey = "veggieDataTime";
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    const isCacheValid = cachedData && cachedTime && now - cachedTime < oneDay;

    if (isCacheValid) {
      setRecipes(JSON.parse(cachedData));
    } else {
      const fetchVeggie = async () => {
        try {
          const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=${apiKey}`
          );
          const validRecipes = response.data.recipes.filter((r) => r.image);
          setRecipes(validRecipes);
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

export default VeggieCarousel;
