import { API_CONFIG } from "@/config/api.config";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { TokenManager } from "./token-manager";

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    customTimeout?: number
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Get auth headers with automatic token refresh
    const authHeaders = await TokenManager.getAuthHeaders();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options.headers,
      },
      ...options,
    };

    // Add timeout - use custom timeout if provided, otherwise use default
    const controller = new AbortController();
    const timeout = customTimeout || this.timeout;
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // For form data requests (like login)
  private async requestWithFormData<T>(
    endpoint: string,
    formData: FormData,
    options: RequestInit = {},
    customTimeout?: number
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Get auth headers with automatic token refresh
    const authHeaders = await TokenManager.getAuthHeaders();

    const config: RequestInit = {
      method: "POST",
      headers: {
        ...authHeaders,
        ...options.headers,
      },
      body: formData,
      ...options,
    };

    // Add timeout - use custom timeout if provided, otherwise use default
    const controller = new AbortController();
    const timeout = customTimeout || this.timeout;
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    customTimeout?: number
  ): Promise<ApiResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;

    return this.request<ApiResponse<T>>(url, { method: "GET" }, customTimeout);
  }

  async post<T>(endpoint: string, data?: any, customTimeout?: number): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }, customTimeout);
  }

  async postFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    return this.requestWithFormData<ApiResponse<T>>(endpoint, formData);
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async putFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    return this.requestWithFormData<ApiResponse<T>>(endpoint, formData, {
      method: "PUT",
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, { method: "DELETE" });
  }

  async getWithPagination<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<PaginatedResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;

    return this.request<PaginatedResponse<T>>(url, { method: "GET" });
  }
}

export const apiClient = new ApiClient();
