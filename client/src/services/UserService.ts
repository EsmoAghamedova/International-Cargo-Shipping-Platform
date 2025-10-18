import { apiClient } from '../lib/apiClient';
import type { User } from '../types';

export class UserService {
  static get(id: string) {
    return apiClient.get<User>(`/api/users/${id}`);
  }
}
