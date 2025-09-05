// useRequestsStore.ts
import { create } from 'zustand';
import type { ParcelRequest } from '../types';

interface RequestsState {
  requests: ParcelRequest[];
  addRequest: (req: ParcelRequest) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  addRequest: (req) => set((state) => ({ requests: [...state.requests, req] })),
}));
