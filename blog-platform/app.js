const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');  // Added auth route
const verifyToken = require('./middleware/verifyToken');  // Import the token verification middleware
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// Serve static frontend files
app.use(express.static('public'));

// Backend API routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);  // Link to auth routes

// Example of a protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is protected content',
    user: req.user,  // Send user data back as part of the response
  });
});

// Additional protected route for the dashboard
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
