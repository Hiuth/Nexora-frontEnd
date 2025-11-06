// Authentication manager for token handling and user state
import { RefreshTokenResponse } from "@/types/auth";

export interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  type?: string;
}

export class AuthManager {
  private static readonly ACCESS_TOKEN_KEY = "accessToken";
  private static readonly REFRESH_TOKEN_KEY = "refreshToken";
  private static readonly USER_NAME_KEY = "userName";

  // Token storage
  static setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static clearTokens(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_NAME_KEY);
  }

  // User info - chỉ lưu userName
  static setUserName(userName: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.USER_NAME_KEY, userName);
  }

  static getUserName(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.USER_NAME_KEY);
  }

  // Legacy method for compatibility - now only returns userName
  static getUserInfo(): { userName: string | null } | null {
    const userName = this.getUserName();
    return userName ? { userName } : null;
  }

  // Legacy method for compatibility
  static setUserInfo(userInfo: any): void {
    if (userInfo?.userName) {
      this.setUserName(userInfo.userName);
    }
  }

  // Authentication state
  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    // Check if token is expired
    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }

  // Token decoding
  static decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload) as DecodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  // Get current user from token
  static getCurrentUser(): DecodedToken | null {
    const token = this.getAccessToken();
    if (!token) return null;

    return this.decodeToken(token);
  }

  // Check user role
  static hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  static isAdmin(): boolean {
    return this.hasRole("ADMIN");
  }

  static isUser(): boolean {
    return this.hasRole("USER");
  }

  // Auth header for API requests
  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Refresh token functionality
  static async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      return null;
    }

    try {
      const { API_CONFIG } = await import("@/config/api.config");

      // Use direct fetch for refresh token to avoid circular dependency
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH_TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            refreshToken: refreshToken,
          }),
        }
      );

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = await response.json();

      if (data.result?.accessToken && data.result?.refreshToken) {
        this.setTokens(data.result.accessToken, data.result.refreshToken);
        return data.result.accessToken;
      } else {
        this.clearTokens();
        return null;
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      this.clearTokens();
      return null;
    }
  }

  // Logout
  static async logout(): Promise<void> {
    const token = this.getAccessToken();

    if (token) {
      try {
        const { API_CONFIG } = await import("@/config/api.config");

        // Use direct fetch for logout to avoid circular dependency
        await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, {
          method: "POST",
          headers: {
            ...this.getAuthHeader(),
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Logout API error:", error);
      }
    }

    this.clearTokens();

    // Redirect to home page
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }
}
