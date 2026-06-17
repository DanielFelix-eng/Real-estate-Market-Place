import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
      <div className="relative w-full max-w-md max-h-screen">
        {/* Mobile menu background */ }
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>

        <div className="relative py-4 w-full">
          <div className="max-w-md mx-auto">
            <div className="space-y-6 px-4 pb-6">
              {/* Menu items */ }
              <Link to="/" className="block py-2 pl-3 pr-4 md:py-3 md:pl-0 md:text-left text-base font-medium text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-primary md:px-2 md:py-1">
                Home
              </Link>
              <Link to="/properties" className="block py-2 pl-3 pr-4 md:py-3 md:pl-0 md:text-left text-base font-medium text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-primary md:px-2 md:py-1">
                Properties
              </Link>
              <Link to="/categories" className="block py-2 pl-3 pr-4 md:py-3 md:pl-0 md:text-left text-base font-medium text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-primary md:px-2 md:py-1">
                Categories
              </Link>
              <Link to="/map" className="block py-2 pl-3 pr-4 md:py-3 md:pl-0 md:text-left text-base font-medium text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-primary md:px-2 md:py-1">
                Interactive Map
              </Link>
              <Link to="/testimonials" className="block py-2 pl-3 pr-4 md:py-3 md:pl-0 md:text-left text-base font-medium text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-primary md:px-2 md:py-1">
                Testimonials
              </Link>

              {/* Divider */ }
              <div className="border-t border-gray-700"></div>

              {/* Auth section */ }
              <div className="space-y-2 py-4">
                <Link to="/host" className="w-full flex items-center px-3 py-2 text-sm font-medium text-primary bg-white rounded-md">
                  Become a Host
                </Link>
                <Link to="/login" className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md">
                  Login
                </Link>
                <Link to="/signup" className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}