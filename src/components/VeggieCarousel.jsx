import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/VeggieCarousel.scss"; // zajednički stilovi
import "../styles/TrendingCarousel.scss";
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

const VeggieCarousel = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchVeggies = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=vegetarian&number=12&apiKey=${apiKey}`
        );

        const allRecipes = response.data.results;

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
        console.error("Veggie fetch failed:", error);
      }
    };

    fetchVeggies();
  }, []);

  return (
    <div className="carousel-section">
      <h2>Vegetarian Picks</h2>
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

export default VeggieCarousel;
