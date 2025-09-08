const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const auth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) throw new ApiError(401, 'Unauthorized: Missing token');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new ApiError(401, 'Unauthorized: User not found');

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, 'Unauthorized: Invalid token'));
  }
};

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new ApiError(401, 'Unauthorized'));
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden: Insufficient permissions'));
  }
  next();
};

module.exports = { auth, authorize };
