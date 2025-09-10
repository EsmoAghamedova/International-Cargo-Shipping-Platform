// src/store/useRequestsStore.ts
import { create } from 'zustand';
import type { ParcelRequest, RequestStatus } from '../types';

interface RequestsState {
  requests: ParcelRequest[];
  addRequest: (request: ParcelRequest) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  addRequest: (request) =>
    set((state) => ({
      requests: [...state.requests, request],
    })),
  updateRequestStatus: (id, status) =>
    set((state) => ({
      requests: state.requests.map((r) => (r.id === id ? { ...r, status } : r)),
    })),
}));
