import { useParams } from "react-router-dom";
import { useRequestsStore } from "../../store/useRequestsStore";
import { Card } from "../../components/common/CardComponent";
import { Badge } from "../../components/common/Badge";
import { DashboardLayout } from "../../components/DashboardLayout";

// სტატუსების label-ები
const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: "Pending Review",
  ACCEPTED: "Accepted",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
};

// flow-ის რიგითობა
const STATUS_FLOW = [
  "PENDING_REVIEW",
  "ACCEPTED",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "REJECTED",
] as const;

export function RequestDetail() {
  const { id } = useParams();
  const request = useRequestsStore((s) => s.requests.find((r) => r.id === id));

  if (!request) {
    return (
      <Card>
      <p className="text-center text-red-500 mt-10 text-lg">
        Request not found
      </p>
      </Card>
    );
  }

  return (
    <DashboardLayout role="USER">
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <h1 className="text-2xl font-bold mb-3 text-white">
            {request.route.origin.city}, {request.route.origin.country} →{" "}
            {request.route.destination.city}, {request.route.destination.country}
          </h1>
          <Badge status={request.status} />

          {/* სტატუსების flow */}
          <ul className="mt-6 space-y-3">
            {STATUS_FLOW.map((status) => (
              <li
                key={status}
                className={`p-3 rounded-md ${
                  request.status === status
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {STATUS_LABELS[status] || status}
              </li>
            ))}
          </ul>

          {/* დამატებითი ინფო */}
          <div className="mt-6 text-sm text-gray-400">
            <p>
              Parcel: {request.parcel.weightKg}kg • {request.parcel.kind} •
              Declared Value: ${request.parcel.declaredValue}
            </p>
            {request.parcel.fragile && (
              <p className="text-red-400 font-medium mt-1">⚠️ Fragile</p>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
