import { Button } from "../../components/common/Button";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const login = useAuthStore((s) => s.login);
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

    if (entity.role === "USER") navigate("/client/dashboard");
    if (entity.role === "COMPANY_ADMIN") navigate("/company/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-6 max-w-sm mx-auto bg-slate-800 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold text-blue-500">Login</h2>
      <input
        name="email"
        placeholder="Enter email"
        className="border border-slate-600 bg-slate-900 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* აქ Button კომპონენტი */}
      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
}
