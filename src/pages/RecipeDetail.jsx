import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RecipeDetail.scss";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [view, setView] = useState("instructions");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error loading recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="loading">Loading recipe...</p>;

  return (
    <div className="recipe-detail">
      <div className="image-section">
        <img src={recipe.image} alt={recipe.title} />
        <h2>{recipe.title}</h2>
      </div>

      <div className="content-section">
        <div className="toggle-buttons">
          <button
            className={view === "instructions" ? "active" : ""}
            onClick={() => setView("instructions")}
          >
            Instructions
          </button>
          <button
            className={view === "ingredients" ? "active" : ""}
            onClick={() => setView("ingredients")}
          >
            Ingredients
          </button>
        </div>

        <div className="text-content">
          {view === "instructions" ? (
            <>
              <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              <p
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions || "No instructions.",
                }}
              />
            </>
          ) : (
            <ul>
              {recipe.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
