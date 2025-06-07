// Import necessary dependencies
import React, { useState, useEffect } from "react"; // React hooks for state and lifecycle management
import { Link, useNavigate } from "react-router-dom"; // Navigation components from React Router
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for dropdown toggles
import { useAuth } from "../hooks/useAuth"; // Custom authentication hook
import "../styles/Navbar.scss"; // Import styles for the navbar

// Define the Navbar component
const Navbar = () => {
  // State variables for managing menu and dropdown behavior
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile menu visibility
  const [activeDropdown, setActiveDropdown] = useState(null); // Tracks which dropdown is open
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detects mobile screen size

  // Get user authentication details and logout function
  const { user, logout } = useAuth();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to handle window resizing and update mobile state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle mobile menu visibility
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Function to toggle dropdown visibility
  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  // Function to close the menu and dropdowns
  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  // Function to handle link clicks on mobile (closes menu)
  const handleLinkClick = () => {
    if (isMobile) closeMenu();
  };

  // Function to render dropdown menus dynamically
  const renderDropdown = (key, label, links) => (
    <li
      className={`dropdown ${isMobile && activeDropdown === key ? "open" : ""}`}
    >
      <span onClick={() => isMobile && toggleDropdown(key)}>
        {label}{" "}
        {isMobile &&
          (activeDropdown === key ? <FaChevronUp /> : <FaChevronDown />)}
      </span>
      <ul className="dropdown-menu">
        {links.map(({ to, text }) => (
          <li key={to}>
            <Link to={to} onClick={handleLinkClick}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <nav className="navbar">
      <div className="navbar-top">
        {/* Logo linking to home */}
        <div className="logo">
          <Link to="/">Spatula</Link>
        </div>

        {/* Mobile menu toggle button */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {renderDropdown("recipes", "Recipes", [
            { to: "/search/breakfast", text: "Breakfast" },
            { to: "/search/lunch", text: "Lunch" },
            { to: "/search/dessert", text: "Dessert" },
            { to: "/search/drink", text: "Drinks" },
            { to: "/search/appetizer", text: "Appetizers" },
            { to: "/search/baking", text: "Baking" },
            { to: "/search/slow cooker", text: "Slow Cooker" },
            { to: "/search/quick", text: "Quick & Easy" },
          ])}

          {renderDropdown("cuisine", "Cuisine", [
            { to: "/category/italian", text: "Italian" },
            { to: "/category/mexican", text: "Mexican" },
            { to: "/category/indian", text: "Indian" },
            { to: "/category/japanese", text: "Japanese" },
            { to: "/category/french", text: "French" },
          ])}

          {renderDropdown("meat", "Meat & Seafood", [
            { to: "/search/chicken", text: "Chicken" },
            { to: "/search/beef", text: "Beef" },
            { to: "/search/fish", text: "Fish" },
            { to: "/search/seafood", text: "Seafood" },
          ])}

          {renderDropdown("healthy", "Healthy & Diet", [
            { to: "/search/keto", text: "Keto" },
            { to: "/search/vegan", text: "Vegan" },
            { to: "/search/vegetarian", text: "Vegetarian" },
            { to: "/search/low carb", text: "Low-Carb" },
            { to: "/search/gluten free", text: "Gluten-Free" },
          ])}

          {/* Favorites link */}
          <li>
            <Link to="/favorites" onClick={handleLinkClick}>
              Favorites
            </Link>
          </li>

          {/* User authentication section */}
          {user ? (
            <>
              <li className="nav-username">
                Hi,{" "}
                <strong>{user.username || user.email?.split("@")[0]}</strong>
              </li>
              <li>
                <span
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

// Export the Navbar component for use in other parts of the application
export default Navbar;
