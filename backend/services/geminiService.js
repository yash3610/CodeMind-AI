import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/env.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * Enhance user prompt with context
 */
export const enhancePrompt = (userPrompt, language, framework, styling) => {
  let enhancedPrompt = `You are an expert ${language} developer. `;

  if (framework && framework !== 'none') {
    enhancedPrompt += `Using ${framework} framework, `;
  }

  if (styling && styling !== 'none') {
    enhancedPrompt += `with ${styling} for styling, `;
  }

  enhancedPrompt += `generate clean, production-ready, well-commented code for the following requirement:\n\n${userPrompt}\n\n`;

  // Add specific instructions based on language
  switch (language. toLowerCase()) {
    case 'html':
      enhancedPrompt += `
        Requirements:
        - Use semantic HTML5 elements
        - Include proper meta tags
        - Make it responsive
        - Add inline CSS if styling is 'css', or use Tailwind classes if styling is 'tailwind'
        - Ensure accessibility (ARIA labels, alt texts)
        - Return only the HTML code, no explanations
      `;
      break;

    case 'react':
    case 'javascript':
    case 'typescript':
      enhancedPrompt += `
        Requirements:
        - Use modern ES6+ syntax
        - Include proper imports
        - Add JSDoc comments for functions
        - Handle edge cases and errors
        - Use proper naming conventions
        - Make components reusable
        ${styling === 'tailwind' ? '- Use Tailwind CSS classes for styling' : '- Include CSS-in-JS or separate CSS'}
        - Return only the code, no explanations
      `;
      break;

    case 'python':
      enhancedPrompt += `
        Requirements:
        - Follow PEP 8 style guide
        - Include docstrings
        - Add type hints where appropriate
        - Handle exceptions properly
        - Use meaningful variable names
        - Return only the Python code, no explanations
      `;
      break;

    case 'nodejs':
      enhancedPrompt += `
        Requirements:
        - Use ES6+ module syntax
        - Include proper error handling
        - Add comments for complex logic
        - Use async/await for asynchronous operations
        - Follow Node.js best practices
        - Return only the code, no explanations
      `;
      break;

    case 'java': 
      enhancedPrompt += `
        Requirements:
        - Follow Java naming conventions
        - Include JavaDoc comments
        - Use proper OOP principles
        - Handle exceptions appropriately
        - Make code modular and reusable
        - Return only the Java code, no explanations
      `;
      break;

    case 'c': 
      enhancedPrompt += `
        Requirements:
        - Include necessary headers
        - Add comments for complex logic
        - Handle memory properly
        - Use meaningful variable names
        - Include main function
        - Return only the C code, no explanations
      `;
      break;

    default:
      enhancedPrompt += '- Return only the code, no explanations or markdown formatting. ';
  }

  return enhancedPrompt;
};

/**
 * Generate code using Gemini AI
 */
export const generateCode = async (userPrompt, language, framework = 'none', styling = 'css') => {
  try {
    // Use Gemini 2.5 Flash model
    const model = genAI. getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Enhance the prompt
    const enhancedPrompt = enhancePrompt(userPrompt, language, framework, styling);

    // Generate content
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    let generatedCode = response.text();

    // Clean up the response - remove markdown code blocks if present
    generatedCode = cleanCodeResponse(generatedCode);

    return {
      success: true,
      code: generatedCode,
      enhancedPrompt,
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate code: ${error.message}`);
  }
};

/**
 * Fix code errors using Gemini AI
 */
export const fixCode = async (code, errorMessage, language) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert ${language} debugger. The following code has an error: 

CODE:
\`\`\`${language}
${code}
\`\`\`

ERROR:
${errorMessage}

Please analyze the error and provide the corrected code.  Return ONLY the fixed code without any explanations, markdown formatting, or additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let fixedCode = response.text();

    fixedCode = cleanCodeResponse(fixedCode);

    return {
      success: true,
      code: fixedCode,
    };
  } catch (error) {
    console.error('Gemini Fix Code Error:', error);
    
    if (error.message?. includes('API key') || error.status === 400) {
      console.log('⚠️  Using Mock Code Fixer (Gemini API not configured)');
      const { MockCodeGenerator } = await import('../utils/mockCodeGen.js');
      return {
        success: true,
        code: MockCodeGenerator.fixCode(code, errorMessage),
        warning: 'Using demo fix.  Configure Gemini API key for AI-powered fixes.',
      };
    }
    
    throw new Error(`Failed to fix code: ${error.message}`);
  }
};

/**
 * Explain code using Gemini AI
 */
export const explainCode = async (code, language) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert ${language} developer. Explain the following code in a clear, concise manner.  Include: 
1. What the code does (overview)
2. How it works (step-by-step)
3. Key concepts or patterns used
4. Any potential improvements

CODE:
\`\`\`${language}
${code}
\`\`\`

Provide a well-structured explanation that a developer can easily understand.`;

    const result = await model.generateContent(prompt);
    const response = await result. response;
    const explanation = response.text();

    return {
      success: true,
      explanation,
    };
  } catch (error) {
    console.error('Gemini Explain Code Error:', error);
    
    if (error.message?.includes('API key') || error.status === 400) {
      console.log('⚠️  Using Mock Code Explainer (Gemini API not configured)');
      const { MockCodeGenerator } = await import('../utils/mockCodeGen.js');
      return {
        success: true,
        explanation: MockCodeGenerator.explainCode(code),
        warning: 'Using demo explanation. Configure Gemini API key for AI-powered explanations.',
      };
    }
    
    throw new Error(`Failed to explain code: ${error.message}`);
  }
};

/**
 * Optimize code using Gemini AI
 */
export const optimizeCode = async (code, language) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert ${language} developer specializing in code optimization. Analyze and optimize the following code for: 
- Performance improvements
- Better readability
- Best practices
- Reduced complexity
- Memory efficiency

ORIGINAL CODE:
\`\`\`${language}
${code}
\`\`\`

Return ONLY the optimized code without explanations or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let optimizedCode = response.text();

    optimizedCode = cleanCodeResponse(optimizedCode);

    return {
      success: true,
      code: optimizedCode,
    };
  } catch (error) {
    console.error('Gemini Optimize Code Error:', error);
    
    if (error.message?.includes('API key') || error.status === 400) {
      console.log('⚠️  Using Mock Code Optimizer (Gemini API not configured)');
      const { MockCodeGenerator } = await import('../utils/mockCodeGen. js');
      return {
        success: true,
        code:  MockCodeGenerator.optimizeCode(code),
        warning: 'Using demo optimization. Configure Gemini API key for AI-powered optimization.',
      };
    }
    
    throw new Error(`Failed to optimize code: ${error.message}`);
  }
};

/**
 * Convert code from one language to another using Gemini AI
 */
export const convertCode = async (code, fromLanguage, toLanguage) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert programmer.  Convert the following ${fromLanguage} code to ${toLanguage}.  
Maintain the same functionality and logic.  Use ${toLanguage} best practices and idioms. 

ORIGINAL ${fromLanguage. toUpperCase()} CODE:
\`\`\`${fromLanguage}
${code}
\`\`\`

Return ONLY the converted ${toLanguage} code without explanations or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let convertedCode = response.text();

    convertedCode = cleanCodeResponse(convertedCode);

    return {
      success: true,
      code: convertedCode,
    };
  } catch (error) {
    console.error('Gemini Convert Code Error:', error);
    
    if (error.message?.includes('API key') || error.status === 400) {
      console.log('⚠️  Using Mock Code Converter (Gemini API not configured)');
      const { MockCodeGenerator } = await import('../utils/mockCodeGen.js');
      return {
        success: true,
        code: MockCodeGenerator. convertCode(code, toLanguage),
        warning: 'Using demo conversion. Configure Gemini API key for AI-powered conversion.',
      };
    }
    
    throw new Error(`Failed to convert code: ${error.message}`);
  }
};

/**
 * Clean code response - remove markdown code blocks
 */
const cleanCodeResponse = (code) => {
  // Remove markdown code blocks (```language and ```)
  let cleaned = code. replace(/```[\w]*\n/g, '').replace(/```$/g, '').trim();
  
  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
};

export default {
  generateCode,
  fixCode,
  explainCode,
  optimizeCode,
  convertCode,
  enhancePrompt,
};