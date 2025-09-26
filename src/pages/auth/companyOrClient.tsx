import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function CompanyOrClientPage() {
  // --- State for storing which option the user picks (Client or Company) ---
  const [selection, setSelection] = useState<'USER' | 'COMPANY_ADMIN' | null>(
    null,
  );

  const navigate = useNavigate();

  // --- Watch for changes in selection and redirect accordingly ---
  useEffect(() => {
    if (selection === 'USER') {
      navigate('/register/user'); // If client selected → go to user registration
    } else if (selection === 'COMPANY_ADMIN') {
      navigate('/register/company'); // If company selected → go to company registration
    }
  }, [selection, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* --- Page Header with Home button --- */}
      <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          Home
        </Link>
      </header>

      {/* --- Main content (centered on the page) --- */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
            Register as:
          </h1>

          {/* --- Two choices: Client or Company --- */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Client button */}
            <button
              onClick={() => setSelection('USER')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 w-full sm:w-auto
      ${
        selection === 'USER'
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
            >
              Client
            </button>

            {/* Company button */}
            <button
              onClick={() => setSelection('COMPANY_ADMIN')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 w-full sm:w-auto
      ${
        selection === 'COMPANY_ADMIN'
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
            >
              Company
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
