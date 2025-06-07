// Import necessary dependencies
import React, { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import Navbar from "../components/Navbar"; // Import Navbar component
import Footer from "../components/Footer"; // Import Footer component
import { Outlet, useLocation } from "react-router-dom"; // React Router components for routing

// Define the Layout component
const Layout = () => {
  // State to track whether the page content has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Get the current route location
  const location = useLocation();

  // Effect to handle page transitions and simulate loading
  useEffect(() => {
    setIsLoaded(false); // Reset loading state when the route changes
    const timer = setTimeout(() => setIsLoaded(true), 200); // Simulate a slight delay for smoother transitions
    return () => clearTimeout(timer); // Cleanup timer on unmount or route change
  }, [location]);

  return (
    <div className="layout-wrapper">
      {" "}
      {/* Main layout container */}
      <Navbar /> {/* Render the navigation bar */}
      <main className={`content ${isLoaded ? "fade-in" : "hidden"}`}>
        {" "}
        {/* Apply fade-in effect */}
        <Outlet /> {/* Render the current page content */}
      </main>
      {isLoaded && <Footer />}{" "}
      {/* Render the footer only after the content has loaded */}
    </div>
  );
};

// Export the Layout component for use in other parts of the application
export default Layout;
