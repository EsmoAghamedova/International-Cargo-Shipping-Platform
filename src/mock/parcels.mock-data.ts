import type { ParcelRequest } from '../types';

export const mockParcels: ParcelRequest[] = [
  {
    id: 'req-1',
    userId: 'user-1',
    parcel: {
      weightKg: 2.5,
      lengthCm: 30,
      widthCm: 20,
      heightCm: 10,
      kind: 'DOCUMENTS',
      declaredValue: 100,
      fragile: false,
    },
    route: {
      origin: { city: 'Tbilisi', country: 'Georgia' },
      destination: { city: 'Baku', country: 'Azerbaijan' },
      pickupAddress: {
        city: 'Tbilisi',
        country: 'Georgia',
        street: 'Rustaveli Ave 10',
        postalCode: '0108',
      },
      deliveryAddress: {
        city: 'Baku',
        country: 'Azerbaijan',
        street: 'Nizami St 5',
        postalCode: 'AZ1000',
      },
    },
    shippingType: 'EXPRESS',
    status: 'IN_TRANSIT',
    createdAt: '2025-09-07T10:30:00Z',
    trackingId: 'TRK123456',
  },
  {
    id: 'req-2',
    userId: 'user-2',
    parcel: {
      weightKg: 10,
      lengthCm: 50,
      widthCm: 40,
      heightCm: 30,
      kind: 'GOODS',
      declaredValue: 500,
      fragile: true,
    },
    route: {
      origin: { city: 'Batumi', country: 'Georgia' },
      destination: { city: 'Istanbul', country: 'Turkey' },
      pickupAddress: {
        city: 'Batumi',
        country: 'Georgia',
        street: 'Chavchavadze St 15',
        postalCode: '6000',
      },
      deliveryAddress: {
        city: 'Istanbul',
        country: 'Turkey',
        street: 'Istiklal Ave 50',
        postalCode: '34000',
      },
    },
    shippingType: 'STANDARD',
    status: 'PENDING_REVIEW',
    createdAt: '2025-09-06T08:00:00Z',
  },
];
