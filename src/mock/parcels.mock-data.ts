import type { ParcelRequest } from '../types';

export const mockParcels: ParcelRequest[] = [
  {
    id: 'p1',
    userId: 'u1', // user.mock-data.ts -> Nino Beridze
    companyId: 'c1', // FastCargo Ltd
    shippingType: 'ROAD',
    parcel: {
      weightKg: 10,
      lengthCm: 40,
      widthCm: 30,
      heightCm: 20,
      kind: 'GOODS',
      declaredValue: 200,
      fragile: true,
    },
    route: {
      origin: {
        id: 'o1',
        country: 'GE',
        city: 'Tbilisi',
        line1: 'Rustaveli Ave 15',
        postalCode: '0108',
      },
      destination: {
        id: 'd1',
        country: 'TR',
        city: 'Istanbul',
        line1: 'Airport Cargo Terminal',
        postalCode: '34000',
      },
      pickupAddress: {
        id: 'p1',
        country: 'GE',
        city: 'Tbilisi',
        line1: 'Rustaveli Ave 15',
        postalCode: '0108',
      },
      deliveryAddress: {
        id: 'd2',
        country: 'TR',
        city: 'Istanbul',
        line1: 'Ataturk Blvd 25',
        postalCode: '34000',
      },
    },
    priceEstimate: 120,
    status: 'IN_TRANSIT',
    timeline: [
      { status: 'PENDING_REVIEW', at: '2025-08-15T08:00:00Z' },
      { status: 'ACCEPTED', at: '2025-08-15T10:00:00Z' },
      { status: 'IN_TRANSIT', at: '2025-08-16T12:00:00Z' },
    ],
    trackingId: 'TRK123456',
    messages: [
      {
        from: 'USER',
        text: 'When will it arrive?',
        at: '2025-08-16T15:00:00Z',
      },
      {
        from: 'COMPANY',
        text: 'Estimated delivery tomorrow.',
        at: '2025-08-16T16:00:00Z',
      },
    ],
  },
  {
    id: 'p2',
    userId: 'u2', // Giorgi Lomidze
    companyId: 'c2', // SkyExpress
    shippingType: 'AIR',
    parcel: {
      weightKg: 2,
      lengthCm: 20,
      widthCm: 15,
      heightCm: 10,
      kind: 'DOCUMENTS',
      declaredValue: 50,
    },
    route: {
      origin: {
        id: 'o2',
        country: 'GE',
        city: 'Kutaisi',
        line1: 'Main Square 12',
        postalCode: '4600',
      },
      destination: {
        id: 'd3',
        country: 'EU',
        city: 'Berlin',
        line1: 'Business Center 9',
        postalCode: '10115',
      },
      pickupAddress: {
        id: 'p2',
        country: 'GE',
        city: 'Kutaisi',
        line1: 'Main Square 12',
        postalCode: '4600',
      },
      deliveryAddress: {
        id: 'd4',
        country: 'EU',
        city: 'Berlin',
        line1: 'Alexanderplatz 2',
        postalCode: '10178',
      },
    },
    priceEstimate: 80,
    status: 'PENDING_REVIEW',
    timeline: [{ status: 'PENDING_REVIEW', at: '2025-08-18T09:00:00Z' }],
    trackingId: 'TRK987654',
    messages: [],
  },
];
