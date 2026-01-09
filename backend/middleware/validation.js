/**
 * Validation middleware for request body
 */
export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateCodeGeneration = (req, res, next) => {
  const { prompt, language } = req.body;
  const errors = [];

  if (!prompt || prompt.trim().length < 5) {
    errors.push('Prompt must be at least 5 characters long');
  }

  if (!language) {
    errors.push('Programming language is required');
  }

  const validLanguages = ['html', 'javascript', 'react', 'nodejs', 'python', 'c', 'java', 'typescript'];
  if (language && !validLanguages.includes(language.toLowerCase())) {
    errors.push(`Language must be one of: ${validLanguages.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateCodeFix = (req, res, next) => {
  const { code, error, language } = req.body;
  const errors = [];

  if (!code || code.trim().length === 0) {
    errors.push('Code is required');
  }

  if (!error || error.trim().length === 0) {
    errors.push('Error message is required');
  }

  if (!language) {
    errors.push('Programming language is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
