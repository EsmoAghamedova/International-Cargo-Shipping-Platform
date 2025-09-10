// src/mock/parcels.mock-data.ts
import type { ParcelRequest } from '../types';

export const mockParcelRequests: ParcelRequest[] = [
  {
    id: 'req1',
    userId: 'u1',
    companyId: 'c1',
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
      origin: {
        city: 'Tbilisi',
        country: 'GE',
        street: 'Rustaveli Ave 1',
        postalCode: '0101',
      },
      destination: {
        city: 'Baku',
        country: 'AZ',
        street: 'Nizami St 12',
        postalCode: '1000',
      },
      pickupAddress: {
        city: 'Tbilisi',
        country: 'GE',
        street: 'Rustaveli Ave 1',
        postalCode: '0101',
      },
      deliveryAddress: {
        city: 'Baku',
        country: 'AZ',
        street: 'Nizami St 12',
        postalCode: '1000',
      },
    },
    shippingType: 'STANDARD',
    status: 'PENDING_REVIEW',
    createdAt: '2025-09-01T10:00:00Z',
    trackingId: 'TRACK12345',
  },
  {
    id: 'req2',
    userId: 'u2',
    companyId: 'c1',
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
      origin: {
        city: 'Batumi',
        country: 'GE',
        street: 'Chavchavadze St 8',
        postalCode: '6000',
      },
      destination: {
        city: 'Istanbul',
        country: 'TR',
        street: 'Istiklal Cd 99',
        postalCode: '34000',
      },
      pickupAddress: {
        city: 'Batumi',
        country: 'GE',
        street: 'Chavchavadze St 8',
        postalCode: '6000',
      },
      deliveryAddress: {
        city: 'Istanbul',
        country: 'TR',
        street: 'Istiklal Cd 99',
        postalCode: '34000',
      },
    },
    shippingType: 'EXPRESS',
    status: 'IN_TRANSIT',
    createdAt: '2025-09-02T09:00:00Z',
    trackingId: 'TRACK67890',
  },
];
// Add more mock requests as needed
