import { Product } from "@/lib/types";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";
import { products } from "@/lib/mock-data";

export class ProductService {
  // Use API now
  private static USE_API = true;

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
  }): Promise<Product[]> {
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

        const response = await apiGet<any>(
          API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL,
          queryParams
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const filteredProducts = (paginatedData as any).items || [];

          return Array.isArray(filteredProducts) ? filteredProducts : [];
        }

        return [];
      } catch (error) {
        console.error(
          "Failed to fetch products from API, using mock data:",
          error
        );
        // Fallback to mock data
        await this.delay();
        return products;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return products;
  }

  // Get product by ID
  static async getProductById(productId: string): Promise<Product | null> {
    if (this.USE_API) {
      try {
        const response = await apiGet<any>(
          `${API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_ID}/${productId}`
        );

        if (response.code === 1000 && response.result) {
          return response.result;
        }

        return null;
      } catch (error) {
        console.error("Failed to fetch product from API:", error);
        // Fallback to mock data
        await this.delay();
        return products.find((p) => p.id === productId) || null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return products.find((p) => p.id === productId) || null;
  }

  // Get featured products
  static async getFeaturedProducts(): Promise<Product[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<any>(
          API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const filteredProducts = (paginatedData as any).items || [];

          return Array.isArray(filteredProducts) ? filteredProducts : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch featured products from API:", error);
        // Fallback to mock data
        await this.delay();
        return products;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return products;
  }

  // Get products by category ID
  static async getProductByCategoryID(categoryId: string): Promise<Product[]> {
    if (this.USE_API) {
      try {
        // Backend expects pageNumber/pageSize for pagination
        // Let the server use its default pagination (pageNumber=1,pageSize=10)
        const pathResp = await apiGet<any>(
          `${
            API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_CATEGORY_ID
          }/${encodeURIComponent(categoryId)}`
        );
        console.log("API response for products by category:", pathResp);
        const normalize = (payload: any): Product[] => {
          if (!payload) return [];
          const items = (payload as any).items || [];
          return Array.isArray(items) ? items : [];
        };

        if (pathResp && pathResp.result) {
          const items = normalize(pathResp.result);
          // Return whatever the API gives us (including empty array)
          return items;
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch products by category from API:", error);
        // Fallback to mock data
        await this.delay();
        // Return mock list to keep UI populated in dev fallback
        return products;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // Without API, return mock products
    return products;
  }

  // Search products
  static async searchProducts(query: string): Promise<Product[]> {
    if (this.USE_API) {
      try {
        const response = await apiGet<any>(
          API_CONFIG.ENDPOINTS.PRODUCT.SEARCH,
          { q: query }
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const filteredProducts = (paginatedData as any).items || [];

          return Array.isArray(filteredProducts) ? filteredProducts : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to search products from API:", error);
        // Fallback to mock data
        await this.delay();
        return products.filter((p) =>
          p.productName.toLowerCase().includes(query.toLowerCase())
        );
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return products.filter((p) =>
      p.productName.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`ProductService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
