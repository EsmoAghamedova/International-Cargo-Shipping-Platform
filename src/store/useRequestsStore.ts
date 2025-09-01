import { create } from 'zustand';

interface ParcelRequest {
  id: string;
  userId: string;
  parcel: {
    weight: string;
    dimensions: { length: string; width: string; height: string };
    type: string;
    value: string;
  };
  route: {
    origin: string;
    destination: string;
    pickup: string;
    delivery: string;
  };
  shippingType: string;
  status: string;
  createdAt: string;
}

interface RequestsState {
  requests: ParcelRequest[];
  addRequest: (req: ParcelRequest) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  addRequest: (req) =>
    set((state) => ({
      requests: [...state.requests, req],
    })),
}));
