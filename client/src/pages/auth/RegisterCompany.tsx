// src/pages/company/RegisterCompanyPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import type { ShippingType } from '../../types';
import { AuthService } from '../../services/AuthService';

// Region & Type options
const REGION_OPTIONS = [
  { value: 'EU', label: 'Europe' },
  { value: 'ASIA', label: 'Asia' },
  { value: 'N_AMERICA', label: 'North America' },
  { value: 'S_AMERICA', label: 'South America' },
  { value: 'AFRICA', label: 'Africa' },
  { value: 'OCEANIA', label: 'Oceania' },
];

const TYPE_OPTIONS = [
  { value: 'AIR', label: 'Air' },
  { value: 'SEA', label: 'Sea' },
  { value: 'ROAD', label: 'Road' },
  { value: 'RAILWAY', label: 'Railway' },
];

export function RegisterCompanyPage() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const setCurrent = useAuthStore((s) => s.setCurrent);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Query mutation for registering company
  const registerCompanyMutation = useMutation({
    mutationFn: (payload: Parameters<typeof AuthService.registerCompany>[0]) =>
      AuthService.registerCompany(payload),
    onSuccess: (company) => {
      setCurrent(company); // set current logged-in company in Zustand
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      navigate('/company/dashboard'); // redirect after success
    },
  });

  // Form submit handler
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('contactEmail') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      hqAddress: {
        country: (form.elements.namedItem('country') as HTMLInputElement).value,
        city: (form.elements.namedItem('city') as HTMLInputElement).value,
        street: (form.elements.namedItem('street') as HTMLInputElement).value,
      },
      regions: selectedRegions,
      supportedTypes: selectedTypes as ShippingType[],
      logoUrl: (form.elements.namedItem('logoUrl') as HTMLInputElement).value,
      basePrice: parseFloat(
        (form.elements.namedItem('basePrice') as HTMLInputElement).value,
      ),
      pricePerKg: parseFloat(
        (form.elements.namedItem('pricePerKg') as HTMLInputElement).value,
      ),
      fuelPct: parseFloat(
        (form.elements.namedItem('fuelPct') as HTMLInputElement).value,
      ),
      insurancePct: parseFloat(
        (form.elements.namedItem('insurancePct') as HTMLInputElement).value,
      ),
    };

    registerCompanyMutation.mutate(payload);
  }

  // Checkbox change handlers
  function handleRegionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setSelectedRegions((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          Home
        </Link>
      </header>

      {/* Main form */}
      <main className="flex flex-1 items-center justify-center px-4 pt-10">
        <div className="w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-6 bg-white rounded-xl shadow border border-gray-200"
          >
            <h2 className="text-xl font-bold text-blue-600 text-center">
              Register Company
            </h2>

            {/* Basic info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="name"
                placeholder="Company Name"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="contactEmail"
                type="email"
                placeholder="Contact Email"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                name="country"
                placeholder="Country"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="city"
                placeholder="City"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="street"
                placeholder="Street"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Regions */}
            <div>
              <label className="text-sm font-semibold text-blue-600">
                Regions Served
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {REGION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full cursor-pointer transition ${
                      selectedRegions.includes(opt.value)
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={selectedRegions.includes(opt.value)}
                      onChange={handleRegionChange}
                      className="hidden"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Shipping types */}
            <div>
              <label className="text-sm font-semibold text-blue-600">
                Supported Shipping Types
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {TYPE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full cursor-pointer transition ${
                      selectedTypes.includes(opt.value)
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={selectedTypes.includes(opt.value)}
                      onChange={handleTypeChange}
                      className="hidden"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="basePrice"
                type="number"
                step="0.01"
                placeholder="Base Price"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="pricePerKg"
                type="number"
                step="0.01"
                placeholder="Price per Kg"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="fuelPct"
                type="number"
                step="0.01"
                placeholder="Fuel %"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="insurancePct"
                type="number"
                step="0.01"
                placeholder="Insurance %"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Optional logo */}
            <input
              name="logoUrl"
              placeholder="Logo URL (optional)"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
              disabled={registerCompanyMutation.isPending}
            >
              {registerCompanyMutation.isPending
                ? 'Registering...'
                : 'Register'}
            </button>

            {registerCompanyMutation.isError && (
              <p className="text-sm text-red-500 text-center">
                {(registerCompanyMutation.error as Error).message}
              </p>
            )}
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              Do you have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
