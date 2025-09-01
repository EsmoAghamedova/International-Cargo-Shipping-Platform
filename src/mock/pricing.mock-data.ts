import type { CompanyPricing, ShippingType } from '../types';

export const defaultTypeMultipliers: Record<ShippingType, number> = {
  SEA: 0.7,
  RAILWAY: 0.85,
  ROAD: 1.0,
  AIR: 1.6,
};

export const defaultPricing: CompanyPricing = {
  basePrice: 25, // საბაზისო ღირებულება
  pricePerKg: 6, // ფასი 1 კგ-ზე
  fuelPct: 0.12, // 12% fuel surcharge
  insurancePct: 0.02, // 2% declared value insurance
  typeMultipliers: defaultTypeMultipliers,
  remoteAreaPct: 0.15, // 15% surcharge remote რეგიონებზე
};
