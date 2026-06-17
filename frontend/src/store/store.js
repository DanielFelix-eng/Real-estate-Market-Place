import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error logging in",
        isLoading: false,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error logging out",
        isLoading: false,
      });
    }
  },

  verifyEmail: async (verificationcode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyEmail`, { code: verificationcode });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/verify-token`);
      set({ user: response?.data?.user, isAuthenticated: true, isCheckingAuth: false });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error checking auth",
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/updateProfile`, profileData);
      set({ user: response.data.user, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error updating profile',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteAccount: async (password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/deleteAccount`, {
        data: { password },
      });
      set({ user: null, isAuthenticated: false, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error deleting account',
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, { email });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error sending reset email",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resetPassword/${token}`, { password });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));