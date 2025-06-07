import { useState, useEffect } from "react";

// Define a key for storing favorite recipes in localStorage
const FAVORITES_KEY = "favorite_recipes";

// Custom hook for managing favorite recipes
export default function useFavorites() {
  // State to store the list of favorite recipes
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Function to save favorites to state and localStorage
  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  };
  // Function to add a recipe to favorites if it's not already included
  const addFavorite = (recipe) => {
    if (!isFavorite(recipe.id)) {
      const updated = [...favorites, recipe];
      saveFavorites(updated);
    }
  };
  // Function to remove a recipe from favorites by its ID
  const removeFavorite = (id) => {
    const updated = favorites.filter((r) => r.id !== Number(id));
    saveFavorites(updated);
  };
  // Function to check if a recipe is already in favorites
  const isFavorite = (id) => {
    return favorites.some((r) => r.id === Number(id));
  };

  // Return the favorites list and functions for managing favorites
  return { favorites, addFavorite, removeFavorite, isFavorite };
}
