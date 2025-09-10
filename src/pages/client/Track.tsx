import { useParams } from 'react-router-dom';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Card } from '../../components/common/CardComponent';
import { Badge } from '../../components/common/Badge';
import { DashboardLayout } from '../../components/DashboardLayout';

export function TrackRequest() {
  const { id } = useParams();
  const request = useRequestsStore((s) => s.requests.find((r) => r.id === id));

  if (!request) {
    return <p className="text-center text-red-500">Request not found</p>;
  }

  return (
    <DashboardLayout role="USER">
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <h1 className="text-xl font-bold mb-2">
            Tracking #{request.trackingId}
          </h1>
          <Badge status={request.status} />

          <div className="mt-4">
            <p className="text-gray-600">
              From: {request.route.origin.city}, {request.route.origin.country}
            </p>
            <p className="text-gray-600">
              To: {request.route.destination.city},{' '}
              {request.route.destination.country}
            </p>
            <p className="text-gray-600">
              Parcel: {request.parcel.weightKg}kg • {request.parcel.kind} •
              Value: ${request.parcel.declaredValue}
            </p>
          </div>

          {request.parcel.fragile && (
            <p className="mt-2 text-red-500">⚠️ Fragile parcel</p>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
