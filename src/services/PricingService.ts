import type { ShippingType } from '../types';

export class PricingService {
  static calculatePrice(weightKg: number, shippingType: ShippingType): number {
    const multipliers: Record<ShippingType, number> = {
      STANDARD: 1.0,
      EXPRESS: 1.5,
    };

    const basePrice = 50;
    const pricePerKg = 5;

    return basePrice + weightKg * pricePerKg * multipliers[shippingType];
  }
}
