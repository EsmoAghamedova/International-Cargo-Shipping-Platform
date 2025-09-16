import { v4 as uuid } from "uuid";
import { useAuthStore } from "../../store/useAuthStore";
import { useRequestsStore } from "../../store/useRequestsStore";
import type { ParcelRequest, ShippingType } from "../../types";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/DashboardLayout";
import { ParcelService } from "../../services/ParcelService";

// 🔑 ტესტისთვის უბრალოდ ჩამოვწეროთ კომპანიის mock-ები
const mockCompanies = [
  { id: "company1", name: "DHL" },
  { id: "company2", name: "FedEx" },
  { id: "company3", name: "UPS" },
];

function generateTrackingId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function CreateRequestPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const addRequest = useRequestsStore((s) => s.addRequest);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Form fields
    const weightKg = parseFloat((form.elements.namedItem("weight") as HTMLInputElement).value);
    const lengthCm = parseFloat((form.elements.namedItem("length") as HTMLInputElement).value);
    const widthCm = parseFloat((form.elements.namedItem("width") as HTMLInputElement).value);
    const heightCm = parseFloat((form.elements.namedItem("height") as HTMLInputElement).value);
    const kind = (form.elements.namedItem("type") as HTMLSelectElement).value as "DOCUMENTS" | "GOODS";

    const originCountry = (form.elements.namedItem("originCountry") as HTMLInputElement).value;
    const originCity = (form.elements.namedItem("originCity") as HTMLInputElement).value;
    const originStreet = (form.elements.namedItem("originStreet") as HTMLInputElement).value;

    const destinationCountry = (form.elements.namedItem("destinationCountry") as HTMLInputElement).value;
    const destinationCity = (form.elements.namedItem("destinationCity") as HTMLInputElement).value;
    const destinationStreet = (form.elements.namedItem("destinationStreet") as HTMLInputElement).value;

    const shippingType = (form.elements.namedItem("shippingType") as HTMLSelectElement).value as ShippingType;
    const companyId = (form.elements.namedItem("companyId") as HTMLSelectElement).value; // 👈 არჩეული კომპანია

    // კომპანიის ფასების წამოღება localStorage-დან
    const saved = localStorage.getItem(`company_pricing_${companyId}`);
    const companyPricing = saved
      ? JSON.parse(saved)
      : { basePrice: 10, pricePerKg: 2, fuelPct: 0.1, insurancePct: 0.05 };

    // გამოთვლა
    const parcel = { weightKg, lengthCm, widthCm, heightCm, kind, declaredValue: 0, fragile: false };
    const calculatedPrice = ParcelService.calculatePrice(parcel, companyPricing);

    // ახალი რექუესთი
    const newRequest: ParcelRequest = {
      id: uuid(),
      userId: currentUser!.id,
      companyId, // 👈 რომელი კომპანიას ეკუთვნის
      parcel: {
        ...parcel,
        declaredValue: calculatedPrice, // ფასს თვითონ ვუთითებთ
      },
      route: {
        origin: { country: originCountry, city: originCity, street: originStreet },
        destination: { country: destinationCountry, city: destinationCity, street: destinationStreet },
        pickupAddress: { country: originCountry, city: originCity, street: originStreet },
        deliveryAddress: { country: destinationCountry, city: destinationCity, street: destinationStreet },
      },
      shippingType,
      status: "PENDING_REVIEW",
      createdAt: new Date().toISOString(),
      trackingId: generateTrackingId(),
    };

    addRequest(newRequest);
    navigate("/client/dashboard");
  }

  return (
    <DashboardLayout role="USER">
      <h1 className="text-2xl font-bold text-white mb-4">Create Request</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-md rounded-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold mb-2">📦 Create Shipment Request</h2>

        {/* Parcel Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">Parcel Information</h3>
          <input name="weight" type="number" placeholder="Weight (kg)" className="w-full border p-3 rounded-lg" />
          <div className="grid grid-cols-3 gap-3">
            <input name="length" type="number" placeholder="Length (cm)" className="border p-3 rounded-lg" />
            <input name="width" type="number" placeholder="Width (cm)" className="border p-3 rounded-lg" />
            <input name="height" type="number" placeholder="Height (cm)" className="border p-3 rounded-lg" />
          </div>
          <select name="type" className="w-full border p-3 rounded-lg">
            <option value="DOCUMENTS">Documents</option>
            <option value="GOODS">Goods</option>
          </select>
        </div>

        {/* Route Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">Route Information</h3>

          <input name="originCountry" placeholder="Origin Country" className="w-full border p-3 rounded-lg" />
          <input name="originCity" placeholder="Origin City" className="w-full border p-3 rounded-lg" />
          <input name="originStreet" placeholder="Origin Street (e.g. Rustaveli Ave 1)" className="w-full border p-3 rounded-lg" />

          <input name="destinationCountry" placeholder="Destination Country" className="w-full border p-3 rounded-lg" />
          <input name="destinationCity" placeholder="Destination City" className="w-full border p-3 rounded-lg" />
          <input name="destinationStreet" placeholder="Destination Street (e.g. Taksim Square 5)" className="w-full border p-3 rounded-lg" />
        </div>

        {/* Shipping Type */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Shipping Type</h3>
          <select name="shippingType" className="w-full border p-3 rounded-lg">
            <option value="SEA">Sea</option>
            <option value="RAILWAY">Railway</option>
            <option value="ROAD">Road</option>
            <option value="AIR">Air</option>
          </select>
        </div>

        {/* Select Company */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Select Company</h3>
          <select name="companyId" className="w-full border p-3 rounded-lg">
            {mockCompanies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg p-3 shadow-md">
          🚀 Create Request
        </button>
      </form>
    </DashboardLayout>
  );
}
