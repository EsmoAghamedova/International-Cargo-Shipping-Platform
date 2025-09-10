import { useRequestsStore } from "../../store/useRequestsStore";
import { useAuthStore } from "../../store/useAuthStore";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/common/CardComponent";
import { Badge } from "../../components/common/Badge";
import { Link } from "react-router-dom";

export function CompanyRequestsPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const requests = useRequestsStore((s) =>
    s.requests.filter((r) => r.companyId === currentUser?.id)
  );

  if (!currentUser || currentUser.role !== "COMPANY_ADMIN") {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">
        Access denied. Only companies can view this page.
      </p>
    );
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
            All Requests
          </h1>
          <p className="text-gray-400 text-lg">
            Here are all the requests assigned to your company.
          </p>
        </header>

        {requests.length === 0 ? (
          <Card className="text-center py-10 bg-[#1a2338] border-0">
            <p className="text-gray-400 text-lg">
              No requests yet. They will appear here once users send them.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <Card
                key={req.id}
                className="p-5 bg-[#1a2338] border-0 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg text-white">
                      {req.route.origin.city} → {req.route.destination.city}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {req.parcel.weightKg}kg • {req.parcel.kind} •{" "}
                      {req.shippingType}
                    </p>
                  </div>
                  <Badge status={req.status} />
                </div>
                <Link
                  to={`/company/requests/${req.id}`}
                  className="text-blue-400 text-sm mt-2 inline-block hover:underline"
                >
                  View details →
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
