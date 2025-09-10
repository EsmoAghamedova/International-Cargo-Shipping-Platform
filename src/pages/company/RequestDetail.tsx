import { useParams, Link } from "react-router-dom";
import { useRequestsStore } from "../../store/useRequestsStore";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Badge } from "../../components/common/Badge";
import { Card } from "../../components/common/CardComponent";

export function CompanyRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const request = useRequestsStore((s) =>
    s.requests.find((r) => r.id === id)
  );

  if (!request) {
    return (
      <DashboardLayout role="COMPANY_ADMIN">
        <p className="text-center text-red-500 mt-16 text-lg">
          Request not found
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
            Request Details
          </h1>
          <p className="text-gray-400 text-lg">
            Manage and review this parcel request.
          </p>
        </header>

        <Card className="p-6 bg-[#1a2338] border-0 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white">
              {request.route.origin.city} → {request.route.destination.city}
            </h2>
            <Badge status={request.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">Parcel Info</h3>
              <p>Weight: {request.parcel.weightKg}kg</p>
              <p>
                Dimensions: {request.parcel.lengthCm} × {request.parcel.widthCm}{" "}
                × {request.parcel.heightCm} cm
              </p>
              <p>Kind: {request.parcel.kind}</p>
              <p>Declared Value: ${request.parcel.declaredValue}</p>
              {request.parcel.fragile && <p>⚠️ Fragile</p>}
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Route</h3>
              <p>Origin: {request.route.origin.city}, {request.route.origin.country}</p>
              <p>Destination: {request.route.destination.city}, {request.route.destination.country}</p>
              <p>Pickup: {request.route.pickupAddress.city}</p>
              <p>Delivery: {request.route.deliveryAddress.city}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-400">Tracking ID: {request.trackingId ?? "N/A"}</p>
            <Link
              to="/company/requests"
              className="text-blue-400 text-sm hover:underline"
            >
              ← Back to Requests
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
