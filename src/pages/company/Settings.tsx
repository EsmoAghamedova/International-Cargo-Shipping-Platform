// src/pages/company/Settings.tsx
import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/common/CardComponent';
import type { Company, ShippingType } from '../../types';

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

export function CompanySettingsPage() {
  const current = useAuthStore((s) => s.currentUser);
  const setCurrent = useAuthStore((s) => s.setCurrent);

  if (!current || current.role !== 'COMPANY_ADMIN') {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">Not authorized</p>
    );
  }
  const currentCompany = current as Company;

  const [form, setForm] = useState({
    name: currentCompany.name,
    email: currentCompany.email,
    phone: currentCompany.phone || '',
    country: currentCompany.hqAddress?.country || '',
    city: currentCompany.hqAddress?.city || '',
    street: currentCompany.hqAddress?.street || '',
    logoUrl: currentCompany.logoUrl || '',
    regions: currentCompany.regions || [],
    supportedTypes: currentCompany.supportedTypes || [],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'regions' | 'supportedTypes',
  ) {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((v) => v !== value),
    }));
  }

  function handleSave() {
    const updated: Company = {
      ...currentCompany,
      name: form.name,
      email: form.email,
      phone: form.phone,
      hqAddress: {
        country: form.country,
        city: form.city,
        street: form.street,
      },
      logoUrl: form.logoUrl,
      regions: form.regions,
      supportedTypes: form.supportedTypes as ShippingType[],
    };
    setCurrent(updated);
    alert('✅ Company profile updated!');
  }

  return (
    <DashboardLayout role="COMPANY_ADMIN">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Company Settings
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage your company’s profile and preferences here.
          </p>
        </header>

        {/* Profile Info */}
        <Card className="p-6 bg-white border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Profile Information
          </h2>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Contact Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="Street"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <input
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
            placeholder="Logo URL"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          {form.logoUrl && (
            <img
              src={form.logoUrl}
              alt="Logo preview"
              className="h-16 mt-2 rounded-md shadow"
            />
          )}
        </Card>

        {/* Business Info */}
        <Card className="p-6 bg-white border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Business Information
          </h2>

          {/* Regions */}
          <div>
            <p className="font-medium text-gray-900 mb-2">Regions Served:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {REGION_OPTIONS.map((r) => (
                <label
                  key={r.value}
                  className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    value={r.value}
                    checked={form.regions.includes(r.value)}
                    onChange={(e) => handleCheckboxChange(e, 'regions')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Types */}
          <div>
            <p className="font-medium text-gray-900 mb-2">
              Supported Shipping Types:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TYPE_OPTIONS.map((t) => (
                <label
                  key={t.value}
                  className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 hover:bg-green-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    value={t.value}
                    checked={form.supportedTypes.includes(
                      t.value as ShippingType,
                    )}
                    onChange={(e) => handleCheckboxChange(e, 'supportedTypes')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{t.label}</span>
                </label>
              ))}
            </div>
          </div>
        </Card>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
        >
          💾 Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}
