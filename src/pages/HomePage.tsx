import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        International Cargo Shipping 🌍
      </h1>
      <p className="mb-8">
        Fast. Reliable. Trackable. Manage your shipments easily.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register/user"
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
