// src/mock/company.mock-data.ts
import type { Company } from '../types';

export const mockCompanies: Company[] = [
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
];
