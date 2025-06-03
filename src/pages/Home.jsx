import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import VeggieCarousel from "../components/VeggieCarousel";
import TrendingCarousel from "../components/TrendingCarousel";
import FilterButtons from "../components/FilterButtons";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`
        );
        const filtered = response.data.results.filter((r) => r.image);
        setSearchResults(filtered);
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="home-page">
      <SearchBar query={query} onSearch={setQuery} />
      <FilterButtons onFilter={setQuery} />
      <VeggieCarousel />
      <TrendingCarousel />

      {/* Results from search */}
      {searchResults.length > 0 && (
        <div className="recipe-list">
          {searchResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
