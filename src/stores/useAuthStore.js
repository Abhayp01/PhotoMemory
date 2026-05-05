import { create } from "zustand";
import { authAPI, userAPI } from "../api";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Check auth on app load
  checkAuth: async () => {
    try {
      const res = await userAPI.getMe();
      set({
        user: res.data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (credentials) => {
    const res = await authAPI.login(credentials);
    set({
      user: res.data.data.user,
      isAuthenticated: true,
    });
    return res.data;
  },

  register: async (data) => {
    const res = await authAPI.register(data);
    return res.data;
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch {
      // Proceed anyway
    }
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (data) => {
    const res = await userAPI.updateProfile(data);
    set({ user: res.data.data.user });
    return res.data;
  },
}));

export default useAuthStore;
