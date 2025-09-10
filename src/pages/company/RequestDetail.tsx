import { useParams, Link } from 'react-router-dom';
import { useRequestsStore } from '../../store/useRequestsStore';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/CardComponent';

export function CompanyRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const request = useRequestsStore((s) => s.requests.find((r) => r.id === id));
  const updateRequestStatus = useRequestsStore((s) => s.updateRequestStatus);

  if (!request) {
    return (
      <DashboardLayout role="COMPANY_ADMIN">
        <p className="text-center text-red-500 mt-10 text-lg">
          Request not found
        </p>
        <div className="text-center mt-4">
          <Link
            to="/company/requests"
            className="text-blue-400 hover:underline"
          >
            ← Back to all requests
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleUpdate = (status: typeof request.status) => {
    updateRequestStatus(request.id, status);
  };

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-400">
            Request Detail #{request.id}
          </h1>
          <Badge status={request.status} />
        </header>

        <Card className="p-6 bg-[#1a2338] border-0 space-y-4">
          <h2 className="text-lg font-semibold text-white">Parcel Info</h2>
          <p className="text-gray-300">
            {request.parcel.weightKg}kg • {request.parcel.kind} •{' '}
            {request.shippingType}
          </p>
          <p className="text-gray-400">
            Declared Value: ${request.parcel.declaredValue}
          </p>
        </Card>

        <Card className="p-6 bg-[#1a2338] border-0 space-y-4">
          <h2 className="text-lg font-semibold text-white">Route</h2>
          <p className="text-gray-300">
            {request.route.origin.city}, {request.route.origin.country} →
            {request.route.destination.city},{' '}
            {request.route.destination.country}
          </p>
        </Card>

        <div className="flex gap-3">
          {request.status === 'PENDING_REVIEW' && (
            <>
              <button
                onClick={() => handleUpdate('ACCEPTED')}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdate('REJECTED')}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </>
          )}

          {request.status === 'ACCEPTED' && (
            <button
              onClick={() => handleUpdate('IN_TRANSIT')}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Mark In Transit
            </button>
          )}

          {request.status === 'IN_TRANSIT' && (
            <button
              onClick={() => handleUpdate('DELIVERED')}
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
            >
              Mark Delivered
            </button>
          )}
        </div>

        <div className="mt-6">
          <Link
            to="/company/requests"
            className="text-blue-400 hover:underline"
          >
            ← Back to all requests
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
