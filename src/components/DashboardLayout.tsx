import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRequestsStore } from '../store/useRequestsStore';

export function DashboardLayout({
  role,
  children,
}: {
  role: 'USER' | 'COMPANY_ADMIN';
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [sidebarOpen]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setSidebarOpen(false);
  }

  const { loadRequests } = useRequestsStore();
  useEffect(() => {
    loadRequests();
  }, []);

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded transition font-medium
    ${
      location.pathname === path
        ? 'bg-blue-500 text-white'
        : 'text-gray-800 hover:bg-gray-100 hover:text-blue-600'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col md:flex-row">
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 md:hidden"
          onClick={handleOverlayClick}
        >
          <div
            ref={sidebarRef}
            className="absolute top-0 left-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col pt-8 pb-4 px-6 transition-transform duration-300 z-40"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                Cargo Platform
              </span>
              <button
                className="text-gray-400 hover:text-blue-600 rounded bg-blue-50 p-2 transition"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {role === 'USER' ? (
                <>
                  <Link
                    to="/client/dashboard"
                    className={linkClasses('/client/dashboard')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/client/create-request"
                    className={linkClasses('/client/create-request')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Create Request
                  </Link>
                  <Link
                    to="/client/track"
                    className={linkClasses('/client/track')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Track Parcel
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/company/dashboard"
                    className={linkClasses('/company/dashboard')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/company/requests"
                    className={linkClasses('/company/requests')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    All Requests
                  </Link>
                  <Link
                    to="/company/pricing"
                    className={linkClasses('/company/pricing')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/company/settings"
                    className={linkClasses('/company/settings')}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Settings
                  </Link>
                </>
              )}
            </div>
            <Link
              to="/login"
              className="mt-auto block px-4 py-2 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition"
              onClick={() => setSidebarOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <nav
        className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-100 pt-8 pb-4 px-6 fixed left-0 top-0 z-20"
        aria-label="Sidebar"
      >
        <span className="text-2xl font-bold text-blue-600 mb-10">
          Cargo Platform
        </span>
        <div className="flex flex-col gap-2 flex-1">
          {role === 'USER' ? (
            <>
              <Link
                to="/client/dashboard"
                className={linkClasses('/client/dashboard')}
              >
                Dashboard
              </Link>
              <Link
                to="/client/create-request"
                className={linkClasses('/client/create-request')}
              >
                Create Request
              </Link>
              <Link to="/client/track" className={linkClasses('/client/track')}>
                Track Parcel
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/company/dashboard"
                className={linkClasses('/company/dashboard')}
              >
                Dashboard
              </Link>
              <Link
                to="/company/requests"
                className={linkClasses('/company/requests')}
              >
                All Requests
              </Link>
              <Link
                to="/company/pricing"
                className={linkClasses('/company/pricing')}
              >
                Pricing
              </Link>
              <Link
                to="/company/settings"
                className={linkClasses('/company/settings')}
              >
                Settings
              </Link>
            </>
          )}
        </div>
        <Link
          to="/"
          className="mt-auto block px-4 py-2 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition"
        >
          Logout
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Topbar for mobile */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-10">
          <span className="font-bold text-lg text-blue-600">
            Cargo Platform
          </span>
          <button
            className="text-gray-400 hover:text-blue-600 rounded bg-blue-50 p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={28} />
          </button>
        </header>
        <main className="flex-1 p-2 sm:p-4 md:p-8 w-full bg-gradient-to-b from-white via-gray-50 to-gray-100">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
