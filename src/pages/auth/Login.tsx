import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function LoginPage() {
  const loginStore = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: async (email: string) => {
      // simulate network latency
      await new Promise((res) => setTimeout(res, 500));

      const entity = loginStore.login(email); // Zustand login
      if (!entity) throw new Error('Email not found 🤧');
      return entity;
    },
    onSuccess: (entity) => {
      // Update any queries if needed
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      // Redirect based on role
      if (entity.role === 'USER') navigate('/client/dashboard');
      if (entity.role === 'COMPANY_ADMIN') navigate('/company/dashboard');
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    loginMutation.mutate(email);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          Home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-6 bg-white rounded-xl shadow border border-gray-200"
          >
            <h2 className="text-xl font-bold text-blue-600 text-center">
              Login
            </h2>

            <input
              name="email"
              placeholder="Enter email"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>

            {loginMutation.isError && (
              <p className="text-red-500 text-sm mt-1">
                {(loginMutation.error as Error).message}
              </p>
            )}
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              Do you not have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
