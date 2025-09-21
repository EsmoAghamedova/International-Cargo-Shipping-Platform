import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
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
    <div>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-6 max-w-sm mx-auto bg-white rounded-xl shadow border border-gray-200"
    >
      <h2 className="text-xl font-bold text-blue-600">Register User</h2>
      <input
        name="fullName"
        placeholder="Full Name"
        className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="email"
        placeholder="Email"
        className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition">
        Register
      </button>
    </form>
    
    <div className="text-center mt-4">
            <p className="text-gray-500">
              Do you have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
    </div>
  );
}
