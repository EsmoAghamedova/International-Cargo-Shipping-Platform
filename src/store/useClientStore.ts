import { create } from "zustand";

export type User = {
    id: string;
    fullName: string;
    // Add other fields as needed
};

interface UsersState {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    // More actions as needed
}

const LOCAL_STORAGE_KEY = "users";

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    setUsers: (users) => {
        set({ users });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    },
    addUser: (user) => {
        const users = [...get().users, user];
        set({ users });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    },
}));

// Load from localStorage on init
const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
if (saved) {
    useUsersStore.getState().setUsers(JSON.parse(saved));
}