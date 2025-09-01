import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Link } from 'react-router-dom';

export function UserDashboard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) =>
    s.requests.filter((r) => r.userId === currentUser?.id),
  );

  if (!currentUser) {
    return <p className="text-center text-red-500">Not logged in</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">
        Welcome,{' '}
        {currentUser.role === 'USER' ? currentUser.fullName : currentUser.name}
      </h1>

      <p className="text-gray-600">Here are your parcel requests:</p>

      {requests.length === 0 && (
        <Card>
          <p className="text-gray-500">No requests yet. Create one!</p>
        </Card>
      )}

      {requests.map((req) => (
        <Card key={req.id}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">
                {req.route.origin} → {req.route.destination}
              </h2>
              <p className="text-sm text-gray-500">
                {req.parcel.weight}kg • {req.parcel.type} • {req.shippingType}
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
      ))}
    </div>
  );
}
