// src/services/PricingService.ts
import {
  mockPricing,
  distanceFactors,
  remotePct,
} from '../mock/pricing.mock-data';
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

    // 2. Distance factor
    let distanceFactor = 1.0;
    if (origin === 'EU' && destination === 'ASIA') {
      distanceFactor = distanceFactors['EU-ASIA'];
    } else if (origin === 'GLOBAL' && destination === 'REMOTE') {
      distanceFactor = distanceFactors['GLOBAL-REMOTE'];
    }

    // 3. ფასების წამოღება
    // ჯერ localStorage → მერე mockCompanies → მერე default
    const localPricingRaw = localStorage.getItem(
      `company_pricing_${companyId}`,
    );
    const localPricing = localPricingRaw ? JSON.parse(localPricingRaw) : null;

    const company = mockCompanies.find((c) => c.id === companyId);

    const basePrice = localPricing?.basePrice ?? company?.basePrice ?? 10;
    const pricePerKg = localPricing?.pricePerKg ?? company?.pricePerKg ?? 2;
    const fuelPct = localPricing?.fuelPct ?? company?.fuelPct ?? 0.1;
    const insurancePct =
      localPricing?.insurancePct ?? company?.insurancePct ?? 0.05;

    // 4. Shipping rule
    const rule = mockPricing.find((p) => p.shippingType === shippingType);
    if (!rule)
      throw new Error(`Pricing rule not found for type: ${shippingType}`);

    // 5. Base price
    const base = basePrice + chargeableWeight * pricePerKg;

    // 6. Surcharges
    const fuelSurcharge = base * fuelPct;
    const remoteSurcharge = base * remotePct;
    const insurance = includeInsurance ? declaredValue * insurancePct : 0;

    // 7. Total
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
