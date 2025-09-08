const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role && !['user', 'admin'].includes(role)) {
    return next(new ApiError(400, 'Role must be "user" or "admin"'));
  }

  const exists = await User.findOne({ email });
  if (exists) return next(new ApiError(409, 'Email already registered'));

 
  const user = await User.create({ name, email, password, role });
  const token = signToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Registered successfully',
    data: { user, token },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ApiError(400, 'Invalid email or password'));

  const match = await user.comparePassword(password);
  if (!match) return next(new ApiError(400, 'Invalid email or password'));

  const token = signToken(user._id);

  res.json({
    success: true,
    message: 'Logged in successfully',
    data: { user: user.toJSON(), token },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});