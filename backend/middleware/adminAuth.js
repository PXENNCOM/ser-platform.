// middleware/adminAuth.js
const { authenticateToken } = require('./auth');

const requireAdmin = [
  authenticateToken,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için admin yetkisi gerekli!'
      });
    }
    next();
  }
];

module.exports = { requireAdmin };