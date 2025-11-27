'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { FaMusic, FaHome, FaCompass, FaHeart, FaPlusSquare, FaUserCircle, FaBars } from 'react-icons/fa'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const NavLink = ({ href, icon: Icon, label, active }: any) => (
    <Link href={href}>
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          active
            ? 'font-bold'
            : 'font-normal hover:bg-gray-100'
        }`}
      >
        <Icon className={`text-2xl ${active ? 'fill-current' : ''}`} />
        <span className="hidden xl:block">{label}</span>
      </div>
    </Link>
  )

  if (!isAuthenticated) {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <FaMusic className="text-2xl text-primary-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              STAGEDOOR
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <button className="px-4 py-2 text-gray-700 font-semibold hover:text-primary-600">
                Log in
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-primary">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Desktop Sidebar - Instagram Style */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-20 xl:w-64 bg-white border-r border-gray-200 flex-col justify-between p-4 z-50">
        <div className="space-y-2">
          {/* Logo */}
          <Link href="/feed">
            <div className="px-4 py-6 mb-4">
              <div className="xl:block hidden">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  STAGEDOOR
                </span>
              </div>
              <div className="xl:hidden block">
                <FaMusic className="text-3xl text-primary-600" />
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <NavLink href="/feed" icon={FaHome} label="Home" active={pathname === '/feed'} />
          <NavLink href="/explore" icon={FaCompass} label="Explore" active={pathname === '/explore'} />
          
          {/* Create Button */}
          {user?.accountType === 'musician' && (
            <button
              onClick={() => router.push('/create-post')}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full"
            >
              <FaPlusSquare className="text-2xl" />
              <span className="hidden xl:block">Create</span>
            </button>
          )}
          
          <NavLink href="/notifications" icon={FaHeart} label="Notifications" active={pathname === '/notifications'} />
          <NavLink href={`/profile/${user?.username}`} icon={FaUserCircle} label="Profile" active={pathname === `/profile/${user?.username}`} />

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full"
            >
              <FaBars className="text-2xl" />
              <span className="hidden xl:block">More</span>
            </button>
            
            {showMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{user?.displayName}</p>
                  <p className="text-sm text-gray-500">@{user?.username}</p>
                  <p className="text-xs text-primary-600 mt-1">
                    {user?.accountType === 'musician' ? '🎸 Musician Account' : '🎧 Fan Account'}
                  </p>
                </div>
                <button
                  onClick={() => router.push('/settings')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Profile at Bottom */}
        <Link href={`/profile/${user?.username}`}>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <FaMusic className="text-white" />
              </div>
            )}
            <div className="hidden xl:block flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{user?.displayName}</p>
              <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
            </div>
          </div>
        </Link>
      </nav>

      {/* Mobile Bottom Nav - Instagram Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <Link href="/feed">
            <div className="p-2">
              <FaHome className={`text-2xl ${pathname === '/feed' ? 'text-gray-900' : 'text-gray-400'}`} />
            </div>
          </Link>
          <Link href="/explore">
            <div className="p-2">
              <FaCompass className={`text-2xl ${pathname === '/explore' ? 'text-gray-900' : 'text-gray-400'}`} />
            </div>
          </Link>
          {user?.accountType === 'musician' && (
            <button onClick={() => router.push('/create-post')} className="p-2">
              <FaPlusSquare className="text-2xl text-gray-900" />
            </button>
          )}
          <Link href="/notifications">
            <div className="p-2">
              <FaHeart className={`text-2xl ${pathname === '/notifications' ? 'text-gray-900' : 'text-gray-400'}`} />
            </div>
          </Link>
          <Link href={`/profile/${user?.username}`}>
            <div className="p-2">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.displayName}
                  className={`w-7 h-7 rounded-full ${pathname === `/profile/${user?.username}` ? 'ring-2 ring-gray-900' : ''}`}
                />
              ) : (
                <FaUserCircle className={`text-2xl ${pathname === `/profile/${user?.username}` ? 'text-gray-900' : 'text-gray-400'}`} />
              )}
            </div>
          </Link>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            STAGEDOOR
          </span>
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <FaHeart className="text-xl text-gray-900" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
