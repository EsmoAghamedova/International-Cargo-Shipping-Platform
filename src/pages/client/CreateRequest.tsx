import { v4 as uuid } from 'uuid';
import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import type { ParcelRequest, ShippingType, Company } from '../../types';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import { mockCompanies } from '../../mock/company.mock-data';
import { PricingService } from '../../services/PricingService';

function generateTrackingId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function CreateRequestPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const addRequest = useRequestsStore((s) => s.addRequest);
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [pricePreview, setPricePreview] = useState<ReturnType<
    typeof PricingService.calculatePrice
  > | null>(null);
  // 🚀 გავასწორე: key იგივეა რაც store-ში (companies)
  useEffect(() => {
    const saved = localStorage.getItem('companies-storage');
    const localCompanies: Company[] = saved ? JSON.parse(saved) : [];
    setCompanies([...mockCompanies, ...localCompanies]);
  }, []);

  function calculatePreview(form: HTMLFormElement) {
    try {
      const weightKg = parseFloat(
        (form.elements.namedItem('weight') as HTMLInputElement).value,
      );
      const lengthCm = parseFloat(
        (form.elements.namedItem('length') as HTMLInputElement).value,
      );
      const widthCm = parseFloat(
        (form.elements.namedItem('width') as HTMLInputElement).value,
      );
      const heightCm = parseFloat(
        (form.elements.namedItem('height') as HTMLInputElement).value,
      );
      const shippingType = (
        form.elements.namedItem('shippingType') as HTMLSelectElement
      ).value as ShippingType;
      const companyId = (
        form.elements.namedItem('companyId') as HTMLSelectElement
      ).value;
      const originCountry = (
        form.elements.namedItem('originCountry') as HTMLInputElement
      ).value;
      const destinationCountry = (
        form.elements.namedItem('destinationCountry') as HTMLInputElement
      ).value;

      if (
        !weightKg ||
        !lengthCm ||
        !widthCm ||
        !heightCm ||
        !shippingType ||
        !companyId
      ) {
        setPricePreview(null);
        return null;
      }

      const result = PricingService.calculatePrice({
        shippingType,
        weightKg,
        lengthCm,
        widthCm,
        heightCm,
        origin: originCountry || 'EU',
        destination: destinationCountry || 'ASIA',
        declaredValue: 0,
        companyId,
      });

      setPricePreview(result);
      return result; // ✅ ახლა აბრუნებს
    } catch {
      setPricePreview(null);
      return null;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // ✅ ყოველთვის დააბრუნებს რაღაცას
    const priceResult = pricePreview ?? calculatePreview(form);

    const weightKg = parseFloat(
      (form.elements.namedItem('weight') as HTMLInputElement).value,
    );
    const lengthCm = parseFloat(
      (form.elements.namedItem('length') as HTMLInputElement).value,
    );
    const widthCm = parseFloat(
      (form.elements.namedItem('width') as HTMLInputElement).value,
    );
    const heightCm = parseFloat(
      (form.elements.namedItem('height') as HTMLInputElement).value,
    );
    const kind = (form.elements.namedItem('type') as HTMLSelectElement)
      .value as 'DOCUMENTS' | 'GOODS';
    const shippingType = (
      form.elements.namedItem('shippingType') as HTMLSelectElement
    ).value as ShippingType;
    const companyId = (
      form.elements.namedItem('companyId') as HTMLSelectElement
    ).value;

    const originCountry = (
      form.elements.namedItem('originCountry') as HTMLInputElement
    ).value;
    const originCity = (
      form.elements.namedItem('originCity') as HTMLInputElement
    ).value;
    const originStreet = (
      form.elements.namedItem('originStreet') as HTMLInputElement
    ).value;

    const destinationCountry = (
      form.elements.namedItem('destinationCountry') as HTMLInputElement
    ).value;
    const destinationCity = (
      form.elements.namedItem('destinationCity') as HTMLInputElement
    ).value;
    const destinationStreet = (
      form.elements.namedItem('destinationStreet') as HTMLInputElement
    ).value;

    const newRequest: ParcelRequest = {
      id: uuid(),
      userId: currentUser!.id,
      companyId,
      parcel: {
        weightKg,
        lengthCm,
        widthCm,
        heightCm,
        kind,
        declaredValue: priceResult?.total ?? 0,
        fragile: false,
      },
      route: {
        origin: {
          country: originCountry,
          city: originCity,
          street: originStreet,
        },
        destination: {
          country: destinationCountry,
          city: destinationCity,
          street: destinationStreet,
        },
        pickupAddress: {
          country: originCountry,
          city: originCity,
          street: originStreet,
        },
        deliveryAddress: {
          country: destinationCountry,
          city: destinationCity,
          street: destinationStreet,
        },
      },
      shippingType,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
      trackingId: generateTrackingId(),
    };

    addRequest(newRequest);
    navigate('/client/dashboard');
  }

  return (
    <DashboardLayout role="USER">
      <h1 className="text-2xl font-bold text-white mb-4">Create Request</h1>
      <form
        onSubmit={handleSubmit}
        onChange={(e) => calculatePreview(e.currentTarget)}
        className="bg-gray-800 shadow-md rounded-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold mb-2">📦 Create Shipment Request</h2>

        {/* Parcel Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">
            Parcel Information
          </h3>
          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            className="w-full border p-3 rounded-lg"
            required
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              name="length"
              type="number"
              placeholder="Length (cm)"
              className="border p-3 rounded-lg"
              required
            />
            <input
              name="width"
              type="number"
              placeholder="Width (cm)"
              className="border p-3 rounded-lg"
              required
            />
            <input
              name="height"
              type="number"
              placeholder="Height (cm)"
              className="border p-3 rounded-lg"
              required
            />
          </div>
          <select name="type" className="w-full border p-3 rounded-lg" required>
            <option value="DOCUMENTS">Documents</option>
            <option value="GOODS">Goods</option>
          </select>
        </div>

        {/* Route Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">
            Route Information
          </h3>
          <input
            name="originCountry"
            placeholder="Origin Country"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            name="originCity"
            placeholder="Origin City"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            name="originStreet"
            placeholder="Origin Street"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            name="destinationCountry"
            placeholder="Destination Country"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            name="destinationCity"
            placeholder="Destination City"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            name="destinationStreet"
            placeholder="Destination Street"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* Shipping Type */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Shipping Type
          </h3>
          <select
            name="shippingType"
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="SEA">Sea</option>
            <option value="RAILWAY">Railway</option>
            <option value="ROAD">Road</option>
            <option value="AIR">Air</option>
          </select>
        </div>

        {/* Company Select */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Select Company
          </h3>
          <select
            name="companyId"
            className="w-full border p-3 rounded-lg"
            required
          >
            {companies.length === 0 ? (
              <option disabled>No companies available</option>
            ) : (
              companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* 💰 Price Preview */}
        <div className="p-4 bg-gray-900 rounded-lg text-gray-200">
          <h3 className="text-lg font-semibold mb-2">💰 Price Preview</h3>
          {pricePreview ? (
            <ul className="space-y-1 text-sm">
              <li>Base: ${pricePreview.base.toFixed(2)}</li>
              <li>Fuel surcharge: ${pricePreview.fuelSurcharge.toFixed(2)}</li>
              <li>
                Remote surcharge: ${pricePreview.remoteSurcharge.toFixed(2)}
              </li>
              <li>Insurance: ${pricePreview.insurance.toFixed(2)}</li>
              <li className="font-bold text-green-400">
                Total: ${pricePreview.total.toFixed(2)}
              </li>
            </ul>
          ) : (
            <p className="text-gray-400">Fill details to see estimated price</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg p-3 shadow-md"
        >
          🚀 Create Request
        </button>
      </form>
    </DashboardLayout>
  );
}
