import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";
import type { WarrantyRecordResponse } from "@/types/api";

export class WarrantyService {
  /**
   * Get warranty record by serial number
   * Endpoint: GET /WarrantyRecord/GetBySerialNumber/{serialNumber}
   * Access: [AllowAnonymous]
   */
  static async getWarrantyRecordBySerialNumber(
    serialNumber: string
  ): Promise<WarrantyRecordResponse> {
    try {
      const response = await apiClient.get<WarrantyRecordResponse>(
        `${API_CONFIG.ENDPOINTS.WARRANTY_RECORD.GET_BY_SERIAL_NUMBER}/${serialNumber}`
      );
      return response.result;
    } catch (error) {
      console.error("Error getting warranty record by serial number:", error);
      throw error;
    }
  }


  static async getWarrantyRecordByImei(
    imei: string
  ): Promise<WarrantyRecordResponse> {
    try {
      const response = await apiClient.get<WarrantyRecordResponse>(
        `${API_CONFIG.ENDPOINTS.WARRANTY_RECORD.GET_BY_IMEI}/${imei}`
      );
      return response.result;
    } catch (error) {
      console.error("Error getting warranty record by IMEI:", error);
      throw error;
    }
  }


  static async getWarrantyRecordsByOrderId(
    orderId: string
  ): Promise<WarrantyRecordResponse[]> {
    try {
      const response = await apiClient.get<WarrantyRecordResponse[]>(
        `${API_CONFIG.ENDPOINTS.WARRANTY_RECORD.GET_BY_ORDER_ID}/${orderId}`
      );
      return response.result || [];
    } catch (error) {
      console.error("Error getting warranty records by order ID:", error);
      throw error;
    }
  }

  static async getWarrantyRecordsByPhoneNumber(
    phoneNumber: string
  ): Promise<WarrantyRecordResponse[]> {
    try {
      const response = await apiClient.get<WarrantyRecordResponse[]>(
        `${API_CONFIG.ENDPOINTS.WARRANTY_RECORD.GET_BY_PHONE_NUMBER}/${phoneNumber}`
      );
      return response.result || [];
    } catch (error) {
      console.error("Error getting warranty records by phone number:", error);
      throw error;
    }
  }

  static isWarrantyValid(warrantyRecord: WarrantyRecordResponse): boolean {
    const currentDate = new Date();
    const endDate = new Date(warrantyRecord.endDate);
    return currentDate <= endDate && warrantyRecord.status === "VALID";
  }


  static getRemainingWarrantyDays(warrantyRecord: WarrantyRecordResponse): number {
    const currentDate = new Date();
    const endDate = new Date(warrantyRecord.endDate);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }


  static getWarrantyStatusDisplay(warrantyRecord: WarrantyRecordResponse): string {
    if (warrantyRecord.status !== "VALID") {
      return "Hết hiệu lực";
    }

    const remainingDays = this.getRemainingWarrantyDays(warrantyRecord);
    if (remainingDays < 0) {
      return "Đã hết hạn";
    } else if (remainingDays <= 30) {
      return `Còn ${remainingDays} ngày`;
    } else {
      return "Còn hiệu lực";
    }
  }

  static formatWarrantyDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  }


  static validateSerialNumber(serialNumber: string): boolean {
    // Basic validation: not empty and minimum length
    return Boolean(serialNumber && serialNumber.trim().length >= 5);
  }

  static validateImei(imei: string): boolean {
    // IMEI should be 15 digits
    const imeiRegex = /^\d{15}$/;
    return imeiRegex.test(imei);
  }


  static validatePhoneNumber(phoneNumber: string): boolean {
    // Vietnamese phone number format
    const phoneRegex = /^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])\d{7}$/;
    return phoneRegex.test(phoneNumber.replace(/[\s-]/g, ""));
  }

  /**
   * Enable/disable API mode (for compatibility with ServiceManager)
   * Note: This service always uses API, so this method is a no-op
   */
  static enableApiMode(enable: boolean = true): void {
    // WarrantyService always uses API, no mock mode available
    console.log(`WarrantyService: Always uses API mode (enable=${enable})`);
  }
}
