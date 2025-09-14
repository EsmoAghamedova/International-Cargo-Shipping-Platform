import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthEntity } from '../types';
import { AuthService } from '../services/AuthService';

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
        const entity = AuthService.login(email); // Mock DB check
        if (entity) {
          set({ currentUser: entity }); // persist-ში ჩაიწერება
        }
        return entity;
      },

      logout: () => {
        AuthService.logout();
        set({ currentUser: null });
      },

      setCurrent: (entity) => set({ currentUser: entity }),
    }),
    {
      name: 'auth-storage', // key localStorage-ში
    },
  ),
);
