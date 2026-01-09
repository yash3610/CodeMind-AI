/**
 * Mock in-memory database for development without MongoDB
 * This allows testing the app before setting up MongoDB Atlas
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

// In-memory storage
const mockUsers = [];
const mockCodeHistory = [];

export const MockDB = {
  // User operations
  async createUser({ name, email, password }) {
    // Check if user exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      _id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      preferences: {
        theme: 'dark',
        defaultLanguage: 'javascript',
        defaultFramework: 'react',
      },
    };

    mockUsers.push(user);
    console.log('✅ User created successfully:', { email: user.email, name: user.name });
    console.log('📊 Total users now:', mockUsers.length);
    return user;
  },

  async findUserByEmail(email) {
    console.log('🔍 Looking for user with email:', email);
    console.log('📊 Total users in mock DB:', mockUsers.length);
    console.log('👥 All users:', mockUsers.map(u => ({ email: u.email, name: u.name })));
    const user = mockUsers.find(u => u.email === email);
    console.log('✅ User found:', user ? 'Yes' : 'No');
    return user;
  },

  async findUserById(id) {
    return mockUsers.find(u => u._id === id);
  },

  async comparePassword(plainPassword, hashedPassword) {
    console.log('🔐 Comparing passwords...');
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('🔑 Password match:', isMatch ? 'Yes' : 'No');
    return isMatch;
  },

  generateToken(userId) {
    return jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: '30d',
    });
  },

  // Code history operations
  async createCodeHistory(data) {
    const code = {
      _id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    };

    mockCodeHistory.push(code);
    return code;
  },

  async getCodeHistory(userId) {
    return mockCodeHistory.filter(c => c.user === userId);
  },

  async deleteCodeHistory(id, userId) {
    const index = mockCodeHistory.findIndex(c => c._id === id && c.user === userId);
    if (index > -1) {
      mockCodeHistory.splice(index, 1);
      return true;
    }
    return false;
  },

  // Stats
  getStats() {
    return {
      totalUsers: mockUsers.length,
      totalCode: mockCodeHistory.length,
      isUsingMockDB: true,
    };
  },
};
