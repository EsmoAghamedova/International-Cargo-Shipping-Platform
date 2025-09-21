import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import type { Company, ShippingType } from '../../types';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../../services/AuthService';
import { useState } from 'react';

const REGION_OPTIONS = [
  { value: 'EU', label: 'Europe' },
  { value: 'ASIA', label: 'Asia' },
  { value: 'NA', label: 'North America' },
  { value: 'SA', label: 'South America' },
  { value: 'AF', label: 'Africa' },
  { value: 'OC', label: 'Oceania' },
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const contactEmail = (form.elements.namedItem('contactEmail') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;

    const hqAddress = {
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      street: (form.elements.namedItem('street') as HTMLInputElement).value,
    };

    const newCompany: Company = {
      id: uuid(),
      name,
      email: contactEmail,
      phone,
      hqAddress,
      regions: selectedRegions,
      supportedTypes: selectedTypes as ShippingType[],
      role: 'COMPANY_ADMIN',
      logoUrl: (form.elements.namedItem('logoUrl') as HTMLInputElement).value,
      basePrice: parseFloat((form.elements.namedItem('basePrice') as HTMLInputElement).value),
      pricePerKg: parseFloat((form.elements.namedItem('pricePerKg') as HTMLInputElement).value),
      fuelPct: parseFloat((form.elements.namedItem('fuelPct') as HTMLInputElement).value),
      insurancePct: parseFloat((form.elements.namedItem('insurancePct') as HTMLInputElement).value),
    };

    AuthService.registerCompany(newCompany);
    setCurrent(newCompany);
    navigate('/company/dashboard');
  }

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
    <div>
    <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow border border-gray-200"
>
  <h2 className="text-2xl font-bold text-purple-600 mb-2">Register Company</h2>

  {/* Basic info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input name="name" placeholder="Company Name" className="border p-2 rounded" required />
    <input name="contactEmail" type="email" placeholder="Contact Email" className="border p-2 rounded" required />
    <input name="phone" placeholder="Phone (optional)" className="border p-2 rounded md:col-span-2" />
  </div>

  {/* Address */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input name="country" placeholder="Country" className="border p-2 rounded" required />
    <input name="city" placeholder="City" className="border p-2 rounded" required />
    <input name="street" placeholder="Street" className="border p-2 rounded" required />
  </div>

  {/* Regions + Types */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="text-sm font-medium text-gray-600">Regions Served</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {REGION_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              value={opt.value}
              checked={selectedRegions.includes(opt.value)}
              onChange={handleRegionChange}
              className="accent-purple-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-600">Supported Shipping Types</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {TYPE_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              value={opt.value}
              checked={selectedTypes.includes(opt.value)}
              onChange={handleTypeChange}
              className="accent-purple-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  </div>

  {/* Pricing */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input name="basePrice" type="number" step="0.01" placeholder="Base Price" className="border p-2 rounded" required />
    <input name="pricePerKg" type="number" step="0.01" placeholder="Price per Kg" className="border p-2 rounded" required />
    <input name="fuelPct" type="number" step="0.01" placeholder="Fuel %" className="border p-2 rounded" required />
    <input name="insurancePct" type="number" step="0.01" placeholder="Insurance %" className="border p-2 rounded" required />
  </div>

  <input name="logoUrl" placeholder="Logo URL (optional)" className="border p-2 rounded" />

  <button
    type="submit"
    className="bg-purple-500 text-white rounded p-2 hover:bg-purple-600 transition w-full"
  >
    Register
  </button>
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

  );
}
