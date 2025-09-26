import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/common/CardComponent';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: 'Pending Review',
  ACCEPTED: 'Accepted',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  REJECTED: 'Rejected',
};

export function CompanyDashboard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) =>
    s.requests.filter(
      (r) => r.companyId === currentUser?.id && r.status === 'PENDING_REVIEW',
    ),
  );
  const loadRequests = useRequestsStore((s) => s.loadRequests);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  if (!currentUser) {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">Not logged in</p>
    );
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Welcome,{' '}
            {currentUser.role === 'COMPANY_ADMIN'
              ? currentUser.name
              : currentUser.fullName}
          </h1>
          <p className="text-gray-500 text-lg">
            Here are the parcel requests assigned to your company:
          </p>
        </header>

        {/* Requests */}
        {requests.length === 0 ? (
          <Card className="text-center py-10 bg-white border border-gray-200">
            <p className="text-gray-500 text-lg">No requests yet.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <Card
                key={req.id}
                className="p-5 bg-white border border-gray-200 shadow flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg text-blue-600">
                      {req.route.origin.city} → {req.route.destination.city}
                    </h2>
                    <p className="text-sm text-gray-700">
                      {req.parcel.weightKg}kg • {req.parcel.kind} •{' '}
                      {req.shippingType}
                    </p>
                  </div>

                  {/* Status label instead of Badge */}
                  <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded
                      ${
                        req.status === 'REJECTED'
                          ? 'bg-red-100 text-red-600'
                          : req.status === 'DELIVERED'
                          ? 'bg-green-100 text-green-700'
                          : req.status === 'IN_TRANSIT' ||
                            req.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {STATUS_LABELS[req.status] ?? req.status}
                  </span>
                </div>

                <Link
                  to={`/company/request-detail/${req.id}`}
                  className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                >
                  View details →
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
