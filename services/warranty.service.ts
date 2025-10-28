import { WarrantyRecord } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";

export class WarrantyService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 150): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Check warranty by serial number or IMEI
  static async checkWarranty(
    identifier: string
  ): Promise<WarrantyRecord | null> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<WarrantyRecord>(
          `${API_CONFIG.ENDPOINTS.WARRANTY}/check`,
          { identifier }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to check warranty from API:", error);
        return null;
      }
    }

    // Mock data with simulated delay
    await this.delay();

    // Mock warranty check - return null if not found
    if (identifier.length < 5) {
      return null;
    }

    // TODO: Return mock warranty data
    return {
      id: "warranty-" + identifier,
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      status: "active",
      productId: "product-123",
      productName: "PC Gaming RTX 4060",
      warrantyPeriod: 12,
      orderId: "order-456",
      productUnitId: "unit-789",
      serialNumber: identifier,
      imei: identifier.startsWith("35") ? identifier : undefined,
    };
  }

  // Get warranty records by account ID
  static async getWarrantyRecords(
    accountId: string
  ): Promise<WarrantyRecord[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<WarrantyRecord[]>(
          `${API_CONFIG.ENDPOINTS.WARRANTY}/account/${accountId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch warranty records from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock warranty records
  }

  // Register warranty
  static async registerWarranty(warrantyData: {
    productId: string;
    orderId: string;
    serialNumber?: string;
    imei?: string;
    warrantyPeriod: number;
  }): Promise<WarrantyRecord> {
    if (this.USE_API) {
      try {
        const response = await apiClient.post<WarrantyRecord>(
          API_CONFIG.ENDPOINTS.WARRANTY,
          warrantyData
        );
        return response.data;
      } catch (error) {
        console.error("Failed to register warranty:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return mock registered warranty
    throw new Error("Mock implementation not complete");
  }

  // Update warranty status
  static async updateWarrantyStatus(
    warrantyId: string,
    status: string
  ): Promise<WarrantyRecord> {
    if (this.USE_API) {
      try {
        const response = await apiClient.put<WarrantyRecord>(
          `${API_CONFIG.ENDPOINTS.WARRANTY}/${warrantyId}/status`,
          { status }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to update warranty status:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return updated mock warranty
    throw new Error("Mock implementation not complete");
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`WarrantyService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
