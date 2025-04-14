const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Updated route paths after moving folders
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog';

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ✅ Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is protected content',
    user: req.user,
  });
});

app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

// ✅ MongoDB Connection
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
