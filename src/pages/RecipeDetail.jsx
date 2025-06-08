// Import necessary dependencies
import { useParams } from "react-router-dom"; // Hook to get URL parameters
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import axios from "axios"; // Axios for making API requests
import useFavorites from "../hooks/useFavorites"; // Custom hook for managing favorite recipes

// Import FontAwesome icons for favorite button
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import Swal from "sweetalert2";

// Import styles for the recipe detail page
import "../styles/RecipeDetail.scss";

// Define the RecipeDetail component
const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL parameters
  const [recipe, setRecipe] = useState(null); // State to store the recipe details
  const [view, setView] = useState("instructions"); // State to toggle between instructions and ingredients

  // Get favorite management functions from the custom hook
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(id); // Check if the recipe is in favorites

  // Function to toggle favorite status
  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id);
      Swal.fire({
        title: "Removed from favorites",
        icon: "info",
        timer: 1200,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } else {
      addFavorite({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      Swal.fire({
        title: "Added to favorites",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };

  // Fetch recipe details when the component mounts or when the ID changes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Get API key from environment variables
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        setRecipe(response.data); // Update state with fetched recipe data
      } catch (error) {
        console.error("Error loading recipe:", error); // Log errors
      }
    };

    fetchRecipe();
  }, [id]); // Re-run effect when recipe ID changes

  // Show loading message while fetching data
  if (!recipe) return <p className="loading">Loading recipe...</p>;

  return (
    <div className="recipe-detail">
      {" "}
      {/* Main container for recipe details */}
      <div className="image-section">
        {" "}
        {/* Section for recipe image and title */}
        <img src={recipe.image} alt={recipe.title} />
        <div className="title-row">
          <h2>{recipe.title}</h2>
          <button className="fav-btn" onClick={toggleFavorite}>
            {" "}
            {/* Favorite button */}
            <FontAwesomeIcon icon={favorite ? solidHeart : regularHeart} />
          </button>
        </div>
      </div>
      <div className="content-section">
        {" "}
        {/* Section for recipe content */}
        <div className="toggle-buttons">
          {" "}
          {/* Buttons to switch between instructions and ingredients */}
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
          {" "}
          {/* Display recipe details based on selected view */}
          {view === "instructions" ? (
            <>
              <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />{" "}
              {/* Recipe summary */}
              <p
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions || "No instructions.",
                }}
              />{" "}
              {/* Recipe instructions */}
            </>
          ) : (
            <ul>
              {" "}
              {/* List of ingredients */}
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

// Export the RecipeDetail component for use in other parts of the application
export default RecipeDetail;
