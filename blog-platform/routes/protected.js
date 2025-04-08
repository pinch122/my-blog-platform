// Protected route to verify JWT token
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model for fetching user data
const router = express.Router();

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        
        // Attach user ID to request object (decoded token contains user ID)
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user; // Pass user data to the next middleware or route handler
        next();
    });
};

// Protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ 
        message: 'Protected content',
        user: req.user, // Send user data back as part of the response
    });
});

module.exports = router;
