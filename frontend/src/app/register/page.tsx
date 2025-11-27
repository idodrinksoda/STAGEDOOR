'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authAPI } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { FaMusic, FaGuitar, FaUserCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountTypeParam = searchParams.get('type')
  
  const { setUser, setToken } = useAuthStore()
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    displayName: '',
    accountType: accountTypeParam || 'fan',
    bio: '',
    genres: '',
    instruments: ''
  })
  
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Convert comma-separated strings to arrays
      const payload = {
        ...formData,
        genres: formData.genres ? formData.genres.split(',').map(g => g.trim()) : [],
        instruments: formData.instruments ? formData.instruments.split(',').map(i => i.trim()) : []
      }

      const response = await authAPI.register(payload)
      
      if (response.data.success) {
        setToken(response.data.data.token)
        setUser(response.data.data.user)
        toast.success('Account created successfully!')
        router.push('/feed')
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <FaMusic className="text-primary-600 text-3xl" />
            <span className="text-3xl font-bold text-gray-900">STAGEDOOR</span>
          </Link>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'musician' })}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.accountType === 'musician'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaGuitar className="mx-auto text-2xl mb-2 text-primary-600" />
                  <div className="font-semibold">Musician</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'fan' })}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.accountType === 'fan'
                      ? 'border-secondary-600 bg-secondary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaUserCircle className="mx-auto text-2xl mb-2 text-secondary-600" />
                  <div className="font-semibold">Fan</div>
                </button>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="johndoe"
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-field"
                placeholder="Min 6 characters"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio (Optional)
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Musician-specific fields */}
            {formData.accountType === 'musician' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genres (comma separated)
                  </label>
                  <input
                    type="text"
                    name="genres"
                    value={formData.genres}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Rock, Jazz, Pop"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instruments (comma separated)
                  </label>
                  <input
                    type="text"
                    name="instruments"
                    value={formData.instruments}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Guitar, Piano, Vocals"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
