import { Brand } from "@/lib/types";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";
import { brands } from "@/lib/mock-data";

export class BrandService {
  // Use API now
  private static USE_API = true;

  // Simulate API delay for mock data
  private static async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all brands
  static async getBrands(): Promise<Brand[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<any>(API_CONFIG.ENDPOINTS.BRAND.GET_ALL);

        if (response.code === 1000 && response.result) {
          return Array.isArray(response.result) ? response.result : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch brands from API:", error);
        // Fallback to mock data
        await this.delay();
        return brands;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return brands;
  }

  // Get brands by category
  static async getBrandsByCategory(categoryId: string): Promise<Brand[]> {
    if (this.USE_API) {
      try {
        // For now, get all brands and filter by categoryId if needed
        // API doesn't have getBrandsByCategory endpoint yet
        const allBrands = await this.getBrands();
        return allBrands.filter((brand) => brand.categoryId === categoryId);
      } catch (error) {
        console.error("Failed to fetch brands by category from API:", error);
        // Fallback to mock data
        await this.delay();
        return brands.filter((brand) => brand.categoryId === categoryId);
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return brands.filter((brand) => brand.categoryId === categoryId);
  }

  // Get brand by ID
  static async getBrandById(brandId: string): Promise<Brand | null> {
    if (this.USE_API) {
      try {
        const response = await apiGet<any>(
          `${API_CONFIG.ENDPOINTS.BRAND.GET_BY_ID}/${brandId}`
        );

        if (response.code === 1000 && response.result) {
          return response.result;
        }

        return null;
      } catch (error) {
        console.error("Failed to fetch brand from API:", error);
        // Fallback to mock data
        await this.delay();
        return brands.find((brand) => brand.id === brandId) || null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return brands.find((brand) => brand.id === brandId) || null;
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`BrandService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
