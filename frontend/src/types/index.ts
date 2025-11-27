export enum AccountType {
  MUSICIAN = 'musician',
  FAN = 'fan'
}

export interface User {
  _id: string;
  username: string;
  email: string;
  accountType: AccountType;
  displayName: string;
  bio?: string;
  profilePicture?: string;
  coverImage?: string;
  verified: boolean;
  
  // Musician-specific
  genres?: string[];
  instruments?: string[];
  bandMembers?: string[];
  spotifyLink?: string;
  appleMusicLink?: string;
  soundcloudLink?: string;
  websiteLink?: string;
  
  // Stats
  followers: string[];
  following: string[];
  postsCount: number;
  
  createdAt: string;
  updatedAt: string;
}

export enum PostType {
  AUDIO = 'audio',
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text'
}

export interface Post {
  _id: string;
  author: User;
  postType: PostType;
  caption?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  
  // Audio metadata
  trackTitle?: string;
  album?: string;
  genre?: string;
  lyrics?: string;
  
  // Engagement
  likes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  playsCount: number;
  
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  post: string;
  author: User;
  content: string;
  likes: string[];
  likesCount: number;
  parentComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}
