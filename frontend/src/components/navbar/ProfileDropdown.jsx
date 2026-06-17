import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
      <div className="py-2">
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Profile
        </Link>
        <Link to="/my-listings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          My Listings
        </Link>
        <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Bookings
        </Link>
        <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Wishlist
        </Link>
        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Settings
        </Link>
        <Link to="/logout" onClick={onClickLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Logout
        </Link>
      </div>
    </div>
  );
}

// Simple logout handler (to be replaced with actual auth logic)
function onClickLogout(e) {
  e.preventDefault();
  // Implement logout logic (e.g., clear token, redirect)
  window.location.href = '/login';
}