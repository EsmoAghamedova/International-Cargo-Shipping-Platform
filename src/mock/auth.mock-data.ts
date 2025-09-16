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
    id: 'company-1',
    name: 'CargoExpress LLC',
    email: 'admin@cargoexpress.com',
    role: 'COMPANY_ADMIN',
    basePrice: 50,
    pricePerKg: 2,
    fuelPct: 0.1, 
    insurancePct: 0.02, 
  },
];
