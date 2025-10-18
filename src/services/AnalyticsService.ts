import { apiClient } from '../lib/apiClient';

export interface AnalyticsSummary<TRequest> {
  total: number;
  inTransit: number;
  delivered: number;
  pending: number;
  recent: TRequest[];
}

export class AnalyticsService {
  static getSummary<TRequest>(role: 'USER' | 'COMPANY_ADMIN', entityId: string) {
    const query = new URLSearchParams({ role, entityId });
    return apiClient.get<AnalyticsSummary<TRequest>>(
      `/api/analytics/summary?${query.toString()}`,
    );
  }
}
