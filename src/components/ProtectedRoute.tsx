import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouterProps {
  children: React.ReactNode;
  role?: "USER" | "COMPANY_ADMIN";
}

export function protectedRoute({ children, role }: ProtectedRouterProps) {
  const currentUser = useAuthStore((s) => s.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
