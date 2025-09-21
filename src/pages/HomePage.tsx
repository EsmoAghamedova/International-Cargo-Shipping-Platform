import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        International Cargo Shipping 🌍
      </h1>
      <p className="mb-8">
        Fast. Reliable. Trackable. Manage your shipments easily.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition border border-blue-500"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition border border-green-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
