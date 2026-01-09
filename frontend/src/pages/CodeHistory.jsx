import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Trash2,
  Star,
  Filter,
  Eye,
  Download,
  Calendar,
  Code2,
} from 'lucide-react';
import { getHistory, deleteHistory, toggleFavorite } from '../services/historyService';
import toast from 'react-hot-toast';

const CodeHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, [languageFilter, favoriteFilter]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const params = {
        ...(search && { search }),
        ...(languageFilter && { language: languageFilter }),
        ...(favoriteFilter && { isFavorite: 'true' }),
      };
      const response = await getHistory(params);
      setHistory(response.data);
    } catch (error) {
      console.error('Load history error:', error);
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadHistory();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this code?')) return;

    try {
      await deleteHistory(id);
      setHistory(history.filter((item) => item._id !== id));
      toast.success('Code deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete code');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const response = await toggleFavorite(id);
      setHistory(
        history.map((item) =>
          item._id === id ? { ...item, isFavorite: response.data.isFavorite } : item
        )
      );
      toast.success(response.data.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    } catch (error) {
      console.error('Toggle favorite error:', error);
      toast.error('Failed to update favorite');
    }
  };

  const handleDownload = (item) => {
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

    const code = item.editedCode || item.generatedCode;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-z0-9]/gi, '_')}.${
      extensions[item.language] || 'txt'
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      python: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      java: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      html: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      react: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      nodejs: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
      c: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <History className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
            Code History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage all your generated code
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="input-field pl-10"
                  placeholder="Search by title or prompt..."
                />
              </div>
            </div>

            <div>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="input-field"
              >
                <option value="">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="html">HTML</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
                <option value="c">C</option>
              </select>
            </div>

            <div>
              <button
                onClick={() => setFavoriteFilter(!favoriteFilter)}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  favoriteFilter
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Star className="w-4 h-4 inline mr-2" />
                {favoriteFilter ? 'Showing Favorites' : 'All Items'}
              </button>
            </div>
          </div>
        </div>

        {/* History List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="spinner"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <Code2 className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No code history yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start generating code to see your history here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getLanguageColor(
                          item.language
                        )}`}
                      >
                        {item.language}
                      </span>
                      {item.framework !== 'none' && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {item.framework}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {item.prompt}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleFavorite(item._id)}
                    className="ml-4"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        item.isFavorite
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400 hover:text-yellow-400'
                      } transition-colors`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(item.createdAt)}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(item)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeHistory;
