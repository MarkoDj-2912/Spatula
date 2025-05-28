import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/Carousel.scss";
import { Navigation } from "swiper/modules";
import RecipeCard from "./RecipeCard";

const validateImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

const TrendingCarousel = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=12&apiKey=${apiKey}`
        );

        const allRecipes = response.data.recipes;

        const valid = await Promise.all(
          allRecipes.map((recipe) =>
            validateImage(recipe.image).then((isValid) =>
              isValid ? recipe : null
            )
          )
        );

        const filtered = valid.filter((r) => r !== null);
        setRecipes(filtered);
      } catch (error) {
        console.error("Trending fetch failed:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="carousel-section">
      <h2>Trending Now</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        loop={recipes.length >= 6}
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
