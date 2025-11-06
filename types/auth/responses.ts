// Auth Response Types
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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

export interface SendOTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number; // Thời gian hết hạn OTP (seconds)
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  isValid: boolean;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
