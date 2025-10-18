// src/store/usePricingStore.ts
import { create } from 'zustand';
import type { PricingRule } from '../mock/pricing.mock-data';
import {
  mockPricing,
  distanceFactors,
  remotePct,
} from '../mock/pricing.mock-data';

interface PricingState {
  pricing: PricingRule[];
  getPrice: (
    shippingType: PricingRule['shippingType'],
    weight: number,
    distanceKey: keyof typeof distanceFactors,
    isRemote?: boolean,
  ) => number;
}

export const usePricingStore = create<PricingState>(() => ({
  pricing: mockPricing,

  getPrice: (shippingType, weight, distanceKey, isRemote = false) => {
    const rule = mockPricing.find((p) => p.shippingType === shippingType);
    if (!rule) return 0;

    let price =
      rule.basePrice +
      rule.pricePerKg *
        weight *
        rule.typeMultiplier *
        distanceFactors[distanceKey];

    if (isRemote) {
      price += price * remotePct;
    }

    return Math.round(price);
  },
}));
