import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import MobileMenu from './MobileMenu'
import { useAuthStore } from '../../store/store'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuthStore()

  const handleNavToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    scrollToSection(sectionId)
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Link to="/" className="flex items-center space-x-2">
                  <svg
                    className="h-8 w-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 011-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1H3m-1 0h4a2 2 0 002-2v-6a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="font-bold text-xl">jardiniHomes</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center w-full md:w-1/2 px-4 sm:px-0">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for stays, experiences, and more"
                  className="block w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Search"
                >
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleNavToSection('profile')}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => handleNavToSection('about')}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                >
                  About
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Open user menu"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.profilePicture || 'https://via.placeholder.com/40'}
                    alt="User avatar"
                  />
                  <div className="space-y-1 hidden lg:block">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.name || 'Guest'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email || 'guest@example.com'}
                    </span>
                  </div>
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isProfileDropdownOpen && (
                  <ProfileDropdown isOpen={isProfileDropdownOpen} onClose={() => setIsProfileDropdownOpen(false)} />
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Open menu"
              >
                <svg
                  className="h-5 w-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
