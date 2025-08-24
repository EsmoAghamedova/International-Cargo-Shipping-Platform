import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Company } from "../types";
import { AuthService } from "../services/AuthService";

type AuthEntity = User | Company;

interface AuthState {
  currentUser: AuthEntity | null;
  login: (email: string) => AuthEntity | null;
  logout: () => void;
  setCurrent: (entity: AuthEntity | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,

      login: (email: string) => {
        const entity = AuthService.login(email);
        set({ currentUser: entity });
        return entity;
      },

      logout: () => {
        AuthService.logout();
        set({ currentUser: null });
      },

      setCurrent: (entity) => set({ currentUser: entity }), // 👈 აქ დაამატე
    }),
    {
      name: "auth-storage",
    },
  ),
);
