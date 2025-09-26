import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import type { User } from '../../types';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../../services/AuthService';

export function RegisterUserPage() {
  // Access store function to set current user
  const setCurrent = useAuthStore((s) => s.setCurrent);
  // Router navigation
  const navigate = useNavigate();

  // Handle form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop page refresh
    const form = e.currentTarget;

    // Get form input values
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    // Create new User object
    const newUser: User = {
      id: uuid(), // generate unique ID
      fullName,
      email,
      addresses: [], // starts with no saved addresses
      role: 'USER', // role = client
    };

    // Save to "backend service" (mocked AuthService)
    AuthService.registerUser(newUser);

    // Save to local store (so user stays logged in)
    setCurrent(newUser);

    // Redirect user to their dashboard
    navigate('/client/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with home link */}
      <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          Home
        </Link>
      </header>

      {/* Centered registration form */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-6 bg-white rounded-xl shadow border border-gray-200"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-blue-600 text-center">
              Register User
            </h2>

            {/* Full name input */}
            <input
              name="fullName"
              placeholder="Full Name"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Email input */}
            <input
              name="email"
              placeholder="Email"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Submit button */}
            <button
              type="submit"
              className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition"
            >
              Register
            </button>
          </form>

          {/* Already have account link */}
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
