/**
 * Auth Service
 * Service để xử lý authentication và authorization
 * TODO: Kết nối với API backend
 */

export interface SignUpRequest {
  userName: string;
  password: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  otp: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    userName: string;
    email: string;
  };
}

export interface SendOTPRequest {
  email: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number; // Thời gian hết hạn OTP (seconds)
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  isValid: boolean;
}

class AuthService {
  private baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  /**
   * Đăng ký tài khoản mới
   */
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      // TODO: Thay thế bằng API call thực tế
      const response = await fetch(`${this.baseURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Đăng ký thất bại");
      }

      return await response.json();
    } catch (error) {
      console.error("SignUp Error:", error);
      throw error;
    }
  }

  /**
   * Gửi mã OTP đến email
   */
  async sendOTP(email: string): Promise<SendOTPResponse> {
    try {
      // TODO: Thay thế bằng API call thực tế
      const response = await fetch(`${this.baseURL}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Gửi OTP thất bại");
      }

      return await response.json();
    } catch (error) {
      console.error("SendOTP Error:", error);
      throw error;
    }
  }

  /**
   * Xác thực mã OTP
   */
  async verifyOTP(email: string, otp: string): Promise<VerifyOTPResponse> {
    try {
      // TODO: Thay thế bằng API call thực tế
      const response = await fetch(`${this.baseURL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error("Xác thực OTP thất bại");
      }

      return await response.json();
    } catch (error) {
      console.error("VerifyOTP Error:", error);
      throw error;
    }
  }

  /**
   * Đăng nhập
   */
  async login(userName: string, password: string): Promise<any> {
    try {
      // TODO: Thay thế bằng API call thực tế
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<void> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // Clear token, session, etc.
      localStorage.removeItem("authToken");
      sessionStorage.clear();
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  }

  /**
   * Lấy thông tin user hiện tại
   */
  async getCurrentUser(): Promise<any> {
    try {
      // TODO: Thay thế bằng API call thực tế
      const token = localStorage.getItem("authToken");

      if (!token) {
        return null;
      }

      const response = await fetch(`${this.baseURL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Lấy thông tin user thất bại");
      }

      return await response.json();
    } catch (error) {
      console.error("GetCurrentUser Error:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
