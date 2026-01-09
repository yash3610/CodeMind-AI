# 📁 Project Structure - CodeMind AI

```
CodeMind AI/
│
├── 📄 README.md                      # Main documentation
├── 📄 SETUP.md                       # Quick setup guide
├── 📄 DEPLOYMENT.md                  # Deployment instructions
├── 📄 API_DOCUMENTATION.md           # API reference
├── 📄 FEATURES.md                    # Complete feature list
├── 📄 .gitignore                     # Git ignore rules
│
├── 📂 backend/                       # Node.js + Express Backend
│   ├── 📄 package.json              # Dependencies
│   ├── 📄 .env.example              # Environment template
│   ├── 📄 server.js                 # Main entry point
│   ├── 📄 Procfile                  # Deployment config
│   ├── 📄 vercel.json               # Vercel config
│   │
│   ├── 📂 config/                   # Configuration files
│   │   ├── env.js                   # Environment variables
│   │   └── database.js              # MongoDB connection
│   │
│   ├── 📂 models/                   # Database models
│   │   ├── User.js                  # User schema
│   │   ├── CodeHistory.js           # Code history schema
│   │   └── ErrorLog.js              # Error log schema
│   │
│   ├── 📂 controllers/              # Route controllers
│   │   ├── authController.js        # Auth logic
│   │   ├── codeController.js        # Code generation logic
│   │   └── historyController.js     # History management
│   │
│   ├── 📂 routes/                   # API routes
│   │   ├── authRoutes.js            # /api/auth/*
│   │   ├── codeRoutes.js            # /api/code/*
│   │   └── historyRoutes.js         # /api/history/*
│   │
│   ├── 📂 middleware/               # Middleware functions
│   │   ├── auth.js                  # JWT authentication
│   │   ├── validation.js            # Input validation
│   │   └── errorHandler.js          # Error handling
│   │
│   └── 📂 services/                 # Business logic
│       └── geminiService.js         # Google Gemini AI integration
│
└── 📂 frontend/                      # React + Vite Frontend
    ├── 📄 package.json              # Dependencies
    ├── 📄 .env.example              # Environment template
    ├── 📄 index.html                # HTML entry point
    ├── 📄 vite.config.js            # Vite configuration
    ├── 📄 tailwind.config.js        # Tailwind CSS config
    ├── 📄 postcss.config.js         # PostCSS config
    │
    ├── 📂 public/                   # Static assets
    │
    └── 📂 src/                      # Source code
        ├── 📄 main.jsx              # React entry point
        ├── 📄 App.jsx               # Main app component
        ├── 📄 index.css             # Global styles
        │
        ├── 📂 components/           # Reusable components
        │   ├── PrivateRoute.jsx     # Protected route wrapper
        │   └── LivePreview.jsx      # Live code preview
        │
        ├── 📂 pages/                # Page components
        │   ├── Login.jsx            # Login page
        │   ├── Register.jsx         # Registration page
        │   ├── Dashboard.jsx        # Main dashboard layout
        │   ├── CodeGenerator.jsx    # Code generator page
        │   ├── CodeHistory.jsx      # History page
        │   └── Settings.jsx         # Settings page
        │
        ├── 📂 context/              # React Context
        │   ├── AuthContext.jsx      # Authentication state
        │   └── ThemeContext.jsx     # Theme state
        │
        └── 📂 services/             # API services
            ├── api.js               # Axios instance
            ├── authService.js       # Auth API calls
            ├── codeService.js       # Code generation API
            └── historyService.js    # History API calls
```

## 📊 File Organization

### Backend Architecture

```
Request Flow:
User → Route → Middleware → Controller → Service → Database
                    ↓           ↓           ↓
                Validation   Business    Gemini AI
                             Logic
```

**Key Files:**

1. **server.js** - Express app setup, middleware, routes
2. **config/database.js** - MongoDB connection
3. **models/** - Mongoose schemas with validation
4. **controllers/** - Request handling and response
5. **services/geminiService.js** - AI integration
6. **middleware/auth.js** - JWT verification

### Frontend Architecture

```
Component Hierarchy:
App
├── AuthProvider (Context)
│   └── ThemeProvider (Context)
│       ├── Login
│       ├── Register
│       └── Dashboard
│           ├── Sidebar (Navigation)
│           └── Outlet
│               ├── CodeGenerator
│               │   ├── Monaco Editor
│               │   └── LivePreview
│               ├── CodeHistory
│               └── Settings
```

**Key Files:**

1. **App.jsx** - Routes and providers
2. **context/** - Global state management
3. **services/** - API communication
4. **pages/CodeGenerator.jsx** - Main feature
5. **components/LivePreview.jsx** - Code execution

## 🔗 Data Flow

### Code Generation Flow

```
1. User enters prompt → CodeGenerator.jsx
2. Form data → codeService.generateCode()
3. API call → Backend /api/code/generate
4. Validation → codeController.generateCode()
5. Enhance prompt → geminiService.enhancePrompt()
6. Call Gemini API → Generate code
7. Save to DB → CodeHistory model
8. Return code → Frontend
9. Display in Monaco Editor
10. Show in LivePreview
```

### Authentication Flow

```
1. User submits login → Login.jsx
2. API call → authService.login()
3. Backend validates → authController.login()
4. Hash compare → User.comparePassword()
5. Generate JWT → generateToken()
6. Return token + user data
7. Store in localStorage
8. Update AuthContext
9. Redirect to Dashboard
10. Token sent with all requests → auth middleware
```

## 📦 Dependencies

### Backend Dependencies

**Production:**
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- @google/generative-ai - Gemini AI
- cors - CORS handling
- helmet - Security headers
- dotenv - Environment variables
- express-rate-limit - Rate limiting
- cookie-parser - Cookie handling
- validator - Input validation

**Development:**
- nodemon - Auto-restart server

### Frontend Dependencies

**Production:**
- react - UI library
- react-dom - React DOM rendering
- react-router-dom - Routing
- @monaco-editor/react - Code editor
- axios - HTTP client
- lucide-react - Icons
- react-hot-toast - Notifications

**Development:**
- vite - Build tool
- tailwindcss - CSS framework
- autoprefixer - CSS vendor prefixes
- postcss - CSS processing
- @vitejs/plugin-react - React plugin
- eslint - Code linting

## 🎯 Key Features by File

### Backend

| File | Features |
|------|----------|
| authController.js | Register, Login, Logout, Get User, Update Preferences |
| codeController.js | Generate, Fix, Explain, Optimize, Convert |
| historyController.js | CRUD operations, Search, Filter, Stats |
| geminiService.js | AI prompts, Code generation, Error fixing |
| auth.js | JWT verification, Token generation |

### Frontend

| File | Features |
|------|----------|
| CodeGenerator.jsx | Form inputs, Monaco editor, Live preview, AI actions |
| LivePreview.jsx | Iframe sandbox, Error handling, React rendering |
| CodeHistory.jsx | List view, Search, Filter, Delete, Download |
| Settings.jsx | User info, Theme toggle, Preferences |
| AuthContext.jsx | Login state, User data, Token management |

## 💾 Database Collections

### users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  preferences: {
    theme: String,
    defaultLanguage: String,
    defaultFramework: String
  },
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### codehistories
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  language: String,
  framework: String,
  styling: String,
  prompt: String,
  enhancedPrompt: String,
  generatedCode: String,
  editedCode: String,
  aiProvider: String,
  isFavorite: Boolean,
  tags: [String],
  errorLogs: [{
    error: String,
    fixedCode: String,
    timestamp: Date
  }],
  viewCount: Number,
  lastModified: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### errorlogs
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  codeHistoryId: ObjectId (ref: CodeHistory),
  errorType: String,
  errorMessage: String,
  errorStack: String,
  codeSnippet: String,
  language: String,
  fixAttempted: Boolean,
  fixSuccessful: Boolean,
  aiResponse: String,
  resolved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=minimum_32_characters
GEMINI_API_KEY=your_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📈 Scalability Considerations

### Current Setup
- Single server deployment
- Direct MongoDB connection
- In-memory rate limiting
- Client-side rendering

### Future Enhancements
- Load balancing
- Redis caching
- CDN for static assets
- Server-side rendering
- Microservices architecture
- WebSocket for real-time features

---

**Total Files:** ~50
**Total Lines of Code:** ~5000+
**Estimated Setup Time:** 5 minutes
**Production Ready:** ✅

---

This structure is designed for:
- 🚀 Easy navigation
- 📝 Clear separation of concerns
- 🔧 Easy maintenance
- 📦 Modular architecture
- 🎯 Scalability
