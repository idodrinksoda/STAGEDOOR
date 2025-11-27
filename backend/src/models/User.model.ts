import mongoose, { Document, Schema } from 'mongoose';

export enum AccountType {
  MUSICIAN = 'musician',
  FAN = 'fan'
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  accountType: AccountType;
  displayName: string;
  bio?: string;
  profilePicture?: string;
  coverImage?: string;
  verified: boolean;
  
  // Musician-specific fields
  genres?: string[];
  instruments?: string[];
  bandMembers?: string[];
  spotifyLink?: string;
  appleMusicLink?: string;
  soundcloudLink?: string;
  websiteLink?: string;
  
  // Stats
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  postsCount: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    accountType: {
      type: String,
      enum: Object.values(AccountType),
      required: true
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    bio: {
      type: String,
      maxlength: 500
    },
    profilePicture: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
    },
    // Musician-specific
    genres: [{
      type: String
    }],
    instruments: [{
      type: String
    }],
    bandMembers: [{
      type: String
    }],
    spotifyLink: String,
    appleMusicLink: String,
    soundcloudLink: String,
    websiteLink: String,
    
    // Stats
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    postsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ accountType: 1 });

export default mongoose.model<IUser>('User', UserSchema);
