import mongoose from 'mongoose';

const codeHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['html', 'javascript', 'react', 'nodejs', 'python', 'c', 'java', 'typescript', 'css'],
    },
    framework: {
      type: String,
      default: 'none',
      enum: ['none', 'react', 'express', 'django', 'flask', 'spring', 'nextjs'],
    },
    styling: {
      type: String,
      default: 'css',
      enum: ['css', 'tailwind', 'bootstrap', 'none'],
    },
    prompt: {
      type: String,
      required: [true, 'Prompt is required'],
      trim: true,
      maxlength: [2000, 'Prompt cannot exceed 2000 characters'],
    },
    enhancedPrompt: {
      type: String,
      default: null,
    },
    generatedCode: {
      type: String,
      required: [true, 'Generated code is required'],
    },
    editedCode: {
      type: String,
      default: null,
    },
    aiProvider: {
      type: String,
      default: 'gemini',
      enum: ['gemini'],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    errorLogs: [{
      error: String,
      fixedCode: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    viewCount: {
      type: Number,
      default: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
codeHistorySchema.index({ userId: 1, createdAt: -1 });
codeHistorySchema.index({ userId: 1, isFavorite: 1 });
codeHistorySchema.index({ userId: 1, language: 1 });

// Update lastModified on save
codeHistorySchema.pre('save', function (next) {
  this.lastModified = new Date();
  next();
});

// Virtual for getting the current code (edited if available, otherwise generated)
codeHistorySchema.virtual('currentCode').get(function () {
  return this.editedCode || this.generatedCode;
});

// Ensure virtuals are included when converting to JSON
codeHistorySchema.set('toJSON', { virtuals: true });
codeHistorySchema.set('toObject', { virtuals: true });

const CodeHistory = mongoose.model('CodeHistory', codeHistorySchema);

export default CodeHistory;
