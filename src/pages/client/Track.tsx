import { useState } from 'react';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/card';

export function TrackRequest() {
  const [trackingId, setTrackingId] = useState('');
  const request = useRequestsStore((s) =>
    s.requests.find((r) => r.id === trackingId),
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <h1 className="text-lg font-bold mb-2">Track Request</h1>
        <input
          className="border rounded p-2 w-full"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />

        {request && (
          <div className="mt-4">
            <p>
              {request.route.origin} → {request.route.destination}
            </p>
            <Badge status={request.status} />
          </div>
        )}
      </Card>
    </div>
  );
}
