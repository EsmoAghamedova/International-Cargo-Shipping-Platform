import type { AuthEntity } from '../types';

export const mockAuthEntities: AuthEntity[] = [
  {
    id: 'user-1',
    fullName: 'Esmira Aghamedova',
    email: 'esmira@example.com',
    addresses: [
      {
        city: 'Tbilisi',
        country: 'Georgia',
        street: 'Rustaveli Ave 10',
        postalCode: '0108',
      },
    ],
    role: 'USER',
  },
  {
    id: 'user-2',
    fullName: 'Levan Giorgadze',
    email: 'levan@example.com',
    addresses: [
      {
        city: 'Batumi',
        country: 'Georgia',
        street: 'Chavchavadze St 15',
        postalCode: '6000',
      },
    ],
    role: 'USER',
  },
  {
    id: 'c1',
    name: 'DHL',
    email: 'dhl@example.com',
    role: 'COMPANY_ADMIN',
    basePrice: 80,
    pricePerKg: 3,
    fuelPct: 0.12, // 12%
    insurancePct: 0.02, // 2%
    hqAddress: {
      country: 'USA',
      city: 'New York',
      street: '123 5th Ave',
    },
    phone: '+1 212-555-1234',
    regions: ['NA', 'EU'],
    supportedTypes: ['AIR', 'ROAD'],
    logoUrl: 'https://logo.clearbit.com/dhl.com',
  },
  {
    id: 'c2',
    name: 'FedEx',
    email: 'fedex@example.com',
    role: 'COMPANY_ADMIN',
    basePrice: 75,
    pricePerKg: 2.8,
    fuelPct: 0.1,
    insurancePct: 0.015,
    hqAddress: {
      country: 'USA',
      city: 'Memphis',
      street: '942 S Shady Grove Rd',
    },
    phone: '+1 901-555-5678',
    regions: ['NA', 'EU', 'ASIA'],
    supportedTypes: ['AIR', 'SEA', 'ROAD'],
    logoUrl: 'https://logo.clearbit.com/fedex.com',
  },
  {
    id: 'c3',
    name: 'Maersk',
    email: 'maersk@mail.com',
    role: 'COMPANY_ADMIN',
    basePrice: 60,
    pricePerKg: 1.5,
    fuelPct: 0.08,
    insurancePct: 0.01,
    hqAddress: {
      country: 'Denmark',
      city: 'Copenhagen',
      street: 'Esplanaden 50',
    },
    phone: '+45 33 63 33 63',
    regions: ['EU', 'ASIA', 'AFRICA', 'SA'],
    supportedTypes: ['SEA', 'RAILWAY'],
    logoUrl: 'https://logo.clearbit.com/maersk.com',
  },
  {
    id: 'c4',
    name: 'LocalExpress',
    email: 'localexpress@mail.com',
    role: 'COMPANY_ADMIN',
    basePrice: 50,
    pricePerKg: 2.5,
    fuelPct: 0.09,
    insurancePct: 0.025,
    hqAddress: {
      country: 'Georgia',
      city: 'Tbilisi',
      street: 'Freedom Square 1',
    },
    phone: '+995 32 2 123456',
    regions: ['EU'],
    supportedTypes: ['ROAD'],
    logoUrl: 'https://logo.clearbit.com/localexpress.ge',
  }
];
