import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Company } from '../types';
type AuthEntity = User | Company;

interface AuthState {
  currentUser: AuthEntity | null;
  logout: () => void;
  setCurrent: (entity: AuthEntity | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      logout: () => {
        set({ currentUser: null });
      },

      setCurrent: (entity) => set({ currentUser: entity }),
    }),
    { name: 'auth-storage' },
  ),
);
