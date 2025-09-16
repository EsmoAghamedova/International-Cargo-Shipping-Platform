// src/services/PricingService.ts
import { mockPricing, distanceFactors, remotePct } from '../mock/pricing.mock-data';
import { mockCompanies } from '../mock/company.mock-data';
import type { ShippingType } from '../types';

export class PricingService {
  static calculatePrice(params: {
    shippingType: ShippingType;
    weightKg: number;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    origin: string;
    destination: string;
    declaredValue: number;
    companyId: string;
    includeInsurance?: boolean;
    extraSurcharges?: number;
  }) {
    const {
      shippingType,
      weightKg,
      lengthCm,
      widthCm,
      heightCm,
      origin,
      destination,
      declaredValue,
      companyId,
      includeInsurance = false,
      extraSurcharges = 0,
    } = params;

    // 1. Volumetric weight
    const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000;
    const chargeableWeight = Math.max(weightKg, volumetricWeight);

    // 2. Distance factor (mock: just EU-Asia example)
    let distanceFactor = 1.0;
    if (origin === 'EU' && destination === 'ASIA') distanceFactor = distanceFactors['EU-ASIA'];
    else if (origin === 'GLOBAL' && destination === 'REMOTE') distanceFactor = distanceFactors['GLOBAL-REMOTE'];

    // 3. Company pricing
    const company = mockCompanies.find((c) => c.id === companyId);
    if (!company) throw new Error('Company not found');

    const rule = mockPricing.find((p) => p.shippingType === shippingType);
    if (!rule) throw new Error('Pricing rule not found');

    // 4. Base price
    const base = company.basePrice + chargeableWeight * company.pricePerKg;

    // 5. Surcharges
    const fuelSurcharge = base * company.fuelPct;
    const remoteSurcharge = base * remotePct;
    const insurance = includeInsurance ? declaredValue * company.insurancePct : 0;

    // 6. Total
    const total =
      base * rule.typeMultiplier * distanceFactor +
      fuelSurcharge +
      remoteSurcharge +
      insurance +
      extraSurcharges;

    return {
      base,
      fuelSurcharge,
      remoteSurcharge,
      insurance,
      extraSurcharges,
      total,
      breakdown: {
        volumetricWeight,
        chargeableWeight,
        typeMultiplier: rule.typeMultiplier,
        distanceFactor,
      },
    };
  }
}
