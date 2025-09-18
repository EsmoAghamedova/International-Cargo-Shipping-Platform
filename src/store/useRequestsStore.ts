// src/store/useRequestsStore.ts
import { create } from "zustand";
import type { ParcelRequest, RequestStatus } from "../types";
import { StorageService } from "../services/StorageService";
import { mockParcelRequests } from "../mock/parcels.mock-data";

const STORAGE_KEY = "requests-storage";

interface RequestsState {
  requests: ParcelRequest[];
  loadRequests: () => void;
  addRequest: (request: ParcelRequest) => void;
  updateRequestStatus: (id: string, status: RequestStatus, comment?: string) => void;
}

export const useRequestsStore = create<RequestsState>((set, get) => ({
  requests: [],

  // ერთჯერადი ჩატვირთვა: mock + localStorage
  loadRequests: () => {
    const saved = StorageService.get<ParcelRequest[]>(STORAGE_KEY, []);
    set({ requests: [...mockParcelRequests, ...saved] });
  },

  addRequest: (request) => {
    const updated = [...get().requests, request];
    // მხოლოდ user-ის შექმნილი requests ინახება localStorage-ში
    const userRequests = updated.filter(
      (r) => !mockParcelRequests.find((m) => m.id === r.id)
    );
    StorageService.set(STORAGE_KEY, userRequests);
    set({ requests: updated });
  },

  updateRequestStatus: (id, status, comment) => {
    const updated = get().requests.map((r) =>
      r.id === id ? { ...r, status, reviewComment: comment } : r
    );

    const userRequests = updated.filter(
      (r) => !mockParcelRequests.find((m) => m.id === r.id)
    );

    StorageService.set(STORAGE_KEY, userRequests);
    set({ requests: updated });
  },
}));
