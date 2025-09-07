import { v4 as uuid } from 'uuid';
import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import type { ParcelRequest, ShippingType } from '../../types';
import { useNavigate } from 'react-router-dom';

export function CreateRequestPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const addRequest = useRequestsStore((s) => s.addRequest);
  const navigate = useNavigate(); // 👈 react-router hook

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

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
    const declaredValue = parseFloat(
      (form.elements.namedItem('value') as HTMLInputElement).value,
    );

    const origin = (form.elements.namedItem('origin') as HTMLInputElement)
      .value;
    const destination = (
      form.elements.namedItem('destination') as HTMLInputElement
    ).value;
    const pickup = (form.elements.namedItem('pickup') as HTMLInputElement)
      .value;
    const delivery = (form.elements.namedItem('delivery') as HTMLInputElement)
      .value;

    const shippingType = (
      form.elements.namedItem('shippingType') as HTMLSelectElement
    ).value as ShippingType;

    const newRequest: ParcelRequest = {
      id: uuid(),
      userId: currentUser!.id,
      parcel: {
        weightKg,
        lengthCm,
        widthCm,
        heightCm,
        kind,
        declaredValue,
        fragile: false,
      },
      route: {
        origin: { city: origin, country: 'Georgia' },
        destination: { city: destination, country: 'Georgia' },
        pickupAddress: { city: pickup, country: 'Georgia' },
        deliveryAddress: { city: delivery, country: 'Georgia' },
      },
      shippingType,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
    };

    addRequest(newRequest);

    // 🚀 Instead of alert, redirect to dashboard
    navigate('/client/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 shadow-md rounded-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold mb-2">📦 Create Shipment Request</h2>

      {/* Parcel Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Parcel Information
        </h3>
        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="grid grid-cols-3 gap-3">
          <input
            name="length"
            type="number"
            placeholder="Length (cm)"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="width"
            type="number"
            placeholder="Width (cm)"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <select
          name="type"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="DOCUMENTS">Documents</option>
          <option value="GOODS">Goods</option>
        </select>

        <input
          name="value"
          type="number"
          placeholder="Declared Value ($)"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Route Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Route Information
        </h3>
        <input
          name="origin"
          placeholder="Origin City"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="destination"
          placeholder="Destination City"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="pickup"
          placeholder="Pickup Address"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="delivery"
          placeholder="Delivery Address"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Shipping Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Shipping Type
        </h3>
        <select
          name="shippingType"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="STANDARD">Standard</option>
          <option value="EXPRESS">Express</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg p-3 shadow-md"
      >
        🚀 Create Request
      </button>
    </form>
  );
}
