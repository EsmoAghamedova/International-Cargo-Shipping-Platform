import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../../components/common/CardComponent';
import { useState, useEffect } from 'react';

export function CompanyPricingPage() {
  const currentUser = useAuthStore((s) => s.currentUser);

  if (!currentUser || currentUser.role !== 'COMPANY_ADMIN') {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">
        Unauthorized – only company admins can access this page.
      </p>
    );
  }

  // localStorage key unique company-id-ზე
  const storageKey = `company_pricing_${currentUser.id}`;

  const [pricing, setPricing] = useState({
    basePrice: currentUser.basePrice ?? 10,
    pricePerKg: currentUser.pricePerKg ?? 2,
    fuelPct: currentUser.fuelPct ?? 0.1,
    insurancePct: currentUser.insurancePct ?? 0.05,
  });

  // load from localStorage (პირველად render-ზე)
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setPricing(JSON.parse(saved));
    }
  }, [storageKey]);

  // handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: parseFloat(value) }));
  }

  // save to localStorage
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(pricing));
    alert('✅ Pricing saved to localStorage!');
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

        {/* Current Pricing */}
        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-4">
            Current Pricing
          </h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-medium">Base Price</span>
              <span>${pricing.basePrice}</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-medium">Price Per Kg</span>
              <span>${pricing.pricePerKg}</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-medium">Fuel %</span>
              <span>{pricing.fuelPct * 100}%</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-medium">Insurance %</span>
              <span>{pricing.insurancePct * 100}%</span>
            </li>
          </ul>
        </Card>

        {/* Update Pricing */}
        <Card className="p-6 bg-[#1a2338] border-0">
          <h2 className="text-xl font-semibold text-white mb-4">
            Update Pricing
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="number"
              name="basePrice"
              value={pricing.basePrice}
              onChange={handleChange}
              placeholder="Base Price"
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
            <input
              type="number"
              name="pricePerKg"
              value={pricing.pricePerKg}
              onChange={handleChange}
              placeholder="Price per Kg"
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
            <input
              type="number"
              step="0.01"
              name="fuelPct"
              value={pricing.fuelPct}
              onChange={handleChange}
              placeholder="Fuel %"
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
            <input
              type="number"
              step="0.01"
              name="insurancePct"
              value={pricing.insurancePct}
              onChange={handleChange}
              placeholder="Insurance %"
              className="w-full p-2 rounded bg-gray-900 text-white"
            />

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
