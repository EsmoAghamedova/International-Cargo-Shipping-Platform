import { mockAuthEntities } from '../mock/auth.mock-data';
import type { User, Company, AuthEntity } from '../types';

export class AuthService {
  private static currentUser: AuthEntity | null = null;

  static login(email: string): AuthEntity | null {
    const entity = mockAuthEntities.find((e) => e.email === email) ?? null;
    if (entity) {
      this.currentUser = entity;
    }
    return entity;
  }

  static registerUser(user: User): User {
    mockAuthEntities.push(user);
    this.currentUser = user;
    return user;
  }

  static registerCompany(company: Company): Company {
    mockAuthEntities.push(company);
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
