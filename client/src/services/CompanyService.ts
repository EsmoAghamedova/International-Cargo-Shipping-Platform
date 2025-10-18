import { apiClient } from '../lib/apiClient';
import type { Company } from '../types';

export interface CompanyFilters {
  shippingType?: string;
  region?: string;
  search?: string;
}

export class CompanyService {
  static list(filters: CompanyFilters = {}) {
    const query = new URLSearchParams();
    if (filters.shippingType) query.set('shippingType', filters.shippingType);
    if (filters.region) query.set('region', filters.region);
    if (filters.search) query.set('search', filters.search);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiClient.get<Company[]>(`/api/companies${suffix}`);
  }

  static get(id: string) {
    return apiClient.get<Company>(`/api/companies/${id}`);
  }
}
