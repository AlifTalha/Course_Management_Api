const ApiError = require('../utils/ApiError');

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, _req, res, _next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation error';
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(status).json({ success: false, message, details });
  }

  if (err.code === 11000) {
    status = 409;
    const fields = Object.keys(err.keyValue);
    message = `Duplicate value for: ${fields.join(', ')}`;
    return res.status(status).json({ success: false, message });
  }

  res.status(status).json({
    success: false,
    message,
    details: err.details || undefined,
  });
};

module.exports = { notFound, errorHandler };
