import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RegisterCompanyPage } from './pages/auth/RegisterCompany';
import { RegisterUserPage } from './pages/auth/RegisterUser';
import { LoginPage } from './pages/auth/Login';
import { UserDashboard } from './pages/client/Dashboard';
import { RequestDetail } from './pages/client/RequestDetail';
import { CompanyDashboard } from './pages/company/Dashboard';
import { ProtectedRoute as ProtectedRoute } from './components/ProtectedRoute';
import { CreateRequestPage } from './pages/client/CreateRequest';
import { TrackRequest } from './pages/client/Track';
import HomePage from './pages/HomePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/client/requests/:id"
          element={
            <ProtectedRoute role="USER">
              <RequestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/track"
          element={
            <ProtectedRoute role="USER">
              <TrackRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/create-request"
          element={
            <ProtectedRoute role="USER">
              <CreateRequestPage />
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

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
