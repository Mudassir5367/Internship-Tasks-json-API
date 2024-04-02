const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from request headers, query parameters, or body
  const token = req.headers.authorization || req.query.token || req.body.token;
  // console.log(token, 'token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'SECRETKEY', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    // If token is valid, attach decoded payload to request object
    req.user = decoded;
    next(); // Pass control to the next middleware
  });
};

module.exports = verifyToken