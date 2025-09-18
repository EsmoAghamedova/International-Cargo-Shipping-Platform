// src/pages/company/RequestDetail.tsx
import { useParams } from "react-router-dom";
import { useRequestsStore } from "../../store/useRequestsStore";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/common/CardComponent";
import { Badge } from "../../components/common/Badge";
import { useState, useMemo } from "react";
import type { RequestStatus } from "../../types";

export function CompanyRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const { requests, updateRequestStatus } = useRequestsStore();

  // 👇 useMemo: თუ ვერ იპოვა request → აბრუნებს null
  const request = useMemo(
    () => requests.find((r) => r.id === id) ?? null,
    [requests, id]
  );

  const [newStatus, setNewStatus] = useState<RequestStatus | "">("");
  const [comment, setComment] = useState("");

  if (!request) {
    return (
      <DashboardLayout role="COMPANY_ADMIN">
        <div className="text-center text-red-500 mt-16 text-lg">
          ❌ Request not found
        </div>
      </DashboardLayout>
    );
  }

  function handleSave() {
    if (!newStatus) return;

    updateRequestStatus(request.id, newStatus, comment || undefined);
    alert("✅ Request updated!");
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-white">Request Details</h1>
          <p className="text-gray-400">Tracking ID: {request.trackingId}</p>
        </header>

        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-3">
            Shipment Information
          </h2>
          <p className="text-gray-300">
            {request.route.origin.city} → {request.route.destination.city}
          </p>
          <p className="text-gray-400 text-sm">
            {request.parcel.weightKg}kg • {request.parcel.kind} •{" "}
            {request.shippingType}
          </p>
          <div className="mt-2">
            <Badge status={request.status} />
          </div>

          {request.reviewComment && (
            <p className="mt-3 text-yellow-400 italic">
              💬 Company Comment: {request.reviewComment}
            </p>
          )}
        </Card>

        {/* ---- Status Update Form ---- */}
        <Card className="p-6 bg-gray-800 border-0">
          <h2 className="text-lg font-semibold text-white mb-3">
            Update Request Status
          </h2>
          <select
            className="w-full p-3 rounded bg-gray-900 text-white"
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

          {newStatus === "REJECTED" && (
            <textarea
              placeholder="Enter rejection reason..."
              className="w-full mt-3 p-3 rounded bg-gray-900 text-white"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          )}

          <button
            onClick={handleSave}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
          >
            💾 Save Changes
          </button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
