// Account request types
export interface AccountRequest {
  userName: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
  address: string;
}

export interface CreateAccountRequest extends AccountRequest {
  otp: string;
  file: File; // Avatar image file
}

export interface UpdateAccountRequest {
  userName?: string;
  email?: string;
  password?: string;
  gender?: string;
  phoneNumber?: string;
  address?: string;
  file?: File; // Optional avatar image file
}

export interface SendOTPRegisterRequest {
  email: string;
}
