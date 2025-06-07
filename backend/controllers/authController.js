// Import required modules
const fs = require("fs"); // File system module for reading/writing files
const bcrypt = require("bcryptjs"); // Library for hashing passwords
const jwt = require("jsonwebtoken"); // Library for generating JSON Web Tokens (JWTs)

// Define constants
const usersFile = "./users.json"; // Path to the file storing user data
const secret = "secret_key"; // Secret key for signing JWTs

// Function to read users from the JSON file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, "utf-8"); // Read file contents
    return JSON.parse(data || "[]"); // Parse JSON data, default to empty array if file is empty
  } catch (error) {
    return []; // Return an empty array if file reading fails
  }
}

// Function to save users to the JSON file
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2)); // Write formatted JSON data to file
}

// Register a new user
exports.register = (req, res) => {
  const { username, email, password } = req.body; // Extract user details from request body
  const users = readUsers(); // Read existing users

  // Check if the email is already registered
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" }); // Return error if email is taken
  }

  // Hash the password for security
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash password with a salt factor of 10
  const newUser = { username, email, password: hashedPassword }; // Create new user object

  users.push(newUser); // Add new user to the list
  saveUsers(users); // Save updated user list to file

  // Generate a JWT token for authentication
  const token = jwt.sign({ email, username }, secret, { expiresIn: "1h" }); // Token expires in 1 hour

  // Respond with the token and user details
  res.status(201).json({
    token,
    user: { email, username },
  });
};

// Login an existing user
exports.login = (req, res) => {
  const { email, password } = req.body; // Extract login credentials from request body
  const users = readUsers(); // Read existing users
  const user = users.find((u) => u.email === email); // Find user by email

  // Validate user existence and password correctness
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: "Invalid credentials" }); // Return error if credentials are incorrect
  }

  // Generate a JWT token for authentication
  const token = jwt.sign(
    { email: user.email, username: user.username },
    secret,
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  // Respond with the token and user details
  res.status(200).json({
    token,
    user: { email: user.email, username: user.username },
  });
};
