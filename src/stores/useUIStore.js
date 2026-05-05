import { create } from "zustand";

const useUIStore = create((set) => ({
  theme: "dark",
  sidebarOpen: false,
  searchQuery: "",

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useUIStore;
