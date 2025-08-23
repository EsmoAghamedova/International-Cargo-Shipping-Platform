import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const login = useAuthStore(s => s.login);
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;

        const entity = login(email);
        if (!entity) {
            alert("Email not found 🤧");
            return;
        }

        if (entity.role === "USER") navigate("/client/dashboard")
        if (entity.role === "COMPANY_ADMIN") navigate("/company/dashboard")
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold">Login</h2>
            <input name="email" placeholder="Enter email" className="border p-2 rounded" />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">Login</button>
        </form>
    );
};

export default LoginPage;