# STAGEDOOR Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Change `JWT_SECRET` to a secure random string

5. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The app will be running at `http://localhost:3000`

## 📁 Project Structure

### Backend
```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.ts        # Entry point
├── package.json
└── tsconfig.json
```

### Frontend
```
frontend/
├── src/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── lib/             # Utilities and API client
│   ├── store/           # State management
│   └── types/           # TypeScript types
├── public/              # Static assets
├── package.json
└── next.config.js
```

## 🔑 Key Features Implemented

### Backend
- ✅ User authentication (JWT)
- ✅ User registration with musician/fan account types
- ✅ MongoDB models for users, posts, comments, follows
- ✅ RESTful API endpoints
- ✅ File upload handling
- ✅ Follow/unfollow functionality
- ✅ Post creation, likes, comments

### Frontend
- ✅ Next.js 14 with App Router
- ✅ TailwindCSS styling
- ✅ Responsive design
- ✅ Authentication state management
- ✅ Core UI components (Navbar, PostCard, ProfileHeader)
- ✅ API integration with Axios

## 🗄️ Database Schema

### User Model
- Account types: musician, fan
- Profile info: displayName, bio, profilePicture
- Musician-specific: genres, instruments, social links
- Stats: followers, following, postsCount

### Post Model
- Types: audio, video, image, text
- Metadata: trackTitle, album, genre, lyrics
- Engagement: likes, comments, shares, plays

### Comment Model
- Nested comments support
- Like functionality

### Follow Model
- Follower/following relationships

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/:userId/follow` - Follow user (protected)
- `DELETE /api/users/:userId/follow` - Unfollow user (protected)
- `GET /api/users/:userId/followers` - Get followers
- `GET /api/users/:userId/following` - Get following

### Posts
- `POST /api/posts` - Create post (protected)
- `GET /api/posts/feed` - Get feed (protected)
- `GET /api/posts/user/:username` - Get user's posts
- `GET /api/posts/:postId` - Get single post
- `POST /api/posts/:postId/like` - Like/unlike post (protected)
- `POST /api/posts/:postId/comments` - Add comment (protected)
- `GET /api/posts/:postId/comments` - Get comments
- `DELETE /api/posts/:postId` - Delete post (protected)

### Media
- `POST /api/media/upload` - Upload media file (protected)
- `POST /api/media/profile-picture` - Upload profile picture (protected)

## 🎨 Design System

### Colors
- Primary: Blue tones (#0ea5e9 and variants)
- Secondary: Purple tones (#a855f7 and variants)
- Accent colors for different content types

### Components
- Buttons: `.btn-primary`, `.btn-secondary`
- Inputs: `.input-field`
- Cards: `.card`

## 🔧 Development Tips

1. **TypeScript errors**: The errors you see are because dependencies aren't installed yet. Run `npm install` in both directories.

2. **MongoDB**: Make sure MongoDB is running before starting the backend.

3. **Environment variables**: Never commit `.env` files. Use `.env.example` as a template.

4. **File uploads**: Currently set up for local storage. In production, integrate AWS S3 or similar.

5. **Authentication**: Tokens are stored in localStorage. Consider httpOnly cookies for production.

## 📝 Next Steps

1. Install dependencies in both frontend and backend
2. Set up MongoDB
3. Configure environment variables
4. Test the authentication flow
5. Implement additional features:
   - Search functionality
   - Real-time notifications
   - Audio/video player
   - Playlist creation
   - Direct messaging
   - Analytics dashboard

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 🚀 Deployment

### Backend
- Deploy to services like Heroku, Railway, or AWS
- Use MongoDB Atlas for database
- Set up AWS S3 for media storage
- Configure environment variables

### Frontend
- Deploy to Vercel (recommended for Next.js)
- Or use Netlify, AWS Amplify, etc.
- Update API_URL to production backend URL

## 📄 License

To be determined

---

**Happy Coding!** 🎵
