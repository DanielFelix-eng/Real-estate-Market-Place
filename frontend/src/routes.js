import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Categories from './pages/Categories';
import InteractiveMap from './pages/InteractiveMap';
import Testimonials from './pages/Testimonials';
import Profile from './pages/Profile';
import MyListings from './pages/MyListings';
import Bookings from './pages/Bookings';
import Wishlist from './pages/Wishlist';
import Settings from './pages/Settings';
import BecomeHost from './pages/BecomeHost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/host" element={<BecomeHost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;