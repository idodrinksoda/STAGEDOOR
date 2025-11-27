import mongoose, { Document, Schema } from 'mongoose';

export enum PostType {
  AUDIO = 'audio',
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text'
}

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  postType: PostType;
  caption?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  duration?: number; // for audio/video in seconds
  
  // Audio-specific metadata
  trackTitle?: string;
  album?: string;
  genre?: string;
  lyrics?: string;
  
  // Engagement
  likes: mongoose.Types.ObjectId[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  playsCount: number;
  
  // Visibility
  isPublic: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postType: {
      type: String,
      enum: Object.values(PostType),
      required: true
    },
    caption: {
      type: String,
      maxlength: 2200
    },
    mediaUrl: {
      type: String
    },
    thumbnailUrl: {
      type: String
    },
    duration: {
      type: Number
    },
    // Audio metadata
    trackTitle: {
      type: String,
      maxlength: 100
    },
    album: {
      type: String,
      maxlength: 100
    },
    genre: {
      type: String
    },
    lyrics: {
      type: String,
      maxlength: 5000
    },
    // Engagement
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    likesCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    sharesCount: {
      type: Number,
      default: 0
    },
    playsCount: {
      type: Number,
      default: 0
    },
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes
PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ postType: 1 });
PostSchema.index({ genre: 1 });
PostSchema.index({ createdAt: -1 });

export default mongoose.model<IPost>('Post', PostSchema);
