import { Brand } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";

export class BrandService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all brands
  static async getBrands(): Promise<Brand[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Brand[]>(
          API_CONFIG.ENDPOINTS.BRANDS || "/brands"
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch brands from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock brands
  }

  // Get brands by category
  static async getBrandsByCategory(categoryId: string): Promise<Brand[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Brand[]>(
          `${API_CONFIG.ENDPOINTS.BRANDS || "/brands"}/category/${categoryId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch brands by category from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock brands by category
  }

  // Get brand by ID
  static async getBrandById(brandId: string): Promise<Brand | null> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Brand>(
          `${API_CONFIG.ENDPOINTS.BRANDS || "/brands"}/${brandId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch brand from API:", error);
        return null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return null; // TODO: Add mock brand
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`BrandService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
