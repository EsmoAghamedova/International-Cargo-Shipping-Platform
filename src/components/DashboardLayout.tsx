import { Link } from 'react-router-dom';

export function DashboardLayout({
  role,
  children,
}: {
  role: 'USER' | 'COMPANY_ADMIN';
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold mb-4">Cargo Platform</h2>
        {role === 'USER' ? (
          <>
            <Link to="/client/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
            <Link to="/client/create-request" className="hover:text-green-400">
              Create Request
            </Link>
            <Link to="/client/requests" className="hover:text-green-400">
              My Requests
            </Link>
            <Link to="/client/track" className="hover:text-green-400">
              Track Parcel
            </Link>
          </>
        ) : (
          <>
            <Link to="/company/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
            <Link to="/company/requests" className="hover:text-green-400">
              All Requests
            </Link>
            <Link to="/company/pricing" className="hover:text-green-400">
              Pricing
            </Link>
            <Link to="/company/settings" className="hover:text-green-400">
              Settings
            </Link>
          </>
        )}
        <Link to="/login" className="mt-auto text-red-400 hover:text-red-300">
          Logout
        </Link>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
