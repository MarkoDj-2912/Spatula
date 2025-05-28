import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Spatula</Link>
      </div>
      <div className="nav-links">
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
