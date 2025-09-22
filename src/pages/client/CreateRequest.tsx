import { v4 as uuid } from 'uuid';
import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import type { ParcelRequest, ShippingType, Company } from '../../types';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import { mockCompanies } from '../../mock/company.mock-data';
import { PricingService } from '../../services/PricingService';
import { countriesByContinent } from '../../services/DistanceService';
import { Stepper } from '../../components/common/Stepper';

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

  // form values for filtering companies
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [shippingType, setShippingType] = useState<ShippingType | ''>('');

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
      return result;
    } catch {
      setPricePreview(null);
      return null;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

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
        declaredValue: Number(priceResult?.total ?? 0),
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

  // filter companies
  const filteredCompanies = companies.filter((c) => {
    if (!shippingType || !originCountry || !destinationCountry) return true;
    const supportsType = c.supportedTypes.includes(shippingType);
    const supportsRegions =
      c.regions.includes(originCountry) &&
      c.regions.includes(destinationCountry);
    return supportsType && supportsRegions;
  });

  return (
    <DashboardLayout role="USER">
      {/* Stepper (styled) */}
      <Stepper
        steps={['Parcel Info', 'Route Info', 'Shipping', 'Company', 'Preview']}
        currentStep={3}
      />

      <h1 className="text-2xl font-bold text-blue-600 mb-4">Create Request</h1>
      <form
        onSubmit={handleSubmit}
        onChange={(e) => calculatePreview(e.currentTarget)}
        className="bg-white shadow-md rounded-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          📦 Create Shipment Request
        </h2>

        {/* Parcel Info */}
        {/* ... unchanged ... */}

        {/* Route Info */}
        {/* ... unchanged ... */}

        {/* Shipping Type */}
        {/* ... unchanged ... */}

        {/* Company Select */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Select Company
          </h3>
          <select
            name="companyId"
            className="w-full border p-3 rounded-lg"
            required
          >
            {filteredCompanies.length === 0 ? (
              <option disabled>No companies available for this route</option>
            ) : (
              filteredCompanies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            ⚠️ Only companies that support your selected route and shipping type
            are displayed here.
          </p>
        </div>

        {/* 💰 Price Preview */}
        {/* ... unchanged ... */}

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
