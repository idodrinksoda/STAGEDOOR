'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ProfileHeader from '@/components/ProfileHeader'
import PostCard from '@/components/PostCard'
import { useAuthStore } from '@/store/authStore'
import { userAPI, postAPI } from '@/lib/api'
import { User, Post } from '@/types'
import toast from 'react-hot-toast'
import { FaMusic, FaThLarge, FaBookmark } from 'react-icons/fa'

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string
  const { user: currentUser, isAuthenticated } = useAuthStore()
  
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts')

  const isOwnProfile = currentUser?.username === username

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchProfile()
  }, [username, isAuthenticated])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      
      // Fetch user profile
      const userResponse = await userAPI.getProfile(username)
      const userData = userResponse.data.data.user
      setProfileUser(userData)
      
      // Check if following
      if (currentUser && !isOwnProfile) {
        setIsFollowing(userData.followers.includes(currentUser._id))
      }

      // Fetch user's posts
      const postsResponse = await postAPI.getUserPosts(userData._id)
      setPosts(postsResponse.data.data.posts || [])
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to load profile')
      if (error.response?.status === 404) {
        router.push('/feed')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    if (!profileUser) return
    
    try {
      await userAPI.followUser(profileUser._id)
      setIsFollowing(true)
      toast.success(`Now following ${profileUser.displayName}`)
      fetchProfile() // Refresh to update follower count
    } catch (error) {
      toast.error('Failed to follow user')
    }
  }

  const handleUnfollow = async () => {
    if (!profileUser) return
    
    try {
      await userAPI.unfollowUser(profileUser._id)
      setIsFollowing(false)
      toast.success(`Unfollowed ${profileUser.displayName}`)
      fetchProfile() // Refresh to update follower count
    } catch (error) {
      toast.error('Failed to unfollow user')
    }
  }

  const handleLike = async (postId: string) => {
    try {
      await postAPI.likePost(postId)
      fetchProfile() // Refresh posts to update like count
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const handleComment = (postId: string) => {
    router.push(`/post/${postId}`)
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="md:pl-20 xl:pl-64">
          <div className="max-w-5xl mx-auto px-4 pt-20 md:pt-8 pb-24 md:pb-8">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
              <p className="text-gray-600 mt-4">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="md:pl-20 xl:pl-64">
          <div className="max-w-5xl mx-auto px-4 pt-20 md:pt-8 pb-24 md:pb-8">
            <div className="text-center py-12">
              <FaMusic className="text-6xl text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
              <p className="text-gray-600 mb-6">This user doesn't exist or may have been deleted.</p>
              <button onClick={() => router.push('/feed')} className="btn-primary">
                Back to Feed
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Container with sidebar offset */}
      <div className="md:pl-20 xl:pl-64">
        <div className="max-w-5xl mx-auto px-4 pt-16 md:pt-6 pb-24 md:pb-8">
          
          {/* Profile Header */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-t-lg relative">
              {profileUser.coverImage && (
                <img
                  src={profileUser.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              )}
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              {/* Profile Picture */}
              <div className="flex items-end justify-between -mt-16 mb-4">
                <div className="relative">
                  {profileUser.profilePicture ? (
                    <img
                      src={profileUser.profilePicture}
                      alt={profileUser.displayName}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <FaMusic className="text-white text-4xl" />
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {isOwnProfile ? (
                  <button
                    onClick={() => router.push('/settings')}
                    className="btn-outline"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    className={isFollowing ? 'btn-outline' : 'btn-primary'}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{profileUser.displayName}</h1>
                  {profileUser.verified && <span className="text-blue-500 text-xl">✓</span>}
                </div>
                <p className="text-gray-600 mb-3">@{profileUser.username}</p>

                {/* Account Type Badge */}
                {profileUser.accountType === 'musician' && (
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                    <FaMusic />
                    <span>Musician</span>
                  </div>
                )}

                {/* Bio */}
                {profileUser.bio && <p className="text-gray-700 mb-4">{profileUser.bio}</p>}

                {/* Musician Info */}
                {profileUser.accountType === 'musician' && (
                  <div className="space-y-2 mb-4">
                    {profileUser.genres && profileUser.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {profileUser.genres.map((genre, i) => (
                          <span
                            key={i}
                            className="text-xs bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                    {profileUser.instruments && profileUser.instruments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {profileUser.instruments.map((instrument, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full"
                          >
                            {instrument}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex space-x-8 text-sm mb-4">
                  <div>
                    <span className="font-bold text-gray-900">{posts.length}</span>
                    <span className="text-gray-600"> posts</span>
                  </div>
                  <button className="hover:text-gray-900">
                    <span className="font-bold text-gray-900">{profileUser.followers?.length || 0}</span>
                    <span className="text-gray-600"> followers</span>
                  </button>
                  <button className="hover:text-gray-900">
                    <span className="font-bold text-gray-900">{profileUser.following?.length || 0}</span>
                    <span className="text-gray-600"> following</span>
                  </button>
                </div>

                {/* Social Links */}
                {profileUser.accountType === 'musician' && (
                  <div className="flex space-x-4">
                    {profileUser.spotifyLink && (
                      <a
                        href={profileUser.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        Spotify
                      </a>
                    )}
                    {profileUser.appleMusicLink && (
                      <a
                        href={profileUser.appleMusicLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Apple Music
                      </a>
                    )}
                    {profileUser.websiteLink && (
                      <a
                        href={profileUser.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 bg-white mb-6">
            <div className="flex justify-center">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center space-x-2 px-8 py-3 border-t-2 font-semibold text-sm transition-colors ${
                  activeTab === 'posts'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaThLarge />
                <span>POSTS</span>
              </button>
              {isOwnProfile && (
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex items-center space-x-2 px-8 py-3 border-t-2 font-semibold text-sm transition-colors ${
                    activeTab === 'saved'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaBookmark />
                  <span>SAVED</span>
                </button>
              )}
            </div>
          </div>

          {/* Posts Grid */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                  <FaMusic className="mx-auto text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600">
                    {isOwnProfile
                      ? profileUser.accountType === 'musician'
                        ? 'Start sharing your music with the world!'
                        : 'Follow some musicians to see their posts in your feed.'
                      : `${profileUser.displayName} hasn't posted anything yet.`}
                  </p>
                  {isOwnProfile && profileUser.accountType === 'musician' && (
                    <button
                      onClick={() => router.push('/create-post')}
                      className="btn-primary mt-6"
                    >
                      Create Your First Post
                    </button>
                  )}
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))
              )}
            </div>
          )}

          {/* Saved Posts */}
          {activeTab === 'saved' && isOwnProfile && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
              <FaBookmark className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved posts yet</h3>
              <p className="text-gray-600">
                Save posts by tapping the bookmark icon to see them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
