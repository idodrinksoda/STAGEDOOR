import { Router, Request, Response } from 'express';
import User from '../models/User.model';
import Follow from '../models/Follow.model';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Get user profile by username
router.get('/:username', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .lean();

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { displayName, bio, genres, instruments, spotifyLink, appleMusicLink, websiteLink } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      {
        displayName,
        bio,
        genres,
        instruments,
        spotifyLink,
        appleMusicLink,
        websiteLink
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Follow a user
router.post('/:userId/follow', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const followerId = req.user?.userId;
    const followingId = req.params.userId;

    if (followerId === followingId) {
      res.status(400).json({
        success: false,
        message: 'Cannot follow yourself'
      });
      return;
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId
    });

    if (existingFollow) {
      res.status(400).json({
        success: false,
        message: 'Already following this user'
      });
      return;
    }

    // Create follow relationship
    await Follow.create({
      follower: followerId,
      following: followingId
    });

    // Update user stats
    await User.findByIdAndUpdate(followerId, {
      $push: { following: followingId }
    });
    
    await User.findByIdAndUpdate(followingId, {
      $push: { followers: followerId }
    });

    res.json({
      success: true,
      message: 'Successfully followed user'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Unfollow a user
router.delete('/:userId/follow', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const followerId = req.user?.userId;
    const followingId = req.params.userId;

    await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId
    });

    // Update user stats
    await User.findByIdAndUpdate(followerId, {
      $pull: { following: followingId }
    });
    
    await User.findByIdAndUpdate(followingId, {
      $pull: { followers: followerId }
    });

    res.json({
      success: true,
      message: 'Successfully unfollowed user'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user's followers
router.get('/:userId/followers', async (req: Request, res: Response): Promise<void> => {
  try {
    const followers = await Follow.find({ following: req.params.userId })
      .populate('follower', 'username displayName profilePicture verified')
      .lean();

    res.json({
      success: true,
      data: { followers: followers.map(f => f.follower) }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user's following
router.get('/:userId/following', async (req: Request, res: Response): Promise<void> => {
  try {
    const following = await Follow.find({ follower: req.params.userId })
      .populate('following', 'username displayName profilePicture verified')
      .lean();

    res.json({
      success: true,
      data: { following: following.map(f => f.following) }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
