import { v4 as uuid } from 'uuid';
import { useAuthStore } from '../../store/useAuthStore';
import { useRequestsStore } from '../../store/useRequestsStore';
import type { ParcelRequest, ShippingType } from '../../types';

export function CreateRequestPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const addRequest = useRequestsStore((s) => s.addRequest);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // 🚀 პარამეტრების წამოღება
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
    alert('Request created successfully ✅');
    form.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-6 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold">Create Request</h2>
      <input
        name="weight"
        placeholder="Weight (kg)"
        className="border p-2 rounded"
      />
      <input
        name="length"
        placeholder="Length (cm)"
        className="border p-2 rounded"
      />
      <input
        name="width"
        placeholder="Width (cm)"
        className="border p-2 rounded"
      />
      <input
        name="height"
        placeholder="Height (cm)"
        className="border p-2 rounded"
      />
      <select name="type" className="border p-2 rounded">
        <option value="DOCUMENTS">Documents</option>
        <option value="GOODS">Goods</option>
      </select>
      <input
        name="value"
        placeholder="Declared Value"
        className="border p-2 rounded"
      />
      <input
        name="origin"
        placeholder="Origin City"
        className="border p-2 rounded"
      />
      <input
        name="destination"
        placeholder="Destination City"
        className="border p-2 rounded"
      />
      <input
        name="pickup"
        placeholder="Pickup Address"
        className="border p-2 rounded"
      />
      <input
        name="delivery"
        placeholder="Delivery Address"
        className="border p-2 rounded"
      />
      <select name="shippingType" className="border p-2 rounded">
        <option value="STANDARD">Standard</option>
        <option value="EXPRESS">Express</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white rounded p-2">
        Create
      </button>
    </form>
  );
}
