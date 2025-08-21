import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Company } from "../types";
import { AuthService } from "../services/AuthService";

type AuthEntity = User | Company;

interface AuthState {
    currentUser: AuthEntity | null;
    login: (email: string) => AuthEntity | null;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            currentUser: AuthService.getCurrent(),
            login: (email: string) => {
                const entity = AuthService.login(email);
                return entity;
            },
            logout: () => {
                AuthService.logout();
                set({ currentUser: null });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);