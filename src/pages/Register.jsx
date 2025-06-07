// Import necessary dependencies
import React, { useState } from "react"; // React hooks for state management
import { useNavigate, Link } from "react-router-dom"; // React Router for navigation
import "../styles/Auth.scss"; // Import styles for authentication pages
import { useAuth } from "../hooks/useAuth"; // Custom authentication hook

// Define the Register component
const Register = () => {
  // State to store form input values
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Get the register function from the authentication hook
  const { register } = useAuth();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const success = await register(form); // Attempt registration with form data
    if (success) navigate("/"); // Redirect to home page on success
    else alert("Registration failed"); // Show an alert if registration fails
  };

  return (
    <div className="auth-page">
      {" "}
      {/* Main container for authentication page */}
      <div className="auth-image" />{" "}
      {/* Background image or decorative element */}
      <div className="auth-form-container">
        {" "}
        {/* Container for the registration form */}
        <div className="auth-box">
          {" "}
          {/* Inner container for form elements */}
          <Link to="/" className="auth-logo">
            {" "}
            {/* Logo linking to home */}
            Spatula
          </Link>
          <h2>Register</h2> {/* Registration page title */}
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Registration form */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
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
            <button type="submit">Register</button> {/* Submit button */}
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#f8b400" }}>
              Log in
            </Link>{" "}
            {/* Link to login page */}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the Register component for use in other parts of the application
export default Register;
