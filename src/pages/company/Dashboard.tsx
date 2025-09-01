import { DashboardLayout } from '../../components/DashboardLayout';

export function CompanyDashboard() {
  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>
      <div className="bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Incoming Requests</h2>
        <p className="text-gray-400">No requests yet.</p>
      </div>
      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
        <ul className="text-gray-400 list-disc pl-5">
          <li>0 Active deliveries</li>
          <li>0 Completed</li>
          <li>0 Pending review</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}
