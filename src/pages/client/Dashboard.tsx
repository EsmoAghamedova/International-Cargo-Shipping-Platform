import { DashboardLayout } from "../../components/DashboardLayout";
import { useAuthStore } from "../../store/useAuthStore";
import { useRequestsStore } from "../../store/useRequestsStore";
import { Badge } from "../../components/common/Badge";
import { Link } from "react-router-dom";
import { Card } from "../../components/common/CardComponent";

export function UserDashboard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) =>
    s.requests.filter((r) => r.userId === currentUser?.id)
  );

  if (!currentUser) {
    return (
      <DashboardLayout role="USER">  
        <p className="text-center text-red-500">Not logged in</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="USER">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          {/* Welcome, {currentUser.fullName} */}
        </h1>
        <div className="flex gap-3">
          <Link
            to="/client/create-request"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Create Request
          </Link>
          <Link
            to="/client/track"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Track Request
          </Link>
        </div>
      </div>

      {/* Requests */}
      <h2 className="text-xl font-semibold text-gray-200 mb-3">
        Your Parcel Requests
      </h2>

      {requests.length === 0 ? (
        <Card className="p-4 text-center">
          <p className="text-gray-400">No requests yet.</p>
          <Link
            to="/client/create-request"
            className="mt-2 inline-block text-blue-500 hover:underline"
          >
            Create your first request →
          </Link>
        </Card>
      ) : (
        requests.map((req) => (
          <Card key={req.id}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">
                  {req.route.origin.city} → {req.route.destination.city}
                </h2>
                <p className="text-sm text-gray-500">
                  {req.parcel.weightKg}kg • {req.parcel.kind} • {req.shippingType}
                </p>
              </div>
              <Badge status={req.status} />
            </div>
            <Link
              to={`/client/requests/${req.id}`}
              className="text-blue-500 text-sm mt-2 inline-block"
            >
              View details →
            </Link>
          </Card>
        ))
      )}
    </DashboardLayout>
  );
}