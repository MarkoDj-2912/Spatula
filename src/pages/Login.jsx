// Import necessary dependencies
import React, { useState } from "react"; // React hooks for state management
import { useNavigate, Link } from "react-router-dom"; // React Router for navigation
import "../styles/Auth.scss"; // Import styles for authentication pages
import { useAuth } from "../hooks/useAuth"; // Custom authentication hook

// Define the Login component
const Login = () => {
  // State to store form input values
  const [form, setForm] = useState({ email: "", password: "" });

  // Get the login function from the authentication hook
  const { login } = useAuth();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const success = await login(form); // Attempt login with form data
    if (success) navigate("/"); // Redirect to home page on success
    else alert("Login failed"); // Show an alert if login fails
  };

  return (
    <div className="auth-wrapper">
      {" "}
      {/* Main container for authentication page */}
      <div className="auth-image" />{" "}
      {/* Background image or decorative element */}
      <div className="auth-form">
        {" "}
        {/* Container for the login form */}
        <div className="form-container">
          {" "}
          {/* Inner container for form elements */}
          <Link to="/" className="auth-logo">
            {" "}
            {/* Logo linking to home */}
            Spatula
          </Link>
          <h2>Log in</h2> {/* Login page title */}
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Login form */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button> {/* Submit button */}
          </form>
          <p>
            Don't have an account yet? <Link to="/register">Join now</Link>{" "}
            {/* Link to registration page */}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the Login component for use in other parts of the application
export default Login;
