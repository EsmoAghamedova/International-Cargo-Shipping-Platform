// src/api/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/AuthService';
import { useAuthStore } from '../store/useAuthStore';
import type { User, Company } from '../types';

type AuthEntity = User | Company;

export function useAuth() {
  const queryClient = useQueryClient();
  const { setCurrent, logout } = useAuthStore();

  // login mutation
  const loginMutation = useMutation({
    mutationFn: async (email: string) => {
      const entity = await AuthService.login(email); // mocked service
      if (!entity) throw new Error('Invalid credentials');
      return entity;
    },
    onSuccess: (entity: AuthEntity) => {
      setCurrent(entity);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  // logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await AuthService.logout();
    },
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
