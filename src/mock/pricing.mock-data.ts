export interface PricingRule {
  shippingType: 'STANDARD' | 'EXPRESS';
  basePrice: number;
  pricePerKg: number;
}

export const mockPricing: PricingRule[] = [
  { shippingType: 'STANDARD', basePrice: 10, pricePerKg: 2 },
  { shippingType: 'EXPRESS', basePrice: 20, pricePerKg: 5 },
];
