# CodeMind AI - Multi-Language Code Generator SaaS

A production-ready AI-powered code generation platform using Google Gemini API.

## 🚀 Features

- **Multi-Language Support**: HTML, JavaScript, React, Node.js, Python, C, Java
- **AI-Powered Generation**: Google Gemini API integration
- **Live Preview**: Real-time code preview with sandboxed iframe
- **Smart Error Handling**: AI-powered error detection and auto-fix
- **Code History**: Save, manage, and retrieve all generated code
- **Authentication**: Secure JWT-based auth with bcrypt
- **Modern UI**: Dark/Light mode, responsive design, smooth animations
- **Monaco Editor**: Professional code editing experience

## 📁 Project Structure

```
CodeMind AI/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database & environment config
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & validation middleware
│   ├── services/           # Gemini AI service
│   └── server.js           # Entry point
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth & Theme context
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   └── public/
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- Monaco Editor
- Axios
- React Router DOM

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google Gemini API
- bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini API key

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

## 🔑 Getting API Keys

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add to `MONGODB_URI` in backend `.env`

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add to `GEMINI_API_KEY` in backend `.env`

## 🚀 Deployment

### Backend (Render/Railway)

1. **Render**:
   - Connect GitHub repo
   - Select `backend` folder
   - Add environment variables
   - Deploy

2. **Railway**:
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

### Frontend (Vercel/Netlify)

1. **Vercel**:
   ```bash
   cd frontend
   vercel
   ```

2. **Netlify**:
   ```bash
   cd frontend
   netlify deploy
   ```

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Code Generation
- `POST /api/code/generate` - Generate code with AI
- `POST /api/code/fix` - Fix code errors with AI
- `POST /api/code/explain` - Explain code
- `POST /api/code/optimize` - Optimize code
- `POST /api/code/convert` - Convert between languages

### Code History
- `GET /api/history` - Get user's code history
- `POST /api/history` - Save generated code
- `GET /api/history/:id` - Get specific code
- `PUT /api/history/:id` - Update saved code
- `DELETE /api/history/:id` - Delete code

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt (10 rounds)
- HTTP-only cookies
- CORS protection
- Rate limiting on API
- Sandboxed iframe for code preview
- Environment variable protection
- Input validation & sanitization

## 🎨 Features in Detail

### Live Preview
- HTML/CSS/JS: Sandboxed iframe with auto-refresh
- Tailwind CSS: Automatic CDN injection
- React: Browser-based rendering
- Error boundary with clear messages

### AI Error Fixing
1. Detects syntax/runtime errors
2. Shows error in UI
3. "Fix with AI" button
4. Sends code + error to Gemini
5. Receives corrected code
6. Updates editor

### Code History
- Automatic saving after generation
- Search and filter
- Edit and re-save
- Delete functionality
- Favorite marking

## 👥 User Flow

1. **Register/Login** → JWT token stored
2. **Dashboard** → Navigate to Code Generator
3. **Select Options** → Language, Framework, Styling
4. **Enter Prompt** → Describe what you want to build
5. **Generate** → AI creates code
6. **Preview** → See live result
7. **Edit** → Modify code if needed
8. **Fix Errors** → AI auto-fix if issues
9. **Save** → Store in history
10. **Download** → Export code

## 📝 License

MIT License - Feel free to use for your portfolio

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize!

## 📧 Support

For issues or questions, create an issue in the repository.

---

Built with ❤️ using Google Gemini AI
