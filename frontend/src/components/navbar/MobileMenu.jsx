import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/95 sm:items-center sm:justify-center">
      <div className="relative w-full max-w-md max-h-screen overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/95 shadow-2xl shadow-black/40">
        <div className="absolute inset-0 bg-slate-950/95"></div>

        <div className="relative py-6 w-full">
          <div className="px-6">
            <div className="space-y-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">Menu</p>
                  <p className="text-sm text-slate-400">Explore the dashboard</p>
                </div>
                <button onClick={onClose} className="rounded-full bg-slate-900/90 px-3 py-2 text-slate-300 transition hover:bg-slate-800">
                  ✕
                </button>
              </div>

              <Link onClick={onClose} to="/" className="block rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-base font-medium text-slate-100 transition hover:bg-slate-800">
                Home
              </Link>
              <Link onClick={onClose} to="/profile" className="block rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-base font-medium text-slate-100 transition hover:bg-slate-800">
                Profile
              </Link>
              <Link onClick={onClose} to="/create-property" className="block rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-base font-medium text-slate-100 transition hover:bg-slate-800">
                Add property
              </Link>
              <Link onClick={onClose} to="/login" className="block rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-base font-medium text-slate-100 transition hover:bg-slate-800">
                Login
              </Link>
              <Link onClick={onClose} to="/signup" className="block rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-base font-medium text-slate-100 transition hover:bg-slate-800">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}