import { useParams } from 'react-router-dom';
import { useRequestsStore } from '../../store/useRequestsStore';
import { useCompaniesStore } from '../../store/useCompanyStore';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/common/CardComponent';
import { Badge } from '../../components/common/Badge';
import { InlineChat } from '../../components/Chat';

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: 'Pending Review',
  ACCEPTED: 'Accepted',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  REJECTED: 'Rejected',
};

const STATUS_FLOW = [
  'PENDING_REVIEW',
  'ACCEPTED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'REJECTED',
] as const;

export function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const request = useRequestsStore((s) => s.requests.find((r) => r.id === id));
  const company = useCompaniesStore((s) =>
    request ? s.companies.find((c) => c.id === request.companyId) : undefined,
  );

  if (!request) {
    return (
      <DashboardLayout role="USER">
        <Card>
          <p className="text-center text-red-500 mt-10 text-lg">
            ❌ Request not found
          </p>
        </Card>
      </DashboardLayout>
    );
  }

  const currentStatusIndex = STATUS_FLOW.indexOf(
    request.status as (typeof STATUS_FLOW)[number],
  );

  return (
    <DashboardLayout role="USER">
      <div className="w-full px-2 sm:px-4 md:px-6 py-4">
        <Card className="w-full bg-white border border-gray-200">
          <h1 className="text-2xl font-bold mb-3 text-blue-600">
            {request.route.origin.city}, {request.route.origin.country} →{' '}
            {request.route.destination.city}, {request.route.destination.country}
          </h1>
          <Badge status={request.status} />

          {/* Status flow */}
          <ul className="mt-6 space-y-3">
            {STATUS_FLOW.map((status, idx) => {
              const isCurrent = idx === currentStatusIndex;
              const isRejected = request.status === 'REJECTED';
              let bgColor = 'bg-gray-100';
              let textColor = 'text-gray-400';
              let fontWeight = 'font-medium';

              if (isRejected) {
                if (idx < currentStatusIndex) {
                  // previous statuses = light red
                  bgColor = 'bg-red-100';
                  textColor = 'text-red-500';
                } else if (isCurrent) {
                  // rejected status = dark red
                  bgColor = 'bg-red-600';
                  textColor = 'text-white';
                  fontWeight = 'font-semibold';
                }
              } else {
                if (isCurrent) {
                  bgColor = 'bg-blue-200';
                  textColor = 'text-blue-700';
                  fontWeight = 'font-semibold';
                } else if (idx < currentStatusIndex) {
                  bgColor = 'bg-green-100';
                  textColor = 'text-green-700';
                }
              }

              return (
                <li
                  key={status}
                  className={`p-3 rounded-md ${bgColor} ${textColor} ${fontWeight}`}
                >
                  {STATUS_LABELS[status] || status}
                </li>
              );
            })}
          </ul>

          {/* Rejection comment */}
          {request.status === 'REJECTED' && request.reviewComment && (
            <div className="bg-red-100 text-red-700 mt-4 p-4 rounded">
              <span className="font-bold">Rejection Reason:</span> {request.reviewComment}
            </div>
          )}

          {/* Parcel info */}
          <div className="mt-6 text-sm text-gray-700">
            <p>
              Parcel: {request.parcel.weightKg}kg • {request.parcel.kind} •
              Declared Value: ${Number(request.parcel.declaredValue).toFixed(2)}
            </p>
            {request.parcel.fragile && (
              <p className="text-red-500 font-medium mt-1">⚠️ Fragile</p>
            )}
          </div>
        </Card>
      </div>

      {/* Inline chat */}
      {request && company && (
        <InlineChat
          contextId={`chat_${request.userId}_${request.companyId}`}
          contextLabel={`Chat with ${company.name}`}
          sender="client"
        />
      )}
    </DashboardLayout>
  );
}
