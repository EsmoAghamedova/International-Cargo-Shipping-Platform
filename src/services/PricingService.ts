import type { ParcelRequest } from '../types';

export class PricingService {
  static calculate(request: ParcelRequest) {
    let base = 20; // base price
    let weightFee = Number(request.parcel.weightKg) * 2;
    let sizeFee =
      (Number(request.parcel.lengthCm) *
        Number(request.parcel.widthCm) *
        Number(request.parcel.heightCm)) /
      5000;

    let shippingFee = request.shippingType === 'EXPRESS' ? 30 : 10;

    let total = base + weightFee + sizeFee + shippingFee;

    return {
      base,
      weightFee,
      sizeFee,
      shippingFee,
      total,
    };
  }
}
