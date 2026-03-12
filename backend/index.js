const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// ========================================================================
// 1️⃣ Connect to MongoDB
// ========================================================================
connectToMongo();

const app = express();
// const port = process.env.PORT || 5000; // Use environment variable for production

// ========================================================================
// 2️⃣ Middleware
// ------------------------------------------------------------------------
// Enable CORS and parse JSON request bodies
// ========================================================================
app.use(cors());
app.use(express.json());

// ========================================================================
// 3️⃣ Default Route: Check server status
// ========================================================================
app.get('/', (req, res) => {
  res.send('Hello iNotebook! Server is running.');
});

// ========================================================================
// 4️⃣ API Routes
// ------------------------------------------------------------------------
// Auth and Notes routes
// ========================================================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));

module.exports = app;