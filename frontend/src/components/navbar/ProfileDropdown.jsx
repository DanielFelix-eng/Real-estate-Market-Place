import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed right-4 top-20 z-50 w-64 rounded-[28px] border border-slate-800 bg-slate-950/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-sm">
      <div className="space-y-1">
        <Link
          to="/profile"
          onClick={handleClose}
          className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
        >
          Profile
        </Link>
        <Link
          to="/my-listings"
          onClick={handleClose}
          className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
        >
          My Listings
        </Link>
        <Link
          to="/bookings"
          onClick={handleClose}
          className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
        >
          Bookings
        </Link>
        <Link
          to="/wishlist"
          onClick={handleClose}
          className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
        >
          Wishlist
        </Link>
        <Link
          to="/settings"
          onClick={handleClose}
          className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
        >
          Settings
        </Link>
        <button
          type="button"
          onClick={() => {
            handleClose();
            onClickLogout();
          }}
          className="block w-full rounded-3xl px-4 py-3 text-left text-sm font-medium text-rose-300 transition hover:bg-slate-900"
        >
          Logout
        </button>
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