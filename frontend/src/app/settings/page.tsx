'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useAuthStore } from '@/store/authStore'
import { userAPI } from '@/lib/api'
import toast from 'react-hot-toast'
import { FaMusic, FaCamera, FaUser, FaGuitar, FaSave } from 'react-icons/fa'

export default function SettingsPage() {
  const router = useRouter()
  const { isAuthenticated, user, setUser } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    genres: '',
    instruments: '',
    websiteLink: '',
    spotifyLink: '',
    appleMusicLink: ''
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Pre-fill form with current user data
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        bio: user.bio || '',
        genres: user.genres?.join(', ') || '',
        instruments: user.instruments?.join(', ') || '',
        websiteLink: user.websiteLink || '',
        spotifyLink: user.spotifyLink || '',
        appleMusicLink: user.appleMusicLink || ''
      })
    }
  }, [isAuthenticated, user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updateData: any = {
        displayName: formData.displayName,
        bio: formData.bio
      }

      // Only include musician-specific fields if user is a musician
      if (user?.accountType === 'musician') {
        if (formData.genres) {
          updateData.genres = formData.genres.split(',').map(g => g.trim()).filter(g => g)
        }
        if (formData.instruments) {
          updateData.instruments = formData.instruments.split(',').map(i => i.trim()).filter(i => i)
        }
        updateData.websiteLink = formData.websiteLink
        updateData.spotifyLink = formData.spotifyLink
        updateData.appleMusicLink = formData.appleMusicLink
      }

      const response = await userAPI.updateProfile(updateData)
      setUser(response.data.data.user)
      toast.success('Profile updated successfully!')
      router.push(`/profile/${user?.username}`)
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Container with sidebar offset */}
      <div className="md:pl-20 xl:pl-64">
        <div className="max-w-3xl mx-auto px-4 pt-20 md:pt-8 pb-24 md:pb-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
            <p className="text-gray-600">Update your profile information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex items-center space-x-6">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <FaMusic className="text-white text-3xl" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{user?.displayName}</h3>
                <p className="text-sm text-gray-500 mb-3">@{user?.username}</p>
                <button className="btn-outline flex items-center space-x-2">
                  <FaCamera />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Account Type Badge */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
            <div className="flex items-center space-x-3">
              {user?.accountType === 'musician' ? (
                <>
                  <FaGuitar className="text-primary-600 text-2xl" />
                  <div>
                    <p className="font-semibold text-gray-900">Musician Account</p>
                    <p className="text-sm text-gray-500">Share your music with the world</p>
                  </div>
                </>
              ) : (
                <>
                  <FaUser className="text-secondary-600 text-2xl" />
                  <div>
                    <p className="font-semibold text-gray-900">Fan Account</p>
                    <p className="text-sm text-gray-500">Discover and support musicians</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            {/* Basic Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Musician-Specific Fields */}
            {user?.accountType === 'musician' && (
              <>
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    <FaGuitar className="inline mr-2 text-primary-600" />
                    Musician Information
                  </h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Genres
                    </label>
                    <input
                      type="text"
                      name="genres"
                      value={formData.genres}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Rock, Jazz, Hip-Hop (comma-separated)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple genres with commas</p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instruments
                    </label>
                    <input
                      type="text"
                      name="instruments"
                      value={formData.instruments}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Guitar, Piano, Vocals (comma-separated)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple instruments with commas</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="websiteLink"
                      value={formData.websiteLink}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spotify
                    </label>
                    <input
                      type="url"
                      name="spotifyLink"
                      value={formData.spotifyLink}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://open.spotify.com/artist/..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apple Music
                    </label>
                    <input
                      type="url"
                      name="appleMusicLink"
                      value={formData.appleMusicLink}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://music.apple.com/artist/..."
                    />
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                <FaSave />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all of your content.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
