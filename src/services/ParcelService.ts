// src/services/ParcelService.ts
import type { ParcelRequest } from "../types";

export class ParcelService {
    // მოცულობის გამოთვლა
    static calculateVolume(parcel: ParcelRequest["parcel"]): number {
        return (parcel.lengthCm * parcel.widthCm * parcel.heightCm) / 5000;
    }

    // საბოლოო წონა (chargeable weight)
    static calculateChargeableWeight(parcel: ParcelRequest["parcel"]): number {
        const volumetric = this.calculateVolume(parcel);
        return Math.max(parcel.weightKg, volumetric);
    }

    // ფასის გამოთვლა (მაგ: 5$/kg)
    static calculatePrice(parcel: ParcelRequest["parcel"], ratePerKg = 5): number {
        const weight = this.calculateChargeableWeight(parcel);
        return weight * ratePerKg;
    }
}
