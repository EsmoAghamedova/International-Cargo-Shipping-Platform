import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Header */}
      <header className="w-full px-4 py-4 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
          <span className="hidden sm:block text-2xl font-bold text-blue-700 whitespace-nowrap">
            Cargo Platform
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium shadow hover:bg-green-700 transition text-sm sm:text-base"
          >
            Register
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-40 pb-40">
        <h1 className="text-4xl leading-14 sm:leading-18 sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          International Cargo Shipping
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mb-8">
          Fast. Reliable. Trackable. Manage your shipments across the globe with
          one platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            to="/login"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition w-full sm:w-auto"
          >
            Register
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-gray-500 text-sm">
              Deliveries optimized for speed and efficiency worldwide.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-bold text-lg mb-2">Global Coverage</h3>
            <p className="text-gray-500 text-sm">
              From local to international routes, we’ve got you covered.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-bold text-lg mb-2">Live Tracking</h3>
            <p className="text-gray-500 text-sm">
              Real-time tracking to stay updated on your shipments.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        © 2025 Cargo Platform. All rights reserved.
      </footer>
    </div>
  );
}
