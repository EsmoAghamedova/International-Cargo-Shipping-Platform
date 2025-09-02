import { useParams } from 'react-router-dom';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

const STATUS_FLOW = [
  'PENDING_REVIEW',
  'ACCEPTED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

export function RequestDetail() {
  const { id } = useParams();
  const request = useRequestsStore((s) => s.requests.find((r) => r.id === id));

  if (!request) {
    return <p className="text-center text-red-500">Request not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <h1 className="text-xl font-bold mb-2">
          {request.route.origin} → {request.route.destination}
        </h1>
        <Badge status={request.status} />

        <ul className="mt-4 space-y-2">
          {STATUS_FLOW.map((status) => (
            <li
              key={status}
              className={`p-2 rounded ${
                request.status === status
                  ? 'bg-blue-100 font-semibold'
                  : 'bg-gray-100'
              }`}
            >
              {status}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
