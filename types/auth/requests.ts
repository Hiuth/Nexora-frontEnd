// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  userName: string;
  password: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  otp: string;
}

export interface ResetPasswordRequest {
  otp: string;
  newPassword: string;
}

export interface SendOTPRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
