import { useParams } from 'react-router-dom';
import { useRequestsStore } from '../../store/useRequestsStore';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/common/CardComponent';
import { Badge } from '../../components/common/Badge';
import { useState, useEffect } from 'react';
import type { RequestStatus } from '../../types';
import { InlineChat } from '../../components/Chat';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/UserService';

// helper to format status labels
const formatLabel = (val: string) =>
  val
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());

export function CompanyRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const request = useRequestsStore((state) =>
    state.requests.find((r) => r.id === id) ?? null,
  );
  const updateRequestStatus = useRequestsStore((s) => s.updateRequestStatus);
  const isLoading = useRequestsStore((s) => s.isLoading);
  const error = useRequestsStore((s) => s.error);
  const isFetchingSingle = useRequestsStore((s) => s.isFetchingSingle);
  const fetchById = useRequestsStore((s) => s.fetchById);
  const userQuery = useQuery({
    queryKey: ['users', request?.userId],
    queryFn: () => UserService.get(request!.userId),
    enabled: Boolean(request?.userId),
  });

  const [newStatus, setNewStatus] = useState<RequestStatus | ''>('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!id || request) return;
    void fetchById(id);
  }, [id, request, fetchById]);

  if (!request) {
    if (isLoading || isFetchingSingle) {
      return (
        <DashboardLayout role="COMPANY_ADMIN">
          <div className="text-center text-gray-500 mt-16 text-lg">
            Loading request details...
          </div>
        </DashboardLayout>
      );
    }
    if (error) {
      return (
        <DashboardLayout role="COMPANY_ADMIN">
          <div className="text-center text-red-500 mt-16 text-lg">{error}</div>
        </DashboardLayout>
      );
    }
    return (
      <DashboardLayout role="COMPANY_ADMIN">
        <div className="text-center text-red-500 mt-16 text-lg">
          ❌ Request not found
        </div>
      </DashboardLayout>
    );
  }

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSave() {
    if (!newStatus) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      await updateRequestStatus(request.id, newStatus, comment || undefined);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-blue-700">Request Details</h1>
          <p className="text-gray-500">Tracking ID: {request.trackingId}</p>
        </header>

        {/* Shipment Info */}
        <Card className="p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">
            Shipment Information
          </h2>
          <p className="text-gray-700">
            {request.route.origin.city} → {request.route.destination.city}
          </p>
          <p className="text-gray-500 text-sm">
            {request.parcel.weightKg}kg • {request.parcel.kind} •{' '}
            {request.shippingType} • Declared Value: $
            {Number(request.parcel.declaredValue).toFixed(2)}
          </p>
          <div className="mt-2">
            <Badge status={formatLabel(request.status)} />
          </div>

          {request.reviewComment && (
            <p className="mt-3 text-yellow-600 italic">
              💬 Company Comment: {request.reviewComment}
            </p>
          )}
        </Card>

        {/* Update Form */}
        <Card className="p-6 bg-white border border-gray-200">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Update Request Status
          </h2>
          <select
            className="w-full p-3 rounded bg-gray-100 text-gray-800 border border-gray-300"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
          >
            <option value="">-- Select status --</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {newStatus === 'REJECTED' && (
            <textarea
              placeholder="Enter rejection reason..."
              className="w-full mt-3 p-3 rounded bg-gray-100 text-gray-800 border border-gray-300"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          )}

          <button
            onClick={handleSave}
            disabled={isSaving || !newStatus}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : '💾 Save Changes'}
          </button>
          {saveError && (
            <p className="text-sm text-red-500 mt-2">{saveError}</p>
          )}
        </Card>
      </div>

      {request && (
        <InlineChat
          contextId={`chat_${request.userId}_${request.companyId}`}
          contextLabel={`Chat with ${
            userQuery.data ? userQuery.data.fullName : 'Client'
          }`}
          sender="company"
        />
      )}
    </DashboardLayout>
  );
}
