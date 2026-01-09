import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    codeHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CodeHistory',
      default: null,
    },
    errorType: {
      type: String,
      enum: ['syntax', 'runtime', 'compilation', 'network', 'other'],
      default: 'other',
    },
    errorMessage: {
      type: String,
      required: true,
    },
    errorStack: {
      type: String,
      default: null,
    },
    codeSnippet: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      required: true,
    },
    fixAttempted: {
      type: Boolean,
      default: false,
    },
    fixSuccessful: {
      type: Boolean,
      default: false,
    },
    aiResponse: {
      type: String,
      default: null,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for analytics and querying
errorLogSchema.index({ userId: 1, createdAt: -1 });
errorLogSchema.index({ errorType: 1 });

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);

export default ErrorLog;
