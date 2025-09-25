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

// --- helper: find continent by country ---
function findContinentByCountry(country: string): string | null {
  for (const [continent, countries] of Object.entries(countriesByContinent)) {
    if (countries.includes(country)) return continent;
  }
  return null;
}

const steps = [
  'Parcel Info',
  'Route Info',
  'Shipping Type',
  'Select Company',
  'Preview',
  'Payment',
];

export function CreateRequestPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const addRequest = useRequestsStore((s) => s.addRequest);
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [pricePreview, setPricePreview] = useState<ReturnType<
    typeof PricingService.calculatePrice
  > | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  // --- form state ---
  const [formData, setFormData] = useState({
    weight: '',
    length: '',
    width: '',
    height: '',
    kind: 'DOCUMENTS' as 'DOCUMENTS' | 'GOODS',

    originCountry: '',
    originCity: '',
    originStreet: '',
    destinationCountry: '',
    destinationCity: '',
    destinationStreet: '',

    shippingType: '' as ShippingType | '',
    companyId: '',
  });

  // --- load companies ---
  useEffect(() => {
    const saved = localStorage.getItem('companies-storage');
    const localCompanies: Company[] = saved ? JSON.parse(saved) : [];
    setCompanies([...mockCompanies, ...localCompanies]);
  }, []);

  // --- handle change ---
  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  // --- calculate preview ---
  useEffect(() => {
    try {
      const {
        weight,
        length,
        width,
        height,
        shippingType,
        companyId,
        originCountry,
        destinationCountry,
      } = formData;

      if (
        !weight ||
        !length ||
        !width ||
        !height ||
        !shippingType ||
        !companyId
      ) {
        setPricePreview(null);
        return;
      }

      const result = PricingService.calculatePrice({
        shippingType: shippingType as ShippingType,
        weightKg: parseFloat(weight),
        lengthCm: parseFloat(length),
        widthCm: parseFloat(width),
        heightCm: parseFloat(height),
        origin: originCountry || 'EU',
        destination: destinationCountry || 'ASIA',
        declaredValue: 0,
        companyId,
      });

      setPricePreview(result);
    } catch {
      setPricePreview(null);
    }
  }, [formData]);

  // --- submit ---
  function handleSubmit() {
    const {
      weight,
      length,
      width,
      height,
      kind,
      shippingType,
      companyId,
      originCountry,
      originCity,
      originStreet,
      destinationCountry,
      destinationCity,
      destinationStreet,
    } = formData;

    const newRequest: ParcelRequest = {
      id: uuid(),
      userId: currentUser!.id,
      companyId,
      parcel: {
        weightKg: parseFloat(weight),
        lengthCm: parseFloat(length),
        widthCm: parseFloat(width),
        heightCm: parseFloat(height),
        kind,
        declaredValue: Number(pricePreview?.total ?? 0),
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
      shippingType: shippingType as ShippingType,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
      trackingId: generateTrackingId(),
    };

    addRequest(newRequest);
    navigate('/client/dashboard');
  }

  // --- filtered companies ---
  const filteredCompanies = companies.filter((c) => {
    const matchesType = formData.shippingType
      ? c.supportedTypes.includes(formData.shippingType as ShippingType)
      : true;

    let matchesRegion = true;
    if (formData.destinationCountry) {
      const continent = findContinentByCountry(formData.destinationCountry);
      matchesRegion = continent ? c.regions.includes(continent) : false;
    }

    return matchesType && matchesRegion;
  });

  // --- validation per step ---
  function isStepValid(step: number): boolean {
    switch (step) {
      case 0:
        return !!(
          formData.weight &&
          formData.length &&
          formData.width &&
          formData.height
        );
      case 1:
        return !!(
          formData.originCountry &&
          formData.originCity &&
          formData.originStreet &&
          formData.destinationCountry &&
          formData.destinationCity &&
          formData.destinationStreet
        );
      case 2:
        return !!formData.shippingType;
      case 3:
        return !!formData.companyId;
      case 4:
        return !!pricePreview;
      case 5:
        return isPaid;
      default:
        return true;
    }
  }

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>(
    'paypal',
  );
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  return (
    <DashboardLayout role="USER">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Create Request</h1>

      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={(s) => setCurrentStep(s)}
      />

      <div className="bg-white shadow-md rounded-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6 border border-gray-200">
        {/* Step Content */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Parcel Information
            </h3>
            <input
              value={formData.weight}
              onChange={(e) => updateField('weight', e.target.value)}
              placeholder="Weight (kg)"
              className="w-full border p-3 rounded-lg"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                value={formData.length}
                onChange={(e) => updateField('length', e.target.value)}
                placeholder="Length (cm)"
                className="border p-3 rounded-lg"
              />
              <input
                value={formData.width}
                onChange={(e) => updateField('width', e.target.value)}
                placeholder="Width (cm)"
                className="border p-3 rounded-lg"
              />
              <input
                value={formData.height}
                onChange={(e) => updateField('height', e.target.value)}
                placeholder="Height (cm)"
                className="border p-3 rounded-lg"
              />
            </div>
            <select
              value={formData.kind}
              onChange={(e) => updateField('kind', e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="DOCUMENTS">Documents</option>
              <option value="GOODS">Goods</option>
            </select>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Route Information
            </h3>
            <select
              value={formData.originCountry}
              onChange={(e) => updateField('originCountry', e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">Select Origin Country</option>
              {Object.entries(countriesByContinent).map(
                ([continent, countries]) => (
                  <optgroup key={continent} label={continent}>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                ),
              )}
            </select>
            <input
              value={formData.originCity}
              onChange={(e) => updateField('originCity', e.target.value)}
              placeholder="Origin City"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              value={formData.originStreet}
              onChange={(e) => updateField('originStreet', e.target.value)}
              placeholder="Origin Street"
              className="w-full border p-3 rounded-lg"
              required
            />
            <select
              value={formData.destinationCountry}
              onChange={(e) =>
                updateField('destinationCountry', e.target.value)
              }
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">Select Destination Country</option>
              {Object.entries(countriesByContinent).map(
                ([continent, countries]) => (
                  <optgroup key={continent} label={continent}>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                ),
              )}
            </select>
            <input
              value={formData.destinationCity}
              onChange={(e) => updateField('destinationCity', e.target.value)}
              placeholder="Destination City"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              value={formData.destinationStreet}
              onChange={(e) => updateField('destinationStreet', e.target.value)}
              placeholder="Destination Street"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Shipping Type
            </h3>
            <select
              value={formData.shippingType}
              onChange={(e) => updateField('shippingType', e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">Select Type</option>
              <option value="SEA">Sea</option>
              <option value="RAILWAY">Railway</option>
              <option value="ROAD">Road</option>
              <option value="AIR">Air</option>
            </select>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Select Company
            </h3>
            <select
              value={formData.companyId}
              onChange={(e) => updateField('companyId', e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">Select Company</option>
              {filteredCompanies.length === 0 ? (
                <option disabled>No companies available</option>
              ) : (
                filteredCompanies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {currentStep === 4 && (
          <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
            <h3 className="text-lg font-semibold mb-2">💰 Price Preview</h3>
            {pricePreview ? (
              <ul className="space-y-1 text-sm">
                <li>Base: ${pricePreview.base.toFixed(2)}</li>
                <li>
                  Fuel surcharge: ${pricePreview.fuelSurcharge.toFixed(2)}
                </li>
                <li>
                  Extra surcharges: ${pricePreview.extraSurcharges.toFixed(2)}
                </li>
                <li>Insurance: ${pricePreview.insurance.toFixed(2)}</li>
                <li className="font-bold text-green-600">
                  Total: ${pricePreview.total.toFixed(2)}
                </li>
              </ul>
            ) : (
              <p className="text-gray-500">
                Fill details to see estimated price
              </p>
            )}
          </div>
        )}

        {currentStep === 5 && (
          <div className="text-center space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              💳 Payment
            </h3>
            <p className="text-gray-600">
              Total amount: <b>${pricePreview?.total.toFixed(2)}</b>
            </p>

            {/* Tab selector */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                type="button"
                onClick={() => !isPaid && setPaymentMethod('paypal')}
                className={`px-4 py-2 rounded-lg transition border ${
                  paymentMethod === 'paypal'
                    ? 'bg-yellow-400 text-white border-yellow-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } ${isPaid && paymentMethod !== 'paypal' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isPaid && paymentMethod !== 'paypal'}
              >
                PayPal
              </button>
              <button
                type="button"
                onClick={() => !isPaid && setPaymentMethod('card')}
                className={`px-4 py-2 rounded-lg transition border ${
                  paymentMethod === 'card'
                    ? 'bg-yellow-400 text-white border-yellow-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } ${isPaid && paymentMethod !== 'card' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isPaid && paymentMethod !== 'card'}
              >
                Credit Card
              </button>
            </div>

            {/* Tab content */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md mx-auto space-y-4">
              {paymentMethod === 'paypal' && (
                <>
                  <p className="text-gray-600">
                    Click the button below to simulate PayPal payment:
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsPaid(true)}
                    className={`px-6 py-3 rounded-lg transition w-full ${
                      isPaid && paymentMethod === 'paypal'
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={isPaid}
                  >
                    {isPaid && paymentMethod === 'paypal'
                      ? '✅ Paid with PayPal'
                      : 'Pay with PayPal'}
                  </button>
                </>
              )}

              {paymentMethod === 'card' && (
                <>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border p-3 rounded-lg"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    disabled={isPaid}
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 border p-3 rounded-lg"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      disabled={isPaid}
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-1/2 border p-3 rounded-lg"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      disabled={isPaid}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPaid(true)}
                    className={`px-6 py-3 rounded-lg transition w-full ${
                      isPaid && paymentMethod === 'card'
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={isPaid || !cardNumber || !cardExpiry || !cardCvc}
                  >
                    {isPaid && paymentMethod === 'card'
                      ? '✅ Paid with Card'
                      : 'Pay with Card'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              ← Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!isStepValid(currentStep)}
              className={`ml-auto px-4 py-2 rounded-lg transition ${
                isStepValid(currentStep)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className={`ml-auto px-4 py-2 rounded-lg transition ${
                isStepValid(currentStep)
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🚀 Submit Request
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
