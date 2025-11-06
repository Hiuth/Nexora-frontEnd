import { ApiResponse } from "@/config/api.config";
import { API_CONFIG } from "@/config/api.config";
import { TokenManager } from "./token-manager";

// Generic API call function
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Ensure we have a valid token before making the call (if needed)
  let token: string | null = null;

  // Only get token for protected endpoints (not login/register)
  const isPublicEndpoint =
    endpoint.includes("/Auth/login") ||
    endpoint.includes("/Auth/refresh") ||
    endpoint.includes("/Account/create");

  if (!isPublicEndpoint) {
    token = await TokenManager.ensureValidToken();
    if (!token) {
      throw new Error("Authentication required");
    }
  }

  // Prepare headers
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Only add Content-Type if not FormData (browser will set it automatically for FormData)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Add authorization token if available
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If 401 and we have a token, try to refresh once
    if (response.status === 401 && token) {
      try {
        const newToken = await TokenManager.ensureValidToken();
        if (newToken && newToken !== token) {
          // Retry with new token
          headers["Authorization"] = `Bearer ${newToken}`;
          response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Let the original 401 response through
      }
    }

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
        console.error(`API Error Details for ${endpoint}:`, errorData);
      } catch (parseError) {
        console.error(`Failed to parse error response for ${endpoint}`);
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Helper for GET requests
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<ApiResponse<T>> {
  const url = params
    ? `${endpoint}?${new URLSearchParams(params).toString()}`
    : endpoint;

  return apiCall<T>(url, { method: "GET" });
}

// Helper for POST requests with JSON
export async function apiPost<T>(
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Helper for POST requests with FormData
export async function apiPostFormData<T>(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: formData,
  });
}

// Helper for PUT requests with JSON
export async function apiPut<T>(
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Helper for PUT requests with FormData
export async function apiPutFormData<T>(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: formData,
  });
}

// Helper for DELETE requests
export async function apiDelete<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { method: "DELETE" });
}
