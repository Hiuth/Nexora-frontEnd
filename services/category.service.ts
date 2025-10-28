import { categories, subCategories } from "@/lib/mock-data";
import { Category, SubCategory } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";

export class CategoryService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all categories
  static async getCategories(): Promise<Category[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Category[]>(
          API_CONFIG.ENDPOINTS.CATEGORIES
        );
        return response.data;
      } catch (error) {
        console.error(
          "Failed to fetch categories from API, using mock data:",
          error
        );
        // Fallback to mock data
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return categories;
  }

  // Get subcategories by category ID
  static async getSubCategories(categoryId: string): Promise<SubCategory[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<SubCategory[]>(
          `${API_CONFIG.ENDPOINTS.CATEGORIES}/${categoryId}/subcategories`
        );
        return response.data;
      } catch (error) {
        console.error(
          "Failed to fetch subcategories from API, using mock data:",
          error
        );
        // Fallback to mock data
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return subCategories.filter((sub) => sub.categoryId === categoryId);
  }

  // Get category by ID
  static async getCategoryById(categoryId: string): Promise<Category | null> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Category>(
          `${API_CONFIG.ENDPOINTS.CATEGORIES}/${categoryId}`
        );
        return response.data;
      } catch (error) {
        console.error(
          "Failed to fetch category from API, using mock data:",
          error
        );
        // Fallback to mock data
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return categories.find((cat) => cat.id === categoryId) || null;
  }

  // Method to switch to API mode (for future use)
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`CategoryService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
