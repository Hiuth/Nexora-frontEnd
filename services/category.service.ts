import { categories, subCategories } from "@/lib/mock-data";
import { Category, SubCategory } from "@/lib/types";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";
import { CategoryResponse } from "@/types/api";

export class CategoryService {
  // Use real API now
  private static USE_API = true;

  // Simulate API delay for mock data
  private static async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all categories
  static async getCategories(): Promise<Category[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<CategoryResponse[]>(
          API_CONFIG.ENDPOINTS.CATEGORY.GET_ALL
        );
        // Map response to entity types
        return response.result.map((cat) => ({
          id: cat.id,
          categoryName: cat.categoryName,
          iconImg: cat.iconImg,
        }));
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
        const response = await apiGet<SubCategory[]>(
          `${API_CONFIG.ENDPOINTS.SUBCATEGORY.GET_BY_CATEGORY_ID}/${categoryId}`
        );
        return response.result;
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
        const response = await apiGet<CategoryResponse>(
          `${API_CONFIG.ENDPOINTS.CATEGORY.GET_BY_ID}/${categoryId}`
        );
        // Map response to entity type
        const cat = response.result;
        return {
          id: cat.id,
          categoryName: cat.categoryName,
          iconImg: cat.iconImg,
        };
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
