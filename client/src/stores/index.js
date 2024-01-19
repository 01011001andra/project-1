// state.js
import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      loginResponse: null,
      setLoginResponse: (response) => set({ loginResponse: response }),
      setLogout: () => set({ loginResponse: null }),
    }),
    {
      name: "user", // Nama key untuk penyimpanan persist
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const usePagination = create((set) => ({
  currentPage: 1,
  searchTerm: "",
  // Function to increment the current page
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  // Function to decrement the current page
  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  // Function to reset the current page to 1
  resetPage: () => set({ currentPage: 1 }),
  // Function to set the search term
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  // Function to reset the search term
  resetSearchTerm: () => set({ searchTerm: "" }),
}));
