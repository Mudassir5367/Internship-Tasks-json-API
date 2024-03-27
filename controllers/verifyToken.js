
// Apply verifyToken middleware to routes that require authentication
const getVerifyToken =   async(req, res) => {
    // Access authenticated user via req.user
    res.json({ message: 'Protected route', user: req.user });
  };

  module.exports = getVerifyToken;