import { Product, PaginatedResponse } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";

export class ProductService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all products with pagination
  static async getProducts(params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    subcategory?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Promise<PaginatedResponse<Product>> {
    if (this.USE_API) {
      try {
        const queryParams = params
          ? Object.entries(params)
              .filter(([_, value]) => value !== undefined)
              .reduce(
                (acc, [key, value]) => ({ ...acc, [key]: value.toString() }),
                {}
              )
          : {};

        const response = await apiClient.getPaginated<Product>(
          API_CONFIG.ENDPOINTS.PRODUCTS,
          queryParams
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch products from API:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();

    // Return mock paginated response
    return {
      items: [], // TODO: Add mock products
      currentPage: params?.page || 1,
      pageSize: params?.pageSize || 20,
      totalPages: 1,
      totalCount: 0,
    };
  }

  // Get product by ID
  static async getProductById(productId: string): Promise<Product | null> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Product>(
          `${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch product from API:", error);
        return null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return null; // TODO: Add mock product data
  }

  // Get featured products
  static async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Product[]>(
          `${API_CONFIG.ENDPOINTS.PRODUCTS}/featured`,
          { limit: limit.toString() }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch featured products from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock featured products
  }

  // Search products
  static async searchProducts(
    query: string,
    limit: number = 20
  ): Promise<Product[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Product[]>(
          `${API_CONFIG.ENDPOINTS.PRODUCTS}/search`,
          { q: query, limit: limit.toString() }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to search products from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock search results
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`ProductService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
