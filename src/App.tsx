import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterCompanyPage } from "./pages/auth/RegisterCompany";
import { RegisterUserPage } from "./pages/auth/RegisterUser";
import { LoginPage } from "./pages/auth/Login";
import { UserDashboard } from "./pages/client/Dashboard";
import { CompanyDashboard } from "./pages/company/Dashboard";
import { protectedRoute as ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* შესვლა & რეგისტრაცია */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/user" element={<RegisterUserPage />} />
          <Route path="/register/company" element={<RegisterCompanyPage />} />

          {/* მომხმარებლის მხარე */}
          <Route
            path="/client/dashboard"
            element={
              <ProtectedRoute role="USER">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* კომპანიის მხარე */}
          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute role="COMPANY_ADMIN">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
