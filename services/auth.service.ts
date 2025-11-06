import { API_CONFIG, ApiResponse } from "@/config/api.config";
import { AuthManager } from "@/lib/auth-manager";
import {
  apiPost,
  apiGet,
  apiPut,
  apiPostFormData,
  apiPutFormData,
} from "@/lib/api-base";
import {
  LoginRequest,
  SignUpRequest,
  ResetPasswordRequest,
  SendOTPRequest,
  VerifyOTPRequest,
  LoginResponse,
  SignUpResponse,
  SendOTPResponse,
  VerifyOTPResponse,
} from "@/types/auth";

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Login
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const data = await apiPostFormData<LoginResponse>(
        API_CONFIG.ENDPOINTS.LOGIN,
        formData
      );

      if (data.result?.accessToken && data.result?.refreshToken) {
        // Store tokens
        AuthManager.setTokens(
          data.result.accessToken,
          data.result.refreshToken
        );

        // Extract userName from token and store it
        const userInfo = AuthManager.getCurrentUser();
        if (userInfo?.email) {
          // You can set userName from email or get it from token if available
          const userName = userInfo.email.split("@")[0]; // Use email prefix as default userName
          AuthManager.setUserName(userName);
        }

        return data.result;
      } else {
        throw new Error("Không nhận được token từ server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Đăng nhập thất bại");
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await AuthManager.logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Clear tokens anyway
      AuthManager.clearTokens();
    }
  }

  // Send OTP for forgot password
  async sendOtpForgotPassword(): Promise<string> {
    try {
      const data = await apiGet<string>(
        API_CONFIG.ENDPOINTS.SEND_OTP_FORGOT_PASSWORD
      );

      return data.result || data.message;
    } catch (error: any) {
      console.error("Send OTP error:", error);
      throw new Error(error.message || "Gửi OTP thất bại");
    }
  }

  // Reset password
  async resetPassword(otp: string, newPassword: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("otp", otp);
      formData.append("newPassword", newPassword);

      const data = await apiPutFormData<string>(
        API_CONFIG.ENDPOINTS.RESET_PASSWORD,
        formData
      );

      return data.result || data.message;
    } catch (error: any) {
      console.error("Reset password error:", error);
      throw new Error(error.message || "Đổi mật khẩu thất bại");
    }
  }

  // Sign up
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      // TODO: Implement with backend API when available
      // For now, return mock response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "Đăng ký thành công",
        data: {
          userId: "mock-user-id",
          userName: data.userName,
          email: data.email,
        },
      };
    } catch (error: any) {
      console.error("SignUp Error:", error);
      throw new Error(error.message || "Đăng ký thất bại");
    }
  }

  // Send OTP for sign up
  async sendOTP(email: string): Promise<SendOTPResponse> {
    try {
      // TODO: Implement with backend API when available
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "OTP đã được gửi đến email của bạn",
        expiresIn: 300, // 5 minutes
      };
    } catch (error: any) {
      console.error("SendOTP Error:", error);
      throw new Error(error.message || "Gửi OTP thất bại");
    }
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<VerifyOTPResponse> {
    try {
      // TODO: Implement with backend API when available
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "OTP hợp lệ",
        isValid: true,
      };
    } catch (error: any) {
      console.error("VerifyOTP Error:", error);
      throw new Error(error.message || "Xác thực OTP thất bại");
    }
  }

  // Check authentication status
  isAuthenticated(): boolean {
    return AuthManager.isAuthenticated();
  }

  // Get current user
  getCurrentUser() {
    return AuthManager.getCurrentUser();
  }

  // Get user info
  getUserInfo() {
    return AuthManager.getUserInfo();
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
