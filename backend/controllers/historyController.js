import mongoose from 'mongoose';
import CodeHistory from '../models/CodeHistory.js';
import { MockDB } from '../utils/mockDb.js';

/**
 * @desc    Get all code history for logged in user
 * @route   GET /api/history
 * @access  Private
 */
export const getHistory = async (req, res, next) => {
  try {
    // Use Mock DB if MongoDB is not connected
    if (mongoose.connection.readyState !== 1) {
      const history = await MockDB.getCodeHistory(req.user.id);
      return res.status(200).json({
        success: true,
        count: history.length,
        total: history.length,
        page: 1,
        pages: 1,
        data: history,
        warning: '⚠️ Using Mock Database - Data will be lost on server restart.',
      });
    }

    const { language, isFavorite, search, sort = '-createdAt', page = 1, limit = 20 } = req.query;

    // Build query
    const query = { userId: req.user.id };

    if (language) {
      query.language = language;
    }

    if (isFavorite === 'true') {
      query.isFavorite = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { prompt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const history = await CodeHistory.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select('-generatedCode -editedCode -enhancedPrompt -errorLogs'); // Exclude large fields for list view

    // Get total count
    const total = await CodeHistory.countDocuments(query);

    res.status(200).json({
      success: true,
      count: history.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single code history by ID
 * @route   GET /api/history/:id
 * @access  Private
 */
export const getHistoryById = async (req, res, next) => {
  try {
    const codeHistory = await CodeHistory.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!codeHistory) {
      return res.status(404).json({
        success: false,
        message: 'Code history not found',
      });
    }

    // Increment view count
    codeHistory.viewCount += 1;
    await codeHistory.save();

    res.status(200).json({
      success: true,
      data: codeHistory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create/save code history
 * @route   POST /api/history
 * @access  Private
 */
export const createHistory = async (req, res, next) => {
  try {
    // Use Mock DB if MongoDB is not connected
    if (mongoose.connection.readyState !== 1) {
      const codeHistory = await MockDB.createCodeHistory({
        ...req.body,
        user: req.user.id,
      });
      return res.status(201).json({
        success: true,
        data: codeHistory,
        warning: '⚠️ Using Mock Database - Data will be lost on server restart.',
      });
    }

    const codeHistory = await CodeHistory.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: codeHistory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update code history
 * @route   PUT /api/history/:id
 * @access  Private
 */
export const updateHistory = async (req, res, next) => {
  try {
    const { title, editedCode, isFavorite, tags } = req.body;

    let codeHistory = await CodeHistory.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!codeHistory) {
      return res.status(404).json({
        success: false,
        message: 'Code history not found',
      });
    }

    // Update fields
    if (title !== undefined) codeHistory.title = title;
    if (editedCode !== undefined) codeHistory.editedCode = editedCode;
    if (isFavorite !== undefined) codeHistory.isFavorite = isFavorite;
    if (tags !== undefined) codeHistory.tags = tags;

    await codeHistory.save();

    res.status(200).json({
      success: true,
      data: codeHistory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete code history
 * @route   DELETE /api/history/:id
 * @access  Private
 */
export const deleteHistory = async (req, res, next) => {
  try {
    const codeHistory = await CodeHistory.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!codeHistory) {
      return res.status(404).json({
        success: false,
        message: 'Code history not found',
      });
    }

    await codeHistory.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Code history deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle favorite status
 * @route   PATCH /api/history/:id/favorite
 * @access  Private
 */
export const toggleFavorite = async (req, res, next) => {
  try {
    const codeHistory = await CodeHistory.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!codeHistory) {
      return res.status(404).json({
        success: false,
        message: 'Code history not found',
      });
    }

    codeHistory.isFavorite = !codeHistory.isFavorite;
    await codeHistory.save();

    res.status(200).json({
      success: true,
      data: codeHistory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user statistics
 * @route   GET /api/history/stats
 * @access  Private
 */
export const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get total count
    const totalCount = await CodeHistory.countDocuments({ userId });

    // Get count by language
    const byLanguage = await CodeHistory.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$language', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get favorites count
    const favoritesCount = await CodeHistory.countDocuments({ userId, isFavorite: true });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentCount = await CodeHistory.countDocuments({
      userId,
      createdAt: { $gte: sevenDaysAgo },
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalCount,
        favorites: favoritesCount,
        recentActivity: recentCount,
        byLanguage,
      },
    });
  } catch (error) {
    next(error);
  }
};
