const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load .env variables

// JWT secret key from environment
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to verify JWT token and attach user info to request
 */
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token"); // Get token from header

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed: token missing or invalid" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Attach user info
    next(); // Proceed to next middleware/route
  } catch (error) {
    res
      .status(401)
      .json({ error: "Authentication failed: token invalid or expired" });
  }
};

module.exports = fetchuser;