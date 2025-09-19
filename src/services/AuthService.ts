import { mockAuthEntities } from '../mock/auth.mock-data';
import type { User, Company, AuthEntity } from '../types';
import { useUsersStore } from '../store/useClientStore';

const USERS_KEY = 'users-storage';
const COMPANIES_KEY = 'companies-storage';

function load<T>(key: string): T[] {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export class AuthService {
  private static currentUser: AuthEntity | null = null;

  static login(email: string): AuthEntity | null {
    // ჯერ localStorage users
    const users = load<User>(USERS_KEY);
    const companies = load<Company>(COMPANIES_KEY);

    const entity =
      [...users, ...companies, ...mockAuthEntities].find(
        (e) => e.email === email,
      ) ?? null;

    if (entity) {
      this.currentUser = entity;
    }
    return entity;
  }

  static registerUser(user: User): User {
    mockAuthEntities.push(user);
    this.currentUser = user;

    // დაამატე User store-ში
    const { addUser } = useUsersStore.getState();
    addUser(user);

    return user;
  }

  static registerCompany(company: Company): Company {
    const companies = load<Company>(COMPANIES_KEY);
    companies.push(company);
    save(COMPANIES_KEY, companies);

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
