import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const validateImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

const CategoryPage = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&number=12&apiKey=${apiKey}`
        );

        const allRecipes = response.data.results;
        const validationResults = await Promise.all(
          allRecipes.map((recipe) =>
            validateImage(recipe.image).then((isValid) =>
              isValid ? recipe : null
            )
          )
        );
        const filteredRecipes = validationResults.filter((r) => r !== null);
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error loading category recipes:", error);
      }
    };

    fetchCategoryRecipes();
  }, [type]);

  return (
    <div className="category-page">
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Recipes
      </h2>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="no-results">No recipes found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
