/**
 * Mock code generator for development/testing without Gemini API
 */

function generateHTMLTemplate(prompt, styling, features) {
  const { isLogin } = features;
  
  if (isLogin) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    ${styling === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : '<style>body{background:linear-gradient(135deg,#667eea,#764ba2);display:flex;justify-content:center;align-items:center;min-height:100vh}.container{background:white;padding:40px;border-radius:10px;max-width:400px}</style>'}
</head>
<body>
    <div class="container">
        <h2>Welcome Back</h2>
        <form>
            <input type="email" placeholder="Email" required><br>
            <input type="password" placeholder="Password" required><br>
            <button type="submit">Sign In</button>
        </form>
    </div>
</body>
</html>`;
  }
  
  return `<!DOCTYPE html>
<html><head><title>${prompt.substring(0, 50)}</title></head>
<body><h1>${prompt}</h1><p>Demo template</p></body></html>`;
}

function generateJSTemplate(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Detect login page request
  if (lowerPrompt.includes('login')) {
    return `// Interactive Login Page with DOM manipulation
const loginPage = {
  init() {
    document.body.innerHTML = \`
      <style>
        body { 
          margin: 0; 
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }
        h2 { 
          color: #333; 
          margin-top: 0;
          margin-bottom: 30px;
          text-align: center;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
        }
        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
        }
        .message {
          margin-top: 15px;
          padding: 10px;
          border-radius: 6px;
          text-align: center;
          display: none;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
      </style>
      <div class="login-container">
        <h2>Welcome Back</h2>
        <form id="loginForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required>
          </div>
          <button type="submit">Sign In</button>
          <div id="message" class="message"></div>
        </form>
      </div>
    \`;
    this.attachEvents();
  },
  
  attachEvents() {
    const form = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Demo validation
      if (email && password.length >= 6) {
        messageDiv.textContent = 'Login successful! Welcome back.';
        messageDiv.className = 'message success';
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
          alert(\`Logged in as: \${email}\`);
        }, 1000);
      } else {
        messageDiv.textContent = 'Invalid credentials. Password must be at least 6 characters.';
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });
  }
};

// Initialize the login page
loginPage.init();`;
  }
  
  // Generic template for other prompts
  return `// ${prompt}
function main() {
    console.log("Generated code");
}
main();`;
}

function generateReactTemplate(prompt, styling) {
  const lowerPrompt = prompt.toLowerCase();
  const hasAnimation = lowerPrompt.includes('animation') || lowerPrompt.includes('animated');
  
  // Detect sign up/register page request
  if (lowerPrompt.includes('sign up') || lowerPrompt.includes('signup') || lowerPrompt.includes('register')) {
    if (styling === 'tailwind') {
      return `import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }
    
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setMessageType('error');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }
    
    setMessage(\`Account created successfully! Welcome, \${formData.name}\`);
    setMessageType('success');
    setTimeout(() => {
      alert(\`Registration successful for: \${formData.email}\`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div 
        className={\`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md transition-all duration-1000 transform \${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }\`}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today and get started!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />
          </div>
          
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />
          </div>
          
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />
          </div>
          
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            Sign Up
          </button>
          
          {message && (
            <div className={\`p-3 rounded-lg text-center text-sm transform transition-all duration-500 \${
              messageType === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-300 scale-100' 
                : 'bg-red-100 text-red-700 border border-red-300 scale-100'
            }\`}>
              {message}
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline transition-all duration-300 hover:text-purple-600">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;`;
    } else {
      return `import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }
    
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setMessageType('error');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }
    
    setMessage(\`Account created successfully! Welcome, \${formData.name}\`);
    setMessageType('success');
    setTimeout(() => {
      alert(\`Registration successful for: \${formData.email}\`);
    }, 1000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      padding: '40px',
      width: '100%',
      maxWidth: '450px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      textAlign: 'center',
      marginTop: 0
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      textAlign: 'center',
      marginBottom: '30px',
      marginTop: 0
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#555',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      marginTop: '10px'
    },
    message: {
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px'
    },
    success: {
      background: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    error: {
      background: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    links: {
      marginTop: '24px',
      textAlign: 'center'
    },
    link: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join us today!</p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Sign Up
          </button>
          
          {message && (
            <div style={{
              ...styles.message,
              ...(messageType === 'success' ? styles.success : styles.error)
            }}>
              {message}
            </div>
          )}
        </form>
        
        <div style={styles.links}>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            Already have an account?{' '}
            <a href="#" style={styles.link}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;`;
    }
  }
  
  // Detect login page request
  if (lowerPrompt.includes('login')) {
    if (styling === 'tailwind') {
      return `import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password.length >= 6) {
      setMessage('Login successful! Welcome back.');
      setMessageType('success');
      setTimeout(() => {
        alert(\`Logged in as: \${email}\`);
      }, 1000);
    } else {
      setMessage('Invalid credentials. Password must be at least 6 characters.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition duration-200"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition duration-200"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
          >
            Sign In
          </button>
          
          {message && (
            <div className={\`p-3 rounded-lg text-center \${
              messageType === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }\`}>
              {message}
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-purple-600 hover:underline">
            Forgot password?
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-purple-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;`;
    } else {
      return `import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password.length >= 6) {
      setMessage('Login successful! Welcome back.');
      setMessageType('success');
      setTimeout(() => {
        alert(\`Logged in as: \${email}\`);
      }, 1000);
    } else {
      setMessage('Invalid credentials. Password must be at least 6 characters.');
      setMessageType('error');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      padding: '40px',
      width: '100%',
      maxWidth: '450px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '30px',
      textAlign: 'center',
      marginTop: 0
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#555',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      marginTop: '10px'
    },
    message: {
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'center',
      marginTop: '20px'
    },
    success: {
      background: '#d4edda',
      color: '#155724'
    },
    error: {
      background: '#f8d7da',
      color: '#721c24'
    },
    links: {
      marginTop: '24px',
      textAlign: 'center'
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Sign In
          </button>
          
          {message && (
            <div style={{
              ...styles.message,
              ...(messageType === 'success' ? styles.success : styles.error)
            }}>
              {message}
            </div>
          )}
        </form>
        
        <div style={styles.links}>
          <a href="#" style={styles.link}>Forgot password?</a>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>
            Don't have an account?{' '}
            <a href="#" style={{ ...styles.link, fontWeight: '600' }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;`;
    }
  }
  
  // Generic template for other prompts
  return `import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>${prompt.substring(0, 50)}</h1>
      <p>Generated React component for: {prompt}</p>
    </div>
  );
}

export default App;`;
}

export const MockCodeGenerator = {
  generateCode: (prompt, language, framework, styling) => {
    const features = { isLogin: prompt.toLowerCase().includes('login') };
    
    const templates = {
      html: generateHTMLTemplate(prompt, styling, features),
      javascript: generateJSTemplate(prompt),
      react: generateReactTemplate(prompt, styling),
      typescript: `// ${prompt}\nfunction main() { console.log("Code"); }\nmain();`,
      python: `# ${prompt}\ndef main():\n    print("Code")\n\nif __name__ == "__main__":\n    main()`,
      nodejs: `// ${prompt}\nconsole.log("Server code");`,
      java: `// ${prompt}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Code");\n    }\n}`,
      c: `// ${prompt}\n#include <stdio.h>\nint main() {\n    printf("Code");\n    return 0;\n}`
    };

    return templates[language.toLowerCase()] || templates.javascript;
  },

  fixCode: (code, error) => {
    return `// Fixed (Demo)\n${code}`;
  },

  explainCode: () => {
    return 'Demo explanation. Add Gemini API key for AI explanations.';
  },

  optimizeCode: (code) => {
    return `// Optimized (Demo)\n${code}`;
  },

  convertCode: (code, target) => {
    return `// Converted to ${target} (Demo)\n${code}`;
  }
};
