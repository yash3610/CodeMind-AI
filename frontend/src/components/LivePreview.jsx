import { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const LivePreview = ({ code, language, styling }) => {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    try {
      setError(null);
      const iframe = iframeRef.current;
      if (!iframe) return;

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      let htmlContent = '';

      if (language === 'html') {
        htmlContent = code;

        // Inject Tailwind CSS CDN if needed
        if (styling === 'tailwind' && !code.includes('tailwindcss')) {
          htmlContent = code.replace(
            '</head>',
            '<script src="https://cdn.tailwindcss.com"></script></head>'
          );
        }
      } else if (language === 'javascript') {
        // For JavaScript, create an HTML wrapper to execute the code
        htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Preview</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
  </style>
</head>
<body>
  <script>
    ${code}
  </script>
</body>
</html>`;
      } else if (language === 'react') {
        // Clean the React code - remove import/export statements for preview
        let cleanCode = code;
        // Remove import statements
        cleanCode = cleanCode.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
        // Remove export default
        cleanCode = cleanCode.replace(/export\s+default\s+/g, '');
        
        // For React, create a basic HTML wrapper with React, ReactDOM, and Babel
        htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Preview</title>
  ${styling === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
    #root { width: 100%; min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    
    ${cleanCode}
    
    // Try to render if there's a component
    const rootElement = document.getElementById('root');
    if (typeof App !== 'undefined') {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    }
  </script>
</body>
</html>`;
      }

      // Add error handling script
      const errorHandlingScript = `
        <script>
          window.addEventListener('error', function(e) {
            window.parent.postMessage({ type: 'error', message: e.message, stack: e.error?.stack }, '*');
          });
          
          window.addEventListener('unhandledrejection', function(e) {
            window.parent.postMessage({ type: 'error', message: e.reason }, '*');
          });
          
          console.error = function(...args) {
            window.parent.postMessage({ type: 'error', message: args.join(' ') }, '*');
          };
        </script>
      `;

      htmlContent = htmlContent.replace('</body>', `${errorHandlingScript}</body>`);

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    } catch (err) {
      console.error('Preview error:', err);
      setError(err.message);
    }
  }, [code, language, styling]);

  // Listen for errors from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'error') {
        setError(event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {error && (
        <div className="m-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Preview Error
            </p>
            <p className="text-xs text-red-700 dark:text-red-300 mt-1 font-mono">
              {error}
            </p>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin allow-modals"
        className="flex-1 w-full border-0 bg-white"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default LivePreview;
