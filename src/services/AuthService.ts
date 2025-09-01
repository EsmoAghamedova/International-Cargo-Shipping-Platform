import { mockCompanies, mockUsers } from '../mock/auth.mock-data';
import type { User, Company } from '../types';

type AuthEntity = User | Company;

export class AuthService {
  private static currentUser: AuthEntity | null = null;

  static login(email: string): AuthEntity | null {
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      this.currentUser = user;
      return user;
    }

    const company = mockCompanies.find((c) => c.contactEmail === email);
    if (company) {
      this.currentUser = company;
      return company;
    }

    return null;
  }

  static registerUser(user: User): User {
    mockUsers.push(user);
    this.currentUser = user;
    return user;
  }

  static registerCompany(company: Company): Company {
    mockCompanies.push(company);
    this.currentUser = company;
    return company;
  }

  static logout(): void {
    this.currentUser = null;
  }

  static getCurrent(): AuthEntity | null {
    return this.currentUser;
  }
}
