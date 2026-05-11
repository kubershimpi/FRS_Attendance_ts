import { storageService } from "./storageService";

/**
 * Inheritance
 */
export abstract class BaseService {
  protected readonly apiBase = "https://api.mindbox.com/v1";

  /**
   * Encapsulation
   */
  protected async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await storageService.getAuthToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${this.apiBase}${path}`, {
      ...options,
      headers,
    });

    return response.json();
  }
}
