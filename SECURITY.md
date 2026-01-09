# Security Guidelines

## API Key Management

### ⚠️ CRITICAL: Never Commit API Keys

1. **Always use `.env` files** for sensitive data
2. **Verify `.env` is in `.gitignore`** before committing
3. **Never hardcode API keys** in source code
4. **Rotate keys immediately** if leaked

### Getting Your Gemini API Key

1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `backend/.env` file
5. **Never share this key publicly**

### If Your Key Is Leaked

1. Go to https://aistudio.google.com/app/apikey
2. Delete the compromised key immediately
3. Create a new API key
4. Update your `.env` file with the new key
5. Never commit the `.env` file

### Environment Variables Setup

```bash
# Navigate to backend directory
cd backend

# Copy example file
cp .env.example .env

# Edit with your values (use nano, vim, or VS Code)
nano .env
```

## Supported Gemini Models (2026)

- `gemini-2.5-flash` - Fast, balanced performance (recommended)
- `gemini-2.5-pro` - Advanced reasoning and code generation
- `gemini-3-flash` - Fastest for real-time use
- `gemini-3-pro` - Most powerful multimodal model

⚠️ Deprecated models (will cause 404 errors):
- ❌ `gemini-1.5-pro-latest`
- ❌ `gemini-1.5-pro`
- ❌ `gemini-1.0-pro`
