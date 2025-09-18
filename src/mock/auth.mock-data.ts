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
    id: 'c1',
    name: 'DHL',
    email: 'dhl@example.com',
    role: 'COMPANY_ADMIN',
    basePrice: 80,
    pricePerKg: 3,
    fuelPct: 0.12, // 12%
    insurancePct: 0.02, // 2%
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
  },
];
