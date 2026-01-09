# 🚀 Quick Setup Guide - CodeMind AI

## ⚡ Fast Track (5 Minutes)

### Step 1: Get API Keys (2 minutes)

**MongoDB Atlas (Free):**
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create free account → Create Cluster (M0 Free)
3. Security → Database Access → Add User (save credentials)
4. Security → Network Access → Add IP (0.0.0.0/0 for testing)
5. Database → Connect → Connection String → Copy it

**Google Gemini API (Free):**
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd "CodeMind AI/backend"

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=paste_your_mongodb_connection_string_here
JWT_SECRET=super_secret_key_change_this_in_production_minimum_32_chars
GEMINI_API_KEY=paste_your_gemini_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF

# Start backend
npm run dev
```

**You should see:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 CodeMind AI Server Running
📡 Port: 5000
```

### Step 3: Frontend Setup (1 minute)

**Open NEW terminal:**

```bash
# Navigate to frontend
cd "CodeMind AI/frontend"

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
```

**You should see:**
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

### Step 4: Access the App

1. Open browser: **http://localhost:5173**
2. Click "Create one" to register
3. Fill in your details
4. Start generating code! 🎉

---

## 🎯 Quick Test

1. **Register:** Create account with any email/password
2. **Generate Code:**
   - Language: React
   - Framework: React
   - Styling: Tailwind CSS
   - Prompt: "Create a beautiful card component with image, title, and description"
   - Click "Generate"
3. **View Preview:** Click the play button to see live preview
4. **Save:** Click save icon to store in history
5. **View History:** Navigate to Code History in sidebar

---

## 🐛 Troubleshooting

### Backend won't start?

**MongoDB connection error:**
```bash
# Check your MongoDB URI in backend/.env
# Make sure you:
# 1. Replaced <password> with your actual password
# 2. Replaced <dbname> with 'codemind-ai'
# 3. Added 0.0.0.0/0 to IP whitelist in MongoDB Atlas
```

**Gemini API error:**
```bash
# Verify your API key in backend/.env
# Make sure there are no extra spaces or quotes
```

### Frontend won't connect?

```bash
# Make sure backend is running first
# Check frontend/.env has correct API URL
# Clear browser cache and reload
```

### Port already in use?

```bash
# Backend (change in backend/.env):
PORT=5001

# Frontend (change in vite.config.js):
server: { port: 5174 }
```

---

## 📝 What You Get

✅ **Full-Stack SaaS Application**
- Production-ready authentication system
- AI-powered code generation
- Live code preview
- Code history management
- Dark/Light mode
- Responsive design

✅ **8 Programming Languages**
- HTML, JavaScript, TypeScript
- React, Node.js
- Python, Java, C

✅ **AI Features**
- Generate code from description
- Fix errors automatically
- Explain code
- Optimize code
- Convert between languages

✅ **Professional Features**
- JWT authentication
- MongoDB database
- Rate limiting
- Error handling
- Input validation
- Security best practices

---

## 🎓 Usage Tips

### Best Prompts for Code Generation

**Good Prompts:**
- ✅ "Create a responsive navbar with logo, menu items, and search bar using Tailwind CSS"
- ✅ "Build a user profile card with avatar, name, bio, and social links"
- ✅ "Make a calculator with basic operations and clear button"

**Not Great:**
- ❌ "Make something"
- ❌ "Code"
- ❌ "App"

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save code (in editor)
- `Ctrl/Cmd + F` - Find in editor
- `Ctrl/Cmd + /` - Comment/Uncomment

### Live Preview Tips

- Works best with: HTML, React
- Auto-injects Tailwind CSS CDN if needed
- Sandboxed for security
- Shows errors in red banner

---

## 🚀 Next Steps

1. **Explore Features:**
   - Try different languages
   - Use the AI Fix button
   - Save to favorites
   - Change theme in settings

2. **Customize:**
   - Set default language in Settings
   - Choose preferred framework
   - Pick theme preference

3. **Deploy (Optional):**
   - See DEPLOYMENT.md for detailed guide
   - Deploy backend to Render/Railway
   - Deploy frontend to Vercel/Netlify

---

## 📚 Documentation

- **README.md** - Project overview
- **API_DOCUMENTATION.md** - Complete API reference
- **DEPLOYMENT.md** - Production deployment guide
- **FEATURES.md** - Complete feature list

---

## 💡 Pro Tips

1. **Save Everything:** Use the save button after generating to keep history
2. **Use Favorites:** Star your best generated code for quick access
3. **Fix Errors:** If code has issues, use the wrench icon for AI auto-fix
4. **Download Code:** Use download button to save files locally
5. **Search History:** Use search bar to find old code quickly

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review API_DOCUMENTATION.md for API details
3. Check browser console for errors (F12)
4. Check backend terminal for server errors
5. Verify all environment variables are set correctly

---

## 🎉 You're Ready!

Your AI-powered code generator is now running!

Start by registering an account and generating your first piece of code.

**Happy Coding! 🚀**
