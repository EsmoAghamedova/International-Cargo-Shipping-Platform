// src/pages/company/Pricing.tsx

import { useAuthStore } from "../../store/useAuthStore";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/common/CardComponent";

export function CompanyPricingPage() {
  const currentCompany = useAuthStore((s) => s.currentUser);

  if (!currentCompany || currentCompany.role !== "COMPANY_ADMIN") {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">
        Not authorized
      </p>
    );
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-green-400">
            Pricing Settings
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Here you can review your company’s shipping pricing.
          </p>
        </header>

        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-4">Base Pricing</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Base price: $50</li>
            <li>Price per Kg: $5</li>
            <li>Fuel surcharge: 10%</li>
            <li>Insurance: 2%</li>
            <li>Remote area surcharge: 15%</li>
          </ul>
        </Card>

        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-4">Type Multipliers</h2>
          <ul className="space-y-2 text-gray-300">
            <li>SEA: 0.7x</li>
            <li>RAILWAY: 0.85x</li>
            <li>ROAD: 1.0x</li>
            <li>AIR: 1.6x</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
