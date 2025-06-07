// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import authentication controller functions
const { register, login } = require("../controllers/authController");

// Define routes for user registration and login
router.post("/register", register); // Handle user registration requests
router.post("/login", login); // Handle user login requests

// Export the router to be used in other parts of the application
module.exports = router;
