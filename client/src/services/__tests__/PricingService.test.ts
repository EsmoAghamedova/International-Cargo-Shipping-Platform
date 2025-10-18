/// <reference types="jest" />
import { PricingService } from '../PricingService';
import { apiClient } from '../../lib/apiClient';

jest.mock('../../lib/apiClient', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('PricingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculatePrice', () => {
    it('requests a pricing quote from the API', async () => {
      const payload = {
        shippingType: 'SEA' as const,
        weightKg: 10,
        lengthCm: 50,
        widthCm: 40,
        heightCm: 30,
        origin: 'Germany',
        destination: 'China',
        declaredValue: 500,
        includeInsurance: true,
      };

      const response = {
        base: 100,
        fuelSurcharge: 12,
        insurance: 25,
        extraSurcharges: 0,
        total: 200,
        breakdown: {
          volumetricWeight: 12,
          chargeableWeight: 12,
          typeMultiplier: 0.7,
          distanceFactor: 1.1,
        },
      };

      const postMock =
        apiClient.post as jest.MockedFunction<typeof apiClient.post>;
      postMock.mockResolvedValue(response);

      const result = await PricingService.calculatePrice(payload);

      expect(apiClient.post).toHaveBeenCalledWith('/api/pricing/quote', payload);
      expect(result).toEqual(response);
    });
  });

  describe('getTiers', () => {
    it('requests pricing tiers from the API', async () => {
      const tiers = [
        {
          id: 'starter',
          label: 'Starter',
          description: 'Up to 50 shipments per month',
          basePrice: 29,
          includedWeight: 200,
          fuelSurchargePct: 8,
          insurancePct: 2,
          support: 'Email',
        },
      ];

      const getMock = apiClient.get as jest.MockedFunction<typeof apiClient.get>;
      getMock.mockResolvedValue(tiers);

      const result = await PricingService.getTiers();

      expect(apiClient.get).toHaveBeenCalledWith('/api/pricing/tiers');
      expect(result).toEqual(tiers);
    });
  });
});
