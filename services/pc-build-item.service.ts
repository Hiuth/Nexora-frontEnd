import { PcBuildItem } from "@/lib/types";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";

export class PcBuildItemService {
  // Use API now
  private static USE_API = true;

  // Simulate API delay for mock data
  private static async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get PC build items by PC build ID
  static async getPcBuildItemsByPcBuildId(pcBuildId: string): Promise<PcBuildItem[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<PcBuildItem[]>(
          `${API_CONFIG.ENDPOINTS.PC_BUILD_ITEM.GET_BY_PC_BUILD_ID}/${pcBuildId}`
        );

        if (response.code === 1000 && response.result) {
          return Array.isArray(response.result) ? response.result : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch PC build items from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return [];
  }

  // Get PC build item by ID - Note: API doesn't have this endpoint, remove if not needed
  static async getPcBuildItemById(itemId: string): Promise<PcBuildItem | null> {
    // This endpoint doesn't exist in the backend API
    // You would need to get items by PC build ID and filter locally
    throw new Error("Get PC build item by ID is not supported by the API");
  }







  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
  }
}