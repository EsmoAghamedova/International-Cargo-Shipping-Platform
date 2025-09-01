import type { Company } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'FastCargo Ltd',
    contactEmail: 'admin@fastcargo.com',
    phone: '+995500333444',
    hqAddress: {
      id: 'hq1',
      country: 'GE',
      city: 'Batumi',
      line1: 'Port Street 5',
      postalCode: '6000',
    },
    regions: ['GE', 'TR', 'AZ'],
    supportedTypes: ['ROAD', 'SEA'],
    pricing: {
      basePrice: 20,
      pricePerKg: 5,
      fuelPct: 0.1, // 10%
      insurancePct: 0.02, // 2%
      typeMultipliers: { SEA: 0.7, RAILWAY: 0.85, ROAD: 1.0, AIR: 1.6 },
      remoteAreaPct: 0.15,
    },
    role: 'COMPANY_ADMIN',
    logoUrl: 'https://placehold.co/100x100',
  },
  {
    id: 'c2',
    name: 'SkyExpress',
    contactEmail: 'contact@skyexpress.com',
    phone: '+995500555666',
    hqAddress: {
      id: 'hq2',
      country: 'GE',
      city: 'Tbilisi',
      line1: 'Airport Highway 1',
      postalCode: '0101',
    },
    regions: ['GE', 'EU'],
    supportedTypes: ['AIR'],
    pricing: {
      basePrice: 50,
      pricePerKg: 10,
      fuelPct: 0.15, // 15%
      insurancePct: 0.03, // 3%
      typeMultipliers: { SEA: 0.7, RAILWAY: 0.85, ROAD: 1.0, AIR: 1.6 },
      remoteAreaPct: 0.2,
    },
    role: 'COMPANY_ADMIN',
    logoUrl: 'https://placehold.co/120x80',
  },
];
