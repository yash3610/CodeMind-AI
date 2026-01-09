# CodeMind AI - Deployment Guide

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Google Gemini API key

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your credentials:**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start backend:**
   ```bash
   npm run dev
   ```

   Backend will run on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start frontend:**
   ```bash
   npm run dev
   ```

   Frontend will run on http://localhost:5173

6. **Access the app:**
   Open http://localhost:5173 in your browser

---

## ☁️ Production Deployment

### Option 1: Deploy with Vercel (Frontend) + Render (Backend)

#### Backend Deployment (Render)

1. **Create account on [Render](https://render.com)**

2. **Create new Web Service:**
   - Connect your GitHub repository
   - Select `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy** - Render will provide you with a URL like:
   `https://codemind-ai-backend.onrender.com`

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Update `.env` with production backend URL:**
   ```env
   VITE_API_URL=https://codemind-ai-backend.onrender.com/api
   ```

4. **Deploy:**
   ```bash
   vercel
   ```

5. **Follow prompts:**
   - Link to existing project or create new
   - Set root directory to `frontend`
   - Accept default settings

6. **Set environment variable in Vercel dashboard:**
   - Go to project settings
   - Add `VITE_API_URL` with your backend URL

7. **Your app will be live at:**
   `https://your-project.vercel.app`

---

### Option 2: Deploy with Netlify (Frontend) + Railway (Backend)

#### Backend Deployment (Railway)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Navigate to backend:**
   ```bash
   cd backend
   ```

4. **Initialize Railway project:**
   ```bash
   railway init
   ```

5. **Add environment variables:**
   ```bash
   railway variables set MONGODB_URI=your_uri
   railway variables set JWT_SECRET=your_secret
   railway variables set GEMINI_API_KEY=your_key
   railway variables set NODE_ENV=production
   ```

6. **Deploy:**
   ```bash
   railway up
   ```

7. **Get your backend URL from Railway dashboard**

#### Frontend Deployment (Netlify)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

5. **Set environment variables in Netlify:**
   - Go to Site Settings > Environment Variables
   - Add `VITE_API_URL` with your Railway backend URL

---

## 🔑 Getting API Keys

### MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account / Sign in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `myFirstDatabase` with your database name (e.g., `codemind-ai`)

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/codemind-ai?retryWrites=true&w=majority
```

### Google Gemini API Key (Free)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Use it in your backend `.env` file

**Free tier includes:**
- 60 requests per minute
- Perfect for development and small-scale production

---

## 📝 Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and loads correctly
- [ ] MongoDB connection is working
- [ ] Gemini API is responding
- [ ] User registration works
- [ ] User login works
- [ ] Code generation works
- [ ] Code history saves correctly
- [ ] Live preview displays properly
- [ ] Dark/Light mode works
- [ ] All API endpoints are secured

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**
- Verify MongoDB URI is correct
- Check if IP address is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

**Gemini API Errors:**
- Verify API key is correct
- Check if you've exceeded rate limits
- Ensure API key has proper permissions

**CORS Errors:**
- Update `FRONTEND_URL` in backend `.env`
- Ensure frontend URL is correct in CORS configuration

### Frontend Issues

**API Requests Failing:**
- Verify `VITE_API_URL` points to correct backend
- Check if backend is running
- Check browser console for errors

**Build Errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist .vite`
- Ensure all dependencies are installed

---

## 🎯 Performance Optimization

### Backend
- Enable compression middleware
- Implement Redis caching for frequently accessed data
- Use MongoDB indexes for faster queries
- Implement rate limiting per user

### Frontend
- Code splitting with React.lazy
- Image optimization
- Enable gzip compression
- Use CDN for static assets

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Use strong JWT secrets** - Minimum 32 characters
3. **Enable HTTPS** in production
4. **Implement rate limiting** - Already configured
5. **Validate all inputs** - Already implemented
6. **Keep dependencies updated** - Run `npm audit fix` regularly

---

## 📊 Monitoring

### Recommended Tools

- **Backend Monitoring:** Railway/Render built-in logs
- **Error Tracking:** Sentry (free tier available)
- **Uptime Monitoring:** UptimeRobot (free)
- **Analytics:** Google Analytics or Plausible

---

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review application logs
3. Check MongoDB Atlas logs
4. Verify all environment variables are set correctly
5. Ensure all services are running

---

## 📄 License

MIT License - Free to use for personal and commercial projects

---

**Built with ❤️ using Google Gemini AI**
