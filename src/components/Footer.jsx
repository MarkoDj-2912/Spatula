// Import React library for building components
import React from "react";

// Import the SCSS file for styling the footer
import "../styles/Footer.scss";

// Import Link component from React Router for navigation
import { Link } from "react-router-dom";

// Define the Footer component
const Footer = () => {
  return (
    <footer className="footer">
      {" "}
      {/* Footer container with a CSS class */}
      {/* Left section of the footer */}
      <div className="footer-left">
        <h3>Spatula</h3> {/* Brand name */}
        <p>
          &copy; {new Date().getFullYear()} Spatula. All rights reserved.
        </p>{" "}
        {/* Dynamic copyright year */}
      </div>
      {/* Navigation links section */}
      <div className="footer-links">
        <Link to="/category/italian">Italian</Link>{" "}
        {/* Link to Italian category */}
        <Link to="/category/mexican">Mexican</Link>{" "}
        {/* Link to Mexican category */}
        <Link to="/search/keto">Keto</Link> {/* Link to Keto search results */}
        <Link to="/search/quick">Quick & Easy</Link>{" "}
        {/* Link to Quick & Easy search results */}
      </div>
      {/* Social media links section */}
      <div className="footer-socials">
        <a
          href="https://github.com/MarkoDj-2912"
          target="_blank"
          rel="noreferrer"
        >
          GitHub {/* Link to GitHub profile */}
        </a>
        <a
          href="https://linkedin.com/in/marko-djordjevic29/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn {/* Link to LinkedIn profile */}
        </a>
      </div>
    </footer>
  );
};

// Export the Footer component for use in other parts of the application
export default Footer;
