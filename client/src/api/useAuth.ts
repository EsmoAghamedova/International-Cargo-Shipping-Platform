import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/AuthService';
import { useAuthStore } from '../store/useAuthStore';
import type { User, Company } from '../types';

type AuthEntity = User | Company;

export function useAuth() {
  const queryClient = useQueryClient();
  const { setCurrent, logout: clearStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (email: string) => AuthService.login(email),
    onSuccess: (entity: AuthEntity) => {
      setCurrent(entity);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      clearStore();
      queryClient.removeQueries({ queryKey: ['auth'] });
      queryClient.removeQueries({ queryKey: ['requests'] });
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
