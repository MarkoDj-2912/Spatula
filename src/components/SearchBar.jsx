// Import React library for building components
import React from "react";

// Import styles for the search bar
import "../styles/SearchBar.scss";

// Import search icon from react-icons
import { FaSearch } from "react-icons/fa";

// Import useNavigate hook for programmatic navigation
import { useNavigate } from "react-router-dom";

// Define the SearchBar component, which receives a query as a prop
const SearchBar = ({ query }) => {
  // Initialize navigation function
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const term = e.target.elements.search.value.trim(); // Get search input value and remove extra spaces
    if (term) {
      navigate(`/search/${term}`); // Redirect to search results page
    }
  };

  return (
    <form className="search-bar-wrapper" onSubmit={handleSubmit}>
      {" "}
      {/* Search form */}
      <div className="search-input-container">
        {" "}
        {/* Input container */}
        <FaSearch className="search-icon" /> {/* Search icon */}
        <input
          type="text"
          name="search"
          defaultValue={query} // Set default search query if provided
          placeholder="What’s on your craving list?" // Placeholder text
          autoComplete="off" // Disable autocomplete for cleaner input experience
        />
      </div>
    </form>
  );
};

// Export the SearchBar component for use in other parts of the application
export default SearchBar;
