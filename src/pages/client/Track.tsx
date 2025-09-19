import { useState } from 'react';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Card } from '../../components/common/CardComponent';
import { Badge } from '../../components/common/Badge';
import { DashboardLayout } from '../../components/DashboardLayout';

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
        <Card className="p-4 bg-[#1a2338] border-0">
          <h1 className="text-2xl font-bold text-blue-400 mb-3">
            Track Your Parcel
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Tracking ID..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <Card className="p-4 bg-[#1a2338] border-0">
                <p className="text-red-400 font-medium">
                  ❌ Request not found. Please check the tracking ID.
                </p>
              </Card>
            ) : (
              <Card className="p-5 bg-[#1a2338] border-0 space-y-3">
                <h2 className="text-xl font-bold text-white">
                  Tracking #{request.trackingId}
                </h2>
                <Badge status={request.status} />

                <p className="text-gray-400">
                  From: {request.route.origin.city},{' '}
                  {request.route.origin.country}
                </p>
                <p className="text-gray-400">
                  To: {request.route.destination.city},{' '}
                  {request.route.destination.country}
                </p>
                <p className="text-gray-400">
                  Parcel: {request.parcel.weightKg}kg • {request.parcel.kind} •
                  Value: ${request.parcel.declaredValue}
                </p>

                {request.parcel.fragile && (
                  <p className="text-red-400">⚠️ Fragile parcel</p>
                )}
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
