import mongoose from 'mongoose';

/**
 * Middleware to check if MongoDB is connected
 * Returns error if database is not available
 */
export const checkDbConnection = (req, res, next) => {
  // Skip database check for health endpoint
  if (req.path === '/health') {
    return next();
  }

  // Check if mongoose is connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is not available. Please configure MongoDB connection.',
      error: 'SERVICE_UNAVAILABLE',
    });
  }

  next();
};
