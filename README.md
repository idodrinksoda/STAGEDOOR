# STAGEDOOR 🎵

A social media platform designed exclusively for musicians and music fans to connect, share, and discover music.

## Overview

STAGEDOOR is a music-centric social network that brings together artists and their audiences in a dedicated space for musical expression and discovery. Think Instagram, but built from the ground up for the music community.

## ✨ Account Types

### 🎸 Musician/Band Accounts
- Create and share original music content
- Post audio tracks, videos, lyrics, and behind-the-scenes content
- Build a following and engage with fans
- Share upcoming shows, releases, and news
- Collaborate with other musicians
- Analytics and insights on listener engagement

### 🎧 Fan Accounts
- Discover new music and artists
- Follow favorite musicians and bands
- Create and share playlists
- Engage with content through likes, comments, and shares
- Get notified about new releases and shows
- Build a personal music profile and taste identity

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/idodrinksoda/STAGEDOOR.git
cd STAGEDOOR
```

2. **Install all dependencies**
```bash
npm run install:all
```

Or install separately:
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

3. **Set up environment variables**

Backend (create `backend/.env`):
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` and set your MongoDB URI and JWT secret.

Frontend (create `frontend/.env.local`):
```bash
cp frontend/.env.example frontend/.env.local
```

4. **Start development servers**

In separate terminals:

```bash
# Terminal 1 - Backend (runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2 - Frontend (runs on http://localhost:3000)
cd frontend
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000` to see the app!

## 📁 Project Structure

```
STAGEDOOR/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth & validation
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   └── server.ts     # Entry point
│   └── package.json
│
├── frontend/             # Next.js React app
│   ├── src/
│   │   ├── app/          # Next.js pages
│   │   ├── components/   # React components
│   │   ├── lib/          # API client
│   │   ├── store/        # State management
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── README.md             # This file
└── DEVELOPMENT.md        # Detailed dev guide
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Zustand** - State management
- **Axios** - API requests
- **React Icons** - Icon library

### Backend
- **Node.js & Express** - Server framework
- **TypeScript** - Type safety
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 🔑 Core Features Implemented

✅ User Authentication (Register/Login)  
✅ Musician & Fan Account Types  
✅ User Profiles with Customization  
✅ Post Creation (Audio, Video, Image, Text)  
✅ Feed System  
✅ Like & Comment System  
✅ Follow/Unfollow Users  
✅ File Upload Support  
✅ Responsive Design  
✅ RESTful API  

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### User Endpoints
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/:userId/follow` - Follow user
- `DELETE /api/users/:userId/follow` - Unfollow user

### Post Endpoints
- `POST /api/posts` - Create post (protected)
- `GET /api/posts/feed` - Get feed (protected)
- `GET /api/posts/user/:username` - Get user's posts
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comments` - Add comment

See `DEVELOPMENT.md` for complete API documentation.

## 🎨 Screenshots

_Coming soon_

## 🚧 Roadmap

### Phase 1 (Current)
- [x] Basic authentication
- [x] User profiles
- [x] Post creation
- [x] Feed system
- [x] Likes & comments

### Phase 2 (Next)
- [ ] Real-time notifications
- [ ] Audio player integration
- [ ] Advanced search
- [ ] Direct messaging
- [ ] User verification system

### Phase 3 (Future)
- [ ] Mobile apps (React Native)
- [ ] Playlist creation
- [ ] Live streaming
- [ ] Analytics dashboard
- [ ] Monetization features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Instagram's UI/UX
- Built for the music community
- Special thanks to all contributors

## 📞 Contact

Project Link: [https://github.com/idodrinksoda/STAGEDOOR](https://github.com/idodrinksoda/STAGEDOOR)

---

**STAGEDOOR** - Where Music Meets Community 🎵