import { PcBuild, PcBuildItem } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";

export class PcBuildService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all PC builds
  static async getPcBuilds(): Promise<PcBuild[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<PcBuild[]>(
          API_CONFIG.ENDPOINTS.PC_BUILDS
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch PC builds from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock PC builds
  }

  // Get PC build by ID
  static async getPcBuildById(buildId: string): Promise<PcBuild | null> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<PcBuild>(
          `${API_CONFIG.ENDPOINTS.PC_BUILDS}/${buildId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch PC build from API:", error);
        return null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return null; // TODO: Add mock PC build
  }

  // Get PC build items
  static async getPcBuildItems(buildId: string): Promise<PcBuildItem[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<PcBuildItem[]>(
          `${API_CONFIG.ENDPOINTS.PC_BUILDS}/${buildId}/items`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch PC build items from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock PC build items
  }

  // Create custom PC build
  static async createPcBuild(buildData: {
    productName: string;
    description?: string;
    items: { productId: string; quantity: number }[];
  }): Promise<PcBuild> {
    if (this.USE_API) {
      try {
        const response = await apiClient.post<PcBuild>(
          API_CONFIG.ENDPOINTS.PC_BUILDS,
          buildData
        );
        return response.data;
      } catch (error) {
        console.error("Failed to create PC build:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return mock created PC build
    throw new Error("Mock implementation not complete");
  }

  // Update PC build
  static async updatePcBuild(
    buildId: string,
    buildData: Partial<PcBuild>
  ): Promise<PcBuild> {
    if (this.USE_API) {
      try {
        const response = await apiClient.put<PcBuild>(
          `${API_CONFIG.ENDPOINTS.PC_BUILDS}/${buildId}`,
          buildData
        );
        return response.data;
      } catch (error) {
        console.error("Failed to update PC build:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return updated mock PC build
    throw new Error("Mock implementation not complete");
  }

  // Get PC build recommendations
  static async getRecommendations(
    budget?: number,
    purpose?: string
  ): Promise<PcBuild[]> {
    if (this.USE_API) {
      try {
        const params: Record<string, string> = {};
        if (budget) params.budget = budget.toString();
        if (purpose) params.purpose = purpose;

        const response = await apiClient.get<PcBuild[]>(
          `${API_CONFIG.ENDPOINTS.PC_BUILDS}/recommendations`,
          params
        );
        return response.data;
      } catch (error) {
        console.error(
          "Failed to fetch PC build recommendations from API:",
          error
        );
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock recommendations
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`PcBuildService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
