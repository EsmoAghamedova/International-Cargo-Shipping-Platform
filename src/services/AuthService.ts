import { apiClient } from '../lib/apiClient';
import type { User, Company } from '../types';

type AuthEntity = User | Company;

type RegisterUserPayload = {
  fullName: string;
  email: string;
  addresses?: User['addresses'];
};

type RegisterCompanyPayload = {
  name: string;
  email: string;
  phone?: string;
  hqAddress?: Company['hqAddress'];
  regions?: Company['regions'];
  supportedTypes?: Company['supportedTypes'];
  basePrice?: number;
  pricePerKg?: number;
  fuelPct?: number;
  insurancePct?: number;
  logoUrl?: string;
};

export class AuthService {
  static login(email: string) {
    return apiClient.post<AuthEntity>('/api/auth/login', { email });
  }

  static registerUser(payload: RegisterUserPayload) {
    return apiClient.post<User>('/api/auth/register/user', payload);
  }

  static registerCompany(payload: RegisterCompanyPayload) {
    return apiClient.post<Company>('/api/auth/register/company', payload);
  }

  static logout() {
    return Promise.resolve();
  }
}
