import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  

   const  [searchTerm , setSearchTerm] =  useState('') 
const navigate = useNavigate()
 
      const handleSubmit  = async(e) =>{
       e.preventDefault() 
       const urlParams =  new  URLSearchParams(window.location.search)
        urlParams.set('searchTerm' ,searchTerm) 
         
        const searchQuery =  urlParams.toString()
         navigate(`/search`)
             
     }
      useEffect(()=> {
         const urlParams = new URLSearchParams(location.search)
          const searchTermFromUrl  = urlParams.get('searchTerm')
           if(searchTermFromUrl) {
             setSearchTerm(searchTermFromUrl)
           }
          
      }, [location.search])

  const handleNavToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    scrollToSection(sectionId)
  }

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 shadow-sm shadow-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-white transition hover:opacity-90">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-emerald-500 text-white shadow-lg shadow-primary/20">
              <svg
                className="h-5 w-5"
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
            </div>
            <div>
              <p className="text-lg font-semibold text-white">jardiniHomes</p>
              <p className="text-sm text-slate-400">Your property dashboard</p>
            </div>
          </Link>

          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-4">
          <Link to={'/profile'}> 
            <button
              type="button"
              onClick={() => handleNavToSection('/profile')}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              Profile
            </button>
          </Link>
            
            <button
              type="button"
              onClick={() => handleNavToSection('about')}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              About
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <svg
                  className="h-5 w-5"
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
               <form onSubmit={handleSubmit}> 
                 <button>
                                        <input
                type="text"
                placeholder="Search properties"
                className="w-72 rounded-full border border-slate-800 bg-slate-900/90 py-2.5 pl-11 pr-4 text-sm text-slate-200 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchterm  (e.target.value)}
               />
                 </button>

               </form>
          
            </div>
            <button
              onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/95 px-3 py-2 text-slate-100 transition hover:bg-slate-800"
              aria-label="Open user menu"
            >
              <img
                className="h-9 w-9 rounded-full object-cover"
                src={user?.profilePicture || 'https://via.placeholder.com/40'}
                alt="User avatar"
              />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-white">{user?.name || 'Guest'}</p>
                <p className="text-xs text-slate-400">{user?.email || 'guest@example.com'}</p>
              </div>
              <svg
                className="h-4 w-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/95 text-slate-300 transition hover:bg-slate-800 md:hidden"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5"
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
      </nav>

      {isMobileMenuOpen && (
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
 