import { create } from 'zustand';
import type { User } from '../types';
import { mockUsers } from '../mock/user.mock-data'; // mock მონაცემები
interface UsersState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
}

const LOCAL_STORAGE_KEY = 'users';

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  setUsers: (users) => {
    set({ users });
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        users.filter((u) => !mockUsers.find((m) => m.id === u.id)),
      ),
    );
  },
  addUser: (user) => {
    const users = [...get().users, user];
    set({ users });
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        users.filter((u) => !mockUsers.find((m) => m.id === u.id)),
      ),
    );
  },
}));

// Init: mockUsers + localStorage
const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
if (saved) {
  const parsed = JSON.parse(saved) as User[];
  useUsersStore.getState().setUsers([...mockUsers, ...parsed]);
} else {
  useUsersStore.getState().setUsers(mockUsers);
}
