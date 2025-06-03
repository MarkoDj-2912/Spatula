import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const SearchResults = () => {
  const { query } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${apiKey}`
        );

        const valid = await Promise.all(
          response.data.results.map((r) =>
            validateImage(r.image).then((ok) => (ok ? r : null))
          )
        );

        setRecipes(valid.filter((r) => r));
      } catch (err) {
        console.error("Search fetch error:", err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="category-page">
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Results for “{query}”
      </h2>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
