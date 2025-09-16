// src/services/ParcelService.ts
import type { ShippingType } from "../types";

export class ParcelService {
    static calculatePrice(
        parcel: {
            weightKg: number;
            lengthCm: number;
            widthCm: number;
            heightCm: number;
        },
        shippingType: ShippingType // 👈 number არ არის, ShippingType უნდა იყოს
    ): number {
        const volumetricWeight = (parcel.lengthCm * parcel.widthCm * parcel.heightCm) / 5000;
        const chargeableWeight = Math.max(parcel.weightKg, volumetricWeight);

        // Mock multipliers (realში pricingService-ს გამოიძახებ)
        const typeMultiplier: Record<ShippingType, number> = {
            SEA: 0.7,
            RAILWAY: 0.85,
            ROAD: 1.0,
            AIR: 1.6,
        };

        const basePrice = 10; // mock
        const pricePerKg = 2; // mock

        return (basePrice + chargeableWeight * pricePerKg) * typeMultiplier[shippingType];
    }
}
