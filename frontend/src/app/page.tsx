'use client'

import Link from 'next/link'
import { FaMusic, FaGuitar, FaUsers, FaFire } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaMusic className="text-primary-600 text-2xl" />
              <span className="text-2xl font-bold text-gray-900">STAGEDOOR</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="btn-secondary">
                Log In
              </Link>
              <Link href="/register" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Where Music <span className="text-primary-600">Meets</span>{' '}
            <span className="text-secondary-600">Community</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with musicians, discover new sounds, and share your music with fans who love what you create.
            STAGEDOOR is the social platform built exclusively for the music community.
          </p>
          
          <div className="flex justify-center space-x-4 mb-16">
            <Link href="/register?type=musician" className="btn-primary text-lg px-8 py-3">
              Join as Musician
            </Link>
            <Link href="/register?type=fan" className="btn-secondary text-lg px-8 py-3">
              Join as Fan
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <FaGuitar className="text-3xl text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Music</h3>
              <p className="text-gray-600">
                Upload tracks, videos, and behind-the-scenes content. Build your portfolio and showcase your talent.
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
                  <FaUsers className="text-3xl text-secondary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Following</h3>
              <p className="text-gray-600">
                Connect with fans and fellow musicians. Grow your audience and engage with your community.
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaFire className="text-3xl text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover New Talent</h3>
              <p className="text-gray-600">
                Explore emerging artists, trending tracks, and hidden gems across every genre imaginable.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 card max-w-3xl mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to join the community?</h2>
            <p className="text-lg mb-6 opacity-90">
              Whether you're a musician looking to share your art or a fan eager to discover new music,
              STAGEDOOR is your stage.
            </p>
            <Link href="/register" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started for Free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaMusic className="text-2xl" />
            <span className="text-2xl font-bold">STAGEDOOR</span>
          </div>
          <p className="text-gray-400">
            © 2025 STAGEDOOR. Where Music Meets Community.
          </p>
        </div>
      </footer>
    </div>
  )
}
