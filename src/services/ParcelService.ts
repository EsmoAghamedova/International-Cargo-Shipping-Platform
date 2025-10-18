// src/services/ParcelService.ts
import type { ShippingType } from '../types';
import { PricingService } from './PricingService';

export class ParcelService {
  static calculatePrice(
    parcel: {
      weightKg: number;
      lengthCm: number;
      widthCm: number;
      heightCm: number;
      declaredValue?: number;
    },
    shippingType: ShippingType,
    companyId: string,
  ): number {
    return PricingService.calculatePrice({
      shippingType,
      weightKg: parcel.weightKg,
      lengthCm: parcel.lengthCm,
      widthCm: parcel.widthCm,
      heightCm: parcel.heightCm,
      origin: parcel.declaredValue ? 'Custom' : 'EU',
      destination: 'Global',
      declaredValue: parcel.declaredValue ?? 0,
    }).then((result) => result.total);
  }
}
