import { useState, useEffect } from "react";

const FAVORITES_KEY = "favorite_recipes";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  };

  const addFavorite = (recipe) => {
    if (!isFavorite(recipe.id)) {
      const updated = [...favorites, recipe];
      saveFavorites(updated);
    }
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((r) => r.id !== id);
    saveFavorites(updated);
  };

  const isFavorite = (id) => {
    return favorites.some((r) => r.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
