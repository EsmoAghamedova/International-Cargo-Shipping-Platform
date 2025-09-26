import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import type { Company, ShippingType } from '../../types';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../../services/AuthService';
import { useState } from 'react';

// Region options (checkboxes)
const REGION_OPTIONS = [
  { value: 'EU', label: 'Europe' },
  { value: 'ASIA', label: 'Asia' },
  { value: 'NA', label: 'North America' },
  { value: 'SA', label: 'South America' },
  { value: 'AF', label: 'Africa' },
  { value: 'OC', label: 'Oceania' },
];

// Shipping type options (checkboxes)
const TYPE_OPTIONS = [
  { value: 'AIR', label: 'Air' },
  { value: 'SEA', label: 'Sea' },
  { value: 'ROAD', label: 'Road' },
  { value: 'RAILWAY', label: 'Railway' },
];

export function RegisterCompanyPage() {
  // Track selected regions & shipping types
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Access global store and router navigation
  const setCurrent = useAuthStore((s) => s.setCurrent);
  const navigate = useNavigate();

  // Handle form submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Get form values
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const contactEmail = (
      form.elements.namedItem('contactEmail') as HTMLInputElement
    ).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;

    // HQ address
    const hqAddress = {
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      street: (form.elements.namedItem('street') as HTMLInputElement).value,
    };

    // Build new company object
    const newCompany: Company = {
      id: uuid(), // unique ID
      name,
      email: contactEmail,
      phone,
      hqAddress,
      regions: selectedRegions, // selected regions from checkboxes
      supportedTypes: selectedTypes as ShippingType[], // selected shipping types
      role: 'COMPANY_ADMIN', // role for access
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

    // Register company via service & set as current logged-in
    AuthService.registerCompany(newCompany);
    setCurrent(newCompany);

    // Redirect to dashboard
    navigate('/company/dashboard');
  }

  // Handle region checkbox change
  function handleRegionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setSelectedRegions((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  }

  // Handle shipping type checkbox change
  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Home link */}
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
            {/* Title */}
            <h2 className="text-xl font-bold text-blue-600 text-center">
              Register Company
            </h2>

            {/* Basic company info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="name"
                placeholder="Company Name"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="contactEmail"
                type="email"
                placeholder="Contact Email"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                name="country"
                placeholder="Country"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="city"
                placeholder="City"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="street"
                placeholder="Street"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Regions checkboxes */}
            <div>
              <label className="text-sm font-semibold text-blue-600">
                Regions Served
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {REGION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full cursor-pointer transition 
          ${
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
                      className="hidden" // hide the actual checkbox
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Shipping types checkboxes */}
            <div>
              <label className="text-sm font-semibold text-blue-600">
                Supported Shipping Types
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {TYPE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full cursor-pointer transition 
          ${
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
                      className="hidden" // hide the actual checkbox
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Pricing details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="basePrice"
                type="number"
                step="0.01"
                placeholder="Base Price"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="pricePerKg"
                type="number"
                step="0.01"
                placeholder="Price per Kg"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="fuelPct"
                type="number"
                step="0.01"
                placeholder="Fuel %"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="insurancePct"
                type="number"
                step="0.01"
                placeholder="Insurance %"
                className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Optional logo */}
            <input
              name="logoUrl"
              placeholder="Logo URL (optional)"
              className="border border-gray-300 bg-gray-50 text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          {/* Link to login if already registered */}
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
