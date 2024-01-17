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
