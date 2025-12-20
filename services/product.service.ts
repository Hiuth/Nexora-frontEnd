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
        // Map frontend parameters to backend expected parameters
        const queryParams: any = {};
        if (params?.page) queryParams.pageNumber = params.page;
        if (params?.pageSize) queryParams.pageSize = params.pageSize;
        if (params?.search) queryParams.search = params.search;
        if (params?.brand) queryParams.brand = params.brand;
        if (params?.minPrice) queryParams.minPrice = params.minPrice;
        if (params?.maxPrice) queryParams.maxPrice = params.maxPrice;

        // Choose appropriate endpoint based on filters
        let endpoint = API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL;
        
        if (params?.search) {
          endpoint = `${API_CONFIG.ENDPOINTS.PRODUCT.SEARCH}/${encodeURIComponent(params.search)}`;
        } else if (params?.subcategory) {
          endpoint = `${API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_SUBCATEGORY_ID}/${encodeURIComponent(params.subcategory)}`;
        } else if (params?.category) {
          endpoint = `${API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_CATEGORY_ID}/${encodeURIComponent(params.category)}`;
        }

        const response = await apiGet<any>(
          endpoint,
          queryParams
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const filteredProducts = (paginatedData as any).items || [];
          
          // Store pagination info for hook to use
          (filteredProducts as any).__paginationInfo = {
            totalCount: paginatedData.totalCount,
            totalPages: paginatedData.totalPages,
            currentPage: paginatedData.totalPage || params?.page || 1,
            hasNextPage: (paginatedData.totalPage || params?.page || 1) < paginatedData.totalPages
          };
          
          return Array.isArray(filteredProducts) ? filteredProducts : [];
        }

        return [];
      } catch (error) {
        console.error("API failed:", error);
        // Không fallback về mock data, trả về mảng rỗng
        return [];
      }
    }

    // Không có API_BASE_URL, trả về mảng rỗng thay vì mock data
    console.warn("No API_BASE_URL configured");
    return [];
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

  // Get products by subcategory ID
  static async getProductBySubCategoryId(
    subCategoryId: string
  ): Promise<Product[]> {
    if (this.USE_API) {
      try {
        const pathResp = await apiGet<any>(
          `${
            API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_SUBCATEGORY_ID
          }/${encodeURIComponent(subCategoryId)}`
        );
        const normalize = (payload: any): Product[] => {
          if (!payload) return [];
          const items = (payload as any).items || [];
          return Array.isArray(items) ? items : [];
        };

        if (pathResp && pathResp.result) {
          const items = normalize(pathResp.result);
          return items;
        }

        return [];
      } catch (error) {
        console.error(
          "Failed to fetch products by subcategory from API:",
          error
        );
        // Fallback to mock data
        await this.delay();
        return products.filter((p) => p.subCategoryId === subCategoryId);
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return [];
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
        // Không fallback về mock data
        return [];
      }
    }

    // Không có API_BASE_URL
    console.warn("No API_BASE_URL configured");
    return [];
  }

  // Search products with pagination
  static async searchProducts(
    query: string, 
    params?: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<Product[]> {
    if (this.USE_API) {
      try {
        // Map frontend parameters to backend expected parameters
        const queryParams: any = {};
        if (params?.page) queryParams.pageNumber = params.page;
        if (params?.pageSize) queryParams.pageSize = params.pageSize;

        const response = await apiGet<any>(
          `${API_CONFIG.ENDPOINTS.PRODUCT.SEARCH}/${encodeURIComponent(query)}`,
          queryParams
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const filteredProducts = (paginatedData as any).items || [];
          
          // Store pagination info for hook to use
          (filteredProducts as any).__paginationInfo = {
            totalCount: paginatedData.totalCount,
            totalPages: paginatedData.totalPages,
            currentPage: paginatedData.currentPage || params?.page || 1,
            hasNextPage: (paginatedData.currentPage || params?.page || 1) < paginatedData.totalPages
          };

          return Array.isArray(filteredProducts) ? filteredProducts : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to search products from API:", error);
        // Không fallback về mock data
        return [];
      }
    }

    // Không có API_BASE_URL
    console.warn("No API_BASE_URL configured for search");
    return [];
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
  }
}
