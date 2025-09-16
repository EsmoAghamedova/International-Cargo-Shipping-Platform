// src/mock/pricing.mock-data.ts

export interface PricingRule {
  shippingType: 'SEA' | 'RAILWAY' | 'ROAD' | 'AIR';
  basePrice: number;
  pricePerKg: number;
  typeMultiplier: number;
}

export const mockPricing: PricingRule[] = [
  { shippingType: 'SEA', basePrice: 50, pricePerKg: 1.5, typeMultiplier: 0.7 },
  { shippingType: 'RAILWAY', basePrice: 60, pricePerKg: 2, typeMultiplier: 0.85 },
  { shippingType: 'ROAD', basePrice: 70, pricePerKg: 2.5, typeMultiplier: 1.0 },
  { shippingType: 'AIR', basePrice: 100, pricePerKg: 3.5, typeMultiplier: 1.6 },
];

// Distance factors
export const distanceFactors: Record<string, number> = {
  'EU-EU': 1.0,
  'EU-ASIA': 1.3,
  'GLOBAL-REMOTE': 1.6,
};

// Extra surcharges
export const remotePct = 0.15; // 15% surcharge for remote areas
