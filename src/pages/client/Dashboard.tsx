import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/CardComponent';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';

export function ClientDashboard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) =>
    s.requests.filter((r) => r.userId === currentUser?.id),
  );

  if (!currentUser) {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">Not logged in</p>
    );
  }

  return (
    <DashboardLayout role="USER">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
            Welcome,{' '}
            {currentUser.role === 'USER'
              ? currentUser.fullName
              : currentUser.name}
          </h1>
          <p className="text-gray-400 text-lg">
            Here are your recent parcel requests:
          </p>
        </header>

        {requests.length === 0 ? (
          <Card className="text-center py-10 bg-[#1a2338] border-0">
            <p className="text-gray-400 text-lg">
              No requests yet. Ready to get started?
            </p>
            <Link
              to="/client/create-request"
              className="inline-block mt-4 px-5 py-2 bg-green-500 rounded text-white text-base font-semibold hover:bg-green-600 transition"
            >
              + Create Your First Request
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <Card
                key={req.id}
                className="p-5 bg-[#1a2338] border-0 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg text-white">
                      {req.route.origin.city} → {req.route.destination.city}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {req.parcel.weightKg}kg • {req.parcel.kind} •{' '}
                      {req.shippingType}
                    </p>
                    <p className="text-xs text-gray-500">
                      Tracking ID: <span className="font-mono">{req.trackingId}</span>
                    </p>
                  </div>
                  <Badge status={req.status} />
                </div>
                <Link
                  to={`/client/requests/${req.id}`}
                  className="text-blue-400 text-sm mt-2 inline-block hover:underline"
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
