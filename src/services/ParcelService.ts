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
    const result = PricingService.calculatePrice({
      shippingType,
      weightKg: parcel.weightKg,
      lengthCm: parcel.lengthCm,
      widthCm: parcel.widthCm,
      heightCm: parcel.heightCm,
      origin: 'EU', // 👉 შეგიძლია ფორმიდან გამოიტანო რეალური
      destination: 'ASIA', // 👉 ან მართლა როუტიდან
      declaredValue: parcel.declaredValue ?? 0,
      companyId,
    });

    return result.total;
  }
}
