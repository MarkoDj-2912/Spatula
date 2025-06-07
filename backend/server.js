// Import required modules
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const authRoutes = require("./routes/auth"); // Import authentication routes

// Create an Express application instance
const app = express();

// Apply middleware
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(express.json()); // Parse incoming JSON requests

// Set up authentication routes with a base path
app.use("/api/auth", authRoutes); // Routes for authentication (register & login)

// Define the server port
const PORT = 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
