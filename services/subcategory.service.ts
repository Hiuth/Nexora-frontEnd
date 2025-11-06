import { subCategories } from "@/lib/mock-data";
import { SubCategory } from "@/lib/types";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";
import { SubCategoryResponse } from "@/types/api";

export class SubCategoryService {
  // Use real API now
  private static USE_API = true;

  // Simulate API delay for mock data
  private static async delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all subcategories
  static async getAllSubCategories(): Promise<SubCategory[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<SubCategoryResponse[]>(
          API_CONFIG.ENDPOINTS.SUBCATEGORY.GET_ALL
        );
        // Map response to entity types
        return response.result.map((sub) => ({
          id: sub.id,
          categoryId: sub.categoryId,
          subCategoryName: sub.subCategoryName,
          subCategoryImg: sub.subCategoryImg,
          description: sub.description,
          categoryName: sub.categoryName,
        }));
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
    return subCategories;
  }

  // Get subcategories by category ID
  static async getSubCategoriesByCategoryId(
    categoryId: string
  ): Promise<SubCategory[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<SubCategoryResponse[]>(
          `${API_CONFIG.ENDPOINTS.SUBCATEGORY.GET_BY_CATEGORY_ID}/${categoryId}`
        );
        // Map response to entity types
        return response.result.map((sub) => ({
          id: sub.id,
          categoryId: sub.categoryId,
          subCategoryName: sub.subCategoryName,
          subCategoryImg: sub.subCategoryImg,
          description: sub.description,
          categoryName: sub.categoryName,
        }));
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

  // Get subcategory by ID
  static async getSubCategoryById(
    subCategoryId: string
  ): Promise<SubCategory | null> {
    if (this.USE_API) {
      try {
        const response = await apiGet<SubCategoryResponse>(
          `${API_CONFIG.ENDPOINTS.SUBCATEGORY.GET_BY_ID}/${subCategoryId}`
        );
        // Map response to entity type
        const sub = response.result;
        return {
          id: sub.id,
          categoryId: sub.categoryId,
          subCategoryName: sub.subCategoryName,
          subCategoryImg: sub.subCategoryImg,
          description: sub.description,
          categoryName: sub.categoryName,
        };
      } catch (error) {
        console.error(
          "Failed to fetch subcategory from API, using mock data:",
          error
        );
        // Fallback to mock data
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return subCategories.find((sub) => sub.id === subCategoryId) || null;
  }

  // Method to switch to API mode (for future use)
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(
      `SubCategoryService API mode: ${enable ? "enabled" : "disabled"}`
    );
  }
}
