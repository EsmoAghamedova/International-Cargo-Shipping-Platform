// src/pages/company/Settings.tsx

import { useAuthStore } from '../../store/useAuthStore';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/common/CardComponent';

export function CompanySettingsPage() {
  const currentCompany = useAuthStore((s) => s.currentUser);

  if (!currentCompany || currentCompany.role !== 'COMPANY_ADMIN') {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">Not authorized</p>
    );
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Company Settings
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage your company’s profile and preferences here.
          </p>
        </header>

        <Card className="p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Profile</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-medium text-gray-900">Name:</span>{' '}
              {currentCompany.name}
            </li>
            <li>
              <span className="font-medium text-gray-900">Email:</span>{' '}
              {currentCompany.email}
            </li>
            <li>
              <span className="font-medium text-gray-900">ID:</span>{' '}
              {currentCompany.id}
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Preferences</h2>
          <p className="text-gray-500">
            (Future feature) Here you’ll be able to configure notification
            preferences, supported regions, etc.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
