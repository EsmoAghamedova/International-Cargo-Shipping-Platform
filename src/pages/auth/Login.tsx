import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  // Access login function from global auth store
  const login = useAuthStore((s) => s.login);

  // React Router hook for navigation after login
  const navigate = useNavigate();

  // Handle login form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page reload
    const form = e.currentTarget;

    // Get the email value from the form
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    // Call store login function to check if user/company exists
    const entity = login(email);

    // If no user found, show error
    if (!entity) {
      alert('Email not found 🤧');
      return;
    }

    // Redirect user to correct dashboard based on their role
    if (entity.role === 'USER') navigate('/client/dashboard');
    if (entity.role === 'COMPANY_ADMIN') navigate('/company/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section with Home link */}
      <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          Home
        </Link>
      </header>

      {/* Main section with centered login form */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Login form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-6 bg-white rounded-xl shadow border border-gray-200"
          >
            <h2 className="text-xl font-bold text-blue-600 text-center">
              Login
            </h2>

            {/* Email input field */}
            <input
              name="email"
              placeholder="Enter email"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit button */}
            <Button type="submit" variant="primary">
              Login
            </Button>
          </form>

          {/* Link to register if no account */}
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
