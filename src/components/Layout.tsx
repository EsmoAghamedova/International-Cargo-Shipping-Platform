import { Link } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="font-bold">Cargo Shipping</h1>
        <nav className="flex gap-4">
          <Link to="/client/dashboard">Client</Link>
          <Link to="/company/dashboard">Company</Link>
          <Link to="/login">Logout</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}