import { DashboardLayout } from '../../components/DashboardLayout';

export function PricingPage() {
  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Pricing</h1>
      <p className="text-gray-400">
        Set or update your company’s pricing structure.
      </p>
    </DashboardLayout>
  );
}
