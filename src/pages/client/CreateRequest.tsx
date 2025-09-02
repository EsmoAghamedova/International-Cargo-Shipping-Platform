import { useState } from 'react';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Stepper } from '../../components/common/Stepper';
import { useAuthStore } from '../../store/useAuthStore';
import { v4 as uuid } from 'uuid';
import { useRequestsStore } from '../../store/useRequestsStore';
import { Card } from '../../components/common/CardComponent.tsx';

export function CreateRequestPage() {
  const [step, setStep] = useState(0);

  // Parcel details
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [type, setType] = useState('box');
  const [value, setValue] = useState('');

  // Route info
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('door');
  const [delivery, setDelivery] = useState('door');

  // Shipping type
  const [shippingType, setShippingType] = useState('standard');

  // Stores
  const currentUser = useAuthStore((s) => s.currentUser);
  const addRequest = useRequestsStore((s) => s.addRequest);

  function handleBack() {
    setStep(step - 1);
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setStep(step + 1);
  }

  function handleSubmit() {
    if (!currentUser) {
      alert('Not logged in!');
      return;
    }

    const newRequest = {
      id: uuid(),
      userId: currentUser.id,
      parcel: {
        weight,
        dimensions: { length, width, height },
        type,
        value,
      },
      route: { origin, destination, pickup, delivery },
      shippingType,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
    };

    addRequest(newRequest);
    alert('Request submitted 🚀');
    setStep(0); // Reset form
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <Stepper
          steps={['Parcel Details', 'Route Info', 'Shipping Type', 'Summary']}
          currentStep={step}
        />

        {/* Step 1: Parcel Details */}
        {step === 0 && (
          <form onSubmit={handleNext} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-blue-400 mb-2">
              Parcel Details
            </h2>

            <Input
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-2">
              <Input
                label="Length (cm)"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <Input
                label="Width (cm)"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <Input
                label="Height (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <Select
              label="Parcel Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: 'doc', label: 'Document' },
                { value: 'box', label: 'Box' },
                { value: 'fragile', label: 'Fragile' },
              ]}
            />

            <Input
              label="Declared Value ($)"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Next →
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: Route Info */}
        {step === 1 && (
          <form onSubmit={handleNext} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-blue-400 mb-2">
              Route Information
            </h2>

            <Select
              label="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              options={[
                { value: 'tbilisi', label: 'Tbilisi' },
                { value: 'batumi', label: 'Batumi' },
                { value: 'baku', label: 'Baku' },
              ]}
            />

            <Select
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              options={[
                { value: 'istanbul', label: 'Istanbul' },
                { value: 'ankara', label: 'Ankara' },
                { value: 'berlin', label: 'Berlin' },
              ]}
            />

            <Select
              label="Pickup Method"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              options={[
                { value: 'door', label: 'Door Pickup' },
                { value: 'office', label: 'Drop at Office' },
              ]}
            />

            <Select
              label="Delivery Method"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              options={[
                { value: 'door', label: 'Door Delivery' },
                { value: 'office', label: 'Pickup Point' },
              ]}
            />

            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <Button type="submit" variant="primary">
                Next →
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Shipping Type */}
        {step === 2 && (
          <form onSubmit={handleNext} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-blue-400 mb-2">
              Shipping Type
            </h2>

            <Select
              label="Select Shipping"
              value={shippingType}
              onChange={(e) => setShippingType(e.target.value)}
              options={[
                { value: 'standard', label: 'Standard (3-5 days)' },
                { value: 'express', label: 'Express (1-2 days)' },
                { value: 'economy', label: 'Economy (5-7 days)' },
              ]}
            />

            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <Button type="submit" variant="primary">
                Next →
              </Button>
            </div>
          </form>
        )}

        {/* Step 4: Summary */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-blue-400 mb-2">Summary</h2>

            <ul className="text-sm space-y-2">
              <li>
                <strong>Weight:</strong> {weight} kg
              </li>
              <li>
                <strong>Dimensions:</strong> {length} x {width} x {height} cm
              </li>
              <li>
                <strong>Type:</strong> {type}
              </li>
              <li>
                <strong>Declared Value:</strong> ${value}
              </li>
              <li>
                <strong>Origin:</strong> {origin}
              </li>
              <li>
                <strong>Destination:</strong> {destination}
              </li>
              <li>
                <strong>Pickup:</strong> {pickup}
              </li>
              <li>
                <strong>Delivery:</strong> {delivery}
              </li>
              <li>
                <strong>Shipping:</strong> {shippingType}
              </li>
            </ul>

            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <Button type="button" variant="primary" onClick={handleSubmit}>
                Submit Request
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
