import { API_CONFIG, ApiResponse } from "@/config/api.config";
import { apiGet, apiPostFormData, apiPutFormData } from "@/lib/api-base";
import {
  AccountRequest,
  CreateAccountRequest,
  UpdateAccountRequest,
  AccountResponse,
  SendOTPRegisterResponse,
  CreateAccountResponse,
  UpdateAccountResponse,
} from "@/types/account";

export class AccountService {
  private static instance: AccountService;

  private constructor() {}

  public static getInstance(): AccountService {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }
    return AccountService.instance;
  }

  // Send OTP for registration
  async sendOTPRegister(email: string): Promise<string> {
    try {
      const data = await apiGet<string>(
        `${
          API_CONFIG.ENDPOINTS.ACCOUNT.SEND_OTP_REGISTER
        }?Email=${encodeURIComponent(email)}`
      );

      return data.result || data.message;
    } catch (error: any) {
      console.error("Send OTP register error:", error);
      throw new Error(error.message || "Gửi OTP đăng ký thất bại");
    }
  }

  // Create account
  async createAccount(request: CreateAccountRequest): Promise<AccountResponse> {
    try {
      const formData = new FormData();
      formData.append("userName", request.userName);
      formData.append("email", request.email);
      formData.append("password", request.password);
      formData.append("gender", request.gender);
      formData.append("phoneNumber", request.phoneNumber);
      formData.append("address", request.address);
      formData.append("otp", request.otp);

      const data = await apiPostFormData<AccountResponse>(
        API_CONFIG.ENDPOINTS.ACCOUNT.CREATE,
        formData
      );

      return data.result;
    } catch (error: any) {
      console.error("Create account error:", error);
      throw new Error(error.message || "Tạo tài khoản thất bại");
    }
  }

  // Update account
  async updateAccount(request: UpdateAccountRequest): Promise<AccountResponse> {
    try {
      const formData = new FormData();

      if (request.userName) formData.append("userName", request.userName);
      if (request.email) formData.append("email", request.email);
      if (request.password) formData.append("password", request.password);
      if (request.gender) formData.append("gender", request.gender);
      if (request.phoneNumber)
        formData.append("phoneNumber", request.phoneNumber);
      if (request.address) formData.append("address", request.address);
      if (request.file) formData.append("file", request.file);

      const data = await apiPutFormData<AccountResponse>(
        API_CONFIG.ENDPOINTS.ACCOUNT.UPDATE,
        formData
      );

      return data.result;
    } catch (error: any) {
      console.error("Update account error:", error);
      throw new Error(error.message || "Cập nhật tài khoản thất bại");
    }
  }

  // Get account by ID (current user)
  async getAccountById(): Promise<AccountResponse> {
    try {
      const data = await apiGet<AccountResponse>(
        API_CONFIG.ENDPOINTS.ACCOUNT.GET_BY_ID
      );

      return data.result;
    } catch (error: any) {
      console.error("Get account by ID error:", error);
      throw new Error(error.message || "Lấy thông tin tài khoản thất bại");
    }
  }
}

// Export singleton instance
export const accountService = AccountService.getInstance();
