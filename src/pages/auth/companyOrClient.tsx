import { useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';

export function CompanyOrClientPage() {
  const [selection, setSelection] = useState<'USER' | 'COMPANY_ADMIN' | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (selection === 'USER') {
      navigate('/register/user');
    } else if (selection === 'COMPANY_ADMIN') {
      navigate('/register/company');
    }
  }, [selection, navigate]);

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

      {/* Main content (centered) */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
            Register as:
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant={selection === 'USER' ? 'primary' : 'secondary'}
              onClick={() => setSelection('USER')}
              className="w-full sm:w-auto"
            >
              Client
            </Button>
            <Button
              variant={selection === 'COMPANY_ADMIN' ? 'primary' : 'secondary'}
              onClick={() => setSelection('COMPANY_ADMIN')}
              className="w-full sm:w-auto"
            >
              Company
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
