// src/services/CompanyService.ts
import type { ParcelRequest, RequestStatus } from '../types';
import { useRequestsStore } from '../store/useRequestsStore';

export class CompanyService {
  static approveRequest(requestId: string) {
    useRequestsStore.getState().updateRequestStatus(requestId, 'ACCEPTED');
  }

  static rejectRequest(requestId: string, comment?: string) {
    useRequestsStore
      .getState()
      .updateRequestStatus(requestId, 'REJECTED', comment);
  }

  static updateTimeline(
    requestId: string,
    status: RequestStatus,
    comment?: string,
  ) {
    useRequestsStore.getState().updateRequestStatus(requestId, status, comment);
  }

  static getRequestsForCompany(companyId: string): ParcelRequest[] {
    return useRequestsStore
      .getState()
      .requests.filter((r) => r.companyId === companyId);
  }
}
