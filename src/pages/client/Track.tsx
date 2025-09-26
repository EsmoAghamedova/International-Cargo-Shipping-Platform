import { useState } from 'react';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Card } from '../../components/common/CardComponent';
import { DashboardLayout } from '../../components/DashboardLayout';

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: 'Pending Review',
  ACCEPTED: 'Accepted',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  REJECTED: 'Rejected',
};

export function TrackRequest() {
  const [trackingId, setTrackingId] = useState('');
  const [searched, setSearched] = useState(false);

  const request = useRequestsStore((s) =>
    s.requests.find(
      (r) => r.trackingId?.toUpperCase() === trackingId.toUpperCase(),
    ),
  );

  return (
    <DashboardLayout role="USER">
      <div className="w-full px-2 sm:px-4 md:px-6 py-4 space-y-6">
        {/* Search box */}
        <Card className="p-4 bg-white border border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600 mb-3">
            Track Your Parcel
          </h1>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Enter Tracking ID..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-4 py-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => setSearched(true)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
            >
              Search
            </button>
          </div>
        </Card>

        {/* Results */}
        {searched && (
          <>
            {!request ? (
              <Card className="p-4 bg-white border border-gray-200">
                <p className="text-red-500 font-medium">
                  ❌ Request not found. Please check the tracking ID.
                </p>
              </Card>
            ) : (
              <Card className="p-5 bg-white border border-gray-200 space-y-3">
                <h2 className="text-xl font-bold text-blue-600">
                  Tracking #{request.trackingId}
                </h2>

                {/* Status label instead of Badge */}
                <span
                  className={`inline-block text-sm font-semibold px-3 py-1 rounded
                    ${
                      request.status === 'REJECTED'
                        ? 'bg-red-100 text-red-600'
                        : request.status === 'DELIVERED'
                        ? 'bg-green-100 text-green-700'
                        : request.status === 'IN_TRANSIT' ||
                          request.status === 'OUT_FOR_DELIVERY'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {STATUS_LABELS[request.status] ?? request.status}
                </span>

                <p className="text-gray-700">
                  From: {request.route.origin.city},{' '}
                  {request.route.origin.country}
                </p>
                <p className="text-gray-700">
                  To: {request.route.destination.city},{' '}
                  {request.route.destination.country}
                </p>
                <p className="text-gray-700">
                  Parcel: {request.parcel.weightKg}kg • {request.parcel.kind} •
                  Value: ${Number(request.parcel.declaredValue).toFixed(2)}
                </p>

                {request.parcel.fragile && (
                  <p className="text-red-500">⚠️ Fragile parcel</p>
                )}
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
