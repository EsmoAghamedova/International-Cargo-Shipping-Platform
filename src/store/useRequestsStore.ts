import { create } from 'zustand';
import type { ParcelRequest, RequestStatus } from '../types';
import {
  RequestsService,
  type CreateRequestPayload,
  type RequestFilters,
} from '../services/RequestsService';

const DEFAULT_PAGE_SIZE = 10;

function mergeRequests(
  current: ParcelRequest[],
  incoming: ParcelRequest[],
): ParcelRequest[] {
  if (incoming.length === 0) return current.slice();

  const incomingMap = new Map(incoming.map((item) => [item.id, item]));
  const updated = current.map((request) => {
    const replacement = incomingMap.get(request.id);
    if (replacement) {
      incomingMap.delete(request.id);
      return replacement;
    }
    return request;
  });

  return [...updated, ...incomingMap.values()];
}

interface RequestsState {
  requests: ParcelRequest[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isFetchingSingle: boolean;
  error?: string;
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  filters?: RequestFilters;
  loadRequests: (filters?: RequestFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  fetchById: (id: string) => Promise<ParcelRequest | null>;
  addRequest: (payload: CreateRequestPayload) => Promise<ParcelRequest>;
  updateRequestStatus: (
    id: string,
    status: RequestStatus,
    comment?: string,
  ) => Promise<ParcelRequest>;
  clear: () => void;
}

export const useRequestsStore = create<RequestsState>((set, get) => ({
  requests: [],
  isLoading: false,
  isLoadingMore: false,
  isFetchingSingle: false,
  error: undefined,
  total: 0,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  hasMore: false,
  filters: undefined,

  async loadRequests(filters) {
    set((state) => ({
      isLoading: true,
      error: undefined,
      pageSize: state.pageSize || DEFAULT_PAGE_SIZE,
    }));
    try {
      const response = await RequestsService.list(filters, {
        page: 1,
        pageSize: get().pageSize || DEFAULT_PAGE_SIZE,
      });
      set({
        requests: response.data,
        isLoading: false,
        total: response.meta.total,
        page: response.meta.page,
        pageSize: response.meta.pageSize,
        hasMore: response.meta.hasMore,
        filters: filters ? { ...filters } : undefined,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load requests',
        isLoading: false,
        hasMore: false,
      });
    }
  },

  async loadMore() {
    const { isLoadingMore, hasMore, filters, page, pageSize } = get();
    if (isLoadingMore || !hasMore) return;

    set({ isLoadingMore: true, error: undefined });
    try {
      const response = await RequestsService.list(filters, {
        page: page + 1,
        pageSize,
      });
      set((state) => ({
        requests: mergeRequests(state.requests, response.data),
        isLoadingMore: false,
        total: response.meta.total,
        page: response.meta.page,
        pageSize: response.meta.pageSize,
        hasMore: response.meta.hasMore,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load additional requests',
        isLoadingMore: false,
      });
    }
  },

  async fetchById(id) {
    const existing = get().requests.find((request) => request.id === id);
    if (existing) return existing;

    set({ isFetchingSingle: true, error: undefined });
    try {
      const fetched = await RequestsService.getById(id);
      set((state) => ({
        requests: mergeRequests(state.requests, [fetched]),
        isFetchingSingle: false,
      }));
      return fetched;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch request details',
        isFetchingSingle: false,
      });
      return null;
    }
  },

  async addRequest(payload) {
    const created = await RequestsService.create(payload);
    set((state) => ({
      requests: mergeRequests([created], state.requests),
      total: state.total + 1,
    }));
    return created;
  },

  async updateRequestStatus(id, status, comment) {
    const updated = await RequestsService.updateStatus(id, status, comment);
    set((state) => ({
      requests: mergeRequests(state.requests, [updated]),
    }));
    return updated;
  },

  clear() {
    set({
      requests: [],
      isLoading: false,
      isLoadingMore: false,
      isFetchingSingle: false,
      error: undefined,
      total: 0,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      hasMore: false,
      filters: undefined,
    });
  },
}));
