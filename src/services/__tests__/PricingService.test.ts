/// <reference types="jest" />
import { PricingService } from '../PricingService';
// import { DistanceService } from '../DistanceService';

// Mock DistanceService so tests are predictable
jest.mock('../DistanceService', () => ({
  DistanceService: {
    getFactor: jest.fn(() => 1.2), // always returns 1.2
  },
}));

describe('PricingService.calculatePrice', () => {
  it('calculates price with insurance correctly for SEA', () => {
    const result = PricingService.calculatePrice({
      shippingType: 'SEA',
      weightKg: 10,
      lengthCm: 50,
      widthCm: 40,
      heightCm: 30,
      origin: 'Germany',
      destination: 'China',
      declaredValue: 500,
      includeInsurance: true,
      companyId: 'test-company',
    });

    const volumetricWeight = (50 * 40 * 30) / 5000; // 12
    const chargeableWeight = Math.max(10, volumetricWeight); // 12

    expect(result.breakdown.volumetricWeight).toBe(volumetricWeight);
    expect(result.breakdown.chargeableWeight).toBe(chargeableWeight);
    expect(result.total).toBeCloseTo(
      (10 + chargeableWeight * 2) * 0.7 * 1.2 +
        (10 + chargeableWeight * 2) * 0.1 +
        500 * 0.05,
    );
  });

  it('calculates price without insurance correctly for AIR', () => {
    const result = PricingService.calculatePrice({
      shippingType: 'AIR',
      weightKg: 10,
      lengthCm: 50,
      widthCm: 40,
      heightCm: 30,
      origin: 'Germany',
      destination: 'China',
      declaredValue: 500,
      companyId: 'test-company',
    });

    const volumetricWeight = (50 * 40 * 30) / 5000; // 12
    const chargeableWeight = Math.max(10, volumetricWeight); // 12

    expect(result.breakdown.volumetricWeight).toBe(volumetricWeight);
    expect(result.breakdown.chargeableWeight).toBe(chargeableWeight);
    expect(result.total).toBeCloseTo(
      (10 + chargeableWeight * 2) * 1.6 * 1.2 +
        (10 + chargeableWeight * 2) * 0.1,
    );
  });
});
