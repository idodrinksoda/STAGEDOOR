# 🚀 STAGEDOOR Quick Start Guide

Welcome to STAGEDOOR! This guide will get you up and running in minutes.

## ⚡ Fast Setup (3 Steps)

### 1. Install Dependencies

```bash
# Option A: Use the setup script (macOS/Linux)
./setup.sh

# Option B: Manual installation
npm run install:all
```

### 2. Configure Environment

**Backend Configuration:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and update:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string

**Frontend Configuration:**
```bash
cd frontend
cp .env.example .env.local
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```
✅ Frontend running at `http://localhost:3000`

## 🎉 You're Ready!

Visit `http://localhost:3000` to see STAGEDOOR in action!

### Test the App

1. **Register** a new account (choose Musician or Fan)
2. **Create** your first post
3. **Explore** the feed
4. **Follow** other users

## 📋 Project Checklist

### Before You Start
- [ ] Node.js 18+ installed
- [ ] MongoDB running (local or cloud)
- [ ] Git installed

### Setup Steps
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can access app at localhost:3000

## 🐛 Troubleshooting

### Backend Won't Start
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check port 5000 is not in use

### Frontend Won't Start
- Check if backend is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Clear `.next` folder and restart

### Dependencies Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🎯 What's Included

### Backend Features
- ✅ REST API with TypeScript
- ✅ JWT Authentication
- ✅ MongoDB Models
- ✅ File Upload Support
- ✅ Input Validation

### Frontend Features
- ✅ Next.js 14 App Router
- ✅ TailwindCSS Styling
- ✅ Responsive Design
- ✅ State Management
- ✅ API Integration

## 📖 Learn More

- `README.md` - Project overview
- `DEVELOPMENT.md` - Detailed developer guide
- Backend API docs in `DEVELOPMENT.md`

## 🆘 Need Help?

1. Check `DEVELOPMENT.md` for detailed docs
2. Review error messages carefully
3. Check MongoDB connection
4. Verify environment variables

## 🎵 Happy Building!

You're all set to build the next big music social platform!

---

**Pro Tip:** Keep both terminals visible so you can see logs from both frontend and backend.
