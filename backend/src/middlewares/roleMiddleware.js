// middlewares/roleMiddleware.js
module.exports = (roles) => (req, res, next) => {
  try {
    // Ensure the user is logged in and their role is one of the allowed roles
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (error) {
    console.error('Role authorization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
