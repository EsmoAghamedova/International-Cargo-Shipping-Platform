import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormEvent } from 'react';

export function RegisterUserPage() {
  const setCurrent = useAuthStore((s) => s.setCurrent);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Query mutation for registering a user
  const registerUserMutation = useMutation({
    mutationFn: (payload: { fullName: string; email: string }) =>
      AuthService.registerUser({ ...payload, addresses: [] }),
    onSuccess: (user) => {
      setCurrent(user);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/client/dashboard');
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    registerUserMutation.mutate({ fullName, email });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          Home
        </Link>
      </header>

      {/* Registration form */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-6 bg-white rounded-xl shadow border border-gray-200"
          >
            <h2 className="text-xl font-bold text-blue-600 text-center">
              Register User
            </h2>

            <input
              name="fullName"
              placeholder="Full Name"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              name="email"
              placeholder="Email"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={registerUserMutation.isPending}
              className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition disabled:opacity-50"
            >
              {registerUserMutation.isPending ? 'Registering...' : 'Register'}
            </button>

            {registerUserMutation.isError && (
              <p className="text-sm text-red-500 text-center">
                {(registerUserMutation.error as Error).message}
              </p>
            )}
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              Do you have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
