import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../config/env.js';
import User from '../models/User.js';
import { MockDB } from '../utils/mockDb.js';

/**
 * Middleware to protect routes - verify JWT token
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Also check in cookies (if cookie-parser is used)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Use Mock DB if MongoDB is not connected
      if (mongoose.connection.readyState !== 1) {
        const user = await MockDB.findUserById(decoded.id);
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'User not found. Token may be invalid.',
          });
        }

        // Attach user to request object (format to match expected structure)
        req.user = {
          id: user._id,
          name: user.name,
          email: user.email,
          preferences: user.preferences,
        };
        return next();
      }

      // Get user from token (exclude password)
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Token may be invalid.',
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated.',
        });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or expired. Please login again.',
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication',
    });
  }
};

/**
 * Generate JWT Token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

/**
 * Send token response (with cookie option)
 */
export const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken(user._id);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: config.nodeEnv === 'production', // HTTPS in production
    sameSite: 'strict',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      createdAt: user.createdAt,
    },
  });
};
