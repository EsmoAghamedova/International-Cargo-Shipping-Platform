import { DashboardLayout } from '../../components/DashboardLayout';

export function CompanySettingsPage() {
  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Settings</h1>
      <p className="text-gray-400">
        Configure company settings and preferences.
      </p>
    </DashboardLayout>
  );
}
