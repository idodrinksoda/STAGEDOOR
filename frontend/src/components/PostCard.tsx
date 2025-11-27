'use client'

import { Post as PostType } from '@/types'
import { FaPlay, FaHeart, FaRegHeart, FaComment, FaRegComment, FaPaperPlane, FaBookmark, FaRegBookmark, FaMusic, FaEllipsisH } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

interface PostCardProps {
  post: PostType
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showAllCaption, setShowAllCaption] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike?.(post._id)
  }

  const formatTime = (date: string) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
    return `${Math.floor(diffInSeconds / 604800)}w`
  }

  const caption = post.caption || ''
  const isLongCaption = caption.length > 150

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <Link href={`/profile/${post.author.username}`}>
            {post.author.profilePicture ? (
              <img
                src={post.author.profilePicture}
                alt={post.author.displayName}
                className="w-8 h-8 rounded-full ring-2 ring-offset-1 ring-gradient-to-r from-yellow-400 to-pink-600"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <FaMusic className="text-white text-xs" />
              </div>
            )}
          </Link>
          <div className="flex items-center space-x-2">
            <Link href={`/profile/${post.author.username}`}>
              <button className="font-semibold text-sm text-gray-900 hover:text-gray-600">
                {post.author.username}
              </button>
            </Link>
            {post.author.accountType === 'musician' && (
              <span className="text-xs bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-2 py-0.5 rounded font-medium">
                🎸 Artist
              </span>
            )}
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <FaEllipsisH />
        </button>
      </div>

      {/* Track Title Bar - if musician post has track */}
      {post.trackTitle && post.author.accountType === 'musician' && (
        <div className="px-3 pb-2">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-200">
            <p className="font-semibold text-sm text-gray-900">{post.trackTitle}</p>
            {post.genre && (
              <p className="text-xs text-gray-600">
                {post.genre} {post.album && `• ${post.album}`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Media */}
      {post.mediaUrl && (
        <div className="w-full bg-black">
          {post.postType === 'image' && (
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          )}
          
          {post.postType === 'video' && (
            <video
              src={post.mediaUrl}
              controls
              className="w-full h-auto max-h-[600px]"
            />
          )}
          
          {post.postType === 'audio' && (
            <div className="p-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border-4 border-white/20">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                      <FaPlay className="text-primary-600 text-2xl ml-1" />
                    </button>
                  </div>
                  <p className="text-white font-bold text-xl mb-1">
                    {post.trackTitle || 'New Track'}
                  </p>
                  <p className="text-white/70 text-sm">{post.author.displayName}</p>
                  {post.genre && (
                    <span className="inline-block mt-2 text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                      {post.genre}
                    </span>
                  )}
                </div>
                <audio
                  src={post.mediaUrl}
                  controls
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="hover:text-gray-500 transition-colors"
            >
              {liked ? (
                <FaHeart className="text-red-500 text-2xl animate-like" />
              ) : (
                <FaRegHeart className="text-gray-900 text-2xl" />
              )}
            </button>
            <button
              onClick={() => onComment?.(post._id)}
              className="hover:text-gray-500 transition-colors"
            >
              <FaRegComment className="text-gray-900 text-2xl" />
            </button>
            <button className="hover:text-gray-500 transition-colors">
              <FaPaperPlane className="text-gray-900 text-2xl" />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="hover:text-gray-500 transition-colors"
          >
            {saved ? (
              <FaBookmark className="text-gray-900 text-2xl" />
            ) : (
              <FaRegBookmark className="text-gray-900 text-2xl" />
            )}
          </button>
        </div>

        {/* Likes Count & Plays for Audio */}
        <div className="flex items-center justify-between mb-2">
          <button className="font-semibold text-sm text-gray-900 hover:text-gray-600">
            {(post.likesCount || 0) + (liked ? 1 : 0)} likes
          </button>
          {post.postType === 'audio' && post.playsCount && (
            <span className="text-xs text-gray-500 flex items-center space-x-1">
              <FaPlay className="text-[10px]" />
              <span>{post.playsCount.toLocaleString()} plays</span>
            </span>
          )}
        </div>

        {/* Caption */}
        {caption && (
          <div className="text-sm mb-2">
            <Link href={`/profile/${post.author.username}`}>
              <span className="font-semibold text-gray-900 hover:text-gray-600 mr-2">
                {post.author.username}
              </span>
            </Link>
            <span className="text-gray-900">
              {isLongCaption && !showAllCaption
                ? caption.slice(0, 150) + '... '
                : caption}
              {isLongCaption && (
                <button
                  onClick={() => setShowAllCaption(!showAllCaption)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showAllCaption ? 'less' : 'more'}
                </button>
              )}
            </span>
          </div>
        )}

        {/* View Comments */}
        {post.commentsCount > 0 && (
          <button
            onClick={() => onComment?.(post._id)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 block"
          >
            View all {post.commentsCount} comments
          </button>
        )}

        {/* Time */}
        <p className="text-xs text-gray-500 uppercase mb-3">
          {formatTime(post.createdAt)}
        </p>
      </div>

      {/* Add Comment */}
      <div className="border-t border-gray-200 px-4 py-3 flex items-center space-x-3">
        <FaRegComment className="text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 text-sm outline-none"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onComment?.(post._id)
            }
          }}
        />
        <button className="text-primary-600 font-semibold text-sm hover:text-primary-700 disabled:opacity-50">
          Post
        </button>
      </div>
    </div>
  )
}
