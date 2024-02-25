// authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user information to the request object
        next(); // Continue with the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

module.exports = authenticate;
