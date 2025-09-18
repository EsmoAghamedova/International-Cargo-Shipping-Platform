import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../../services/AuthService';

export function RegisterUserPage() {
  const setCurrent = useAuthStore((s) => s.setCurrent);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    const newUser: User = {
      id: uuid(),
      fullName,
      email,
      addresses: [],
      role: 'USER',
    };

    AuthService.registerUser(newUser); // 👈 DB-ში ჩაწერა
    setCurrent(newUser); // 👈 localStorage-ში ჩაწერა
    navigate('/client/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-6 max-w-sm mx-auto"
    >
      <h2 className="text-xl font-bold">Register User</h2>
      <input
        name="fullName"
        placeholder="Full Name"
        className="border p-2 rounded"
      />
      <input name="email" placeholder="Email" className="border p-2 rounded" />
      <button type="submit" className="bg-green-500 text-white rounded p-2">
        Register
      </button>
    </form>
  );
}
