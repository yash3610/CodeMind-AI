import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Play,
  Download,
  Copy,
  Save,
  Wrench,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { generateCode, fixCode } from '../services/codeService';
import { createHistory, updateHistory } from '../services/historyService';
import toast from 'react-hot-toast';
import LivePreview from '../components/LivePreview';

const CodeGenerator = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    prompt: '',
    language: 'javascript',
    framework: 'none',
    styling: 'css',
    title: '',
  });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [historyId, setHistoryId] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
  ];

  const frameworks = {
    javascript: [
      { value: 'none', label: 'None' },
      { value: 'react', label: 'React' },
      { value: 'express', label: 'Express' },
    ],
    typescript: [
      { value: 'none', label: 'None' },
      { value: 'react', label: 'React' },
      { value: 'nextjs', label: 'Next.js' },
    ],
    python: [
      { value: 'none', label: 'None' },
      { value: 'django', label: 'Django' },
      { value: 'flask', label: 'Flask' },
    ],
    java: [
      { value: 'none', label: 'None' },
      { value: 'spring', label: 'Spring Boot' },
    ],
  };

  const stylings = [
    { value: 'css', label: 'CSS' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'none', label: 'None' },
  ];

  const getEditorLanguage = (lang) => {
    const map = {
      nodejs: 'javascript',
      react: 'javascript',
      c: 'c',
    };
    return map[lang] || lang;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'language' && { framework: 'none' }),
    }));
  };

  const handleGenerate = async () => {
    if (!formData.prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await generateCode(formData);
      setCode(response.data.code);
      setHistoryId(response.data.historyId);
      // Show preview for HTML, React, and JavaScript
      setShowPreview(formData.language === 'html' || formData.language === 'react' || formData.language === 'javascript');
      toast.success('Code generated successfully!');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.response?.data?.message || 'Failed to generate code');
      toast.error('Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  const handleFixCode = async () => {
    if (!code) {
      toast.error('No code to fix');
      return;
    }

    const errorMessage = error || 'Please fix any issues in this code';
    setFixing(true);
    try {
      const response = await fixCode({
        code,
        error: errorMessage,
        language: formData.language,
        historyId,
      });
      setCode(response.data.code);
      setError(null);
      toast.success('Code fixed successfully!');
    } catch (err) {
      console.error('Fix error:', err);
      toast.error('Failed to fix code');
    } finally {
      setFixing(false);
    }
  };

  const handleSave = async () => {
    if (!code) {
      toast.error('No code to save');
      return;
    }

    try {
      if (historyId) {
        await updateHistory(historyId, {
          editedCode: code,
          title: formData.title || `${formData.language} - ${formData.prompt.substring(0, 50)}`,
        });
        toast.success('Code updated successfully!');
      } else {
        const response = await createHistory({
          ...formData,
          generatedCode: code,
          title: formData.title || `${formData.language} - ${formData.prompt.substring(0, 50)}`,
        });
        setHistoryId(response.data._id);
        toast.success('Code saved successfully!');
      }
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save code');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleDownload = () => {
    if (!code) {
      toast.error('No code to download');
      return;
    }

    const extensions = {
      html: 'html',
      javascript: 'js',
      typescript: 'ts',
      react: 'jsx',
      nodejs: 'js',
      python: 'py',
      java: 'java',
      c: 'c',
    };

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extensions[formData.language] || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
          AI Code Generator
        </h1>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="input-field"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Framework
            </label>
            <select
              name="framework"
              value={formData.framework}
              onChange={handleChange}
              className="input-field"
            >
              {(frameworks[formData.language] || [{ value: 'none', label: 'None' }]).map(
                (fw) => (
                  <option key={fw.value} value={fw.value}>
                    {fw.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Styling
            </label>
            <select
              name="styling"
              value={formData.styling}
              onChange={handleChange}
              className="input-field"
            >
              {stylings.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="My awesome code"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <textarea
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              className="input-field h-24 resize-none"
              placeholder="Describe what you want to build... (e.g., Create a login form with email and password fields)"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary px-8 flex items-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Editor and Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
          {/* Editor Toolbar */}
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Code Editor
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Download code"
              >
                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={handleSave}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Save code"
              >
                <Save className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={handleFixCode}
                disabled={fixing}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
                title="Fix with AI"
              >
                {fixing ? (
                  <Loader2 className="w-4 h-4 text-gray-600 dark:text-gray-400 animate-spin" />
                ) : (
                  <Wrench className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              {(formData.language === 'html' || formData.language === 'react') && (
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`p-2 rounded transition-colors ${
                    showPreview
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                  title="Toggle preview"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={getEditorLanguage(formData.language)}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              theme={isDark ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                tabSize: 2,
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Live Preview
              </span>
            </div>
            <LivePreview code={code} language={formData.language} styling={formData.styling} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGenerator;
