// src/pages/company/Pricing.tsx

import { DashboardLayout } from "../../components/DashboardLayout";
import { useAuthStore } from "../../store/useAuthStore";
import { Card } from "../../components/common/CardComponent";
import { mockPricing } from "../../mock/pricing.mock-data";

export function CompanyPricingPage() {
  const currentUser = useAuthStore((s) => s.currentUser);

  if (!currentUser || currentUser.role !== "COMPANY_ADMIN") {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">
        Unauthorized – only company admins can access this page.
      </p>
    );
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-blue-400">Company Pricing</h1>
          <p className="text-gray-400 text-lg">
            Manage your pricing strategy for shipments
          </p>
        </header>

        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-4">
            Current Pricing
          </h2>
          <ul className="text-gray-300 space-y-3">
            {mockPricing.map((rule) => (
              <li
                key={rule.shippingType}
                className="flex justify-between border-b border-gray-700 pb-2"
              >
                <span className="font-medium">{rule.shippingType}</span>
                <span>
                  Base: ${rule.basePrice} • Per Kg: ${rule.pricePerKg}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-4">
            Update Pricing
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPricing.map((rule) => (
              <div
                key={rule.shippingType}
                className="col-span-1 md:col-span-2 p-4 bg-gray-800 rounded-lg space-y-2"
              >
                <h3 className="text-white font-medium">
                  {rule.shippingType} Pricing
                </h3>
                <input
                  type="number"
                  defaultValue={rule.basePrice}
                  placeholder="Base Price"
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
                <input
                  type="number"
                  defaultValue={rule.pricePerKg}
                  placeholder="Price per Kg"
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
            ))}

            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded py-2 mt-4"
            >
              Save Changes
            </button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
