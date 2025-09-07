import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { Company } from '../../types';
import { v4 as uuid } from 'uuid';

export function RegisterCompanyPage() {
  const setCurrent = useAuthStore((s) => s.setCurrent);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    const newCompany: Company = {
      id: uuid(),
      name,
      email,
      role: 'COMPANY_ADMIN',
    };

    setCurrent(newCompany);
    navigate('/company/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-6 max-w-sm mx-auto"
    >
      <h2 className="text-xl font-bold">Register Company</h2>
      <input
        name="name"
        placeholder="Company Name"
        className="border p-2 rounded"
      />
      <input
        name="email"
        placeholder="Contact Email"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-purple-500 text-white rounded p-2">
        Register
      </button>
    </form>
  );
}
