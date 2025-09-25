// მომხმარებელი
export interface User {
  id: string;
  fullName: string;
  email: string;
  addresses: Address[];
  role: 'USER';
}

// კომპანიის ადმინი
export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  hqAddress: Address;
  regions: string[]; // ISO2
  supportedTypes: ShippingType[];
  role: 'COMPANY_ADMIN';
  logoUrl?: string;
  basePrice: number;
  pricePerKg: number;
  fuelPct: number;
  insurancePct: number;
}

// ორივე ერთად
export type AuthEntity = User | Company;

// მისამართი
export interface Address {
  city: string;
  country: string;
  street?: string;
  postalCode?: string;
}

// ამანათის ტიპი
export type ParcelKind = 'DOCUMENTS' | 'GOODS';

// ტრანსპორტირების ტიპი
export type ShippingType = 'SEA' | 'RAILWAY' | 'ROAD' | 'AIR';

// სტატუსი
export type RequestStatus =
  | 'PENDING_REVIEW'
  | 'ACCEPTED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'REJECTED';

// ამანათის request
export interface ParcelRequest {
  id: string;
  userId: string;
  companyId?: string;
  parcel: {
    weightKg: number;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    kind: ParcelKind;
    declaredValue: number;
    fragile?: boolean;
  };
  route: {
    origin: Address;
    destination: Address;
    pickupAddress: Address;
    deliveryAddress: Address;
  };
  shippingType: ShippingType;
  status: RequestStatus;
  createdAt: string;
  trackingId?: string;
  reviewComment?: string;
}
