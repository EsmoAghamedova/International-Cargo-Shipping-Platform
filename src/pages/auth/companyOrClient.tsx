import { useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

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
  }, [selection, navigate]); // 👈 router წავშალე, navigate დავტოვე

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Register as:</h1>
      <div className="space-x-4">
        <Button
          variant={selection === 'USER' ? 'primary' : 'secondary'}
          onClick={() => setSelection('USER')}
        >
          Client
        </Button>
        <Button
          variant={selection === 'COMPANY_ADMIN' ? 'primary' : 'secondary'}
          onClick={() => setSelection('COMPANY_ADMIN')}
        >
          Company
        </Button>
      </div>
    </div>
  );
}
