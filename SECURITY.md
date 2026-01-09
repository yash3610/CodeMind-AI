# 🔐 Security Guidelines for CodeMind AI

## API Key Management

### ⚠️ CRITICAL:  Never Commit API Keys

Your API keys are like passwords - they must be kept secret! 

**DO:**
- ✅ Store API keys in `.env` files
- ✅ Verify `.env` is in `.gitignore` before committing
- ✅ Use environment variables:  `process.env.GEMINI_API_KEY`
- ✅ Rotate keys immediately if leaked
- ✅ Use different keys for development and production

**DON'T:**
- ❌ Hardcode API keys in source code
- ❌ Commit `.env` files to git
- ❌ Share API keys in chat, email, or screenshots
- ❌ Use production keys in development
- ❌ Store keys in plain text files

---

## Getting Your Gemini API Key

### Step 1: Create API Key
1. Visit:  **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (you'll only see it once!)

### Step 2: Configure in Your Project
```bash
# Navigate to backend directory
cd backend

# Copy example file
cp .env.example .env

# Edit with your favorite editor
nano .env
# or
code .env
```

### Step 3: Add Your Key
```env
GEMINI_API_KEY=AIzaSy... your_actual_key_here... xyz
```

### Step 4: Verify Security
```bash
# Check .env is ignored by git
git status

# . env should NOT appear in the list
# If it does, add it to .gitignore immediately! 
```

---

## If Your Key Is Leaked 🚨

### Immediate Actions: 

1. **Delete the compromised key:**
   - Go to https://aistudio.google.com/app/apikey
   - Find the leaked key
   - Click **Delete** or **Revoke**

2. **Create a new API key:**
   - Click **"Create API Key"**
   - Copy the new key

3. **Update your `.env` file:**
   ```bash
   cd backend
   nano .env
   # Replace old key with new key
   ```

4. **Remove from git history** (if committed):
   ```bash
   # Remove . env from git tracking
   git rm --cached .env
   git rm --cached backend/.env
   
   # Add to .gitignore
   echo ".env" >> . gitignore
   echo "backend/.env" >> .gitignore
   
   # Commit changes
   git add .gitignore
   git commit -m "Remove leaked API key and secure .env files"
   git push origin main
   ```

5. **Restart your application:**
   ```bash
   cd backend
   npm start
   ```

---

## Supported Gemini Models (2026)

### ✅ Current Models (Use these!)

| Model | Use Case | Speed | Quality |
|-------|----------|-------|---------|
| `gemini-2.5-flash` | **Recommended** - Balanced performance | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| `gemini-2.5-pro` | Advanced reasoning, complex code | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| `gemini-3-flash` | Real-time, fastest responses | ⚡⚡⚡⚡ | ⭐⭐⭐ |
| `gemini-3-pro` | Most powerful, multimodal | ⚡ | ⭐⭐⭐⭐⭐ |

### ❌ Deprecated Models (Will cause 404 errors!)

- ❌ `gemini-1.5-pro-latest`
- ❌ `gemini-1.5-pro`
- ❌ `gemini-1.0-pro`
- ❌ `gemini-pro`

---

## Environment Variables Setup

### Required Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database (MongoDB)
MONGODB_URI=mongodb+srv://user:pass@cluster. mongodb.net/dbname

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# AI Integration
GEMINI_API_KEY=your-gemini-api-key-here

# Frontend
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Generate Secure JWT Secret

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64

# Option 3: Using online generator
# Visit: https://randomkeygen.com/
```

---

## Common Security Issues

### Issue 1: 403 Forbidden Error
**Cause:** API key was leaked and blocked by Google

**Solution:**
1. Delete the leaked key
2. Create a new key
3. Update `.env` file
4. Verify `.env` is in `.gitignore`

### Issue 2: 404 Not Found Error
**Cause:** Using deprecated model name

**Solution:**
- Update model name to `gemini-2.5-flash` or other current models
- Check `backend/services/geminiService.js`

### Issue 3: API key not found
**Cause:** `.env` file missing or not loaded

**Solution:**
```bash
cd backend
cp .env.example . env
# Add your keys to .env
npm install dotenv
```

---

## Security Checklist

Before deploying or committing code:

- [ ] `.env` files are listed in `.gitignore`
- [ ] No API keys hardcoded in source files
- [ ] `git status` shows no `.env` files
- [ ] Production keys are different from development keys
- [ ] API keys have appropriate restrictions (if available)
- [ ] Regular key rotation schedule is set
- [ ] Team members know security protocols

---

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do NOT open a public issue**
2. Email the maintainer directly
3. Include details about the vulnerability
4. Allow time for a fix before public disclosure

---

## Additional Resources

- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Environment Variables Best Practices](https://12factor.net/config)
- [Git Security Best Practices](https://docs.github.com/en/code-security)

---

**Last Updated:** January 2026  
**Version:** 1.0.0