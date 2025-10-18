import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Card } from '../../components/common/CardComponent';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsService } from '../../services/AnalyticsService';
import type { ParcelRequest } from '../../types';

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: 'Pending Review',
  ACCEPTED: 'Accepted',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  REJECTED: 'Rejected',
};

export function ClientDashboard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) => s.requests);
  const isLoading = useRequestsStore((s) => s.isLoading);
  const error = useRequestsStore((s) => s.error);
  const total = useRequestsStore((s) => s.total);
  const hasMore = useRequestsStore((s) => s.hasMore);
  const loadMore = useRequestsStore((s) => s.loadMore);
  const isLoadingMore = useRequestsStore((s) => s.isLoadingMore);
  const summaryQuery = useQuery({
    queryKey: ['analytics', 'user', currentUser?.id],
    queryFn: () =>
      AnalyticsService.getSummary<ParcelRequest>('USER', currentUser!.id),
    enabled: Boolean(currentUser?.role === 'USER' && currentUser?.id),
  });

  const visibleCount = Math.min(requests.length, total || requests.length);

  if (!currentUser) {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">Not logged in</p>
    );
  }

  return (
    <DashboardLayout role="USER">
      <div className="w-full px-2 sm:px-4 md:px-6 py-4 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
            Welcome,{' '}
            {currentUser.role === 'USER'
              ? currentUser.fullName
              : currentUser.name}
          </h1>
          <p className="text-gray-400 text-lg">
            Here are your recent parcel requests:
          </p>
        </header>

        {total > 0 && (
          <p className="text-sm text-gray-500">
            Showing {visibleCount} of {total} shipments
          </p>
        )}

        {summaryQuery.data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-white border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Total Shipments</p>
              <p className="text-2xl font-semibold text-blue-600">
                {summaryQuery.data.total}
              </p>
            </Card>
            <Card className="p-4 bg-white border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">In Transit</p>
              <p className="text-2xl font-semibold text-amber-500">
                {summaryQuery.data.inTransit}
              </p>
            </Card>
            <Card className="p-4 bg-white border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-semibold text-green-600">
                {summaryQuery.data.delivered}
              </p>
            </Card>
            <Card className="p-4 bg-white border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-purple-600">
                {summaryQuery.data.pending}
              </p>
            </Card>
          </div>
        )}

        {isLoading ? (
          <Card className="p-6 bg-white border border-gray-200 text-center text-gray-500">
            Loading your shipments...
          </Card>
        ) : error ? (
          <Card className="p-6 bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </Card>
        ) : requests.length === 0 ? (
          <Card className="text-center py-10 bg-white border border-gray-200">
            <p className="text-gray-700 text-lg">
              No requests yet. Ready to get started?
            </p>
            <Link
              to="/client/create-request"
              className="inline-block mt-4 px-5 py-2 bg-green-500 rounded text-white text-base font-semibold hover:bg-green-600 transition"
            >
              + Create Your First Request
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <Card
                key={req.id}
                className="p-5 bg-white border border-gray-200 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg text-blue-600">
                      {req.route.origin.city} → {req.route.destination.city}
                    </h2>
                    <p className="text-sm text-gray-700">
                      {req.parcel.weightKg}kg • {req.parcel.kind} •{' '}
                      {req.shippingType}
                    </p>
                    <p className="text-xs text-gray-500">
                      Tracking ID:{' '}
                      <span className="font-mono">{req.trackingId}</span>
                    </p>
                  </div>

                  {/* Status label instead of badge */}
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded
                      ${
                        req.status === 'REJECTED'
                          ? 'bg-red-100 text-red-600'
                          : req.status === 'DELIVERED'
                          ? 'bg-green-100 text-green-700'
                          : req.status === 'IN_TRANSIT' ||
                            req.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {STATUS_LABELS[req.status] ?? req.status}
                  </span>
                </div>
                <Link
                  to={`/client/requests/${req.id}`}
                  className="text-blue-500 text-sm mt-2 inline-block hover:underline"
                >
                  View details →
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
                  {isLoadingMore ? 'Loading more...' : 'Load more shipments'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
