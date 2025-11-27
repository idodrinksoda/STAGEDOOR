'use client'

import { User } from '@/types'
import { FaMusic, FaGuitar } from 'react-icons/fa'
import Link from 'next/link'

interface ProfileHeaderProps {
  user: User
  isOwnProfile: boolean
  isFollowing: boolean
  onFollow?: () => void
  onUnfollow?: () => void
}

export default function ProfileHeader({
  user,
  isOwnProfile,
  isFollowing,
  onFollow,
  onUnfollow
}: ProfileHeaderProps) {
  return (
    <div className="card mb-6">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-t-lg -m-6 mb-0">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover rounded-t-lg"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="relative pt-16 px-6 pb-6">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-6">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.displayName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
              <FaMusic className="text-4xl text-gray-600" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4">
          {isOwnProfile ? (
            <Link href="/settings" className="btn-secondary">
              Edit Profile
            </Link>
          ) : (
            <button
              onClick={isFollowing ? onUnfollow : onFollow}
              className={isFollowing ? 'btn-secondary' : 'btn-primary'}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        {/* User Info */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{user.displayName}</h1>
            {user.verified && <span className="text-blue-500 text-2xl">✓</span>}
            {user.accountType === 'musician' && (
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                <FaGuitar className="inline mr-1" /> Musician
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-4">@{user.username}</p>

          {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}

          {/* Musician Info */}
          {user.accountType === 'musician' && (
            <div className="flex flex-wrap gap-4 mb-4">
              {user.genres && user.genres.length > 0 && (
                <div>
                  <span className="text-sm text-gray-500">Genres: </span>
                  {user.genres.map((genre, i) => (
                    <span
                      key={i}
                      className="inline-block text-sm bg-secondary-100 text-secondary-700 px-2 py-1 rounded mr-2"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              {user.instruments && user.instruments.length > 0 && (
                <div>
                  <span className="text-sm text-gray-500">Instruments: </span>
                  {user.instruments.map((instrument, i) => (
                    <span
                      key={i}
                      className="inline-block text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded mr-2"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex space-x-6 text-sm">
            <div>
              <span className="font-bold text-gray-900">{user.postsCount}</span>
              <span className="text-gray-600"> posts</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">{user.followers.length}</span>
              <span className="text-gray-600"> followers</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">{user.following.length}</span>
              <span className="text-gray-600"> following</span>
            </div>
          </div>

          {/* Links */}
          {user.accountType === 'musician' && (
            <div className="flex space-x-4 mt-4">
              {user.spotifyLink && (
                <a
                  href={user.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  Spotify
                </a>
              )}
              {user.appleMusicLink && (
                <a
                  href={user.appleMusicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  Apple Music
                </a>
              )}
              {user.websiteLink && (
                <a
                  href={user.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
