import React from "react";
import "../styles/SearchBar.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ query }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = e.target.elements.search.value.trim();
    if (term) {
      navigate(`/search/${term}`);
    }
  };

  return (
    <form className="search-bar-wrapper" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="What’s on your craving list?"
          autoComplete="off"
        />
      </div>
    </form>
  );
};

export default SearchBar;
