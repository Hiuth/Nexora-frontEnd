import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";

export interface PaymentRequest {
  orderId: string;
  amount: number;
}

export interface PaymentResponse {
  paymentUrl: string;
}

export class PaymentService {
  // Payment timeout: 5 minutes
  private static readonly PAYMENT_TIMEOUT = 5 * 60 * 1000; // 300,000ms = 5 minutes

  /**
   * Create payment URL for VNPay
   */
  static async createPaymentUrl(
    orderId: string,
    amount: number
  ): Promise<string> {
    try {
      const params = new URLSearchParams({
        orderId,
        amount: amount.toString(),
      });

      const response = await apiClient.get<string>(
        `${API_CONFIG.ENDPOINTS.PAYMENT.CREATE}?${params.toString()}`,
        undefined,
        this.PAYMENT_TIMEOUT
      );

      return response.result;
    } catch (error) {
      console.error("Error creating payment URL:", error);
      throw error;
    }
  }

  /**
   * Handle VNPay return callback
   */
  static async handleVNPayReturn(queryParams: URLSearchParams): Promise<{
    success: boolean;
    orderId: string;
    message: string;
  }> {
    try {
      const response = await apiClient.get<string>(
        `${
          API_CONFIG.ENDPOINTS.PAYMENT.VNPAY_RETURN
        }?${queryParams.toString()}`,
        undefined,
        this.PAYMENT_TIMEOUT
      );

      return {
        success: true,
        orderId: response.result || "",
        message: response.message,
      };
    } catch (error) {
      console.error("Error handling VNPay return:", error);
      return {
        success: false,
        orderId: "",
        message: "Thanh toán thất bại",
      };
    }
  }

  /**
   * Redirect to payment URL
   */
  static redirectToPayment(paymentUrl: string): void {
    if (typeof window !== "undefined") {
      window.location.href = paymentUrl;
    }
  }

  /**
   * Parse VNPay return URL parameters
   */
  static parseVNPayReturnParams(): URLSearchParams | null {
    if (typeof window === "undefined") return null;

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has("vnp_TxnRef") ? urlParams : null;
  }
}
