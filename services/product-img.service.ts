import { ProductImageResponse } from "@/types/api";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";

export class ProductImgService {
  // Use API now
  private static USE_API = true;

  // Simulate API delay for mock data
  private static async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all product images by product ID
  static async getProductImgByProductId(
    productId: string
  ): Promise<ProductImageResponse[]> {
    if (this.USE_API) {
      try {
        console.log("Fetching product images for product ID:", productId);

        const response = await apiGet<any>(
          `${
            API_CONFIG.ENDPOINTS.PRODUCT_IMG.GET_BY_PRODUCT_ID
          }/${encodeURIComponent(productId)}`
        );

        console.log("Product images API response:", response);

        if (response.code === 1000 && response.result) {
          const images = Array.isArray(response.result) ? response.result : [];
          console.log("Product images loaded:", images.length);
          return images;
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch product images from API:", error);
        // Return empty array as fallback instead of mock data
        return [];
      }
    }

    // Mock data with simulated delay (if API is disabled)
    await this.delay();
    return [];
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(
      `ProductImgService API mode: ${enable ? "enabled" : "disabled"}`
    );
  }
}
