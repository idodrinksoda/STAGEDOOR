'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard'
import { postAPI } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Post } from '@/types'
import { FaMusic, FaUserCircle, FaPlus } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function FeedPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Fetch feed
    const fetchFeed = async () => {
      try {
        const response = await postAPI.getFeed()
        setPosts(response.data.data.posts)
      } catch (error: any) {
        console.error('Error fetching feed:', error)
        if (error.response?.status === 401) {
          router.push('/login')
        } else {
          toast.error('Failed to load feed')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFeed()
  }, [isAuthenticated, router])

  const handleLike = async (postId: string) => {
    try {
      await postAPI.likePost(postId)
      // Refresh the post in the feed
      const response = await postAPI.getFeed()
      setPosts(response.data.data.posts)
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const handleComment = (postId: string) => {
    // Navigate to post detail page (to be implemented)
    router.push(`/post/${postId}`)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Container - Instagram Style with sidebar offset */}
      <div className="md:pl-20 xl:pl-64">
        <div className="max-w-6xl mx-auto flex gap-8 px-4 pt-6 pb-20 md:pb-6">
          
          {/* Left Sidebar - Stories/Suggestions */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="fixed w-80 space-y-6 pt-6">
              {/* User Profile Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.displayName}
                      className="w-14 h-14 rounded-full"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                      <FaMusic className="text-white text-xl" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">@{user?.username}</p>
                    <p className="text-xs text-primary-600 font-medium">
                      {user?.accountType === 'musician' ? '🎸 Musician' : '🎧 Fan'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggestions Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Suggested for you</h3>
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                    See All
                  </button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Artist {i}</p>
                          <p className="text-xs text-gray-500">New musician</p>
                        </div>
                      </div>
                      <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="text-xs text-gray-400 space-y-1">
                <p>© 2025 STAGEDOOR</p>
                <p>Where Music Meets Community</p>
              </div>
            </div>
          </div>

          {/* Center Feed */}
          <div className="flex-1 max-w-[630px]">
            {/* Stories Bar - Instagram Style */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {/* Your Story */}
                <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                  <div className="relative">
                    <button className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center border-2 border-white shadow-md">
                      <FaPlus className="text-white" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-900">Your story</span>
                </div>
                
                {/* Other Stories */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white p-[2px]">
                        <div className="w-full h-full rounded-full bg-gray-300" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-900">user{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                <p className="text-gray-600 mt-4">Loading your feed...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                <FaMusic className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to STAGEDOOR!</h3>
                <p className="text-gray-600 mb-6">
                  {user?.accountType === 'musician' 
                    ? 'Start sharing your music with the world! Create your first post.'
                    : 'Follow some musicians to see their latest tracks and updates here.'}
                </p>
                <button
                  onClick={() => router.push(user?.accountType === 'musician' ? '/create-post' : '/explore')}
                  className="btn-primary"
                >
                  {user?.accountType === 'musician' ? '+ Create Post' : 'Explore Musicians'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Mobile Hidden */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="fixed w-80">
              {/* Account Type Info */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Your Account</h3>
                {user?.accountType === 'musician' ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-primary-600">
                      <FaMusic />
                      <span className="font-medium">Musician Account</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Share your music, connect with fans, and grow your audience.
                    </p>
                    {user.genres && user.genres.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.genres.map((genre, i) => (
                          <span key={i} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-secondary-600">
                      <FaUserCircle />
                      <span className="font-medium">Fan Account</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Discover new music, follow artists, and engage with the music community.
                    </p>
                  </div>
                )}
              </div>

              {/* Trending Hashtags */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Trending</h3>
                <div className="space-y-3">
                  {['#NewMusic', '#IndieRock', '#LivePerformance', '#StudioSession', '#MusicMonday'].map((tag, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{tag}</p>
                        <p className="text-xs text-gray-500">{Math.floor(Math.random() * 1000)}K posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => router.push('/create-post')}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  )
}
