import { Router, Request, Response } from 'express';
import Post from '../models/Post.model';
import Comment from '../models/Comment.model';
import User from '../models/User.model';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Create a new post
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { postType, caption, mediaUrl, thumbnailUrl, trackTitle, album, genre, lyrics, duration } = req.body;

    const post = await Post.create({
      author: req.user?.userId,
      postType,
      caption,
      mediaUrl,
      thumbnailUrl,
      trackTitle,
      album,
      genre,
      lyrics,
      duration
    });

    // Increment user's post count
    await User.findByIdAndUpdate(req.user?.userId, {
      $inc: { postsCount: 1 }
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username displayName profilePicture verified');

    res.status(201).json({
      success: true,
      data: { post: populatedPost }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get feed (posts from followed users)
router.get('/feed', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user?.userId);
    const followingIds = user?.following || [];

    const posts = await Post.find({
      author: { $in: [...followingIds, req.user?.userId] },
      isPublic: true
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username displayName profilePicture verified accountType')
      .lean();

    res.json({
      success: true,
      data: { posts, page, limit }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get posts by user
router.get('/user/:username', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    const posts = await Post.find({ author: user._id, isPublic: true })
      .sort({ createdAt: -1 })
      .populate('author', 'username displayName profilePicture verified')
      .lean();

    res.json({
      success: true,
      data: { posts }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get single post
router.get('/:postId', async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username displayName profilePicture verified accountType');

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      });
      return;
    }

    res.json({
      success: true,
      data: { post }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Like a post
router.post('/:postId/like', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      });
      return;
    }

    const userId = req.user?.userId;
    const alreadyLiked = post.likes.includes(userId as any);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      // Like
      post.likes.push(userId as any);
      post.likesCount += 1;
    }

    await post.save();

    res.json({
      success: true,
      data: { liked: !alreadyLiked, likesCount: post.likesCount }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Add comment to post
router.post('/:postId/comments', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user?.userId,
      content
    });

    // Increment post comment count
    await Post.findByIdAndUpdate(req.params.postId, {
      $inc: { commentsCount: 1 }
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username displayName profilePicture verified');

    res.status(201).json({
      success: true,
      data: { comment: populatedComment }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get comments for a post
router.get('/:postId/comments', async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .populate('author', 'username displayName profilePicture verified')
      .lean();

    res.json({
      success: true,
      data: { comments }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete post
router.delete('/:postId', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      });
      return;
    }

    if (post.author.toString() !== req.user?.userId) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
      return;
    }

    await Post.findByIdAndDelete(req.params.postId);
    await Comment.deleteMany({ post: req.params.postId });

    // Decrement user's post count
    await User.findByIdAndUpdate(req.user?.userId, {
      $inc: { postsCount: -1 }
    });

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
