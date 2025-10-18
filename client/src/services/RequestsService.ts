import { apiClient } from '../lib/apiClient';
import type { ParcelRequest, RequestStatus } from '../types';

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
}

export interface RequestFilters {
  userId?: string;
  companyId?: string;
  status?: RequestStatus;
  trackingId?: string;
}

export type CreateRequestPayload = {
  userId: string;
  companyId: string;
  parcel: ParcelRequest['parcel'];
  route: ParcelRequest['route'];
  shippingType: ParcelRequest['shippingType'];
  trackingId?: string;
};

export class RequestsService {
  static list(
    filters: RequestFilters = {},
    pagination: PaginationOptions = {},
  ) {
    const query = new URLSearchParams();
    if (filters.userId) query.set('userId', filters.userId);
    if (filters.companyId) query.set('companyId', filters.companyId);
    if (filters.status) query.set('status', filters.status);
    if (filters.trackingId) query.set('trackingId', filters.trackingId);
    if (pagination.page) query.set('page', String(pagination.page));
    if (pagination.pageSize) query.set('pageSize', String(pagination.pageSize));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiClient.get<PaginatedResponse<ParcelRequest>>(
      `/api/requests${suffix}`,
    );
  }

  static getById(id: string) {
    return apiClient.get<ParcelRequest>(`/api/requests/${id}`);
  }

  static create(payload: CreateRequestPayload) {
    return apiClient.post<ParcelRequest>('/api/requests', payload);
  }

  static updateStatus(id: string, status: RequestStatus, comment?: string) {
    return apiClient.patch<ParcelRequest>(`/api/requests/${id}/status`, {
      status,
      comment,
    });
  }
}
