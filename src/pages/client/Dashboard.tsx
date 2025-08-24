import { DashboardLayout } from "../../components/DashboardLayout";

export function UserDashboard() {
  return (
    <DashboardLayout role="USER">
      <h1 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Create Request</h2>
          <p className="text-gray-400">Send a new parcel quickly.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">My Requests</h2>
          <p className="text-gray-400">View and manage your shipping requests.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Track Parcel</h2>
          <p className="text-gray-400">Check status with tracking ID.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
