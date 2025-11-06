// Account response types
export interface AccountResponse {
  id: string;
  userName: string;
  password: string;
  createdAt: string; // ISO date string
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  accountImg: string;
}

export interface SendOTPRegisterResponse {
  success: boolean;
  message: string;
}

export interface CreateAccountResponse {
  success: boolean;
  message: string;
  data: AccountResponse;
}

export interface UpdateAccountResponse {
  success: boolean;
  message: string;
  data: AccountResponse;
}
