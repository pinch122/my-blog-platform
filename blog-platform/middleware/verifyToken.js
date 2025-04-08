const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header (Bearer <token>)

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        // If token is valid, attach the decoded user data to the request object
        req.user = decoded;
        next();  // Continue to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
