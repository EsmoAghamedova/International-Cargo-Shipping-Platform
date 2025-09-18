import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RegisterCompanyPage } from './pages/auth/RegisterCompany';
import { RegisterUserPage } from './pages/auth/RegisterUser';
import { LoginPage } from './pages/auth/Login';
import { ClientDashboard } from './pages/client/Dashboard';
import { RequestDetail } from './pages/client/RequestDetail';
import { CompanyDashboard } from './pages/company/Dashboard';
import { CompanyPricingPage } from './pages/company/Pricing';
import { CompanySettingsPage } from './pages/company/Settings';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CreateRequestPage } from './pages/client/CreateRequest';
import { TrackRequest } from './pages/client/Track';
import { HomePage } from './pages/HomePage';
import { CompanyRequestDetail } from './pages/company/RequestDetail';
import { CompanyRequests } from './pages/company/Requests';
import { CompanyOrClientPage } from './pages/auth/companyOrClient';
import { useRequestsStore } from './store/useRequestsStore';
import { useEffect } from 'react';

function App() {
  const loadRequests = useRequestsStore((s) => s.loadRequests);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CompanyOrClientPage />} />
        <Route path="/register/user" element={<RegisterUserPage />} />
        <Route path="/register/company" element={<RegisterCompanyPage />} />

        {/* Client */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute role="USER">
              <ClientDashboard />
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

        {/* Company */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute role="COMPANY_ADMIN">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/pricing"
          element={
            <ProtectedRoute role="COMPANY_ADMIN">
              <CompanyPricingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/requests"
          element={
            <ProtectedRoute role="COMPANY_ADMIN">
              <CompanyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/request-detail/:id"
          element={
            <ProtectedRoute role="COMPANY_ADMIN">
              <CompanyRequestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/settings"
          element={
            <ProtectedRoute role="COMPANY_ADMIN">
              <CompanySettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
