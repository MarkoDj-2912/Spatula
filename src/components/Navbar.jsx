import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  const location = useLocation(); // koristi se za isticanje aktivnog linka

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="nav-logo">
          Spatula
        </Link>
      </div>
      <div className="nav-links">
        <Link
          to="/favorites"
          className={location.pathname === "/favorites" ? "active" : ""}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
