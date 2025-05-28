import { useState } from "react";
import SearchBar from "../components/SearchBar";
import VeggieCarousel from "../components/VeggieCarousel";
import TrendingCarousel from "../components/TrendingCarousel";
import FilterButtons from "../components/FilterButtons";

const Home = () => {
  const [query, setQuery] = useState("kale");

  return (
    <div className="home-page">
      {/* Search bar na vrhu stranice */}
      <SearchBar query={query} onSearch={setQuery} />
      <FilterButtons onFilter={setQuery} />

      {/* Carousel sa vegetarijanskim jelima */}
      <VeggieCarousel />

      {/* Carousel sa trending jelima */}
      <TrendingCarousel />
    </div>
  );
};

export default Home;
