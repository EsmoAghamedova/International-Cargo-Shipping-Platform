// src/api/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUsersStore } from '../store/useClientStore';
import type { User } from '../types';

const USERS_KEY = ['users'];

export function useUsers() {
  const queryClient = useQueryClient();
  const { users, addUser } = useUsersStore();

  // Query: იღებს Zustand state-ს (mock + localStorage)
  const usersQuery = useQuery<User[]>({
    queryKey: USERS_KEY,
    queryFn: async () => {
      // latency simulation
      await new Promise((res) => setTimeout(res, 500));
      return users;
    },
    initialData: users, // Zustand-ის data ვაძლევთ სტარტზე
  });

  // Mutation: ახალი User-ის დამატება
  const addUserMutation = useMutation({
    mutationFn: async (newUser: User) => {
      await new Promise((res) => setTimeout(res, 500));
      addUser(newUser);
      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    addUser: addUserMutation.mutate,
    addUserAsync: addUserMutation.mutateAsync,
    isAdding: addUserMutation.isPending,
  };
}
