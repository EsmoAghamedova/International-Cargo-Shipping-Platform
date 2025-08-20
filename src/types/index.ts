export type Role = 'USER' | 'COMPANY_ADMIN';
export type ShippingType = 'SEA' | 'RAILWAY' | 'ROAD' | 'AIR';
export type RequestStatus =
    | 'PENDING_REVIEW'
    | 'AWAITING_COMPANY_CONFIRMATION'
    | 'ACCEPTED'
    | 'IN_TRANSIT'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'REJECTED';

export interface Address {
    id: string;
    country: string;
    city: string;
    line1: string;
    postalCode: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    addresses: Address[];
    role: 'USER';
}

export interface Company {
    id: string;
    name: string;
    contactEmail: string;
    phone?: string;
    hqAddress: Address;
    regions: string[];
    supportedTypes: ShippingType[];
    pricing: CompanyPricing;
    role: 'COMPANY_ADMIN';
    logoUrl?: string;
}

export interface CompanyPricing {
    basePrice: number;
    pricePerKg: number;
    fuelPct: number;
    insurancePct: number;
    typeMultipliers: Record<ShippingType, number>;
    remoteAreaPct: number;
}

export interface ParcelRequest {
    id: string;
    userId: string;
    companyId?: string;
    shippingType: ShippingType;
    parcel: {
        weightKg: number;
        lengthCm: number;
        widthCm: number;
        heightCm: number;
        kind: 'DOCUMENTS' | 'GOODS';
        declaredValue: number;
        fragile?: boolean;
    };
    route: {
        origin: Address;
        destination: Address;
        pickupAddress: Address;
        deliveryAddress: Address;
    };
    priceEstimate: number;
    status: RequestStatus;
    timeline: { status: RequestStatus; at: string; note?: string }[];
    trackingId?: string;
    messages: { from: 'USER' | 'COMPANY'; text: string; at: string }[];
}
