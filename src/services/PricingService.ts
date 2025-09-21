// src/services/PricingService.ts
import { DistanceService } from './DistanceService';
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
      includeInsurance = false,
      extraSurcharges = 0,
    } = params;

    const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000;
    const chargeableWeight = Math.max(weightKg, volumetricWeight);

    // Distance factor ვიღებთ DistanceService-იდან
    const distanceFactor = DistanceService.getFactor(origin, destination);

    // Shipping multiplier
    const typeMultiplier: Record<ShippingType, number> = {
      SEA: 0.7,
      RAILWAY: 0.85,
      ROAD: 1.0,
      AIR: 1.6,
    };

    const basePrice = 10;
    const pricePerKg = 2;

    const base = basePrice + chargeableWeight * pricePerKg;

    const fuelSurcharge = base * 0.1;
    const insurance = includeInsurance ? declaredValue * 0.05 : 0;

    const total =
      base * typeMultiplier[shippingType] * distanceFactor +
      fuelSurcharge +
      insurance +
      extraSurcharges;

    return {
      base,
      fuelSurcharge,
      insurance,
      extraSurcharges,
      total,
      breakdown: {
        volumetricWeight,
        chargeableWeight,
        typeMultiplier: typeMultiplier[shippingType],
        distanceFactor,
      },
    };
  }
}
