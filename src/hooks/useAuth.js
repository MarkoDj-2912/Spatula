// Import React hooks for state and lifecycle management
import { useState, useEffect } from "react";

// Define the useAuth custom hook for authentication management
export const useAuth = () => {
  // State to store the authenticated user
  const [user, setUser] = useState(null);

  //  Load user from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve stored authentication token
    const storedUser = localStorage.getItem("user"); // Retrieve stored user data
    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data if token exists
    }
  }, []);

  // Function to register a new user
  const register = async ({ username, email, password }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST", // Send a POST request to the registration endpoint
        headers: { "Content-Type": "application/json" }, // Specify JSON content type
        body: JSON.stringify({ username, email, password }), // Convert user data to JSON
      });

      if (!res.ok) return false; // Return false if registration fails

      const data = await res.json(); // Parse response JSON
      localStorage.setItem("token", data.token); // Store authentication token
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
      setUser(data.user); // Update user state
      return true; // Return success
    } catch (err) {
      console.error("Registration error:", err); // Log any errors
      return false; // Return failure
    }
  };

  // Function to log in an existing user
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", // Send a POST request to the login endpoint
        headers: { "Content-Type": "application/json" }, // Specify JSON content type
        body: JSON.stringify({ email, password }), // Convert login credentials to JSON
      });

      if (!res.ok) return false; // Return false if login fails

      const data = await res.json(); // Parse response JSON
      localStorage.setItem("token", data.token); // Store authentication token
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
      setUser(data.user); // Update user state
      return true; // Return success
    } catch (err) {
      console.error("Login error:", err); // Log any errors
      return false; // Return failure
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("user"); // Remove stored user data
    setUser(null); // Clear user state
  };

  // Return authentication-related functions and state
  return {
    user, // Current authenticated user
    register, // Function to register a new user
    login, // Function to log in an existing user
    logout, // Function to log out the user
    isAuthenticated: !!user, // Boolean indicating if a user is authenticated
  };
};
