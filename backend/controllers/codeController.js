import mongoose from 'mongoose';
import geminiService from '../services/geminiService.js';
import CodeHistory from '../models/CodeHistory.js';
import ErrorLog from '../models/ErrorLog.js';
import { MockDB } from '../utils/mockDb.js';

/**
 * @desc    Generate code using Gemini AI
 * @route   POST /api/code/generate
 * @access  Private
 */
export const generateCode = async (req, res, next) => {
  try {
    const { prompt, language, framework, styling, title } = req.body;

    // Generate code using Gemini
    const result = await geminiService.generateCode(
      prompt,
      language,
      framework || 'none',
      styling || 'css'
    );

    // Save to code history
    let codeHistory;
    if (mongoose.connection.readyState !== 1) {
      codeHistory = await MockDB.createCodeHistory({
        user: req.user.id,
        title: title || `${language} - ${prompt.substring(0, 50)}...`,
        language,
        framework: framework || 'none',
        styling: styling || 'css',
        prompt,
        enhancedPrompt: result.enhancedPrompt,
        generatedCode: result.code,
        aiProvider: 'gemini',
      });
    } else {
      codeHistory = await CodeHistory.create({
        userId: req.user.id,
        title: title || `${language} - ${prompt.substring(0, 50)}...`,
        language,
        framework: framework || 'none',
        styling: styling || 'css',
        prompt,
        enhancedPrompt: result.enhancedPrompt,
        generatedCode: result.code,
        aiProvider: 'gemini',
      });
    }

    res.status(201).json({
      success: true,
      data: {
        code: result.code,
        historyId: codeHistory._id,
      },
      ...(result.warning && { warning: result.warning }),
    });
  } catch (error) {
    console.error('Generate code error:', error);
    next(error);
  }
};

/**
 * @desc    Fix code errors using Gemini AI
 * @route   POST /api/code/fix
 * @access  Private
 */
export const fixCode = async (req, res, next) => {
  try {
    const { code, error, language, historyId } = req.body;

    // Fix code using Gemini
    const result = await geminiService.fixCode(code, error, language);

    // Log the error
    const errorLog = await ErrorLog.create({
      userId: req.user.id,
      codeHistoryId: historyId || null,
      errorType: 'runtime',
      errorMessage: error,
      codeSnippet: code.substring(0, 500),
      language,
      fixAttempted: true,
      fixSuccessful: true,
      aiResponse: result.code,
    });

    // Update code history if historyId provided
    if (historyId) {
      const codeHistory = await CodeHistory.findOne({
        _id: historyId,
        userId: req.user.id,
      });

      if (codeHistory) {
        codeHistory.errorLogs.push({
          error,
          fixedCode: result.code,
        });
        codeHistory.editedCode = result.code;
        await codeHistory.save();
      }
    }

    res.status(200).json({
      success: true,
      data: {
        code: result.code,
        errorLogId: errorLog._id,
      },
    });
  } catch (error) {
    console.error('Fix code error:', error);
    
    // Log failed fix attempt
    if (req.body.code && req.body.error) {
      await ErrorLog.create({
        userId: req.user.id,
        errorType: 'runtime',
        errorMessage: req.body.error,
        codeSnippet: req.body.code.substring(0, 500),
        language: req.body.language,
        fixAttempted: true,
        fixSuccessful: false,
      });
    }
    
    next(error);
  }
};

/**
 * @desc    Explain code using Gemini AI
 * @route   POST /api/code/explain
 * @access  Private
 */
export const explainCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Code and language are required',
      });
    }

    const result = await geminiService.explainCode(code, language);

    res.status(200).json({
      success: true,
      data: {
        explanation: result.explanation,
      },
    });
  } catch (error) {
    console.error('Explain code error:', error);
    next(error);
  }
};

/**
 * @desc    Optimize code using Gemini AI
 * @route   POST /api/code/optimize
 * @access  Private
 */
export const optimizeCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Code and language are required',
      });
    }

    const result = await geminiService.optimizeCode(code, language);

    res.status(200).json({
      success: true,
      data: {
        code: result.code,
      },
    });
  } catch (error) {
    console.error('Optimize code error:', error);
    next(error);
  }
};

/**
 * @desc    Convert code between languages using Gemini AI
 * @route   POST /api/code/convert
 * @access  Private
 */
export const convertCode = async (req, res, next) => {
  try {
    const { code, fromLanguage, toLanguage } = req.body;

    if (!code || !fromLanguage || !toLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code, fromLanguage, and toLanguage are required',
      });
    }

    const result = await geminiService.convertCode(code, fromLanguage, toLanguage);

    res.status(200).json({
      success: true,
      data: {
        code: result.code,
      },
    });
  } catch (error) {
    console.error('Convert code error:', error);
    next(error);
  }
};
