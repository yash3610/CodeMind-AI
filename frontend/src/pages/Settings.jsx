import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { updatePreferences } from '../services/authService';
import { Settings as SettingsIcon, User, Palette, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: user?.preferences?.theme || theme,
    defaultLanguage: user?.preferences?.defaultLanguage || 'javascript',
    defaultFramework: user?.preferences?.defaultFramework || 'react',
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updatePreferences(preferences);
      updateUser(response.user);
      setTheme(preferences.theme);
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Save settings error:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account and preferences
          </p>
        </div>

        {/* User Info Card */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              User Information
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  preferences.theme === 'light'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white border-2 border-gray-300"></div>
                  <span className="font-medium text-gray-900 dark:text-white">Light</span>
                </div>
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  preferences.theme === 'dark'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gray-900 border-2 border-gray-700"></div>
                  <span className="font-medium text-gray-900 dark:text-white">Dark</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Code Preferences */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <Code2 className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Default Code Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Language
              </label>
              <select
                value={preferences.defaultLanguage}
                onChange={(e) =>
                  setPreferences({ ...preferences, defaultLanguage: e.target.value })
                }
                className="input-field"
              >
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Framework
              </label>
              <select
                value={preferences.defaultFramework}
                onChange={(e) =>
                  setPreferences({ ...preferences, defaultFramework: e.target.value })
                }
                className="input-field"
              >
                <option value="none">None</option>
                <option value="react">React</option>
                <option value="express">Express</option>
                <option value="nextjs">Next.js</option>
                <option value="django">Django</option>
                <option value="flask">Flask</option>
                <option value="spring">Spring Boot</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary px-8"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
