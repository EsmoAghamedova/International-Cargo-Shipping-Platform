// src/services/StorageService.ts
export class StorageService {
    static get<T>(key: string, fallback: T): T {
        try {
            const data = localStorage.getItem(key);
            return data ? (JSON.parse(data) as T) : fallback;
        } catch {
            return fallback;
        }
    }

    static set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
