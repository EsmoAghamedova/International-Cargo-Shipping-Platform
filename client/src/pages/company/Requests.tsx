import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/CardComponent';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useState } from 'react';

const STATUS_ORDER = [
  'PENDING_REVIEW',
  'ACCEPTED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'REJECTED',
];

// helper to format label text
const formatLabel = (val: string) =>
  val
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());

export function CompanyRequests() {
  const currentCompany = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) =>
    s.requests.filter((r) => r.companyId === currentCompany?.id),
  );
  const isLoading = useRequestsStore((s) => s.isLoading);
  const error = useRequestsStore((s) => s.error);
  const total = useRequestsStore((s) => s.total);
  const hasMore = useRequestsStore((s) => s.hasMore);
  const loadMore = useRequestsStore((s) => s.loadMore);
  const isLoadingMore = useRequestsStore((s) => s.isLoadingMore);
  const [sortStatus, setSortStatus] = useState<string>('');

  if (!currentCompany || currentCompany.role !== 'COMPANY_ADMIN') {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">Not authorized</p>
    );
  }

  // Sort requests by status if selected
  const sortedRequests = sortStatus
    ? [...requests].filter((r) => r.status === sortStatus)
    : [...requests].sort(
        (a, b) =>
          STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
      );

  const visibleCount = Math.min(requests.length, total || requests.length);

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600">
            All Requests
          </h1>
          <p className="text-gray-500 text-lg">
            Review and manage all parcel requests assigned to your company.
          </p>
          {total > 0 && (
            <p className="text-sm text-gray-500">
              Showing {visibleCount} of {total} requests
            </p>
          )}
          <div className="mt-4 flex items-center gap-2">
            <label className="text-gray-700 font-medium" htmlFor="status-sort">
              Sort by status:
            </label>
            <select
              id="status-sort"
              value={sortStatus}
              onChange={(e) => setSortStatus(e.target.value)}
              className="border border-gray-300 bg-gray-50 text-gray-800 rounded px-2 py-1"
            >
              <option value="">All</option>
              {STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {formatLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </header>

        {isLoading ? (
          <Card className="p-6 bg-white border border-gray-200 text-center text-gray-500">
            Loading requests...
          </Card>
        ) : error ? (
          <Card className="p-6 bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </Card>
        ) : sortedRequests.length === 0 ? (
          <Card className="text-center py-10 bg-white border border-gray-200">
            <p className="text-gray-500 text-lg">
              No requests assigned to your company yet.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedRequests.map((req) => (
              <Card
                key={req.id}
                className="p-5 bg-white border border-gray-200 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg text-blue-700">
                      {req.route.origin.city} → {req.route.destination.city}
                    </h2>
                    <p className="text-sm text-gray-700">
                      {req.parcel.weightKg}kg • {req.parcel.kind} •{' '}
                      {req.shippingType}
                    </p>
                  </div>
                  {/* Wrap badge with formatted label */}
                  <Badge status={formatLabel(req.status)} />
                </div>
                <Link
                  to={`/company/request-detail/${req.id}`}
                  className="text-green-600 text-sm mt-2 inline-block hover:underline"
                >
                  Manage →
                </Link>
              </Card>
            ))}

            {hasMore && (
              <div className="col-span-full flex justify-center">
                <button
                  onClick={() => loadMore()}
                  disabled={isLoadingMore}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 disabled:opacity-60"
                  aria-busy={isLoadingMore}
                >
                  {isLoadingMore ? 'Loading more...' : 'Load more requests'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
