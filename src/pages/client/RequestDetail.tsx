// src/pages/client/RequestDetail.tsx
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

interface StatusHistoryItem {
  status: string;
  updatedAt: string;
  updatedBy?: 'COMPANY' | 'SYSTEM';
  comment?: string;
}

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

  // Temporary timeline with company actions (replace with backend data later)
  const statusHistory: StatusHistoryItem[] = (request as any).statusHistory ?? [
    {
      status: 'PENDING_REVIEW',
      updatedAt: request.createdAt,
      updatedBy: 'SYSTEM',
    },
    {
      status: 'ACCEPTED',
      updatedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      updatedBy: 'COMPANY',
    },
    {
      status: request.status,
      updatedAt: new Date().toISOString(),
      updatedBy: 'COMPANY',
    },
  ];

  return (
    <DashboardLayout role="USER">
      <div className="w-full px-2 sm:px-4 md:px-6 py-4">
        <Card className="w-full bg-white border border-gray-200">
          <h1 className="text-2xl font-bold mb-3 text-blue-600">
            {request.route.origin.city}, {request.route.origin.country} →{' '}
            {request.route.destination.city},{' '}
            {request.route.destination.country}
          </h1>
          <Badge status={request.status} />

          {/* Status flow */}
          <ul className="mt-6 space-y-3">
  {STATUS_FLOW.map((status, idx) => {
    const isRejected = status === 'REJECTED';
    const isPassed = idx < currentStatusIndex && !isRejected;
    const isCurrent = idx === currentStatusIndex;

    return (
      <li
        key={status}
        className={`p-3 rounded-md ${
          isRejected
            ? 'bg-red-600 text-white font-semibold'
            : isPassed
              ? 'bg-gray-100 text-red-300 font-medium'
              : isCurrent
                ? 'bg-red-200 text-red-700 font-semibold'
                : 'bg-gray-100 text-gray-400'
        }`}
      >
        {STATUS_LABELS[status] || status}
      </li>
    );
  })}
</ul>


          {/* Timeline */}
          <div className="mt-6">
  <h2 className="text-lg font-semibold mb-2">Status Timeline</h2>
  <ul className="border-l-2 border-blue-500">
    {statusHistory.map((item: StatusHistoryItem, idx: number) => {
      const isCurrent = item.status === request.status;
      const isRejected = item.status === 'REJECTED';
      const isPassed = idx < currentStatusIndex && !isRejected;

      return (
        <li key={idx} className="mb-4 ml-4 relative">
          <span
            className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-2 border-white ${
              isRejected
                ? 'bg-red-600'
                : isPassed
                  ? 'bg-red-100'
                  : isCurrent
                    ? 'bg-red-200'
                    : 'bg-gray-300'
            }`}
          ></span>
          <div className="ml-2">
            <p
              className={`font-medium ${
                isRejected
                  ? 'text-red-700'
                  : isPassed
                    ? 'text-red-400'
                    : isCurrent
                      ? 'text-red-600'
                      : 'text-gray-500'
              }`}
            >
              {STATUS_LABELS[item.status] || item.status}{' '}
              {item.updatedBy === 'COMPANY' && '🏢'}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(item.updatedAt).toLocaleString()}
            </p>
            {item.comment && (
              <p className="text-sm text-gray-700 mt-1">
                💬 {item.comment}
              </p>
            )}
          </div>
        </li>
      );
    })}
  </ul>
</div>


          {/* Rejection comment */}
          {request.status === 'REJECTED' && request.reviewComment && (
            <div className="bg-red-100 text-red-700 mt-4 p-4 rounded">
              <span className="font-bold">Rejection Reason:</span>{' '}
              {request.reviewComment}
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
