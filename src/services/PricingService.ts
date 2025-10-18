import { apiClient } from '../lib/apiClient';
import type { ShippingType } from '../types';

export interface PricingQuotePayload {
  shippingType: ShippingType;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  origin: string;
  destination: string;
  declaredValue: number;
  includeInsurance?: boolean;
  extraSurcharges?: number;
}

export interface PricingQuoteResult {
  base: number;
  fuelSurcharge: number;
  insurance: number;
  extraSurcharges: number;
  total: number;
  breakdown: {
    volumetricWeight: number;
    chargeableWeight: number;
    typeMultiplier: number;
    distanceFactor: number;
  };
}

export interface PricingTier {
  id: string;
  label: string;
  description: string;
  basePrice: number;
  includedWeight: number;
  fuelSurchargePct: number;
  insurancePct: number;
  support: string;
}

export class PricingService {
  static calculatePrice(payload: PricingQuotePayload) {
    return apiClient.post<PricingQuoteResult>('/api/pricing/quote', payload);
  }

  static getTiers() {
    return apiClient.get<PricingTier[]>('/api/pricing/tiers');
  }
}
